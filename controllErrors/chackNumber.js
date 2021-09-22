// bu yerda foydalanuvchi kiritgan nomerni tekshirib ko'ramiz...
async function isItNumber(params) {
    // nomer kelganda orqa oldida yoki o'rtasida "-" yoki " " joylarni tozlash.
    const x = params.trim().replace(/ /g, "");
    if (/^\+998\d{8,9}$/.test(x)) {
        // console.log("bor");
        // console.log("bor1");
        const c = x.substr(0, 4) + "(" + x.substr(4);
        const v = c.substr(0, 7) + ")" + c.substr(7);
        const b = v.substr(0, 13) + "-" + c.substr(12);
        const n = b.substr(0, 11) + "-" + b.substr(11);
        // console.log(n);
        return { result: true, data: n };
    } else if (/^9\d{8,9}$/.test(x) || /^8\d{8,9}$/ || /^6\d{8,9}$/) {
        const q = "+998" + x;
        // console.log(q);
        const c = q.substr(0, 4) + "(" + q.substr(4);
        const v = c.substr(0, 7) + ")" + c.substr(7);
        const b = v.substr(0, 13) + "-" + c.substr(12);
        const n = b.substr(0, 11) + "-" + b.substr(11);
        // console.log(n);
        return { result: true, data: n };
    } else {
        return { result: false, data: "Iltimos raqamlarni kiriting!" };
        // console.log("Iltimos raqamlarni kiriting!");
        // /^E[a-z]{3}r$/i
    }
}
async function ageRight(params) {
    if (/^[0-9]{2}$/g.test(params)) {
        return { result: true, data: params };
    } else {
        return {
            result: false,
            data: "Itimos yoshingizni raqamlar bilan ifodalang",
        };
    }
}
module.exports = {
    isItNumber,
    ageRight,
};
// console.log(isItNumber("  99 707 4 5 23"));
// ageRight("27");
