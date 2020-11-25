"use strict"

$.ajax({
    url: "http://localhost:5000/data/movies",
    dataType: "json",
    type: "get",
    success: function(response){
        buildCards(response);
    }
});

function buildCards(data){
    for(var i = 0; i < data.length; i++){

        
        $(`#movie-tiles`).append(

            `<button class = "col text-center card container col-sm-3 card-styles " type="button" class="btn btn-primary" data-toggle="modal" data-target="#${data[i].id}Modal">  
                <div class="card-image-format">
                    <img class="card-img-top" src="https://images.unsplash.com/photo-1594908900066-3f47337549d8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80">
                </div>
                <div class="card-body">
                    <h2 class="card-title font-weight-bold">${data[i].title}</h2>
                    <h7>${data[i].director}</h7>
                    <h7>${data[i].genre}</h7>
                </div>
            </button>
            
            <div class="modal fade" id="${data[i].id}Modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">${data[i].title}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <h7>${data[i].director}</h7>
                        <h7>${data[i].genre}</h7>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        
                    </div>
                </div>
            </div>
        </div>
            `
            
        )
           
    }  
}


$('#myModal').on('shown.bs.modal', function() {
    $('#myInput').focus()
  })
   