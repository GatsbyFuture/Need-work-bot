// baza bilan ulanishga obj...
const { tbBot, tbUser, tbUserWork } = require('../db/connect');
// faqat hamma ro'yxatni chiqarish...
async function all_work(){
 return await tbUser
 .find()
 .countDocuments();
}
// faqat hamma ro'yxatni chiqarish...
async function old_work() {
 return await tbUser
  .find({ status: false })
  .countDocuments();
}
// faqat xozirda mavjud ro'yxatni chiqarish...
async function active_work() {
 return await tbUser
  .find({ status: true })
  .countDocuments();
}
// endi workerlarni chiqarish uchun...
async function all_worker(){
 return await tbUserWork
 .find()
 .countDocuments();
}
// faqat hamma ro'yxatni chiqarish...
async function old_worker() {
 return await tbUserWork
  .find({ status: false })
  .countDocuments();
}
async function active_worker() {
 return await tbUserWork
  .find({ status: true })
  .countDocuments();
}
// start bosgan odamlar sonini chiqarish...
async function all_users(){
  return await tbBot
  .find()
  .countDocuments();
}
module.exports = {
 all_work,
 old_work,
 active_work,
 // endi ishchilar uchun..
 all_worker,
 old_worker,
 active_worker,
//  jami start bosgan userlar soni..
 all_users
};