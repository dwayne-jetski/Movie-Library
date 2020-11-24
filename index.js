const  response  = require('express');
const repoContext = require('./repository/repository-wrapper')
const express = require('express');
const app = express();
const validators = require("./Validators/validators");
var cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

//creates a new movie into the object array of movies
app.post('/data/movies', (req, res) =>{
    let newMovie = req.body;
    let addedMovie = repoContext.movies.createMovie(newMovie);
    res.send(addedMovie);
});

//updates movie with new info
app.put("/data/movies", (req, res) => {
    let movieToUpdate = req.body;
    let updatedMovie = repoContext.movies.updateMovie(movieToUpdate);
    res.send(updatedMovie);
   });


app.listen(5000, function(){
    console.log("This is the server;");

});