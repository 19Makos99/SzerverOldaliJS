/**
 * Lekéri az összes tanulót
 */

module.exports = function(objRepo) {
    return function (req, res, next) {
        res.locals.diakok = [{nev:"Kiss Ádám", id:0}, {nev:"Nagy Péter", id:1}];
        next();
    };
}