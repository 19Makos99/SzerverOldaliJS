/**
 * Kitörli a kapott tárgyat
 */

module.exports = function(objRepo) {
    return function (req, res, next) {
        res.redirect("/targy/list");
    };
}