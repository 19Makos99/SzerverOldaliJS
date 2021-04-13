/**
 * Lekéri az összes tanulót
 */

const requireOption = require("../requireOption");

module.exports = function(objRepo) {

    const DiakModel = requireOption(objRepo, "DiakModel");

    return function (req, res, next) {
        DiakModel.find({}, (err, diakok) => {
            if (err) {
                return next(err);
            }

            res.locals.diakok = diakok;
            return next();
        });
    };
}