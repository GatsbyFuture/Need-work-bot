// Asosiy packegelardan obj olib olamiz...
const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const session = require("telegraf/session");
const { controlStart, controlWorkers,
  controlAddWorker, controlWhatch } = require('./controller/workerController');
const { append, chackUser, dataAddWorker,
  chackStory, selectData } = require('./modul/workerModule');
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
// Faqat ishchilar uchun function
// Umumiy ishchilar ro'yxati...
bot.action('need', async ctx => {
  await controlWorkers(ctx);
  // return ctx.answerCbQuery(`N ta ishchi mavjud`);
});
// barcha ishchilar ro'yxat keylari...
let keys = ['Posida moy', 'Enaga', 'O\'qituvchi', 'Farrosh', 'Pragramist', 'Quruvchi',
  'Sotuvchi', 'Makler', 'Nonvoy', 'Shafyor', 'Sport triner',
  'Durodgor', 'Mexanik', 'Santexnik', 'Auto moychik'];
// no odatiy so'zlar uchun baza...
let answer = ['Salom', 'salom', 'Assalomu alaykum', 'qaleysiz', 'hormang',
  'SALOM', 'ASSALOMU ALAYKUM'];
// tanlangan ishchilar yoki nomzod qo'yish bo'lmimi?
bot.on('message', async ctx => {
  if (keys.includes(ctx.message.text)) {
    await controlWhatch(ctx);
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
  if (answer.includes(ctx.message.text)) {
    ctx.replyWithHTML('Assalomu alaykum.');
  }
});
// umummiy ishchilar ro'yxatiga qaytish functions...
bot.action('Back1', async ctx => {
  await controlWorkers(ctx);
});
// ro'yxatga olish jarayoni...
// Enagani ro'yxatini chiqarish yoki ro'yxatga olish...
bot.action("rg", async ctx => {
  // console.log(ctx.update.callback_query.from.id);
  const data = await chackUser(ctx.update.callback_query.from, ctx.session.ishTuri);
  ctx.reply(ctx.session.ishTuri);
  if (data == -1) {
    ctx.session.DataSkil = 5;
    await ctx.replyWithPhoto({ source: "./media/NamunagaRasm/Namuna.jpg" },
      Extra.caption("Berilgan savollarni barchasiga javob bering (Familya,Ism,Yosh,Manzil)\nTelnomer(+998 -- --- -- --) to'liq kiriting"));
    ctx.reply('Familyangiz kiriting');
  } else if(data == 0){
    ctx.replyWithHTML('Siznig malumotlaringiz qayta tiklandi!⭐ <i>(tekshirib ko\'ring)</i>');
    await controlWorkers(ctx);
  } else if(data == 1){
    ctx.replyWithHTML("Tekshirib ko'ring siz ro'yxatta borshiz!😎");
  }
});
// bazaga joylash foydalanuvchi malumotlarini..
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
// Enagalar ro'yxatni chiqarish ... 
bot.action('workers', async ctx => {
  const allData = await selectData(ctx.session.ishTuri);
  if (allData.length > 0) {
    let counter = 1;
    for (let key in allData) {
      let person = counter + " - F.I.O: ' " + allData[key].firstName +
        " " + allData[key].name +
        " ' / Yosh: " + allData[key].age + "\n" +
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
// harkunlik tekshiriv agar 10 kunga teng bo'lgan bo'lsa automat o'chirish..
setInterval( async function(){
  await chackStory();
},86400000);


console.log('bot ishga tushdi');
bot.launch();