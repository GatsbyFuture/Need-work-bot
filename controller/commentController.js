// all category buttons
const Extra = require("telegraf/extra");
const Markup = require("telegraf/markup");
// izox qoldirish uchun namuna...
async function commentWord(ctx) {
    ctx.replyWithPhoto(
        { source: "./media/NamunagaRasm/Just_think.jpg" },
        Extra.caption(
            "Bu botda yana qanday bo'limlar ochilishini xoxlaysiz, " +
                "<i>bu haqda yozib qoldirish mumkin</i>😊😊😊"
        ).HTML()
    );
}
async function thinkCom(ctx) {
    ctx.replyWithHTML(
        "<b>Komentariya saqlansinmi?</b>",
        Extra.markup(
            Markup.inlineKeyboard([
                [Markup.callbackButton("Bekor qilish", "cancel")],
                [Markup.callbackButton("Yuborish", "enter")],
            ])
        )
    );
}

module.exports = {
    commentWord,
    thinkCom,
};
