const mongoose = require('mongoose');
const User = require('./Users')
const Url = require('./Url').Url

mongoose.connect(`mongodb://${process.env.MONGODB_USERNAME || 'root'}:${process.env.MONGODB_PASSWORD || 'password123'}@ds259787.mlab.com:59787/tabinate`,
  {
    useNewUrlParser: true, 
    useFindAndModify: false
  }
);

var db = mongoose.connection;

db.on('error', function () {
  console.log('mongoose connection error');
});

db.once('open', function () {
  console.log('mongoose connected successfully');
});

let getUser = (uid) => {
  return User.find({uid: uid}, function(err, result) {
    if (result.length === 0) {
      let user = new User({
        uid: uid
      })

      user.save((err) => {
        if (err) console.error(err)
        else console.log('new user!')
      })
    }
  })
}

let addUrl = (data) => {
  let {url, uid, title} = data
  let newUrl = new Url({
    url: url,
    title: title
  })
  return User.updateOne({uid: uid}, {$push: {urls: newUrl}})
}

let updateCheck = (data) => {
  let {uid, urlId, checked} = data
  return User.findOneAndUpdate(
    {'uid': uid, 'urls._id': urlId}, 
    { $set: 
      {'urls.$.checked': checked}
    }, 
    (err) => {if (err) console.error(err)}
  )
}

let deleteUrl = (data) => {
  let {uid, urlId} = data
  return User.updateOne(
    { uid: uid},
    { $pull: {urls: {_id: urlId}}},
    (err) => console.error(err))
}

module.exports = {
  getUser,
  addUrl,
  updateCheck,
  deleteUrl
}