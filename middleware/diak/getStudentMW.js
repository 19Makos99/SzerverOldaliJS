/**
 * Lekéri az adott id-vel rendelkező tanulót
 */

module.exports = function(objRepo) {
    return function (req, res, next) {
        res.locals.diak = {
            id: 0,
            nev: "Kiss Ádám",
            lakcim: "Budapest Petőfi Sándor utca 3",
            azonosito: "123456789",
            targyak: [
                {
                    id: 0,
                    nev: "Analízis",
                    felveve: true
                },
                {
                    id: 1,
                    nev: "Programozás",
                    felveve: true
                },
                {
                    id: 2,
                    nev: "Számelmélet",
                    felveve: false
                }
            ]
        };
        next();
    };
}