const express = require("express");

const app = express();
const db = require("./config/mongoose");
app.get("/", function (req, res) {
    res.send("Hello");
})

app.listen(8000, function (err) {
    if (err) {
        console.log("Server Not Running");
        return;
    }
    console.log("Server Is Running");

})

// dHuffVX6158M0K6b