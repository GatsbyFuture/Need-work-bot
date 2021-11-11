// kerakli packagelar...
const Extra = require("telegraf/extra");
const Markup = require("telegraf/markup");
// tanlash uchun buttonlar...
async function shoose(ctx) {
    await ctx.replyWithPhoto(
        { source: "./media/NamunagaRasm/admin.jpg" },
        Extra.caption("<b>Bo'limlardan birini tanlang</b>")
            .markup(
                Markup.inlineKeyboard([
                    [
                        Markup.callbackButton("Work", "w2"),
                        Markup.callbackButton("Worker", "w1"),
                    ],
                    [Markup.callbackButton("send post", "sendPost")],
                    [Markup.callbackButton("Back", "Back_story")],
                ])
            )
            .HTML()
    );
}
async function admin(ctx) {
    await ctx.replyWithHTML(
        "<b>STATISTIKANI KO'ZDAN KECHIRISH</b>",
        Extra.markup(
            Markup.inlineKeyboard([
                [Markup.callbackButton("all works", "all")],
                [
                    Markup.callbackButton("old work", "old"),
                    Markup.callbackButton("active work", "active"),
                ],
                [Markup.callbackButton("back", "Back_story1")],
            ])
        ).HTML()
    );
}
async function post(ctx) {
    await ctx.replyWithHTML(
        `<b>Postni hammaga jo'natishga ruxsatmi</b>`,
        Extra.markup(
            Markup.inlineKeyboard([
                [
                    Markup.callbackButton("delete message", "deleteM"),
                    Markup.callbackButton("send Massage", "sendM"),
                ],
            ])
        ).HTML()
    );
}
module.exports = {
    shoose,
    admin,
    post,
};
