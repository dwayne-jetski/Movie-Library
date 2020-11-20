const { response } = require('express');
const express = require('express');
const app = express();


app.get("/", (req, res) =>{

    res.send("what is up?");

});

app.listen(5000, function(){
    console.log("This is the server;");

});