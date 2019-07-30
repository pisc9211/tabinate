const express = require('express')
const app = express()
const getUser = require('../models').getUser

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.get('/api/:uid', (req, res) => {
  getUser(req.params.uid)
})

app.listen(4000, () => console.log(`listening to port 4000`))