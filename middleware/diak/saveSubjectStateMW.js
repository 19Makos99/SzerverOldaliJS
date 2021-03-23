/**
 * Elmenti hogy a diák felvette-e az adott tárgyat
 */

module.exports = function(objRepo) {
    return function (req, res, next) {
        res.redirect("/diak/targyfelvetel/0");
    };
}