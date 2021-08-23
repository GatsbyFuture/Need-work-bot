// Asosiy packegelardan obj olib olamiz...
const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const { controlStart, controlWorkers, controlWhatch } = require('./controller/worker');
require('dotenv').config({ path: './environment/parols.env' });
const fs = require('fs');
const bot = new Telegraf(process.env.BOT_TOKEN);
// midllewares...
bot.use(Telegraf.log());
// bot.use(session());

// boshlang'ich tanlov paneli uchun button...
bot.start(async (ctx) => {
  await controlStart(ctx);
});
// Faqat ishchilar uchun function
// Umumiy ishchilar ro'yxati...
bot.action('need', async (ctx) => {
  await controlWorkers(ctx);
  // return ctx.answerCbQuery(`N ta ishchi mavjud`);
});
// tanlangan ishchilar yoki nomzod qo'yish bo'lmimi?
bot.on('message', async (ctx) => {
  await controlWhatch(ctx);
});
// umummiy ishchilar ro'yxatiga qaytish functions...
bot.action('Back1', async (ctx) => {
  await controlWorkers(ctx);
});

// ro'yxatga olish jarayoni...
bot.action('worker1', (ctx) => {
  fs.readFile('./dataText/AllWorkers.txt', 'utf8', (err, result) =>{
    if(err)
    console.log(err);
    else
    ctx.reply(result); 
  });
});



console.log('bot ishga tushdi');

bot.launch();