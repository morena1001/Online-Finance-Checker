const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { ObjectId } = require('mongodb')
const { connectToDb, getDb } = require('./db')

// init app and middleware
const app = express()
app.use(express.json())
const jwtSecretKey = "abcdefghijklmnopqrstuvwxyz1234567890"

// db connection
let db
connectToDb((err) => {
    if (!err) {
        app.listen(3001, () => {
            console.log('App listening on port 3001')
        })
        db = getDb()
    }
})



// USER AUTHENTICATION ROUTES
app.post('/auth', (req, res) => {
    const { username, password } = req.body
    db.collection('users')
    .findOne({ username })
    .then((user) => {
        bcrypt.compare(password, user.password, (err, result) => {
            if (!result) {
                return res.status(401).json({ error: 'Invalid password' })
            } else {
                let loginData = {
                    username,
                    signInTime: Date.now()
                }
    
                const token = jwt.sign(loginData, jwtSecretKey)
                res.status(200).json({ message: 'success', token, userId: user._id })
            }
        })
    })
    .catch(() => {
        res.status(500).json({ error: 'Could not fetch the user' })
    })
})

app.post('/verify', (req, res) => {
    const tokenHeaderKey = 'jwt-token'
    const authToken = req.headers[tokenHeaderKey]
    const { username } = req.body

    try {
        const verified = jwt.verify(authToken, jwtSecretKey)
        if (verified) {
            db.collection('users')
            .findOne({ username })
            .then((user) => {
                res.status(200).json({ status: 'logged in', message: 'success', user })
            })
            
        } else {
            res.status(401).json({ status: 'Invalid authentication', message: 'error' })
        }
    } catch (error) {
        res.status(401).json({ status: 'Invalid authentication', message: 'error' })    
    }
})

app.post('/checkAccount', (req, res) => {
    const { username } = req.body
    db.collection('users')
    .findOne({ username })
    .then((user) => {
        res.status(200).json({
            status: user ? 'User exists' : 'User does not exist',  
        })
    })
})



// USERS COLLECTION ROUTES
app.get('/users', (req, res) => {
    let users = []

    db.collection('users')
    .find()
    .forEach(user => { users.push(user) })
    .then(() => {
        res.status(200).json(users)
    })
    .catch(() => {
        res.status(500).json({ error: 'Could not fetch users' })
    })
})

app.get('/users/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('users')
        .findOne({ _id: new ObjectId(req.params.id) })
        .then((user) => {
            res.status(200).json(user)
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not fetch the document' })
        })
    } else {
        res.status(500).json({ error: 'Not a valid document id' })
    }
})

app.post('/users', (req, res) => {
    const user = req.body
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash
    })

    db.collection('users')
    .insertOne(user)
    .then(result => {
        let loginData = {
            username: user.username,
            signInTime: Date.now()
        }

        const token = jwt.sign(loginData, jwtSecretKey)
        res.status(201).json({ result, message: 'success', token })
    })
    .catch(err => {
        res.status(500).json({ error: 'Could not create a new document' })
    })
})

app.patch('/users/:id', (req, res) => {
    const updates = req.body

    if (ObjectId.isValid(req.params.id)) {
        db.collection('users')
        .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not update the document' })
        })
    } else {
        res.status(500).json({ error: 'Not a valid document id' })
    }
})

app.delete('/users/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('users')
        .deleteOne({ _id: new ObjectId(req.params.id) })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not delete the document' })
        })
    } else {
        res.status(500).json({ error: 'Not a valid document id' })
    }
})



// TRACKERS COLLECTION ROUTES
app.get('/trackers', (req, res) => {
    let trackers = []

    db.collection('trackers')
    .find()
    .forEach(tracker => { trackers.push(tracker) })
    .then(() => {
        res.status(200).json(trackers)
    })
    .catch(() => {
        res.status(500).json({ error: 'Could not fetch users' })
    })
})

app.get('/trackers/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('trackers')
        .findOne({ _id: new ObjectId(req.params.id) })
        .then((tracker) => {
            res.status(200).json(tracker)
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not fetch the document' })
        })
    } else {
        res.status(500).json({ error: 'Not a valid document id' })
    }
})

