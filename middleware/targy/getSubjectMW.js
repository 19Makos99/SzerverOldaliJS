/**
 * Vissza adja az adott id-vel rendelkező tárgyat
 */

module.exports = function(objRepo) {
    return function (req, res, next) {
        res.locals.targy = {id:0, nev:"Analízis"};
        next();
    };
}