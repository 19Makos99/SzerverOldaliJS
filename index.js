let express = require("express");
let app = express();

app.use(express.static("static"));

const PORT = 3000;

let server = app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});