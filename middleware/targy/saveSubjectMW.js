/**
 * Elmenti a kapott tárgyat
 * Hozzáadja az összes diák tantárgyai közé nem felvettként
 */

const requireOption = require("../requireOption");

module.exports = function(objRepo) {
    const TargyModel = requireOption(objRepo, "TargyModel");

    return function (req, res, next) {
        if (req.body.nev === undefined ||
            req.body.nev === "")
            return next();
        
        if (res.locals.targy === undefined) {
            if (res.locals.diakok === undefined)
                return next("Nincsenek meg a diákok");
            
            res.locals.targy = new TargyModel();
            let feladatok = [];
            res.locals.diakok.forEach(diak => {
                feladatok.push(
                    new Promise((resolve, reject) => {
                        diak.targyak.push({
                            felveve: false,
                            nev: req.body.nev,
                            targyid: res.locals.targy
                        });
                        diak.save(err => {
                            if (err)
                                reject(err);
                            resolve();
                        });
                    })
                );
            });
            Promise.all(feladatok)
            .catch(err => {
                return next(err);
            });
        }
        res.locals.targy.nev = req.body.nev;
        res.locals.targy.save(err => {
            if (err)
                return next(err);
            
            return res.redirect("/targy/list");
        });
    };
}