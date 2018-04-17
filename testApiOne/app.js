const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const HOST_DATABASE_URL = "mongodb://dbadmin:123@ds123129.mlab.com:23129/dbtest"
let databases = MongoClient.connect(HOST_DATABASE_URL).then( dbs => dbs.db()).catch(err => err);
app.get('/', (req,res)=>{
  loadData().then( (list) => {
      res.json(list);
  }).catch(err => res.error(err));
})
app.listen(3000,'localhost',() => console.log('Ok'));

function getCollection(collectionName){
   return databases.then( dbs => dbs.collection(collectionName).find().toArray()).catch( err => err);
}
async function loadData(){
    let data = await Promise.all([getCollection('person'),getCollection('post')]);
    return {
        listPerson: data[0],
        listPost: data[1]
    }
}