const renderMW = require("./middleware/renderMW.js");
const deleteStudentMW = require("./middleware/diak/deleteStudentMW.js");
const getStudentMW = require("./middleware/diak/getStudentMW.js");
const getStudendsMW = require("./middleware/diak/getStudendsMW.js");
const getSubjectStatesMW = require("./middleware/diak/getSubjectStatesMW.js");
const saveStudentMW = require("./middleware/diak/saveStudentMW.js");
const saveSubjectStateMW = require("./middleware/diak/saveSubjectStateMW.js");
const deleteSubjectMW = require("./middleware/targy/deleteSubjectMW.js");
const getSubjectMW = require("./middleware/targy/getSubjectMW.js");
const getSubjectsMW = require("./middleware/targy/getSubjectsMW.js");
const saveSubjectMW = require("./middleware/targy/saveSubjectMW.js");

module.exports = function(app) {
    const objRepo = {};

    app.use("*", function(req, res, next) {
        console.log("Beérkező request");
        res.charset = "utf8";
        next();
    });

    app.get("/",
        getStudentMW(objRepo),
        renderMW(objRepo, "index")
    );
    
    app.use("/diak/new",
        saveStudentMW(objRepo),
        renderMW(objRepo, "ujdiak")
    );

    app.use("/diak/edit/:diakid",
        getStudendsMW(objRepo),
        saveStudentMW(objRepo),
        renderMW(objRepo, "modosit")
    );

    app.get("/diak/delete/:diakid",
        getStudentMW(objRepo),
        deleteStudentMW(objRepo),
    );

    app.get("/diak/targyfelvetel/:diakid",
        getStudentMW(objRepo),
        getSubjectMW(objRepo),
        getSubjectStatesMW(objRepo),
        renderMW(objRepo, "targyfelvetel")
    );

    app.post("/diak/targyfelvetel/:diakid/edit/:targyid",
        getStudentMW(objRepo),
        getSubjectsMW(objRepo),
        saveSubjectStateMW(objRepo)
    );


    app.get("/targy/list",
        getSubjectsMW(objRepo),
        renderMW(objRepo, "targyak")
    );

    app.use("/targy/new",
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
        deleteSubjectMW(objRepo)
    );
}