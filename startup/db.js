const mongoose = require('mongoose');
const config   = require('config')



const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }

    mongoose.connect(config.get("dbConfig.host"), options)


const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
    console.log("Connected successfully");
});