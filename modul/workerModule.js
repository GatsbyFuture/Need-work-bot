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
async function chackUser(userData, datawork) {
  try {
    const Status = await tbUser
      .find()
      .and([{ chat_id: userData.id }, { workType: datawork }])
      .select('status -_id');
    if (Status.length == 0) {
      return -1;
    } else if (Status[0].status) {
      return 1;
    } else {
      await tbUser.updateOne({ chat_id: userData.id , workType:datawork},
        {
          $set: {
            status: true
          }
        }
      );
      return 0;
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
  try {
    return await tbUser.find()
      .and([{ status: true }, { workType: TypeWorker }])
      .select('firstName name age address telNumber -_id');
  } catch (ex) {
    console.log('Hujjatlarni olishda xatolik :' + ex);
  }
}
// tekshirish eskilarni tozlash...
async function chackStory() {
  const AllWorkers = await tbUser
    .find({ status: { $eq: true } })
    .select('stay_time _id');
  try {
    for (let key in AllWorkers) {
      if (AllWorkers[key].stay_time < 10) {
        const result = await tbUser.findById(AllWorkers[key]._id);
        result.stay_time += 1;
        await result.save();
      } else {
        const result1 = await tbUser.findById(AllWorkers[key]._id);
        result1.status = false;
        result1.stay_time = AllWorkers[key].stay_time / AllWorkers[key].stay_time;
        await result1.save();
      }
    }
  } catch (ex) {
    console.log('malumot yangilanmadi: ' + ex);
  }
}
module.exports = {
  append,
  chackUser,
  dataAddWorker,
  selectData,
  chackStory
};
