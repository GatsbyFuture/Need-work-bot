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
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: 1
  },
  workType: String,
  chat_id: Number,
  dataTime: {
    type: Date,
    default: Date.now
  }
}, { collection: 'tb_user_data' });
// userni botdan olingan datasi uchun schema..
const userDataBotSchema = new mongoose.Schema({
  chat_id: Number,
  first_name: String,
  username: String,
  status: {
    type: Boolean,
    default: false
  },
  dateInto: {
    type: Date,
    default: Date.now
  }
}, { collection: 'tb_bot_data' });
// schemalardan obj olibb olamiz va export qilamiz..
const tbUser = mongoose.model('tb_user_data', userDataSchema);
const tbBot = mongoose.model('tb_bot_data', userDataBotSchema);
// import qilib chiqarib qo'yamiz foydala
module.exports = {
  tbUser,
  tbBot
};