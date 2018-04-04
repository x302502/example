module.exports = function(app, dbs) {

    app.get('/person', (req, res) => {
      dbs.db.collection('person').find({}).toArray((err, docs) => {
        if (err) {
          console.log(err)
          res.error(err)
        } else {
          res.json(docs)
        }
      })
    })

    return app
  }