const Schema = require("mongoose").Schema;
const Targy = new Schema({
    felveve: Boolean,
    nev: String,
    targyid: {
        type: Schema.Types.ObjectId,
        ref: "Targy"
    }
});
const db = require("../config/db");

const Diak = db.model("Diak", {
    nev: String,
    lakcim: String,
    azonosito: String,
    targyak: [Targy]
});

module.exports = Diak;