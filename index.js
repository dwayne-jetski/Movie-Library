const  response  = require('express');
const repoContext = require('./repository/repository-wrapper')
const express = require('express');
const app = express();

//gets all movie data
app.get("/data/movies", (req, res) => {
    let movies = repoContext.movies.findAllMovies();
    res.send(movies);
});

app.get("/", (req, res) =>{

    res.send("what is up?");

});

app.listen(5000, function(){
    console.log("This is the server;");

});