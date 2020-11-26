"use strict"

 $.ajax({
    url: "http://localhost:5000/data/movies",
    dataType: "json",
    type: "get",
    success: function(response){
        userInputSearch(response);  
    }
});


//buildCards(data);
function buildCards(data){
    
    $('#movie-tiles').empty();

    for(var i = 0; i < data.length; i++){

        if(data[i].hasOwnProperty('image') === true){
            $(`#movie-tiles`).append(

                `<button class = "col text-center col-sm-3 card-styles " type="button" class="btn btn-primary" data-toggle="modal" data-target="#${data[i].id}Modal>  
                         <div class="card-image-format">
                            <img class="card-img-top" src=${data[i].image}>
                        </div>
                        <div class="">
                            <h2 class="font-weight-bold">${data[i].title}</h2>
                        </div>
                     </button>
                
                    <div class="modal fade" id="${data[i].id}Modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
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
                                    <button type="button" id="update-movie-form" data-id="${data[i].id}" class="btn btn-primary btn-update ">Update</button>
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
                            <div class="modal-content">
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
    buildCards(apiData)

    $('index.html').ready(()=>{

        $('#user-input').on(`keyup`, function(){
            var value = $(this).val();
            if(value != null){
                var data = searchCards(value, apiData)
                buildCards(data);
            }
            
        }

        );

        //event listener for modal to create new movie

        $('#add-movie-submit').on('click', ()=>{
            postMovie();
        }); 

        $('.btn-update').on('click', ()=>{
            var dataId = $(event.target).attr("data-id");
            console.log(dataId);
            //updateForm(dataId);
        })
        
        $('#update-movie-submit').on('click', ()=>{
            updateMovie();
        }); 
    });
};


function updateMovie(){
    $.ajax({
        url:  "http://localhost:5000/data/movies",
        dataType: "json",
        type: "put",
        success: function(){   
            
        }
    });
}

function updateForm(dataId){
    
    $("div.modal-content").replaceWith(
        `<div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Enter Movie's Info</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <h7>Title: </h7><input class="form-control" id="title-info" type="text" value=dataId>
                <br><h7>Director: </h7><input class="form-control" id="director-info" type="text" placeholder="Enter Director">
                <br><h7>Genre: </h7><input class="form-control" id="genre-info" type="text" placeholder="Enter Genre">
            </div>
            <div class="modal-footer">
                <button type="submit" id="update-movie-submit" class="btn btn-primary">Submit</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                
            </div>
        </div>`
    );
}


 //function to creat the post request for the movie
function postMovie(){
    $.ajax({
        url:  "http://localhost:5000/data/movies",
        dataType: "json",
        type: "post",
        data: createMovieObject(),
        success: function(){    
            alert("Movie Sucessfully Posted!")
        }
    });
}

//function to creat the movie object for the 
function createMovieObject(response){
            
            var title = $('#title-info').val();
            var director = $('#director-info').val();
            var genre = $('#genre-info').val();

            console.log(title, director, genre)
            
            let newMovie = {
                title: title,
                director: director,
                genre: genre,

            }

            return newMovie;
} 


$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('click')
})

