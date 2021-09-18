// Asosiy packegelardan obj olib olamiz...
const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const session = require("telegraf/session");
const { controlStart, controlWorkers,
  controlAddWorker, controlWhatch } = require('./controller/workerController');
const { controlWorks, controlWhatchWork, controlAddWork } = require('./controller/workController');
const { append, chackUser, dataAddWorker,
  chackStory, selectData, } = require('./modul/workerModule');
const { chackUserWork, dataAddWork, selectDataWork, chackStoryWork } = require('./modul/workModule');
const { shoose, admin } = require('./controller/adminController');
const { old_work, active_work, all_work,
  old_worker, active_worker, all_worker } = require('./modul/adminModue');
const { commentWord, thinkCom } = require('./controller/commentController');
const { commentAdd } = require('./modul/commentModule');
require('dotenv').config({ path: './environment/parols.env' });
const fs = require('fs');
const bot = new Telegraf(process.env.BOT_TOKEN);
// midllewares...
// bot.use(Telegraf.log());
bot.use(session());

// boshlang'ich tanlov paneli uchun button...
bot.start(async ctx => {
  await controlStart(ctx);
  await append(ctx.message.from);
  // console.log(typeof(ctx.message.from.username));
});
// *****+++++*****
// Umumiy ishchilar ro'yxatini ochib berish...
bot.action('need', async ctx => {
  await controlWorkers(ctx);
  // return ctx.answerCbQuery(`N ta ishchi mavjud`);
});
// Umumiy ishlar ro'yxatini ochib berish...
bot.action('possible', async ctx => {
  await controlWorks(ctx);
});
// Komentariya qoldirish uchun..
bot.action('comments', async ctx => {
  await commentWord(ctx);
  ctx.session.comments = 'ok';
});
// *****+++++*****
// barcha ishchilar ro'yxat keylari...
let keysWorker = ['Posida moychiklar', 'Enagalar', 'O\'qituvchilar',
  'Farroshlar', 'Pragramistlar', 'Quruvchilar',
  'Sotuvchilar', 'Maklerlar', 'Nonvoylar', 'Shafyorlar', 'Sport trinerlar',
  'Elektriklar', 'Mexaniklar', 'Santexniklar', 'Auto moychiklar'];
let keysWork = ["Posida moychikga ish", "Enagaga ish bor", 'O\'qituvchiga ish bor',
  'Farroshga ish bor', 'Pragramistga ish bor', 'Quruvchiga ish bor',
  'Sotuvchiga ish bor', 'Ijaraga uy bor', 'Nonvoyga ish bor',
  'Shafyorga ish bor', 'Sport trinerga ish bor', 'Electrikga ish bor',
  'Mexanikka ish bor', 'Santexnikka ish bor', 'Auto moychikka ish bor'];
let admin_key = { key: 'Jop13_2001' };
// no odatiy so'zlar uchun baza...
let answer = ['Salom', 'salom', 'Assalomu alaykum', 'qaleysiz', 'hormang',
  'SALOM', 'ASSALOMU ALAYKUM'];
