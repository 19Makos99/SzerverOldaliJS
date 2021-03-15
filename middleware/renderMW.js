/**
 * Összeállítja a kívánt html fájt és elküldi.
 */

module.exports = function(objRepo, viewName) {
    return function (req, res, next) {
        console.log(viewName);
        res.send("<h1>Működik.</h1>");
        res.end();
    };
}