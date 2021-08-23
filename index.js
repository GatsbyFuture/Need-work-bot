// Asosiy packegelardan obj olib olamiz...
const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const { controlStart, controlWorkers, controlWhatch } = require('./controller/worker');

require('dotenv').config({ path: './environment/parols.env' });

const bot = new Telegraf(process.env.BOT_TOKEN);
// midllewares...
bot.use(Telegraf.log());

// boshlang'ich tanlov paneli uchun button...
bot.start(async (ctx) => {
  await controlStart(ctx);
});
// Umumiy ishchilar ro'yxati...
bot.action('need', async (ctx) => {
  await controlWorkers(ctx);
  // return ctx.answerCbQuery(`N ta ishchi mavjud`);
});
// tanlangan ishchilar ro'yxati va registratsa qilish...
bot.on('message', async (ctx) => {
  await controlWhatch(ctx);
});
// umummiy ishchilar ro'yxatiga qaytish functions...
bot.action('Back1', async (ctx) => {
  await controlWorkers(ctx);
});

// asasiy ishchilar bo'limi yoki nomzod qo'yish bo'lmimi?


console.log('bot ishga tushdi');

bot.launch();