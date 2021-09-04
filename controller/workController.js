// asosiy packegelardan obj olamiz..
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');

// asosiy ish kategariyalari..
async function controlWorks(ctx) {
 return await ctx.replyWithHTML('<i><b>Umumiy ishlar ro\'yxati marhamat</b>😊</i>',
   Markup
     .keyboard([
       ['Posida moychikga ish', 'Enagaga ish bor', 'O\'qituvchiga ish bor'],
       ['Farroshga ish bor', 'Pragramistga ish bor', 'Quruvchiga ish bor'],
       ['Sotuvchiga ish bor', 'Ijaraga uy bor', 'Nonvoyga ish bor'],
       ['Shafyorga ish bor', 'Sport trinerga ish bor', 'Electrikga ish bor'],
       ['Mexanikka ish bor', 'Santexnikka ish bor', 'Auto moychikka ish bor'],
     ])
     .oneTime()
     .resize()
     .extra()
 );
}
// Barcha ishlar va ishlar taklif etish buttonlar...
async function controlWhatchWork(ctx) {
 let shoose = ctx.message.text;
 switch (shoose) {
   case 'Posida moychikga ish': await ctx.replyWithPhoto(
     { source: './media/photoCategoriesWork/posidaMoychikgaIsh.jpg' },
     Extra.caption('<b>Ro\'yxatdan o\'tish yoki ro\'yxatni ko\'rish</b>')
       .markup(Markup.inlineKeyboard([
         [Markup.callbackButton('Barcha ishlar ro\'yxati', 'works'),
         Markup.callbackButton('ishni taklif etish', 'rgWork')],
         [Markup.callbackButton('Ortga qaytish', 'Back2')]
       ])).HTML()
   ); break;
   case 'Enagaga ish bor': await ctx.replyWithPhoto(
     { source: 'media/photoCategoriesWork/enaga.jpg' },
     Extra.caption('<b>Ro\'yxatdan o\'tish yoki ro\'yxatni ko\'rish</b>')
     .markup(Markup.inlineKeyboard([
       [Markup.callbackButton('Barcha ishlar ro\'yxati', 'works'),
       Markup.callbackButton('ishni taklif etish', 'rgWork')],
       [Markup.callbackButton('Ortga qaytish', 'Back2')]
     ])).HTML()
   ); break;
   case 'O\'qituvchiga ish bor': await ctx.replyWithPhoto(
     { source: 'media/photoCategoriesWork/oqituvchi.jpg' },
     Extra.caption('<b>Ro\'yxatdan o\'tish yoki ro\'yxatni ko\'rish</b>')
     .markup(Markup.inlineKeyboard([
       [Markup.callbackButton('Barcha ishlar ro\'yxati', 'works'),
       Markup.callbackButton('ishni taklif etish', 'rgWork')],
       [Markup.callbackButton('Ortga qaytish', 'Back2')]
     ])).HTML()
   ); break;
   case 'Farroshga ish bor': await ctx.replyWithPhoto(
     { source: 'media/photoCategoriesWork/farrosh.jpg' },
     Extra.caption('<b>Ro\'yxatdan o\'tish yoki ro\'yxatni ko\'rish</b>')
     .markup(Markup.inlineKeyboard([
       [Markup.callbackButton('Barcha ishlar ro\'yxati', 'works'),
       Markup.callbackButton('ishni taklif etish', 'rgWork')],
       [Markup.callbackButton('Ortga qaytish', 'Back2')]
     ])).HTML()
   ); break;
   case 'Pragramistga ish bor': await ctx.replyWithPhoto(
     { source: 'media/photoCategoriesWork/dasturchi.jpg' },
     Extra.caption('<b>Ro\'yxatdan o\'tish yoki ro\'yxatni ko\'rish</b>')
     .markup(Markup.inlineKeyboard([
       [Markup.callbackButton('Barcha ishlar ro\'yxati', 'works'),
       Markup.callbackButton('ishni taklif etish', 'rgWork')],
       [Markup.callbackButton('Ortga qaytish', 'Back2')]
     ])).HTML()
   ); break;
   case 'Quruvchiga ish bor': await ctx.replyWithPhoto(
     { source: 'media/photoCategoriesWork/quruvchi.jpg' },
     Extra.caption('<b>Ro\'yxatdan o\'tish yoki ro\'yxatni ko\'rish</b>')
     .markup(Markup.inlineKeyboard([
       [Markup.callbackButton('Barcha ishlar ro\'yxati', 'works'),
       Markup.callbackButton('ishni taklif etish', 'rgWork')],
       [Markup.callbackButton('Ortga qaytish', 'Back2')]
     ])).HTML()
   ); break;
   case 'Sotuvchiga ish bor': await ctx.replyWithPhoto(
     { source: 'media/photoCategoriesWork/sotuvchi.jpg' },
     Extra.caption('<b>Ro\'yxatdan o\'tish yoki ro\'yxatni ko\'rish</b>')
     .markup(Markup.inlineKeyboard([
       [Markup.callbackButton('Barcha ishlar ro\'yxati', 'works'),
       Markup.callbackButton('ishni taklif etish', 'rgWork')],
       [Markup.callbackButton('Ortga qaytish', 'Back2')]
     ])).HTML()
   ); break;
   case 'Ijaraga uy bor': await ctx.replyWithPhoto(
     { source: 'media/photoCategoriesWork/ijaragaUy.jpg' },
     Extra.caption('<b>Ro\'yxatdan o\'tish yoki ro\'yxatni ko\'rish</b>')
     .markup(Markup.inlineKeyboard([
       [Markup.callbackButton('Barcha ishlar ro\'yxati', 'works'),
       Markup.callbackButton('ishni taklif etish', 'rgWork')],
       [Markup.callbackButton('Ortga qaytish', 'Back2')]
     ])).HTML()
   ); break;
   case 'Nonvoyga ish bor': await ctx.replyWithPhoto(
     { source: 'media/photoCategoriesWork/nonRasmi.jpg' },
     Extra.caption('<b>Ro\'yxatdan o\'tish yoki ro\'yxatni ko\'rish</b>')
     .markup(Markup.inlineKeyboard([
       [Markup.callbackButton('Barcha ishlar ro\'yxati', 'works'),
       Markup.callbackButton('ishni taklif etish', 'rgWork')],
       [Markup.callbackButton('Ortga qaytish', 'Back2')]
     ])).HTML()
   ); break;
   case 'Shafyorga ish bor': await ctx.replyWithPhoto(
     { source: 'media/photoCategoriesWork/haydovchi.jpg' },
     Extra.caption('<b>Ro\'yxatdan o\'tish yoki ro\'yxatni ko\'rish</b>')
     .markup(Markup.inlineKeyboard([
       [Markup.callbackButton('Barcha ishlar ro\'yxati', 'works'),
       Markup.callbackButton('ishni taklif etish', 'rgWork')],
       [Markup.callbackButton('Ortga qaytish', 'Back2')]
     ])).HTML()
   ); break;
   case 'Sport trinerga ish bor': await ctx.replyWithPhoto(
     { source: 'media/photoCategoriesWork/murabbiy.jpg' },
     Extra.caption('<b>Ro\'yxatdan o\'tish yoki ro\'yxatni ko\'rish</b>')
     .markup(Markup.inlineKeyboard([
       [Markup.callbackButton('Barcha ishlar ro\'yxati', 'works'),
       Markup.callbackButton('ishni taklif etish', 'rgWork')],
       [Markup.callbackButton('Ortga qaytish', 'Back2')]
     ])).HTML()
   ); break;
   case 'Electrikga ish bor': await ctx.replyWithPhoto(
     { source: 'media/photoCategoriesWork/electrik.jpg' },
     Extra.caption('<b>Ro\'yxatdan o\'tish yoki ro\'yxatni ko\'rish</b>')
     .markup(Markup.inlineKeyboard([
       [Markup.callbackButton('Barcha ishlar ro\'yxati', 'works'),
       Markup.callbackButton('ishni taklif etish', 'rgWork')],
       [Markup.callbackButton('Ortga qaytish', 'Back2')]
     ])).HTML()
   ); break;
   case 'Mexanikka ish bor': await ctx.replyWithPhoto(
     { source: 'media/photoCategoriesWork/mexanik.jpg' },
     Extra.caption('<b>Ro\'yxatdan o\'tish yoki ro\'yxatni ko\'rish</b>')
     .markup(Markup.inlineKeyboard([
       [Markup.callbackButton('Barcha ishlar ro\'yxati', 'works'),
       Markup.callbackButton('ishni taklif etish', 'rgWork')],
       [Markup.callbackButton('Ortga qaytish', 'Back2')]
     ])).HTML()
   ); break;
   case 'Santexnikka ish bor': await ctx.replyWithPhoto(
     { source: 'media/photoCategoriesWork/santexnik.jpg' },
     Extra.caption('<b>Ro\'yxatdan o\'tish yoki ro\'yxatni ko\'rish</b>')
     .markup(Markup.inlineKeyboard([
       [Markup.callbackButton('Barcha ishlar ro\'yxati', 'works'),
       Markup.callbackButton('ishni taklif etish', 'rgWork')],
       [Markup.callbackButton('Ortga qaytish', 'Back2')]
     ])).HTML()
   ); break;
   case 'Auto moychikka ish bor': await ctx.replyWithPhoto(
     { source: 'media/photoCategoriesWork/moychik.jpg' },
     Extra.caption('<b><i>Auto moychik</i>Ro\'yxatdan o\'tish yoki ro\'yxatni ko\'rish</b>')
     .markup(Markup.inlineKeyboard([
       [Markup.callbackButton('Barcha ishlar ro\'yxati', 'works'),
       Markup.callbackButton('ishni taklif etish', 'rgWork')],
       [Markup.callbackButton('Ortga qaytish', 'Back2')]
     ])).HTML()
   ); break;
 }
 // ctx.deleteMessage();
}
// malumotlarni tog'riligini tekshirish uchun oxirgi murojat
async function controlAddWork(ctx){
  await ctx.replyWithHTML('Malumotlar joylansinmi?',
  Extra.markup(Markup.inlineKeyboard([
    [Markup.callbackButton('Orqaga','stop2'),
    Markup.callbackButton('Joylash','go2')]
  ]))
  );
}
// functionni export qilish ...
module.exports = {
 controlWorks,
 controlWhatchWork,
 controlAddWork
}