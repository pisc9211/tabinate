const express = require('express')
const app = express()
const getUser = require('../models').getUser
const addUrl = require('../models').addUrl
const updateCheck = require('../models').updateCheck


app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.get('/api/:uid', (req, res) => {
  // getUser works~
  getUser(req.params.uid).then(user => res.send(user))
  // res.send(req.params.uid)
})

app.post('/api/url', (req, res) => {
  addUrl(req.body).then((d) => console.log('added url', d))
  res.send('ok')
})

app.post('/api/check', (req, res) => {
  updateCheck(req.body).then(d => console.log('updated', d)).catch(e => res.send(e))
  res.send('ok')
})

app.listen(4000, () => console.log(`listening to port 4000`))