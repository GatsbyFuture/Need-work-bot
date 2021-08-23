// all category buttons
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
// ishchilar kategoriyasi
async function controlStart(ctx){
 return await ctx.replyWithPhoto({ source: './media/183aee9429a9acb3695d3ede52103f83.jpg' },
  Extra.caption('<b>Xush kelibsiz "Kafolat 99.9%" xizmatiga </b>')
   .markup(Markup.inlineKeyboard([
    [Markup.callbackButton('Ish kerak', 'need')],
    [Markup.callbackButton('Ish bor', 'possible')]
   ])).HTML()
 );
}

module.exports = {
 controlStart
}