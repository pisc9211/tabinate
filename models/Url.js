const mongoose = require('mongoose');
const Schema = mongoose.Schema

let UrlSchema = new Schema({
  url: String,
  checked: {type: Boolean, default: true},
  date: {type: Date, default: Date.now()}
})

let Url = mongoose.model('Url', UrlSchema)

module.exports = {
  Url,
  UrlSchema
}