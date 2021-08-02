const mongoose = require("mongoose");
const keys = require("./keys");

var mongodb = keys.MongoURL;

mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', (err) => {
    console.log("Error in Connecting MongoDb", err);
});

db.once("open", function () {
    console.log("Successfully Connected to db");
})
