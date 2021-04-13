const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/VTWDGF", { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose;