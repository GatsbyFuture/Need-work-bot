// Baza bilan ishlash bo'limi...
const { tbBot, tbUserWork } = require("../db/connect");
// Oldin ro'yxatga olinganini tekshirish...
async function chackUserWork(userData, datawork) {
    try {
        const Status = await tbUserWork
            .find()
            .and([{ chat_id: userData.id }, { workType: datawork }])
            .select("status -_id");
        if (Status.length == 0) {
            return -1;
        } else if (Status[0].status) {
            return 1;
        } else {
            await tbUserWork.updateOne(
                { chat_id: userData.id, workType: datawork },
                {
                    $set: {
                        status: true,
                    },
                }
            );
            return 0;
        }
    } catch (ex) {
        console.log("ishlarni tekshirishda xatolik " + ex);
    }
} // Ro'yxatga olinga ishlarni bazaga joylab qo'yish...
async function dataAddWork(Data, Id) {
    try {
        const userplace = await tbUserWork({
            firstName: Data.familya,
            name: Data.ism,
            payment_type: Data.TolovTuri,
            payment_amount: Data.TolovSumma,
            address: Data.manzil,
            chat_id: Id.id,
            telNumber: Data.telNomer.toString(),
            workType: Data.ishTuri,
            //Qo'shimcha malumotlarni o'zida saqlash...
            workTime: Data.ishVaqti,
            goal: Data.maqsad,
        });
        await userplace.save();
        await tbBot.updateOne(
            { chat_id: Id.id },
            {
                $set: {
                    status: true,
                },
            }
        );
        return true;
    } catch (ex) {
        console.log("ishlarni joylashda xatolik bor :" + ex);
        return false;
    }
}
// kerakli collectiondan malumotlarni olish...
async function selectDataWork(TypeWorker) {
    try {
        return await tbUserWork
            .find()
            .and([{ status: true }, { workType: TypeWorker }])
            .select(
                "firstName name payment_amount payment_type address telNumber workTime goal -_id"
            );
    } catch (ex) {
        console.log("Hujjatlarni olishda xatolik :" + ex);
    }
}
// tekshirish eskilarni tozlash...
async function chackStoryWork() {
    const AllWorkers = await tbUserWork
        .find({ status: { $eq: true } })
        .select("stay_time _id");
    try {
        for (let key in AllWorkers) {
            if (AllWorkers[key].stay_time < 10) {
                const result = await tbUserWork.findById(AllWorkers[key]._id);
                result.stay_time += 1;
                await result.save();
            } else {
                const result1 = await tbUserWork.findById(AllWorkers[key]._id);
                result1.status = false;
                result1.stay_time =
                    AllWorkers[key].stay_time / AllWorkers[key].stay_time;
                await result1.save();
            }
        }
    } catch (ex) {
        console.log("ish malumotlari yangilanmadi: " + ex);
    }
}
// functionsni export qilish...
module.exports = {
    chackUserWork,
    dataAddWork,
    selectDataWork,
    chackStoryWork,
};
