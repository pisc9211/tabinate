const express = require('express')
const app = express()
const getUser = require('../models').getUser
const addUrl = require('../models').addUrl
const deleteUrl = require('../models').deleteUrl
const updateCheck = require('../models').updateCheck
const axios = require('axios')


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
  addUrl(req.body)
    .then((d) => res.send('added url!'))
    .catch(err => res.send(err))
})

app.post('/api/check', (req, res) => {
  updateCheck(req.body)
    .then(d => res.send('updated checkmark!'))
    .catch(e => res.send(e))
})

app.delete('/api', (req, res) => {
  deleteUrl(req.body).then((d) => console.log('deleted url', d))
  res.send('deleted!')
})

app.get('/title', (req, res) => {
  let url = req.body.url;
  axios.get(url).then(d => 
    { console.log(typeof d.data)
      res.send(d.data)})
})

app.listen(4000, () => console.log(`listening to port 4000`))