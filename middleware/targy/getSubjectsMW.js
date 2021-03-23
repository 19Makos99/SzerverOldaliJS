/**
 * Lekérdezi az összes tantárgyat
 */

module.exports = function(objRepo) {
    return function (req, res, next) {
        res.locals.targyak = [{id:0, nev:"Analízis"}, {id: 1, nev:"Programozás"}, {id: 2, nev:"Számelmélet"}];
        next();
    };
}