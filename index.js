// Asosiy packegelardan obj olib olamiz...
const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const {controlStart} = require('./controller/worker');

require('dotenv').config({ path: './environment/parols.env' });


const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(Telegraf.log());
// boshlang'ich tanlov paneli uchun button...
bot.start((ctx) => {
controlStart(ctx);
});
// Umumiy ishchilar ro'yxati..
bot.action('need', (ctx) => {
 ctx.reply('<i><b>Umumiy ishchilar ro\'yxati marhamat</b></i>',
   Extra.HTML()
     .markup(Markup.inlineKeyboard([
       [Markup.callbackButton('Uborchitsa', 'need1'),
       Markup.callbackButton('Posida moy','need2'),
       Markup.callbackButton('Enaga','need3')],
       [Markup.callbackButton('O\'qituvchi', 'need4'),
       Markup.callbackButton('Pragramist','need5'),
       Markup.callbackButton('Quruvchi','need6')],
       [Markup.callbackButton('Sotuvchi', 'need7'),
       Markup.callbackButton('Makler','need8'),
       Markup.callbackButton('Nonvoy','need9')],
       [Markup.callbackButton('Shafyor', 'need10'),
       Markup.callbackButton('Sport triner','need11'),
       Markup.callbackButton('Durodgor','need12')],
       [Markup.callbackButton('Mexanik', 'need13'),
       Markup.callbackButton('Santexnik','need14'),
       Markup.callbackButton('Auto moychik','need15')],
     ]))
 );
 // return ctx.answerCbQuery(`N ta ishchi mavjud`);
});

// asasiy ishchilar bo'limi yoki nomzod qo'yish bo'lmimi?


console.log('bot ishga tushdi');

bot.launch();