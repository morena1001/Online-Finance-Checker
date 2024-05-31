const express = require('express')
const { ObjectId } = require('mongodb')
const { connectToDb, getDb } = require('./db')

// init app and middleware
const app = express()
app.use(express.json())

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

    db.collection('users')
    .insertOne(user)
    .then(result => {
        res.status(201).json(result)
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
    // tracker.purchases = db.createCollection('purchases')

    if (ObjectId.isValid(tracker.userId)) {
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
