/**
 * Megköveteli egy objektum egy paraméterének létezését
 */

module.exports = function(objRepo, propName) {
    if (objRepo && objRepo[propName])
        return objRepo[propName];
    throw new TypeError(propName + " required");
}