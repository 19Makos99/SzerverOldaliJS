/**
 * Lekéri az adott id-vel rendelkező tanulót
 */

const requireOption = require("../requireOption");

module.exports = function(objRepo) {
    const DiakModel = requireOption(objRepo, "DiakModel");

    return function (req, res, next) {
        if (req.params.diakid === undefined)
            return next();
        
        DiakModel.findOne({_id: req.params.diakid}, (err, diak) => {
            if (err)
                return next(err);
            
            res.locals.diak = diak;
            return next();
        });
    };
}