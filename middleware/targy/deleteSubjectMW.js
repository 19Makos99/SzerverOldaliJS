/**
 * Kitörli a kapott tárgyat
 * Végigmegy az összes diákon és tőlük is eltávolítja
 */

const requireOption = require("../requireOption");

module.exports = function (objRepo) {
    return function (req, res, next) {
        if (res.locals.targy === undefined ||
            res.locals.diakok === undefined ||
            req.params.targyid === undefined)
            return next("Hiba");

        let feladatok = [];
        res.locals.diakok.forEach(diak => {
            feladatok.push(new Promise((resolve, reject) => {
                let index = diak.targyak.findIndex(t => t.targyid == req.params.targyid);
                if (index === -1)
                    reject(`Tárgy nem található ${diak.nev} nevű diáknál`);

                diak.targyak[index].remove(err => {
                    if (err)
                        reject(err);

                    diak.save(err => {
                        if (err)
                            reject(err);

                        resolve();
                    });
                });
            }));
        });
        Promise.all(feladatok)
            .then(() => {
                res.locals.targy.remove(err => {
                    if (err)
                        return next(err);

                    res.redirect("/targy/list");
                });
            })
            .catch(err => {
                return next(err);
            });
    };
}