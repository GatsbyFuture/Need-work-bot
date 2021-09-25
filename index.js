// Asosiy packegelardan obj olib olamiz...
const Telegraf = require("telegraf");
const Extra = require("telegraf/extra");
const Markup = require("telegraf/markup");
const session = require("telegraf/session");
const {
    controlStart,
    controlWorkers,
    controlAddWorker,
    controlWhatch,
} = require("./controller/workerController");
const {
    controlWorks,
    controlWhatchWork,
    controlAddWork,
} = require("./controller/workController");
const {
    append,
    chackUser,
    dataAddWorker,
    chackStory,
    selectData,
} = require("./modul/workerModule");
const {
    chackUserWork,
    dataAddWork,
    selectDataWork,
    chackStoryWork,
} = require("./modul/workModule");
const { shoose, admin } = require("./controller/adminController");
const {
    old_work,
    active_work,
    all_work,
    old_worker,
    active_worker,
    all_worker,
} = require("./modul/adminModue");
const { commentWord, thinkCom } = require("./controller/commentController");
const { commentAdd } = require("./modul/commentModule");
const { isItNumber, ageRight } = require("./controllErrors/chackNumber");
require("dotenv").config({ path: "./environment/parols.env" });
const fs = require("fs");
const bot = new Telegraf(process.env.BOT_TOKEN);
// midllewares...
// bot.use(Telegraf.log());
bot.use(session());

