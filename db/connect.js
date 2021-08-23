// mongodbga ulanish uchun mongoose packagedan obj olamiz..
const mongoose = require('mongoose');
// Bazaga ulanishini tekshirib ko'ramiz...
mongoose.connect('mongodb://localhost/user_data', {
 useNewUrlParser: true,
 useUnifiedTopology: true
})
 .then(() => {
  console.log('DATAasesga ulanish amalga oshirildi...');
 })
 .catch((ex) => {
  console.log('Malumotlar bazasiga ulanib bo\'lmadi error:' + ex);
 });
// tablitsani schemasini tuzib olamiz...

const userDataSchema = new mongoose.Schema({
 firstName: {
  type: String,
  required: true,
  minlength: 5
 },
 name: {
  type: String,
  required: true,
  minlength: 3
 },
 age: {
  type: Number,
  required: true,
 },
 address: {
  type: String,
  required: true,
  minleng: 10
 },
 telNumber: {
  type: Number,
  required: true,
 },
 status: {
  type: Boolean,
  default: 1
 },
 dataTime: {
  type: Date,
  default: Date.now
 },
 worktype: String
}, {collection:'tb_user_data'});
// import qilib chiqarib qo'yamiz foydala

module.exports = mongoose.model('tb_user_data', userDataSchema);