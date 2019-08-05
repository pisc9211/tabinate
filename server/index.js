const express = require('express')
const app = express()
const getUser = require('../models').getUser
const addUrl = require('../models').addUrl
const deleteUrl = require('../models').deleteUrl
const updateCheck = require('../models').updateCheck
const puppeteer = require('puppeteer')
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
  deleteUrl(req.query).then((d) => console.log('deleted url', d))
  res.send('deleted!')
})

app.post('/title', async (req, res) => {
  let url = req.body.url;
  console.log('url', url)
  let title = await getTitlePup(url)
  res.send(title)
})

async function getTitlePup(url) {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto(url, {waitUntil: 'networkidle0'})
  const title = await page.title()
  await browser.close()
  return title
}

app.listen(4000, () => console.log(`listening to port 4000`))