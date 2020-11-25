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

         
            $(`#movie-tiles`).append(

                `<div class = "col text-center card container col-sm-3 card-styles">    
                    <div class="card-image-format">
                       <img class="card-img-top" src="https://images.unsplash.com/photo-1594908900066-3f47337549d8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80">
                    </div>
                    <div class="card-body">
                        <h2 class="card-title font-weight-bold">
                        ${data[i].title}
                        </h2>
                        
                        <h7>
                        ${data[i].director}
                        </h7>
                        <h7>
                        ${data[i].genre}
                        </h7>
                    </div>`
                
                )
           
    }  
} 

//function to search 
function searchCards(value, data){

    var filteredData = [];

    for(var i = 0; i < data.length; i++){
        value = value.toLowerCase();
        var userInput = data[i].title.toLowerCase();

        if(userInput.includes(value)){

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
});
};


$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('click')
  })