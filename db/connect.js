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
    required: true
  },
  status: {
    type: Boolean,
    default: true
  },
  workType: String,
  chat_id: Number,
  stay_time: {
    type: Number,
    default: 1
  },
  dataTime: {
    type: Date,
    default: Date.now
  }
}, { collection: 'tb_user_data' });
const userDataWork = new mongoose.Schema({
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
  payment_type: {
    type: String,
    required: true,
  },
  payment_amount:{
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
    minleng: 10
  },
  telNumber: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  },
  workType: String,
  chat_id: Number,
  stay_time: {
    type: Number,
    default: 1
  },
  dataTime: {
    type: Date,
    default: Date.now
  }
},{collection:'tb_userWork_data'});
// userni botdan olingan datasi uchun schema..
const userDataBotSchema = new mongoose.Schema({
  chat_id: Number,
  first_name: String,
  username: String,
  dateInto: {
    type: Date,
    default: Date.now
  }
}, { collection: 'tb_bot_data' });
// kelgan komentariyalarni saqlab turish...
const commentsBotSchema = new mongoose.Schema({
  chat_id: Number,
  comment: String,
  authorName:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'tbBot'
  },
  dateEnter:{
    type: Date,
    default: Date.now
  }
},{collection: 'tb_comment_data'});
// schemalardan obj olibb olamiz va export qilamiz..
const tbUser = mongoose.model('tb_user_data', userDataSchema);
const tbBot = mongoose.model('tb_bot_data', userDataBotSchema);
const tbUserWork = mongoose.model('tb_userWork_data', userDataWork);
const tbComment = mongoose.model('tb_comment_data', commentsBotSchema);
// import qilib chiqarib qo'yamiz foydala
module.exports = {
  tbUser,
  tbBot,
  tbUserWork,
  tbComment
};