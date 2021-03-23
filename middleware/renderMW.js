/**
 * Összeállítja a kívánt html fájt és elküldi.
 */

module.exports = function(objRepo, viewName) {
    return function (req, res, next) {
        console.log(viewName);
        res.render(viewName, res.locals);
    };
}