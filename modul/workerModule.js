// Baza bilan ishlash bo'limi...
const { tbBot, tbUser } = require('../db/connect');

// botga start boshgan userni datasini saqlab borish...
async function append(userDate) {
 const chack = await tbBot.find({ chat_id: userDate.id });
 if (chack.length == 0) {
  const place = new tbBot({
   chat_id: userDate.id,
   first_name: userDate.first_name,
   username: userDate.username
  });
  try {
   await place.save();
   console.log("data joylandi...");
  } catch (ex) {
   console.log("Malumot joylashda xatolik" + ex);
  }
 } else {
  console.log("Bazaga qabul qilingan foydalanuvchi...");
 }
}
//Oldin ro'yxatga olinganini tekshirish...
async function chackUser(userData) {
 try {
  const Status = await tbBot
   .find({ chat_id: userData.id })
   .select('status -_id');
  if (Status[0].status) {
   await tbUser.updateOne({ chat_id: userData.id },
    {
     $set: {
      status: true
     }
    }
   );
   return true;
  } else {
   return false;
  }
 } catch (ex) {
  console.log('xatolik tekshrishda: ' + ex);
 }
}
// Ro'yxatga olinga workerni bazaga joylab qo'yish...
async function dataAddWorker(Data, Id) {
 try {
  const userplace = tbUser({
   firstName: Data.familya,
   name: Data.ism,
   age: Data.yosh,
   address: Data.manzil,
   chat_id: Id.id,
   telNumber: Data.telNomer.toString(),
   workType: Data.ishTuri,
  });
  await userplace.save();
  await tbBot.updateOne({ chat_id: Id.id },
   {
    $set: {
     status: true
    }
   }
  );
  return true;
 } catch (ex) {
  console.log("User datani joylashda xatolik bor" + ex);
  return false;
 }
}
// kerakli collectionda malumotlarni olish...
async function selectData(TypeWorker) {
 try{
 return await tbUser.find()
  .and([{ status: true }, { workType: TypeWorker }])
  .select('firstName name age address telNumber -_id');
 }catch(ex){
  console.log('Hujjatlarni olishda xatolik :'+ex);
 }
}
module.exports = {
 append,
 chackUser,
 dataAddWorker,
 selectData
};
