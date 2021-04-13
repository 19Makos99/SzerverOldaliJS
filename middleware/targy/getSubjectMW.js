/**
 * Vissza adja az adott id-vel rendelkező tárgyat
 */

const requireOption = require("../requireOption");

module.exports = function(objRepo) {
    const TargyModel = requireOption(objRepo, "TargyModel");

    return function (req, res, next) {
        if (req.params.targyid === undefined)
            return next("Hiba");
        
        TargyModel.findOne({_id: req.params.targyid}, (err, targy) => {
            if (err)
                return next(err);

            res.locals.targy = targy;
            return next();
        });
    };
}