app.post('/trackers', (req, res) => {
    const tracker = req.body

    if (ObjectId.isValid(tracker.userId)) {
        tracker.userId = new ObjectId(tracker.userId)

        db.collection('trackers')
        .insertOne(tracker)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not create a new document' })
        })
    } else {
        res.status(500).json({ error: "Not a valid userId" })
    }
})

app.patch('/trackers/:id', (req, res) => {
    const updates = req.body

    if (ObjectId.isValid(req.params.id)) {
        db.collection('trackers')
        .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not update the document' })
        })
    } else {
        res.status(500).json({ error: 'Not a valid document id' })
    }
})

app.delete('/trackers/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('trackers')
        .deleteOne({ _id: new ObjectId(req.params.id) })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not delete the document' })
        })
    } else {
        res.status(500).json({ error: 'Not a valid document id' })
    }
})

app.get('/trackers/:id/purchases', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('trackers')
        .findOne({ _id: new ObjectId(req.params.id) })
        .then((tracker) => {
            res.status(200).json(tracker.purchases)
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not fetch the document' })
        })
    } else {
        res.status(500).json({ error: 'Not a valid document id' })
    }
})

app.get('/trackers/:id/purchases/:id_2', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('trackers')
        .findOne({ _id: new ObjectId(req.params.id) })
        .then((tracker) => {
            if (ObjectId.isValid(req.params.id_2)) {
                let purchaseIndex = tracker.purchases.findIndex(
                    purchase => purchase._id.toString() === req.params.id_2 )
                purchaseIndex === -1 ? 
                res.status(500).json({ error : ' Not a valid purchase document id'}) :
                res.status(200).json(tracker.purchases[purchaseIndex])
            } else {
                res.status(500).json({ error: 'Not a valid purchase document id' })
            }
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not fetch the document' })
        })
    } else {
        res.status(500).json({ error: 'Not a valid document id' })
    }
})

app.post('/trackers/:id/purchases', (req, res) => {
    const purchase = req.body
    purchase._id = new ObjectId()

    if (ObjectId.isValid(req.params.id)) {
        db.collection('trackers')
        .findOne({ _id: new ObjectId(req.params.id) })
        .then((tracker) => {
            tracker.purchases.push(purchase)
            req.url = '/updateTrackerPurchases/' + req.params.id
            req.body = tracker.purchases
            app._router.handle(req, res);
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not create the purchase document' })
        })
    } else {
        res.status(500).json({ error: 'Not a valid document id' })
    }
})

app.patch('/trackers/:id/purchases/:id_2', (req, res) => {
    const updates = req.body

    if (ObjectId.isValid(req.params.id)) {
        db.collection('trackers')
        .findOne({ _id: new ObjectId(req.params.id) })
        .then((tracker) => {
            if (ObjectId.isValid(req.params.id_2)) {
                let purchaseIndex = tracker.purchases.findIndex(
                    purchase => purchase._id.toString() === req.params.id_2 )

                if (purchaseIndex === -1) {
                    res.status(500).json({ error: 'Not a valid purchase document id' })
                } else {
                    Object.keys(updates).forEach(key => {
                        tracker.purchases[purchaseIndex][key] = updates[key]
                    })
                    req.url = '/updateTrackerPurchases/' + req.params.id
                    req.body = tracker.purchases
                    app._router.handle(req, res);
                }
            } else {
                res.status(500).json({ error: 'Not a valid purchase document id' })
            }
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not fetch the document' })
        })
    } else {
        res.status(500).json({ error: 'Not a valid document id' })
    }
})

app.delete('/trackers/:id/purchases/:id_2', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('trackers')
        .findOne({ _id: new ObjectId(req.params.id) })
        .then((tracker) => {
            if (ObjectId.isValid(req.params.id_2)) {
                let purchaseIndex = tracker.purchases.findIndex(
                    purchase => purchase._id.toString() === req.params.id_2 )

                if (purchaseIndex === -1) {
                    res.status(500).json({ error : ' Not a valid purchase document id'})
                } else {
                    tracker.purchases.splice(purchaseIndex, 1)
                    req.url = '/updateTrackerPurchases/' + req.params.id
                    req.body = tracker.purchases
                    app._router.handle(req, res);
                }
            } else {
                res.status(500).json({ error: 'Not a valid purchase document id' })
            }
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not fetch the document' })
        })
    } else {
        res.status(500).json({ error: 'Not a valid document id' })
    }
})

