const renderMW = require("./middleware/renderMW.js");
const deleteStudentMW = require("./middleware/diak/deleteStudentMW.js");
const getStudentMW = require("./middleware/diak/getStudentMW.js");
const getStudentsMW = require("./middleware/diak/getStudentsMW.js");
const saveStudentMW = require("./middleware/diak/saveStudentMW.js");
const saveStudentClassMW = require("./middleware/diak/saveStudentClassMW.js");
const deleteSubjectMW = require("./middleware/targy/deleteSubjectMW.js");
const getSubjectMW = require("./middleware/targy/getSubjectMW.js");
const getSubjectsMW = require("./middleware/targy/getSubjectsMW.js");
const saveSubjectMW = require("./middleware/targy/saveSubjectMW.js");

const TargyModel = require("./models/tantargy");
const DiakModel = require("./models/diak");
module.exports = function(app) {
    const objRepo = {
        TargyModel: TargyModel,
        DiakModel: DiakModel
    };

    app.use((err, req, res, next) => {
        console.log("HIBA: " + err);
        res.end("Hiba");
    });

    app.use("*", function(req, res, next) {
        console.log("Beérkező request");
        res.charset = "utf8";
        next();
    });

    app.get("/",
        getStudentsMW(objRepo),
        renderMW(objRepo, "index")
    );

    app.use("/diak/new",
        getSubjectsMW(objRepo),
        saveStudentMW(objRepo),
        renderMW(objRepo, "ujdiak")
    );

    app.use("/diak/edit/:diakid",
        getStudentMW(objRepo),
        saveStudentMW(objRepo),
        renderMW(objRepo, "modosit")
    );

    app.get("/diak/delete/:diakid",
        getStudentMW(objRepo),
        deleteStudentMW(objRepo),
    );

    app.get("/diak/targyfelvetel/:diakid",
        getStudentMW(objRepo),
        renderMW(objRepo, "targyfelvetel")
    );

    app.post("/diak/targyfelvetel/:diakid/edit/:targyid",
        getStudentMW(objRepo),
        getSubjectsMW(objRepo),
        saveStudentClassMW(objRepo)
    );


    app.get("/targy/list",
        getSubjectsMW(objRepo),
        renderMW(objRepo, "targyak")
    );

    app.use("/targy/new",
        getStudentsMW(objRepo),
        saveSubjectMW(objRepo),
        renderMW(objRepo, "ujtargy")
    );

    app.use("/targy/edit/:targyid",
        getSubjectMW(objRepo),
        saveSubjectMW(objRepo),
        renderMW(objRepo, "targymodosit")
    );

    app.get("/targy/delete/:targyid",
        getSubjectMW(objRepo),
        getStudentsMW(objRepo),
        deleteSubjectMW(objRepo)
    );
}