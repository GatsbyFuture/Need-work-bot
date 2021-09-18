// Bu file orqali bizga kelgan takliflar orqali botni 
// yangilab, takomillashtirib boramiz...
const { tbComment } = require('../db/connect');

async function commentAdd(id,comData){
 const data = new tbComment({
  chat_id: id,
  comment: comData
 });
 try{
  await data.save();
  console.log('Komentariya muoffaqiyatli joylandi...');
 }catch(ex){
  console.log('komentariyani joylashda xatolik : '+ex);
 }
}

module.exports = {
 commentAdd
}