// tanlangan ishchilar yoki nomzod qo'yish bo'lmimi?
bot.on('message', async ctx => {
  if (keysWorker.includes(ctx.message.text)) {
    await controlWhatch(ctx);
    ctx.session.ishTuri = ctx.message.text;
  }
  if (keysWork.includes(ctx.message.text)) {
    await controlWhatchWork(ctx);
    ctx.session.ishTuri = ctx.message.text;
  }
  if (0 < ctx.session.DataSkil) {
    switch (ctx.session.DataSkil) {
      case 5: ctx.session.familya = ctx.message.text;
        ctx.reply('ismiz kim?');
        ctx.session.DataSkil--; break;
      case 4: ctx.session.ism = ctx.message.text;
        ctx.reply('yoshingiz nechada?');
        ctx.session.DataSkil--; break;
      case 3: ctx.session.yosh = ctx.message.text;
        ctx.reply('Xozirgi turar manziliz qayer?');
        ctx.session.DataSkil--; break;
      case 2: ctx.session.manzil = ctx.message.text;
        ctx.reply('Telfon nomeriz kiriting');
        ctx.session.DataSkil--; break;
      case 1: ctx.session.telNomer = ctx.message.text;
        await controlAddWorker(ctx);
        ctx.session.DataSkil--; break;
    }
  }
  if (ctx.session.DataSkil < 0) {
    switch (ctx.session.DataSkil) {
      case -6: ctx.session.familya = ctx.message.text;
        ctx.reply('ismiz kim?');
        ctx.session.DataSkil++; break;
      case -5: ctx.session.ism = ctx.message.text;
        ctx.reply('To\'lov turi (kunlik yoki oylik)');
        ctx.session.DataSkil++; break;
      case -4: ctx.session.TolovTuri = ctx.message.text;
        ctx.reply('To\'lov summasi (kami va ko\'pi bilan)?');
        ctx.session.DataSkil++; break;
      case -3: ctx.session.TolovSumma = ctx.message.text;
        ctx.reply('Ishning manzili');
        ctx.session.DataSkil++; break;
      case -2: ctx.session.manzil = ctx.message.text;
        ctx.reply('tel nomeriz kiriting');
        ctx.session.DataSkil++; break;
      case -1: ctx.session.telNomer = ctx.message.text;
        await controlAddWork(ctx);
        ctx.session.DataSkil++; break;
    }
  }
  if (admin_key.key == ctx.message.text) {
    await shoose(ctx);
    ctx.deleteMessage();
  }
  if (answer.includes(ctx.message.text)) {
    ctx.replyWithHTML('Assalomu alaykum.');
  }
  if (ctx.session.comments == 'ok') {
    await thinkCom(ctx);
    ctx.session.commentText = ctx.message.text;
    // ctx.reply(ctx.message.text);
  }
});
// komentariyani bazaga saqlash uchun..
bot.action('cancel', async ctx => {
  await controlStart(ctx);
  ctx.replyWithHTML('<u>Malumot bekor qilindi..</u>');
  ctx.session.comments = undefined;
});
// komentariyani saqlash uchun..
bot.action('enter', async ctx => {
  // console.log(typeof(ctx.message.from.username));
  await commentAdd(ctx.update.callback_query.from.id, ctx.session.commentText);
  ctx.replyWithHTML('<b>Komentariya joylandi!</b><i> \n E\'tibor uchun raxmat</i>');
  ctx.session.comments = undefined;
});
// umummiy ishchilar ro'yxatiga qaytish functions...
bot.action('Back1', async ctx => {
  await controlWorkers(ctx);
});
// umumiy ishlar ro'yxatiga qaytish uchun functions...
bot.action('Back2', async ctx => {
  await controlWorks(ctx);
});
// asosiy categoriesga qaytish...
bot.action('Back_story', async ctx => {
  await controlStart(ctx);
});
// admin kategoriyasiga qaytish...
bot.action('Back_story1', async ctx => {
  await shoose(ctx);
});
// status false bo'lgan statistikani ko'rishi uchun...
bot.action('w1', async ctx => {
  await admin(ctx);
  ctx.session.typeWork = 'w1';
});
// status true bo'lgan statistikani ko'rishi uchun...
bot.action('w2', async ctx => {
  await admin(ctx);
  ctx.session.typeWork = 'w2';
});
// statistikani bilish uchun controllerga murojaat...
bot.action('all', async ctx => {
  if (ctx.session.typeWork == 'w1') {
    const result_data = await all_work();
    ctx.reply('foydalanganlar soni : ' + result_data);
    ctx.session.typeWork == undefined;
  } else {
    const result_data = await all_worker();
    ctx.reply('foydalanganlar soni : ' + result_data);
    ctx.session.typeWork == undefined;
  }
});
bot.action('old', async ctx => {
  if (ctx.session.typeWork == 'w1') {
    const result_data = await old_work();
    ctx.reply('foydalanganlar soni : ' + result_data);
    ctx.session.typeWork == undefined;
  } else {
    const result_data = await old_worker();
    ctx.reply('foydalanganlar soni : ' + result_data);
    ctx.session.typeWork == undefined;
  }
});
bot.action('active', async ctx => {
  if (ctx.session.typeWork == 'w1') {
    const result_data = await active_work();
    ctx.reply('foydalanganlar soni : ' + result_data);
    ctx.session.typeWork == undefined;
  } else {
    const result_data = await active_worker();
    ctx.reply('foydalanganlar soni : ' + result_data);
    ctx.session.typeWork == undefined;
  }
});
// ro'yxatga olish jarayoni...
// Foydalanuvchilarni ro'yxatini chiqarish yoki ro'yxatga olish...
bot.action("rg", async ctx => {
  // console.log(ctx.update.callback_query.from.id);
  const data = await chackUser(ctx.update.callback_query.from, ctx.session.ishTuri);
  // ctx.reply(ctx.session.ishTuri);
  if (data == -1) {
    ctx.session.DataSkil = 5;
    await ctx.replyWithPhoto({ source: "./media/NamunagaRasm/Namuna.jpg" },
      Extra.caption("Berilgan savollarni barchasiga javob bering (Familya,Ism,Yosh,Manzil)\nTelnomer(+998 -- --- -- --) to'liq kiriting"));
    ctx.reply('Familyangiz kiriting');
  } else if (data == 0) {
    ctx.replyWithHTML('Siznig malumotlaringiz qayta tiklandi!⭐ <i>(tekshirib ko\'ring)</i>');
    await controlWorkers(ctx);
  } else if (data == 1) {
    ctx.replyWithHTML("Tekshirib ko'ring siz ro'yxatda borshiz!😎");
  }
});
// ishchi foydalunuvchilarni ro'yxatga olish yoki ro'yxatni chiqarish...
bot.action('rgWork', async ctx => {
  const dataWork = await chackUserWork(ctx.update.callback_query.from, ctx.session.ishTuri);
  // tekshirib ko'ramiz oldin obuna bo'lganmi yoki yoq..
  if (dataWork == -1) {
    ctx.session.DataSkil = -6;
    await ctx.replyWithPhoto({ source: "media/NamunagaRasm/royxatga.jpg" },
      Extra.caption("Berilgan savollarga javob bering!\nFamilya,Ism,Yosh,Manzil,\nTo'lov turi(kunlik yo'ki oylik)," +
        "\nO'rtacha to'lov qiymati,\n Telnomer(+998-- --- -- --)\n<to'liq kiriting>"));
    ctx.reply('Familyangiz kiriting');
  } else if (dataWork == 0) {
    ctx.replyWithHTML('Siznig malumotlaringiz qayta tiklandi!⭐ <i>(tekshirib ko\'ring)</i>');
    await controlWorks(ctx);
  } else if (dataWork == 1) {
    ctx.replyWithHTML('Tekshirib ko\'ring siz ro\'yxatda borsiz!😎');
  }
});
// bazaga ishchilar ro'yxatiini joylash...
bot.action('go1', async ctx => {
  // console.log(ctx.update.callback_query.from.id);
  const test = await dataAddWorker(ctx.session, ctx.update.callback_query.from);
  if (test) {
    ctx.replyWithHTML('Mulomotlar joylandi!\n <i>foydalanganiz uchun raxmat</i>😊');
    await controlWorkers(ctx);
    ctx.session.ishTuri = undefined;
    ctx.session.familya = undefined;
    ctx.session.ism = undefined;
    ctx.session.yosh = undefined;
    ctx.session.manzil = undefined;
    ctx.session.telNomer = undefined;
    ctx.session.DataSkil = 0;
  } else {
    ctx.reply('Kechirasiz muammo yuz berdi ma\'lumotlarni qayta kiritng');
    await controlWorkers(ctx);
    ctx.session.ishTuri = undefined;
    ctx.session.familya = undefined;
    ctx.session.ism = undefined;
    ctx.session.yosh = undefined;
    ctx.session.manzil = undefined;
    ctx.session.telNomer = undefined;
    ctx.session.DataSkil = 0;
  }
});
// 
bot.action('go2', async ctx => {
  // console.log(ctx.update.callback_query.from.id);
  const test = await dataAddWork(ctx.session, ctx.update.callback_query.from);
  if (test) {
    ctx.replyWithHTML('Mulomotlar joylandi!\n <i>foydalanganiz uchun raxmat</i>😊');
    await controlWorks(ctx);
    ctx.session.familya = undefined;
    ctx.session.ism = undefined;
    ctx.session.TolovTuri = undefined;
    ctx.session.TolovSumma = undefined;
    ctx.session.manzil = undefined;
    ctx.session.telNomer = undefined;
    ctx.session.DataSkil = 0;
  } else {
    ctx.reply('Kechirasiz muammo yuz berdi ma\'lumotlarni qayta kiritng');
    await controlWorks(ctx);
    ctx.session.familya = undefined;
    ctx.session.ism = undefined;
    ctx.session.TolovTuri = undefined;
    ctx.session.TolovSumma = undefined;
    ctx.session.manzil = undefined;
    ctx.session.telNomer = undefined;
    ctx.session.DataSkil = 0;
  }
});
// foydalanuvchini yig'ilgan barcha malumotini tozalash...
bot.action("stop1", async ctx => {
  ctx.reply('Barcha kiritilgan ma\'lumotlar bekor qilindi❌');
  await controlWorkers(ctx);
  ctx.session.ishTuri = undefined;
  ctx.session.familya = undefined;
  ctx.session.ism = undefined;
  ctx.session.yosh = undefined;
  ctx.session.manzil = undefined;
  ctx.session.telNomer = undefined;
  ctx.session.DataSkil = 0;
});
// foydalanauvchini yig'ilgan barcha malumotini tozalash...
bot.action("stop2", async ctx => {
  ctx.reply('Barcha kiritilgan ma\'lumotlar bekor qilindi❌');
  await controlWorks(ctx);
  ctx.session.familya = undefined;
  ctx.session.ism = undefined;
  ctx.session.TolovTuri = undefined;
  ctx.session.TolovSumma = undefined;
  ctx.session.manzil = undefined;
  ctx.session.telNomer = undefined;
  ctx.session.DataSkil = 0;
});
// Istalgan kategoriya ishchilar ro'yxatni chiqarish ... 
bot.action('workers', async ctx => {
  const allData = await selectData(ctx.session.ishTuri);
  if (allData.length > 0) {
    let counter = 1;
    for (let key in allData) {
      let person = counter + " - F.I.O: ' " + allData[key].firstName +
        " " + allData[key].name +
        " ' \n Yosh: " + allData[key].age + "\n" +
        "Manzil: " + allData[key].address + "\n" +
        "Tel : " + allData[key].telNumber;
      await ctx.reply(person);
      counter++;
      person = '';
    }
    await controlWorkers(ctx);
    counter = counter / counter;
  } else {
    ctx.replyWithHTML("<i>Bu categoryda malumot mavjud emas...❓</i>");
    // console.log("Bu categoryda malumot mavjud emas");
  }
});
// Istalgan categeoriya ishlar ro'yxatni chiqarish ... 
bot.action('works', async ctx => {
  const allDataWork = await selectDataWork(ctx.session.ishTuri);
  if (allDataWork.length > 0) {
    let counter = 1;
    for (let key in allDataWork) {
      let person = counter + " - F.I.O: ' " + allDataWork[key].firstName +
        " " + allDataWork[key].name +
        " ' \nTo'lov turi : " + allDataWork[key].payment_type + "\n" +
        "To'lov summasi : " + allDataWork[key].payment_amount + "\n" +
        "Manzil: " + allDataWork[key].address + "\n" +
        "Tel : " + allDataWork[key].telNumber;
      await ctx.reply(person);
      counter++;
      person = '';
    }
    await controlWorks(ctx);
    counter = counter / counter;
  } else {
    ctx.replyWithHTML("<i>Bu categoryda malumot mavjud emas...❓</i>");
    // console.log("Bu categoryda malumot mavjud emas");
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

console.log('bot ishga tushdi');
bot.launch();