app.all('/updateTrackerPurchases/:id', (req, res) => {
    const updates = req.body;

    if (ObjectId.isValid(req.params.id)) {
        db.collection('trackers')
        .updateOne({ _id: new ObjectId(req.params.id) }, { 
            $set: { 'purchases': updates } 
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not update the document' })
        })
    } else {
        res.status(500).json({ error: 'Not a valid document id' })
    }
})



// PURCHASES COLLECTION ROUTES
app.get('/purchases', (req, res) => {
    let purchases = []

    db.collection('purchases')
    .find()
    .forEach(purchase => { purchases.push(purchase) })
    .then(() => {
        res.status(200).json(purchases)
    })
    .catch(() => {
        res.status(500).json({ error: 'Could not fetch purchases' })
    })
})

app.get('/purchases/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('purchases')
        .findOne({ _id: new ObjectId(req.params.id) })
        .then((purchase) => {
            res.status(200).json(purchase)
        })
        .catch(() => {
            res.status(500).json({ error: 'Not a valid document id' })
        })
    } else {
        res.status(500).json({ error: 'Not a valid document id' })
    }
})

app.post('/purchases', (req, res) => {
    const purchase = req.body

    if (ObjectId.isValid(purchase.userId) && ObjectId.isValid(purchase.trackerId)) {
        purchase.userId = new ObjectId(purchase.userId)
        purchase.trackerId = new ObjectId(purchase.trackerId)

        db.collection('purchases')
        .insertOne(purchase)
        .then(result => {
            res.status(201).json(result)
        })
    } else {
        res.status(500).json({ error: 'Not a valid document id' })
    }
})

app.patch('/purchases/:id', (req, res) => {
    const updates = req.body

    if (ObjectId.isValid(req.params.id)) {
        db.collection('purchases')
        .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not update the document' })
        })
    } else {
        res.status(500).json({ error: 'Not a valid document id' })
    }
})

app.delete('/purchases/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('purchases')
        .deleteOne({ _id: new ObjectId(req.params.id) })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not delete the document' })
        })
    } else {
        res.status(500).json({ error: 'Not a valid document id' })
    }
})



// TRACKERHISTORIES COLLECTION ROUTES
app.get('/trackerHistories', (req, res) => {
    let trackerHistories = []

    db.collection('trackerHistories')
    .find()
    .forEach(trackerHistory => { trackerHistories.push(trackerHistory) })
    .then(() => {
        res.status(200).json(trackerHistories)
    })
    .catch(() => {
        res.status(500).json({ error: 'Could not fetch trackerHistories'})
    })
})

app.get('/trackerHistories/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('trackerHistories')
        .findOne({ _id: new ObjectId(req.params.id) })
        .then((trackerHistory) => {
            res.status(200).json(trackerHistory)
        })
        .catch(() => {
            res.status(500).json({ error: 'Not a valid document id' })
        })
    } else {
        res.status(500).json({ error: 'Not a valid document id' })
    }
})

app.post('/trackerHistories', (req, res) => {
    const trackerHistory = req.body

    if (ObjectId.isValid(trackerHistory.trackerId)) {
        trackerHistory.trackerId = new ObjectId(trackerHistory.trackerId)

        db.collection('trackerHistories')
        .insertOne(trackerHistory)
        .then(result => {
            res.status(201).json(result)
        })
    } else {
        res.status(500).json({ error: 'Not a valid document id' })
    }
})

app.patch('/trackerHistories/:id', (req, res) => {
    const updates = req.body 

    if (ObjectId.isValid(req.params.id)) {
        db.collection('trackerHistories')
        .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not update the document' })
        })
    } else {
        res.status(500).json({ error: 'Not a valid document id' })
    }
})

app.delete('/trackerHistories/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('trackerHistories')
        .deleteOne({ _id: new ObjectId(req.params.id) })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not delete the document' })
        })
    } else {
        res.status(500).json({ error: 'Not a valid document id' })
    }
})


// app.delete('/purchases/:id', (req, res) => {
//     if (ObjectId.isValid(req.params.id)) {
//         db.collection('purchases')
//         .deleteOne({ _id: new ObjectId(req.params.id) })
//         .then(result => {
//             res.status(200).json(result)
//         })
//         .catch(() => {
//             res.status(500).json({ error: 'Could not delete the document' })
//         })
//     } else {
//         res.status(500).json({ error: 'Not a valid document id' })
//     }
// })


