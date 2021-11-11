// asosiy packegelardan obj olamiz..
const Extra = require("telegraf/extra");
const Markup = require("telegraf/markup");
// tartib bilan bittallab ko'rish uchun funtions...
async function offerResumi(ctx, Data) {
    await ctx.replyWithHTML(
        Data,
        Extra.markup(
            Markup.inlineKeyboard([
                [
                    Markup.callbackButton("Orqaga", "backRr"),
                    Markup.callbackButton("Oldinga", "nextRr"),
                ],
                [Markup.callbackButton("Bekor qilish", "stopRr")],
            ])
        )
    );
}
module.exports = {
    offerResumi,
};