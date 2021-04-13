/**
 * Összeállítja a kívánt html fájt és elküldi.
 */

module.exports = function(objRepo, viewName) {
    return function (req, res, next) {
        res.render(viewName, res.locals);
    };
}