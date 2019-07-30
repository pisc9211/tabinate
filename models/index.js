const mongoose = require('mongoose');
const Schema = mongoose.Schema

mongoose.connect(`mongodb://root:password123@ds139705.mlab.com:39705/tabinate`, {
  useNewUrlParser: true
});

var db = mongoose.connection;

db.on('error', function () {
  console.log('mongoose connection error');
});

db.once('open', function () {
  console.log('mongoose connected successfully');
});

let UrlSchema = new Schema({
  url: String,
  checked: Boolean,
  date: {type: Date, default: Date.now()}
})

let UserSchema = new Schema({
  uid: {type: String, required: true},
  urls: [UrlSchema]
})

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

let Url = mongoose.model('Url', UrlSchema)
let User = mongoose.model('User', UserSchema)

module.exports.Url = Url
module.exports.User = User
module.exports.getUser = getUser