// boshlang'ich tanlov paneli uchun button...
bot.start(async (ctx) => {
    await controlStart(ctx);
    await append(ctx.message.from);
    ctx.session.comments = false;
    ctx.deleteMessage();
    // console.log(typeof(ctx.message.from.username));
});
// *****+++++*****
// Umumiy ishchilar ro'yxatini ochib berish...
bot.action("need", async (ctx) => {
    await controlWorkers(ctx);
    ctx.deleteMessage();
    // return ctx.answerCbQuery(`N ta ishchi mavjud`);
});
// Umumiy ishlar ro'yxatini ochib berish...
bot.action("possible", async (ctx) => {
    await controlWorks(ctx);
    ctx.deleteMessage();
});
// Komentariya qoldirish uchun..
bot.action("comments", async (ctx) => {
    await commentWord(ctx);
    ctx.session.comments = true;
    ctx.deleteMessage();
});
// *****+++++*****
// barcha ishchilar ro'yxat keylari...
let keysWorker = [
    "Idish yuvuvchilar",
    "Enagalar",
    "O'qituvchilar",
    "Farroshlar",
    "Dasturchilar",
    "Quruvchilar",
    "Sotuvchilar",
    "Ijarachilar",
    "Novvoylar",
    "Haydovchilar",
    "Sport trinerlar",
    "Elektriklar",
    "Mexaniklar",
    "Santexniklar",
    "Auto moykachilar",
    "Asosiy menyuga qaytish",
];
let keysWork = [
    "Idish yuvuvchiga ish",
    "Enagaga ish bor",
    "O'qituvchiga ish bor",
    "Farroshga ish bor",
    "Dasturchilarga ish bor",
    "Quruvchiga ish bor",
    "Sotuvchiga ish bor",
    "Ijaraga uy bor",
    "Novvoylar ish bor",
    "Haydovchiga ish bor",
    "Sport trinerga ish bor",
    "Electrikga ish bor",
    "Mexanikka ish bor",
    "Santexnikka ish bor",
    "Auto moykachiga ish bor",
    "Asosiy menyuga qaytish",
];
let admin_key = { key: "Jop13_2001" };
// tanlangan ishchilar yoki nomzod qo'yish bo'lmimi?
bot.on("message", async (ctx) => {
    if (keysWorker.includes(ctx.message.text)) {
        await controlWhatch(ctx);
        // ishchilarni qidirib chiqarishda foydalaniladi...
        ctx.session.text = ctx.message.text;
        for (let key in keysWorker) {
            if (ctx.message.text.substr(0, 3) == keysWorker[key].substr(0, 3)) {
                ctx.session.ishTuri = keysWork[key];
            }
        }
        // ctx.session.ishTuri = ctx.message.text;
        ctx.session.DataSkil = 0;
        ctx.session.comments = false;
        // keyboard kinopkalarni o'chirib tashlash uchun
        const placeholder = await ctx.reply("...", {
            reply_markup: { remove_keyboard: true },
        });
        // placeholder yordamida kelgan matnni messageni id sini olishimiz..
        // va uni deleteMessage yordamida o'chirib yuboramiz.
        ctx.deleteMessage(placeholder.message_id);
    }
    if (keysWork.includes(ctx.message.text)) {
        await controlWhatchWork(ctx);
        // ishchilarni qidirib chiqarishda foydalaniladi...
        ctx.session.text = ctx.message.text;
        for (let key in keysWork) {
            if (ctx.message.text.substr(0, 3) == keysWork[key].substr(0, 3)) {
                ctx.session.ishTuri = keysWorker[key];
            }
        }
        // ctx.session.ishTuri = ctx.message.text;
        ctx.session.DataSkil = 0;
        ctx.session.comments = false;
        // keyboard kinopkalarni o'chirib tashlash uchun
        const placeholder = await ctx.reply("...", {
            reply_markup: { remove_keyboard: true },
        });
        ctx.deleteMessage(placeholder.message_id);
    }
    if (0 < ctx.session.DataSkil) {
        switch (ctx.session.DataSkil) {
            case 7:
                ctx.session.familya = ctx.message.text;
                ctx.reply("Iltimos ismingizni kiriting");
                ctx.session.DataSkil--;
                break;
            case 6:
                ctx.session.ism = ctx.message.text;
                ctx.reply("Yoshingizni kiriting");
                ctx.session.DataSkil--;
                break;
            case 5:
                const ageNumber = await ageRight(ctx.message.text);
                if (ageNumber.result) {
                    ctx.session.yosh = ageNumber.data;
                    ctx.reply("Yashash manzilingizni kiriting");
                    ctx.session.DataSkil--;
                } else {
                    ctx.deleteMessage();
                    ctx.reply(ageNumber.data);
                }
                break;
            case 4:
                ctx.session.manzil = ctx.message.text;
                ctx.reply("Sizga murojaat qilish vaqti");
                ctx.session.DataSkil--;
                break;
            case 3:
                ctx.session.ishVaqti = ctx.message.text;
                ctx.reply("Telfon nomeringizni kiriting");
                ctx.session.DataSkil--;
                break;
            case 2:
                const chackNumber = await isItNumber(ctx.message.text);
                if (chackNumber.result) {
                    ctx.session.telNomer = chackNumber.data;
                    ctx.replyWithHTML(`<b>O'zingiz haqingizda qo'shimcha malumot kiriting</b>
                    <i>Maqsadingiz,tajribangiz haqida bo'lishi mumkin</i>`);
                    ctx.session.DataSkil--;
                } else {
                    ctx.deleteMessage();
                    ctx.reply("Iltimos tel nomerni to'g'ri kiriting ❗️");
                }
                break;
            case 1:
                ctx.session.maqsad = ctx.message.text;
                await controlAddWorker(ctx);
                ctx.session.DataSkil--;
                break;
        }
    }
    if (ctx.session.DataSkil < 0) {
        switch (ctx.session.DataSkil) {
            case -8:
                ctx.session.familya = ctx.message.text;
                ctx.reply("Iltimos ismingizni kiriting");
                ctx.session.DataSkil++;
                break;
            case -7:
                ctx.session.ism = ctx.message.text;
                ctx.reply("To'lov turi (kunlik yoki oylik)");
                ctx.session.DataSkil++;
                break;
            case -6:
                ctx.session.TolovTuri = ctx.message.text;
                ctx.reply("To'lov summasi (kami - ko'pi) so'm / $?");
                ctx.session.DataSkil++;
                break;
            case -5:
                ctx.session.TolovSumma = ctx.message.text;
                ctx.reply("Ishning manzilini kiriting");
                ctx.session.DataSkil++;
                break;
            // profilaktika ishlari...
            case -4:
                ctx.session.manzil = ctx.message.text;
                ctx.reply("Sizga murojaat qilish vaqti");
                ctx.session.DataSkil++;
                break;
            case -3:
                ctx.session.ishVaqti = ctx.message.text;
                ctx.reply("Tel nomeringiz kiriting");
                ctx.session.DataSkil++;
                break;
            case -2:
                const chackNumber = await isItNumber(ctx.message.text);
                if (chackNumber.result) {
                    console.log(chackNumber.result);
                    ctx.session.telNomer = chackNumber.data;
                    ctx.replyWithHTML(`<b>O'zingiz haqingizda qo'shimcha malumot kiriting</b>
                    <i>Maqsadingiz,tajribangiz haqida bo'lishi mumkin</i>`);
                    ctx.session.DataSkil++;
                } else {
                    ctx.deleteMessage();
                    ctx.reply("Iltimos tel nomerni to'g'ri kiriting ❗️");
                }
                break;
            case -1:
                ctx.session.maqsad = ctx.message.text;
                await controlAddWork(ctx);
                ctx.session.DataSkil++;
                break;
        }
    }
    if (admin_key.key == ctx.message.text) {
        await shoose(ctx);
        ctx.deleteMessage();
    }
    if (ctx.session.comments) {
        await thinkCom(ctx);
        ctx.session.commentText = ctx.message.text;
        // ctx.reply(ctx.message.text);
    }
});
// komentariyani bazaga saqlash uchun..
bot.action("cancel", async (ctx) => {
    ctx.replyWithHTML("<b>Ma'lumot bekor qilindi 🔥</b>");
    ctx.session.comments = undefined;
    ctx.deleteMessage();
    await controlStart(ctx);
});
// komentariyani saqlash uchun..
bot.action("enter", async (ctx) => {
    // console.log(typeof(ctx.message.from.username));
    await commentAdd(
        ctx.update.callback_query.from.id,
        ctx.session.commentText
    );
    await ctx.replyWithHTML(
        "<b>Izohingiz joylandi! ✅</b><i> \n E'tibor uchun raxmat</i>"
    );
    ctx.session.comments = undefined;
    ctx.deleteMessage();
    await controlStart(ctx);
});
// umummiy ishchilar ro'yxatiga qaytish functions...
bot.action("Back1", async (ctx) => {
    await controlWorkers(ctx);
    ctx.deleteMessage();
});
// umumiy ishlar ro'yxatiga qaytish uchun functions...
bot.action("Back2", async (ctx) => {
    await controlWorks(ctx);
    ctx.deleteMessage();
});
// asosiy categoriesga qaytish...
bot.action("Back_story", async (ctx) => {
    await controlStart(ctx);
    ctx.deleteMessage();
});
// admin kategoriyasiga qaytish...
bot.action("Back_story1", async (ctx) => {
    await shoose(ctx);
    ctx.deleteMessage();
});
// status false bo'lgan statistikani ko'rishi uchun...
bot.action("w1", async (ctx) => {
    await admin(ctx);
    ctx.session.typeWork = "w1";
    ctx.deleteMessage();
});
// status true bo'lgan statistikani ko'rishi uchun...
bot.action("w2", async (ctx) => {
    await admin(ctx);
    ctx.session.typeWork = "w2";
    ctx.deleteMessage();
});
// statistikani bilish uchun controllerga murojaat...
bot.action("all", async (ctx) => {
    if (ctx.session.typeWork == "w1") {
        const result_data = await all_work();
        ctx.reply("Umumiy foydalanuvchilar soni : " + result_data);
        ctx.session.typeWork == undefined;
    } else {
        const result_data = await all_worker();
        ctx.reply("Umumiy foydalanuvchilar soni : " + result_data);
        ctx.session.typeWork == undefined;
    }
});
bot.action("old", async (ctx) => {
    if (ctx.session.typeWork == "w1") {
        const result_data = await old_work();
        ctx.reply("Foydalanib bo'lganlar soni : " + result_data);
        ctx.session.typeWork == undefined;
    } else {
        const result_data = await old_worker();
        ctx.reply("Foydalanib bo'lganlar soni : " + result_data);
        ctx.session.typeWork == undefined;
    }
});
bot.action("active", async (ctx) => {
    if (ctx.session.typeWork == "w1") {
        const result_data = await active_work();
        ctx.reply("Xozirda foydalanayotganlar soni : " + result_data);
        ctx.session.typeWork == undefined;
    } else {
        const result_data = await active_worker();
        ctx.reply("Xozirda foydalanayotganlar soni : " + result_data);
        ctx.session.typeWork == undefined;
    }
});
// ro'yxatga olish jarayoni...
// Foydalanuvchilarni ro'yxatini chiqarish yoki ro'yxatga olish...
bot.action("rg", async (ctx) => {
    // console.log(ctx.update.callback_query.from.id);
    const data = await chackUser(
        ctx.update.callback_query.from,
        ctx.session.ishTuri
    );
    // ctx.reply(ctx.session.ishTuri);
    if (data == -1) {
        ctx.session.DataSkil = 7;
        await ctx.replyWithPhoto(
            { source: "./media/NamunagaRasm/Namuna.jpg" },
            Extra.caption(
                `❗️Barcha savollarga javob bering.
📚" Familya Ism "
⌛️Yosh
🌐Manzil
⏱Murojaat qilish vaqti
📞Telfon nomer (+998 -- --- -- --)
📌Maqsad (o'zingiz haqingizda)`
            )
        );
        ctx.reply("Familiyangizni kiriting");
        ctx.deleteMessage();
    } else if (data == 0) {
        ctx.replyWithHTML(
            "Siznig malumotlaringiz qayta tiklandi!♻️ <i>(tekshirib ko'ring)</i>"
        );
        await controlWorks(ctx);
        ctx.deleteMessage();
    } else if (data == 1) {
        ctx.replyWithHTML("Tekshirib ko'ring siz ro'yxatda borsiz! 📋");
        ctx.deleteMessage();
        await controlWorks(ctx);
    }
});
// ishchi foydalunuvchilarni ro'yxatga olish yoki ro'yxatni chiqarish...
bot.action("rgWork", async (ctx) => {
    const dataWork = await chackUserWork(
        ctx.update.callback_query.from,
        ctx.session.ishTuri
    );
    // tekshirib ko'ramiz oldin obuna bo'lganmi yoki yoq..
    if (dataWork == -1) {
        ctx.session.DataSkil = -8;
        await ctx.replyWithPhoto(
            { source: "media/NamunagaRasm/royxatga.jpg" },
            Extra.caption(
                "❗️ Berilgan savollarga javob bering!\n 📚Familya,Ism,Yosh,Manzil,\n☀️/🌑To'lov turi(kunlik yo'ki oylik)," +
                    "\n💰 O'rtacha to'lov qiymati,\n 🌐Manzilni kiriting,\n 📞Telfon nomer(+998-- --- -- --)"
            )
        );
        ctx.reply("Familiyangizni kiriting");
        ctx.deleteMessage();
    } else if (dataWork == 0) {
        ctx.replyWithHTML(
            "Siznig malumotlaringiz qayta tiklandi!♻️ <i>(tekshirib ko'ring)</i>"
        );
        await controlWorkers(ctx);
        ctx.deleteMessage();
    } else if (dataWork == 1) {
        ctx.replyWithHTML("Tekshirib ko'ring siz ro'yxatda borsiz! 📋");
        ctx.deleteMessage();
        await controlWorkers(ctx);
    }
});
// bazaga ishchilar ro'yxatiini joylash...
bot.action("go1", async (ctx) => {
    // console.log(ctx.update.callback_query.from.id);
    const test = await dataAddWorker(
        ctx.session,
        ctx.update.callback_query.from
    );
    if (test) {
        await ctx.replyWithHTML(
            "\t Mulomotlar joylandi!✅\n <i>`foydalanganiz uchun raxmat</i>`😊"
        );
        await controlWorks(ctx);
        ctx.session.ishTuri = undefined;
        ctx.session.familya = undefined;
        ctx.session.ism = undefined;
        ctx.session.yosh = undefined;
        ctx.session.manzil = undefined;
        ctx.session.telNomer = undefined;
        ctx.session.ishVaqti = undefined;
        ctx.session.maqsad = undefined;
        ctx.session.DataSkil = 0;
    } else {
        ctx.reply(
            "Kechirasiz muammo yuz berdi ma'lumotlarni qayta kiritng 🛠 ❗️"
        );
        await controlWorks(ctx);
        ctx.session.ishTuri = undefined;
        ctx.session.familya = undefined;
        ctx.session.ism = undefined;
        ctx.session.yosh = undefined;
        ctx.session.manzil = undefined;
        ctx.session.telNomer = undefined;
        ctx.session.ishVaqti = undefined;
        ctx.session.maqsad = undefined;
        ctx.session.DataSkil = 0;
    }
    ctx.deleteMessage();
});
//
bot.action("go2", async (ctx) => {
    // console.log(ctx.update.callback_query.from.id);
    const test = await dataAddWork(ctx.session, ctx.update.callback_query.from);
    if (test) {
        ctx.replyWithHTML(
            "Mulomotlar joylandi!\n <i>foydalanganiz uchun raxmat</i>😊"
        );
        await controlWorkers(ctx);
        ctx.session.familya = undefined;
        ctx.session.ism = undefined;
        ctx.session.TolovTuri = undefined;
        ctx.session.TolovSumma = undefined;
        ctx.session.manzil = undefined;
        ctx.session.telNomer = undefined;
        ctx.session.ishVaqti = undefined;
        ctx.session.maqsad = undefined;
        ctx.session.DataSkil = 0;
    } else {
        ctx.reply(
            "Kechirasiz muammo yuz berdi ma'lumotlarni qayta kiritng 🛠 ❗️"
        );
        await controlWorkers(ctx);
        ctx.session.familya = undefined;
        ctx.session.ism = undefined;
        ctx.session.TolovTuri = undefined;
        ctx.session.TolovSumma = undefined;
        ctx.session.manzil = undefined;
        ctx.session.telNomer = undefined;
        ctx.session.ishVaqti = undefined;
        ctx.session.maqsad = undefined;
        ctx.session.DataSkil = 0;
    }
    ctx.deleteMessage();
});
// foydalanuvchini yig'ilgan barcha malumotini tozalash...
bot.action("stop1", async (ctx) => {
    await ctx.reply("Ma'lumotlar bekor qilindi ishga ❌");
    ctx.session.ishTuri = undefined;
    ctx.session.familya = undefined;
    ctx.session.ism = undefined;
    ctx.session.yosh = undefined;
    ctx.session.manzil = undefined;
    ctx.session.telNomer = undefined;
    ctx.session.ishVaqti = undefined;
    ctx.session.maqsad = undefined;
    ctx.session.DataSkil = 0;
    await controlWorks(ctx);
    ctx.deleteMessage();
});
// foydalanauvchini yig'ilgan barcha malumotini tozalash...
bot.action("stop2", async (ctx) => {
    await ctx.reply("Ma'lumotlar bekor qilindi ❌");
    ctx.session.familya = undefined;
    ctx.session.ism = undefined;
    ctx.session.TolovTuri = undefined;
    ctx.session.TolovSumma = undefined;
    ctx.session.manzil = undefined;
    ctx.session.telNomer = undefined;
    ctx.session.ishVaqti = undefined;
    ctx.session.maqsad = undefined;
    ctx.session.DataSkil = 0;
    await controlWorkers(ctx);
    ctx.deleteMessage();
});
// Istalgan kategoriya ishchilar ro'yxatni chiqarish ...

