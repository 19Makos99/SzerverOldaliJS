/*const TargyModel = require("./models/tantargy");
const DiakModel = require("./models/diak");

let prog = new TargyModel();
prog.nev = "Prog";
prog.save((err) => {
    if (err)
        console.log(err);
    else
        console.log("Done");
});

let Greg = new DiakModel();
Greg.nev = "Greg";
Greg.lakcim = "Pilisvörösvár";
Greg.azonosito = "123456789";
Greg.targyak = [{
    felveve: true,
    nev: prog.nev,
    targyid: prog
}];
Greg.save();
/**/
let express = require("express");
let app = express();
let bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());

require("./route.js")(app);

//app.use(express.static("static"));

const PORT = 3000;

let server = app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});/**/