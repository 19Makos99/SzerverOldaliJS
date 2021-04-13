/**
 * Lekérdezi az összes tantárgyat
 */

const requireOption = require("../requireOption");

module.exports = function(objRepo) {
    const TargyModel = requireOption(objRepo, "TargyModel");

    return function (req, res, next) {
        TargyModel.find({}, (err, targyak) => {
            if (err)
                return next(err);
            
            res.locals.targyak = targyak;
            return next();
        });
    };
}