const mongoose = require('mongoose');
const Schema = mongoose.Schema
const UrlSchema = require('./Url')

let UserSchema = new Schema({
  uid: {
    type: String,
    required: true
  },
  urls: [UrlSchema]
})

let User = mongoose.model('User', UserSchema)

export default User