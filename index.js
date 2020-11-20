const  response  = require('express');
const repoContext = require('./repository/repository-wrapper')
const express = require('express');
const app = express();

//gets all movie data
app.get("/data/movies", (req, res) => {
    let movies = repoContext.movies.findAllMovies();
    res.send(movies);
});

//gets movies by specific id
app.get("/data/movies/:id", (req, res) => {
    let id = req.params.id;
    let movies = repoContext.movies.findMovieById(id);
    res.send(movies);
});

app.post('/data/movies', (req, res) =>{

    let newMovie = req.body;
    let addedMovie = repoContext.movies.createMovie(newMovie);
    res.send(addedMovie)

});
   

app.get("/", (req, res) =>{

    res.send("what is up?");

});

app.listen(5000, function(){
    console.log("This is the server;");

});