"use strict"
runProgram();
function runProgram(){
    $.ajax({
        url: "http://localhost:5000/data/movies",
        dataType: "json",
        type: "get",
        success: function(response){

            buildCards(response);
            userInputSearch(response);
              
        }
    });
}
//buildCards(data);
function buildCards(data){
    $('#movie-tiles').empty();
    for(var i = 0; i < data.length; i++){
        if(data[i].hasOwnProperty('image') == true){
            $(`#movie-tiles`).append(
                `   <button class = "col text-center col-sm-3 card-styles " type="button" class="btn btn-primary" data-toggle="modal" data-target="#${data[i].id}Modal>  
                         <div class="card-image-format">
                            <img class="card-img-top" src=${data[i].image}>
                        </div>
                        <div class="">
                            <h2 class="font-weight-bold">${data[i].title}</h2>
                        </div>
                     </button>
                    <div class="modal fade" id="${data[i].id}Modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content" id="ourModal-${data[i].id}">
                                <div class="modal-header">
                                    <h5 class="modal-title content-font-size" id="exampleModalLabel">${data[i].title}</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <h7>Director: ${data[i].director}</h7><br>
                                    <h7>Genre: ${data[i].genre}</h7>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" data-id="${data[i].id}" class="btn btn-primary btn-update ">Update</button>
                                </div>
                            </div>
                        </div>
                    </div>`)
        }else{
            $(`#movie-tiles`).append(
                `   <button class = "col text-center col-sm-3 card-styles " type="button" class="btn btn-primary" data-toggle="modal" data-target="#${data[i].id}Modal">  
                        <h2 class="font-weight-bold">${data[i].title}</h2>
                    </button>
                    <div class="modal fade" id="${data[i].id}Modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content" id="ourModal-${data[i].id}">
                                <div class="modal-header">
                                    <h5 class="modal-title content-font-size" id="exampleModalLabel">${data[i].title}</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <h7>Director: ${data[i].director}</h7><br>
                                    <h7>Genre: ${data[i].genre}</h7>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" data-id="${data[i].id}" class="btn btn-primary btn-update ">Update</button>
                                </div>
                            </div>
                        </div>
                    </div>`)
        }     
    }  
} 
//function to search 
function searchCards(value, data){
    var filteredData = [];
    for(var i = 0; i < data.length; i++){
        value = value.toLowerCase();
        var userInputTitle = data[i].title.toLowerCase();
        var userInputDirector = data[i].director.toLowerCase();
        var userInputGenre = data[i].genre.toLowerCase(); 
        if(userInputTitle.includes(value) || userInputDirector.includes(value) || userInputGenre.includes(value)){
            filteredData.push(data[i]);
        }
    }
    return filteredData;
}
//Search Bar jquery
function userInputSearch(apiData){
    $('index.html').ready(()=>{
        //event listener for search bar
        $('#user-input').on(`keyup`, function(){
            var value = $(this).val();
            if(value != null){
                var data = searchCards(value, apiData)
                buildCards(data);
            }
        });
        //event listener for modal to create new movie
        $('#add-movie-submit').on('click', ()=>{
            postMovie();
        }); 
        $('.btn-update').on('click', ()=>{
            var dataId = $(event.target).attr("data-id") - 1;
            updateForm(apiData, dataId);
        });
    });
};
<<<<<<< HEAD
=======

>>>>>>> 7e2d6e9455f94d886299d21fa09594b1a0765046
function updateForm(data, dataId){
    console.log(data);
    console.log(data[dataId]);
    console.log($(`#ourModal-${data[dataId].id}`).html());
    $(`#ourModal-${data[dataId].id}`).html(
        `<div class="modal-content" id="ourModal-${dataId}">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Enter Movie's Info</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <h7>Title: </h7><input class="form-control" id="title-info-${data[dataId].id}" type="text" value="${data[dataId].title}">
                <br><h7>Director: </h7><input class="form-control" id="director-info-${data[dataId].id}" type="text" value="${data[dataId].director}">
                <br><h7>Genre: </h7><input class="form-control" id="genre-info-${data[dataId].id}" type="text" value="${data[dataId].genre}">
                <br><h7>Image: </h7><input class="form-control" id="image-info-${data[dataId].id}" type="text" placeholder="Image URL Here">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary update-movie-submit">Submit</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>`
    );
    $('.update-movie-submit').on('click', ()=> {
        console.log($(`#title-info-${data[dataId].id}`).val());
        updateMovie(data[dataId].id);
    }); 
}
function testIt(movieTitle){
    console.log(movieTitle);
}
function updateMovie(dataId){
    $.ajax({
        url:  "http://localhost:5000/data/movies",
        dataType: "json",
        type: "put",
        data: updateMovieObject(dataId),
        success: function(){   
           
            alert("Movie Sucessfully Updated!");
            
            runProgram();
        }
    });
}
function updateMovieObject(dataId){
    console.log(dataId);        
    var title = $('#title-info-' + dataId).val();
    var director = $('#director-info-' + dataId).val();
    var genre = $('#genre-info-' + dataId).val();
    var image = $('#image-info-' + dataId).val()
    console.log(title, director, genre)
    let updatedMovie = {
        id: dataId,
        title: title,
        director: director,
        genre: genre,
        image: image
    }
    return updatedMovie;
} 
 //function to creat the post request for the movie
function postMovie(){
    $.ajax({
        url:  "http://localhost:5000/data/movies",
        dataType: "json",
        type: "post",
        data: createMovieObject(),
        success: function(){  
            alert("Movie Sucessfully Posted!");
            runProgram()
        }
    });
}
//function to creat the movie object for the 
function createMovieObject(response){
            var title = $('#title-info').val();
            $('#title-info').val('');
            var director = $('#director-info').val();
            $('#director-info').val('');
            var genre = $('#genre-info').val();
            $('#genre-info').val('');
            var image = $('#image-info').val();
            $('#image-info').val('');
            console.log(title, director, genre, image)
            let newMovie = {
                title: title,
                director: director,
                genre: genre,
                image: image,
            }
            console.log(newMovie);
            return newMovie;
} 
$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('click')
  })