// ++++++++++++++
bot.action("workers", async (ctx) => {
    for (let key in keysWork) {
        if (ctx.session.text.substr(0, 3) == keysWork[key].substr(0, 3)) {
            ctx.session.ishTuri = keysWorker[key];
        }
    }
    const allData = await selectData(ctx.session.ishTuri);
    if (allData.length > 0) {
        let counter = 1;
        for (let key in allData) {
            await ctx.replyWithHTML(
                `<b>👤${counter}-F.I.O</b>: '${allData[key].firstName} ${allData[key].name}'
<b>⏳ Yosh </b>: ${allData[key].age}
<b>🌐 Manzil </b>: ${allData[key].address}
<b>⏱ Murojaat qilish vaqti</b>: ${allData[key].workTime}
<b>📞 Tel </b>: ${allData[key].telNumber}
<b>📌 Maqsad </b>: ${allData[key].goal}`
            );
            counter++;
            person = "";
        }
        await controlWorkers(ctx);
        counter = counter / counter;
        ctx.deleteMessage();
        ctx.session.ishTuri = undefined;
        ctx.session.text = undefined;
    } else {
        ctx.replyWithHTML("<i>Bu bo'limda malumotlar mavjud emas...❓</i>");
        await controlWorkers(ctx);
        ctx.deleteMessage();
        // console.log("Bu categoryda malumot mavjud emas");
        ctx.session.ishTuri = undefined;
        ctx.session.text = undefined;
    }
});
// Istalgan categeoriya ishlar ro'yxatni chiqarish ...
bot.action("works", async (ctx) => {
    for (let key in keysWorker) {
        if (ctx.session.text.substr(0, 3) == keysWorker[key].substr(0, 3)) {
            ctx.session.ishTuri = keysWork[key];
        }
    }
    const allDataWork = await selectDataWork(ctx.session.ishTuri);
    if (allDataWork.length > 0) {
        let counter = 1;
        for (let key in allDataWork) {
            await ctx.replyWithHTML(
                `<b>👤 ${counter}-F.I.O:</b>'${allDataWork[key].firstName} ${allDataWork[key].name}'
<b>💵 To'lov turi</b> :${allDataWork[key].payment_type}
<b>💰 To'lov summasi</b> :${allDataWork[key].payment_amount}
<b>🌐 Manzil</b>:${allDataWork[key].address}
<b>⏱ Murojaat qilish vaqti</b>: ${allDataWork[key].workTime}
<b>📞 Tel</b> : ${allDataWork[key].telNumber}
<b>📌 Maqsad :</b>: ${allDataWork[key].goal}`
            );
            counter++;
            person = "";
        }
        await controlWorks(ctx);
        counter = counter / counter;
        ctx.deleteMessage();
        ctx.session.ishTuri = undefined;
        ctx.session.text = undefined;
    } else {
        ctx.replyWithHTML("<i>Bu bo'limda malumotlar mavjud emas...❓</i>");
        await controlWorks(ctx);
        ctx.deleteMessage();
        // console.log("Bu categoryda malumot mavjud emas");
        ctx.session.ishTuri = undefined;
        ctx.session.text = undefined;
    }
});
// harkunlik tekshiriv agar 10 kunga teng bo'lgan bo'lsa automat o'chirish..
setInterval(async function () {
    await chackStory();
}, 86400000);
// harkunlik tekshiruv agar 10 kunga teng bo'lgan bo'lsa automat o'chirish..
setInterval(async function () {
    await chackStoryWork();
}, 86400000);

console.log("bot ishga tushdi");
bot.launch();
