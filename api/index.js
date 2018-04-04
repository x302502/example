const MongoClient = require('mongodb').MongoClient
const express = require('express')
const app = express()
const HOST_DATABASE_URL = "mongodb://dbadmin:123@ds123129.mlab.com:23129/dbtest"

function connect(url) {
  return MongoClient.connect(url).then(client => client.db())
}
async function test() {
    let databases = await Promise.all([connect(HOST_DATABASE_URL)])
  
    return {   
      db: databases[0]
    }
}
test().then((data)=>{
    console.log(data);
    test1(app, data).listen(3000, () => console.log('Listening on port 3000'))
})


function test1(app, dbs) {

    app.get('/person',  (req, res) => {
         getData('person',dbs, (dd) => {
            console.log(dd)
            res.json(dd)
         })
        
    })
    return app
}

function getData(collectionName,dbs,cb) {
    dbs.db.collection(collectionName).find({}).toArray( (err, docs) => {    
        cb(docs)
  })
}