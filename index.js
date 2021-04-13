let express = require("express");
let app = express();
let bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());

require("./route.js")(app);

const PORT = 3000;

let server = app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});/**/