/**
 * Kitörli a megadott tanulót
 */

const requireOption = require("../requireOption");

module.exports = function(objRepo) {
    return function (req, res, next) {
        if (res.locals.diak === undefined)
            return next("Nincs meg a törlendő diák");
        
        res.locals.diak.remove(err => {
            if (err)
                return next(err);
            
            return res.redirect("/");
        });
    };
}