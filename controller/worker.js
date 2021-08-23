// all category buttons
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
// bosh menu..
async function controlStart(ctx) {
  return await ctx.replyWithPhoto({ source: './media/183aee9429a9acb3695d3ede52103f83.jpg' },
    Extra.caption('<b>Xush kelibsiz "Kafolat 99.9%" xizmatiga </b>')
      .markup(Markup.inlineKeyboard([
        [Markup.callbackButton('Ish kerak', 'need')],
        [Markup.callbackButton('Ish bor', 'possible')]
      ])).HTML()
  );
}
// umumiy categoriyalar ishchilar uchun...
async function controlWorkers(ctx) {
  return await ctx.replyWithHTML('<i><b>Umumiy ishchilar ro\'yxati marhamat</b></i>',
    Markup
      .keyboard([
        ['Posida moy', 'Enaga', 'O\'qituvchi'],
        ['Farrosh', 'Pragramist', 'Quruvchi'],
        ['Sotuvchi', 'Makler', 'Nonvoy'],
        ['Shafyor', 'Sport triner', 'Durodgor'],
        ['Mexanik', 'Santexnik', 'Auto moychik'],
      ])
      .oneTime()
      .resize()
      .extra()
  );
}
// tanlanga kategoriyga doir ishchilar ro'yxati va qabulga yozilish...
async function controlWhatch(ctx) {
  let shoose = ctx.message.text;
  switch (shoose) {
    case 'Posida moy': await ctx.replyWithPhoto(
      { source: './media/photoCategoriesWorker/posidamoy.jpg' },
      Extra.caption('<b>Ro\'yxatdan o\'tish yoki ro\'yxatni ko\'rish</b>')
        .markup(Markup.inlineKeyboard([
          [Markup.callbackButton('Barcha ishchilar', 'worker1'),
          Markup.callbackButton('Nomzodni qo\'yish', 'registration1')],
          [Markup.callbackButton('Ortga qaytish', 'Back1')]
        ])).HTML()
    ); break;
    case 'Enaga': await ctx.replyWithPhoto(
      { source: './media/photoCategoriesWorker/enaga.jpg' },
      Extra.caption('<b>Ro\'yxatdan o\'tish yoki ro\'yxatni ko\'rish</b>')
      .markup(Markup.inlineKeyboard([
        [Markup.callbackButton('Barcha ishchilar', 'worker2'),
        Markup.callbackButton('Nomzodni qo\'yish', 'registration2')],
        [Markup.callbackButton('Ortga qaytish', 'Back1')]
      ])).HTML()
    ); break;
    case 'O\'qituvchi': await ctx.replyWithPhoto(
      { source: './media/photoCategoriesWorker/o\'qituvchi.jpg' },
      Extra.caption('<b>Ro\'yxatdan o\'tish yoki ro\'yxatni ko\'rish</b>')
      .markup(Markup.inlineKeyboard([
        [Markup.callbackButton('Barcha ishchilar', 'worker3'),
        Markup.callbackButton('Nomzodni qo\'yish', 'registration3')],
        [Markup.callbackButton('Ortga qaytish', 'Back1')]
      ])).HTML()
    ); break;
    case 'Farrosh': await ctx.replyWithPhoto(
      { source: './media/photoCategoriesWorker/farrosh.jpg' },
      Extra.caption('<b>Ro\'yxatdan o\'tish yoki ro\'yxatni ko\'rish</b>')
      .markup(Markup.inlineKeyboard([
        [Markup.callbackButton('Barcha ishchilar', 'worker4'),
        Markup.callbackButton('Nomzodni qo\'yish', 'registration4')],
        [Markup.callbackButton('Ortga qaytish', 'Back1')]
      ])).HTML()
    ); break;
    case 'Pragramist': await ctx.replyWithPhoto(
      { source: './media/photoCategoriesWorker/pragramist.jpg' },
      Extra.caption('<b>Ro\'yxatdan o\'tish yoki ro\'yxatni ko\'rish</b>')
      .markup(Markup.inlineKeyboard([
        [Markup.callbackButton('Barcha ishchilar', 'worker5'),
        Markup.callbackButton('Nomzodni qo\'yish', 'registration5')],
        [Markup.callbackButton('Ortga qaytish', 'Back1')]
      ])).HTML()
    ); break;
    case 'Quruvchi': await ctx.replyWithPhoto(
      { source: './media/photoCategoriesWorker/quruvchi.jpg' },
      Extra.caption('<b>Ro\'yxatdan o\'tish yoki ro\'yxatni ko\'rish</b>')
      .markup(Markup.inlineKeyboard([
        [Markup.callbackButton('Barcha ishchilar', 'worker6'),
        Markup.callbackButton('Nomzodni qo\'yish', 'registration6')],
        [Markup.callbackButton('Ortga qaytish', 'Back1')]
      ])).HTML()
    ); break;
    case 'Sotuvchi': await ctx.replyWithPhoto(
      { source: './media/photoCategoriesWorker/sotuvchi.jpg' },
      Extra.caption('<b>Ro\'yxatdan o\'tish yoki ro\'yxatni ko\'rish</b>')
      .markup(Markup.inlineKeyboard([
        [Markup.callbackButton('Barcha ishchilar', 'worker7'),
        Markup.callbackButton('Nomzodni qo\'yish', 'registration7')],
        [Markup.callbackButton('Ortga qaytish', 'Back1')]
      ])).HTML()
    ); break;
    case 'Makler': await ctx.replyWithPhoto(
      { source: './media/photoCategoriesWorker/makler.jpg' },
      Extra.caption('<b>Ro\'yxatdan o\'tish yoki ro\'yxatni ko\'rish</b>')
      .markup(Markup.inlineKeyboard([
        [Markup.callbackButton('Barcha ishchilar', 'worker8'),
        Markup.callbackButton('Nomzodni qo\'yish', 'registration8')],
        [Markup.callbackButton('Ortga qaytish', 'Back1')]
      ])).HTML()
    ); break;
    case 'Nonvoy': await ctx.replyWithPhoto(
      { source: './media/photoCategoriesWorker/nonvoy.jpg' },
      Extra.caption('<b>Ro\'yxatdan o\'tish yoki ro\'yxatni ko\'rish</b>')
      .markup(Markup.inlineKeyboard([
        [Markup.callbackButton('Barcha ishchilar', 'worker9'),
        Markup.callbackButton('Nomzodni qo\'yish', 'registration9')],
        [Markup.callbackButton('Ortga qaytish', 'Back1')]
      ])).HTML()
    ); break;
    case 'Shafyor': await ctx.replyWithPhoto(
      { source: './media/photoCategoriesWorker/shafyor.jpg' },
      Extra.caption('<b>Ro\'yxatdan o\'tish yoki ro\'yxatni ko\'rish</b>')
      .markup(Markup.inlineKeyboard([
        [Markup.callbackButton('Barcha ishchilar', 'worker10'),
        Markup.callbackButton('Nomzodni qo\'yish', 'registration10')],
        [Markup.callbackButton('Ortga qaytish', 'Back1')]
      ])).HTML()
    ); break;
    case 'Sport triner': await ctx.replyWithPhoto(
      { source: './media/photoCategoriesWorker/triner.jpg' },
      Extra.caption('<b>Ro\'yxatdan o\'tish yoki ro\'yxatni ko\'rish</b>')
      .markup(Markup.inlineKeyboard([
        [Markup.callbackButton('Barcha ishchilar', 'worker11'),
        Markup.callbackButton('Nomzodni qo\'yish', 'registration11')],
        [Markup.callbackButton('Ortga qaytish', 'Back1')]
      ])).HTML()
    ); break;
    case 'Durodgor': await ctx.replyWithPhoto(
      { source: './media/photoCategoriesWorker/duradgor.jpg' },
      Extra.caption('<b>Ro\'yxatdan o\'tish yoki ro\'yxatni ko\'rish</b>')
      .markup(Markup.inlineKeyboard([
        [Markup.callbackButton('Barcha ishchilar', 'worker12'),
        Markup.callbackButton('Nomzodni qo\'yish', 'registration12')],
        [Markup.callbackButton('Ortga qaytish', 'Back1')]
      ])).HTML()
    ); break;
    case 'Mexanik': await ctx.replyWithPhoto(
      { source: './media/photoCategoriesWorker/mexanik.jpg' },
      Extra.caption('<b>Ro\'yxatdan o\'tish yoki ro\'yxatni ko\'rish</b>')
      .markup(Markup.inlineKeyboard([
        [Markup.callbackButton('Barcha ishchilar', 'worker13'),
        Markup.callbackButton('Nomzodni qo\'yish', 'registration13')],
        [Markup.callbackButton('Ortga qaytish', 'Back1')]
      ])).HTML()
    ); break;
    case 'Santexnik': await ctx.replyWithPhoto(
      { source: './media/photoCategoriesWorker/santexnik.jpg' },
      Extra.caption('<b>Ro\'yxatdan o\'tish yoki ro\'yxatni ko\'rish</b>')
      .markup(Markup.inlineKeyboard([
        [Markup.callbackButton('Barcha ishchilar', 'worker14'),
        Markup.callbackButton('Nomzodni qo\'yish', 'registration14')],
        [Markup.callbackButton('Ortga qaytish', 'Back1')]
      ])).HTML()
    ); break;
    case 'Auto moychik': await ctx.replyWithPhoto(
      { source: './media/photoCategoriesWorker/automoychik.jpg' },
      Extra.caption('<b><i>Auto moychik</i>Ro\'yxatdan o\'tish yoki ro\'yxatni ko\'rish</b>')
      .markup(Markup.inlineKeyboard([
        [Markup.callbackButton('Barcha ishchilar', 'worker15'),
        Markup.callbackButton('Nomzodni qo\'yish', 'registration15')],
        [Markup.callbackButton('Ortga qaytish', 'Back1')]
      ])).HTML()
    ); break;
  }
  ctx.deleteMessage();
}
module.exports = {
  controlStart,
  controlWorkers,
  controlWhatch
}