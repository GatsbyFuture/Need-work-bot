// all category buttons
const Extra = require("telegraf/extra");
const Markup = require("telegraf/markup");
// bosh menu..
async function controlStart(ctx) {
    return await ctx.replyWithPhoto(
        { source: "./media/183aee9429a9acb3695d3ede52103f83.jpg" },
        Extra.caption('<b>Xush kelibsiz "Kafolat 99.9%" xizmatiga </b>')
            .markup(
                Markup.inlineKeyboard([
                    [Markup.callbackButton("Ish qidirish 📄", "possible")],
                    [Markup.callbackButton("Ishchi qidirish 📄", "need")],
                    [Markup.callbackButton("Izoh qoldirish 🖊", "comments")],
                ])
            )
            .HTML()
    );
}
// umumiy categoriyalar ishchilar uchun...
async function controlWorkers(ctx) {
    return await ctx.replyWithHTML(
        "<i><b>Umumiy ishchilar ro'yxati marhamat 📑</b></i>",
        Markup.keyboard([
            ["Idish yuvuvchilar", "Enagalar", "O'qituvchilar"],
            ["Farroshlar", "Dasturchilar", "Quruvchilar"],
            ["Sotuvchilar", "Ijarachilar", "Novvoylar"],
            ["Haydovchilar", "Sport trinerlar", "Elektriklar"],
            ["Mexaniklar", "Santexniklar", "Auto moykachilar"],
            ["Asosiy menyuga qaytish"],
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
        case "Idish yuvuvchilar":
            await ctx.replyWithPhoto(
                { source: "./media/photoCategoriesWorker/posidamoy.jpg" },
                Extra.caption("<b>Ro'yxatdan o'tish yoki ro'yxatni ko'rish</b>")
                    .markup(
                        Markup.inlineKeyboard([
                            [
                                Markup.callbackButton(
                                    "Barcha ishchilar 📈",
                                    "workers"
                                ),
                                Markup.callbackButton(
                                    "Ish taklif etish 🖋",
                                    "rgWork"
                                ),
                            ],
                            [Markup.callbackButton("Ortga qaytish", "Back1")],
                        ])
                    )
                    .HTML()
            );
            break;
        case "Enagalar":
            await ctx.replyWithPhoto(
                { source: "./media/photoCategoriesWorker/enaga.jpg" },
                Extra.caption("<b>Ro'yxatdan o'tish yoki ro'yxatni ko'rish</b>")
                    .markup(
                        Markup.inlineKeyboard([
                            [
                                Markup.callbackButton(
                                    "Barcha ishchilar 📈",
                                    "workers"
                                ),
                                Markup.callbackButton(
                                    "Ish taklif etish 🖋",
                                    "rgWork"
                                ),
                            ],
                            [Markup.callbackButton("Ortga qaytish", "Back1")],
                        ])
                    )
                    .HTML()
            );
            break;
        case "O'qituvchilar":
            await ctx.replyWithPhoto(
                { source: "./media/photoCategoriesWorker/o'qituvchi.jpg" },
                Extra.caption("<b>Ro'yxatdan o'tish yoki ro'yxatni ko'rish</b>")
                    .markup(
                        Markup.inlineKeyboard([
                            [
                                Markup.callbackButton(
                                    "Barcha ishchilar 📈",
                                    "workers"
                                ),
                                Markup.callbackButton(
                                    "Ish taklif etish 🖋",
                                    "rgWork"
                                ),
                            ],
                            [Markup.callbackButton("Ortga qaytish", "Back1")],
                        ])
                    )
                    .HTML()
            );
            break;
        case "Farroshlar":
            await ctx.replyWithPhoto(
                { source: "./media/photoCategoriesWorker/farrosh.jpg" },
                Extra.caption("<b>Ro'yxatdan o'tish yoki ro'yxatni ko'rish</b>")
                    .markup(
                        Markup.inlineKeyboard([
                            [
                                Markup.callbackButton(
                                    "Barcha ishchilar 📈",
                                    "workers"
                                ),
                                Markup.callbackButton(
                                    "Ish taklif etish 🖋",
                                    "rgWork"
                                ),
                            ],
                            [Markup.callbackButton("Ortga qaytish", "Back1")],
                        ])
                    )
                    .HTML()
            );
            break;
        case "Dasturchilar":
            await ctx.replyWithPhoto(
                { source: "./media/photoCategoriesWorker/pragramist.jpg" },
                Extra.caption("<b>Ro'yxatdan o'tish yoki ro'yxatni ko'rish</b>")
                    .markup(
                        Markup.inlineKeyboard([
                            [
                                Markup.callbackButton(
                                    "Barcha ishchilar 📈",
                                    "workers"
                                ),
                                Markup.callbackButton(
                                    "Ish taklif etish 🖋",
                                    "rgWork"
                                ),
                            ],
                            [Markup.callbackButton("Ortga qaytish", "Back1")],
                        ])
                    )
                    .HTML()
            );
            break;
        case "Quruvchilar":
            await ctx.replyWithPhoto(
                { source: "./media/photoCategoriesWorker/quruvchi.jpg" },
                Extra.caption("<b>Ro'yxatdan o'tish yoki ro'yxatni ko'rish</b>")
                    .markup(
                        Markup.inlineKeyboard([
                            [
                                Markup.callbackButton(
                                    "Barcha ishchilar 📈",
                                    "workers"
                                ),
                                Markup.callbackButton(
                                    "Ish taklif etish 🖋",
                                    "rgWork"
                                ),
                            ],
                            [Markup.callbackButton("Ortga qaytish", "Back1")],
                        ])
                    )
                    .HTML()
            );
            break;
        case "Sotuvchilar":
            await ctx.replyWithPhoto(
                { source: "./media/photoCategoriesWorker/sotuvchi.jpg" },
                Extra.caption("<b>Ro'yxatdan o'tish yoki ro'yxatni ko'rish</b>")
                    .markup(
                        Markup.inlineKeyboard([
                            [
                                Markup.callbackButton(
                                    "Barcha ishchilar 📈",
                                    "workers"
                                ),
                                Markup.callbackButton(
                                    "Ish taklif etish 🖋",
                                    "rgWork"
                                ),
                            ],
                            [Markup.callbackButton("Ortga qaytish", "Back1")],
                        ])
                    )
                    .HTML()
            );
            break;
        case "Ijarachilar":
            await ctx.replyWithPhoto(
                { source: "./media/photoCategoriesWorker/makler.jpg" },
                Extra.caption("<b>Ro'yxatdan o'tish yoki ro'yxatni ko'rish</b>")
                    .markup(
                        Markup.inlineKeyboard([
                            [
                                Markup.callbackButton(
                                    "Barcha ishchilar 📈",
                                    "workers"
                                ),
                                Markup.callbackButton(
                                    "Ish taklif etish 🖋",
                                    "rgWork"
                                ),
                            ],
                            [Markup.callbackButton("Ortga qaytish", "Back1")],
                        ])
                    )
                    .HTML()
            );
            break;
        case "Novvoylar":
            await ctx.replyWithPhoto(
                { source: "./media/photoCategoriesWorker/nonvoy.jpg" },
                Extra.caption("<b>Ro'yxatdan o'tish yoki ro'yxatni ko'rish</b>")
                    .markup(
                        Markup.inlineKeyboard([
                            [
                                Markup.callbackButton(
                                    "Barcha ishchilar 📈",
                                    "workers"
                                ),
                                Markup.callbackButton(
                                    "Ish taklif etish 🖋",
                                    "rgWork"
                                ),
                            ],
                            [Markup.callbackButton("Ortga qaytish", "Back1")],
                        ])
                    )
                    .HTML()
            );
            break;
        case "Haydovchilar":
            await ctx.replyWithPhoto(
                { source: "./media/photoCategoriesWorker/shafyor.jpg" },
                Extra.caption("<b>Ro'yxatdan o'tish yoki ro'yxatni ko'rish</b>")
                    .markup(
                        Markup.inlineKeyboard([
                            [
                                Markup.callbackButton(
                                    "Barcha ishchilar 📈",
                                    "workers"
                                ),
                                Markup.callbackButton(
                                    "Ish taklif etish 🖋",
                                    "rgWork"
                                ),
                            ],
                            [Markup.callbackButton("Ortga qaytish", "Back1")],
                        ])
                    )
                    .HTML()
            );
            break;
        case "Sport trinerlar":
            await ctx.replyWithPhoto(
                { source: "./media/photoCategoriesWorker/triner.jpg" },
                Extra.caption("<b>Ro'yxatdan o'tish yoki ro'yxatni ko'rish</b>")
                    .markup(
                        Markup.inlineKeyboard([
                            [
                                Markup.callbackButton(
                                    "Barcha ishchilar 📈",
                                    "workers"
                                ),
                                Markup.callbackButton(
                                    "Ish taklif etish 🖋",
                                    "rgWork"
                                ),
                            ],
                            [Markup.callbackButton("Ortga qaytish", "Back1")],
                        ])
                    )
                    .HTML()
            );
            break;
        case "Elektriklar":
            await ctx.replyWithPhoto(
                { source: "./media/photoCategoriesWorker/duradgor.jpg" },
                Extra.caption("<b>Ro'yxatdan o'tish yoki ro'yxatni ko'rish</b>")
                    .markup(
                        Markup.inlineKeyboard([
                            [
                                Markup.callbackButton(
                                    "Barcha ishchilar 📈",
                                    "workers"
                                ),
                                Markup.callbackButton(
                                    "Ish taklif etish 🖋",
                                    "rgWork"
                                ),
                            ],
                            [Markup.callbackButton("Ortga qaytish", "Back1")],
                        ])
                    )
                    .HTML()
            );
            break;
        case "Mexaniklar":
            await ctx.replyWithPhoto(
                { source: "./media/photoCategoriesWorker/mexanik.jpg" },
                Extra.caption("<b>Ro'yxatdan o'tish yoki ro'yxatni ko'rish</b>")
                    .markup(
                        Markup.inlineKeyboard([
                            [
                                Markup.callbackButton(
                                    "Barcha ishchilar 📈",
                                    "workers"
                                ),
                                Markup.callbackButton(
                                    "Ish taklif etish 🖋",
                                    "rgWork"
                                ),
                            ],
                            [Markup.callbackButton("Ortga qaytish", "Back1")],
                        ])
                    )
                    .HTML()
            );
            break;
        case "Santexniklar":
            await ctx.replyWithPhoto(
                { source: "./media/photoCategoriesWorker/santexnik.jpg" },
                Extra.caption("<b>Ro'yxatdan o'tish yoki ro'yxatni ko'rish</b>")
                    .markup(
                        Markup.inlineKeyboard([
                            [
                                Markup.callbackButton(
                                    "Barcha ishchilar 📈",
                                    "workers"
                                ),
                                Markup.callbackButton(
                                    "Ish taklif etish 🖋",
                                    "rgWork"
                                ),
                            ],
                            [Markup.callbackButton("Ortga qaytish", "Back1")],
                        ])
                    )
                    .HTML()
            );
            break;
        case "Auto moykachilar":
            await ctx.replyWithPhoto(
                { source: "./media/photoCategoriesWorker/automoychik.jpg" },
                Extra.caption(
                    "<b><i>Auto moychik</i>Ro'yxatdan o'tish yoki ro'yxatni ko'rish</b>"
                )
                    .markup(
                        Markup.inlineKeyboard([
                            [
                                Markup.callbackButton(
                                    "Barcha ishchilar 📈",
                                    "workers"
                                ),
                                Markup.callbackButton(
                                    "Ish taklif etish 🖋",
                                    "rgWork"
                                ),
                            ],
                            [Markup.callbackButton("Ortga qaytish", "Back1")],
                        ])
                    )
                    .HTML()
            );
            break;
    }
    // quyidagi f(x) yozilgan xabartlarni tozalash uchun foydalaniladi..
    // ctx.deleteMessage();
}
async function controlAddWorker(ctx) {
    await ctx.replyWithHTML(
        ` 📂Malumotlar joylansinmi ⁉️
<b>👤 F.I.O</b>: '${ctx.session.familya} ${ctx.session.ism}'
<b>⏳ osh </b>: ${ctx.session.yosh}
<b>🌐 Manzil </b>: ${ctx.session.manzil}
<b>⏱ Murojaat qilish vaqti</b>: ${ctx.session.ishVaqti}
<b>📞 Tel </b>: ${ctx.session.telNomer}
<b>📌 Maqsad :</b>: ${ctx.session.maqsad}`,
        Extra.markup(
            Markup.inlineKeyboard([
                [
                    Markup.callbackButton("Orqaga", "stop1"),
                    Markup.callbackButton("Joylash", "go1"),
                ],
            ])
        )
    );
}
module.exports = {
    controlStart,
    controlWorkers,
    controlWhatch,
    controlAddWorker,
};
