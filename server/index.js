const express = require('express')
const app = express()
const getUser = require('../models').getUser
const addUrl = require('../models').addUrl


app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.get('/api/:uid', (req, res) => {
  // getUser works~
  getUser(req.params.uid).then(user => res.send(user))
  // res.send(req.params.uid)
})

app.post('/api/:uid-:url', (req, res) => {
  console.log(req.params)
})

app.listen(4000, () => console.log(`listening to port 4000`))