/**
 * Elmenti hogy a diák felvette-e az adott tárgyat
 */

const requireOption = require("../requireOption");

module.exports = function(objRepo) {
    return function (req, res, next) {
        if (req.params.targyid === undefined ||
            req.params.diakid === undefined || 
            req.body.muvelet === undefined ||
            res.locals.diak === undefined ||
            res.locals.targyak === undefined)
            return next("Hiba");
        
        let index = res.locals.diak.targyak.findIndex(t => t._id == req.params.targyid);
        if (index === -1)
            return next("Nem található a tárgy.");
        
        if (req.body.muvelet === "felvetel")
            res.locals.diak.targyak[index].felveve = true;
        else if (req.body.muvelet === "leadas")
            res.locals.diak.targyak[index].felveve = false;
        else
            return next("Hiba");
        
        res.locals.diak.save(err => {
            if (err)
                return next(err);
            return res.redirect(`/diak/targyfelvetel/${req.params.diakid}`);
        });
    };
}