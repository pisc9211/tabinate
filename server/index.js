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
  getUser(req.params.uid)
    .then(user => res.send(user))
    .catch(e => res.send(e))
  // res.send(req.params.uid)
})

app.post('/api/url', async (req, res) => {
  let title = await getTitlePup(req.body.url)
  console.log('title from post', title)
  if (title === 'invalid url') {
    res.send('invalid url')
  } else {
    let data = Object.assign({title}, req.body)
    console.log('data from assigning', data)
    addUrl(data)
      .then((d) => res.send('added url!'))
      .catch(err => res.send(err))
  }
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

async function getTitlePup(url) {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  try {
    await page.goto(url)
  } catch {
    await browser.close()
    return 'invalid url'
  }
  await page.waitForSelector('title');
  const title = await page.title()
  
  await browser.close()
  return title
}

app.listen(4000, () => console.log(`listening to port 4000`))