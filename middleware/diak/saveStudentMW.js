/**
 * Elmenti a kapott diákot
 */

const requireOption = require("../requireOption");

module.exports = function(objRepo) {
    const DiakModel = requireOption(objRepo, "DiakModel");

    return function (req, res, next) {
        if (req.body.nev === undefined ||
            req.body.lakcim === undefined ||
            req.body.azonosito === undefined)
            return next();
        
        if (res.locals.diak === undefined) {
            if (res.locals.targyak === undefined)
                return next("A tárgyak nem elérhetőek");
            
            res.locals.diak = new DiakModel();
            res.locals.targyak.forEach(targy => {
                res.locals.diak.targyak.push({
                    felveve: false,
                    nev: targy.nev,
                    targyid: targy
                });
            });
        }

        res.locals.diak.nev = req.body.nev;
        res.locals.diak.lakcim = req.body.lakcim;
        res.locals.diak.azonosito = req.body.azonosito;

        if (req.body.nev === "" ||
            req.body.lakcim === "" ||
            req.body.azonosito === "")
            return next();
        
        res.locals.diak.save(err => {
            if (err)
                return next(err);
            
            res.redirect("/");
        });
    };
}