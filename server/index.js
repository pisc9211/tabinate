const express = require('express')
const app = express()
const getUser = require('../models').getUser
const addUrl = require('../models').addUrl
const deleteUrl = require('../models').deleteUrl
const updateCheck = require('../models').updateCheck
const puppeteer = require('puppeteer')

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

app.post('/title', async (req, res) => {
  let url = req.body.url;
  console.log('url', url)
  let title = await getTitlePup(url)
  res.send(title)
})


// function findTitle(str) {
//   const $ = cheerio.load(str)
//   return $.html()
// }

async function getTitlePup(url) {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  console.log('url in puppeteer', url)
  let mainUrlStatus;
  await page.setRequestInterception(true);
  page.on("request", request => {
    const url = request.url();
    console.log("request url:", url);
    request.continue();
  });
  page.on("requestfailed", request => {
    const url = request.url();
    console.log("request failed url:", url);
  });
  page.on("response", response => {
    const request = response.request();
    const url = request.url();
    const status = response.status();
    console.log("response url:", url, "status:", status);
		if (url === mainUrl) {
			mainUrlStatus = status;
		}
  });
  // const title = await page.evaluate(() => {
  //   return document.getElementsByTagName('title')[0].text
  // })
  
  await page.goto(url)
  // console.log('title:', title);
  await browser.close()
  // return title
}

// function testRedirect(url) {
//   let xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = function(e) {
//     if (xhr.readyState == 4 && xhr.status == 200) {
//       if (url != xhr.responseURL) {
//         console.log('redirect detected to: ', xhr.responseURL)
//       } else {
//         console.log(
//           'no redirect'
//         )
//       }
//     }
//   }
//   xhr.open('GET', url, true);
//   xhr.send(null)
// }

app.listen(4000, () => console.log(`listening to port 4000`))