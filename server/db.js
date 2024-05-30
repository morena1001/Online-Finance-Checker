const { MongoClient } = require('mongodb')

let dbConnection
let uri = 'mongodb+srv://morena1001:FEB.jf.A.0227033926528@ofc-cluster.p5xei0b.mongodb.net/?retryWrites=true&w=majority&appName=OFC-cluster'

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(uri)
        .then((client) => {
            dbConnection = client.db()
            return cb()
        })
        .catch(err => {
            console.log(err)
            return cb(err)
        })
    },
    getDb: () => dbConnection
}
