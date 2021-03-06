const express = require('express')
const app = express()
const getUser = require('../models').getUser
const addUrl = require('../models').addUrl
const deleteUrl = require('../models').deleteUrl
const updateCheck = require('../models').updateCheck
const puppeteer = require('puppeteer')
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.get('/api/:uid', (req, res) => {
  // getUser works~
  getUser(req.params.uid)
    .then(user => res.json(user))
    .catch(e => res.send(e))
  // res.send(req.params.uid)
})

app.post('/api/url', async (req, res) => {
  let title = await getTitlePup(req.body.url)
  if (title === 'invalid url') {
    res.send('invalid url')
  } else {
    let data = Object.assign({title}, req.body)
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

app.use(express.static(path.join(__dirname, '/../build')))
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/../build/index.html'))
// })

async function getTitlePup(url) {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ]
  })
  const page = await browser.newPage()
  try {
    await page.goto(url)
    await page.waitForSelector('title');
    const title = await page.title()
    
    await browser.close()
    return title
  } catch {
    await browser.close()
    return 'invalid url'
  }
  // return url
}

app.listen(process.env.PORT || 4000, () => console.log(`listening to port ${process.env.PORT || 4000}`))