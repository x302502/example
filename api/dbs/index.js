const MongoClient = require('mongodb').MongoClient

// Note: A production application should not expose database credentials in plain text.
// For strategies on handling credentials, visit 12factor: https://12factor.net/config.
const HOST_DATABASE_URL = "mongodb://dbadmin:123@ds123129.mlab.com:23129/dbtest"

function connect(url) {
  return MongoClient.connect(url).then(client => client.db())
}

module.exports = async function() {
  let databases = await Promise.all([connect(HOST_DATABASE_URL)])

  return {
    db: databases[0]
  }
}