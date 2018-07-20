$(function () {
    var gifData = $(this).attr('data-name');
    var APIKey = "BGaM1jYG0smzvDDx488IG1gNmV6ENOYB";
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifData + "&apikey=" + APIKey + "&limit=10"

  
    var giphyArray = ["cats", "dogs", "frogs"];

    //console.log(queryURL);
    //Adds button on input - Also an omage to my ex gf
    var button_pusher = function () {
        $("#gif-view").empty();

        for (var i = 0; i < giphyArray.length; i++) {
            var btn = $("<button>");
            btn.addClass("gif")
                .attr('data-name', giphyArray[i])
                .text(giphyArray[i]);
            
            $("#gif-view").append(btn)
        }
    }
    button_pusher();


    
    $('#gif-view').on('click', function(){
        console.log('clicked ' + this);
        
       // var gifData = $(this).data("data-name");
       // queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifData + "&apikey=" + APIKey + "&limit=10"
       
    
        console.log(this);
        $.ajax ({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
           var results = response.data;
           console.log(results)
            
           for (j = 0; j < results.length; j++){
                //queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifData + "&apikey=" + APIKey + "&limit=10"
                console.log(results); 
                var $gifDiv = $('<div>');
                var $IMG = $('<img>').addClass('gif');
                var $P = $('<p> ');
                $gifDiv.append($IMG, $P);
                $IMG.attr('src', results[j].images.original_still.url)
                    .attr('still', results[j].images.original_still.url)
                    .attr('animate', results[j].images.original.url);
                
                $('#gif-buttons').prepend($gifDiv);
                console.log(gifData + ' gifdata ' + this);
           }
           
        });
    });



    $("#giphy-button").on("click", function (event) {
        event.preventDefault();

        var gif = $("#add-giphy").val().trim();
       
        giphyArray.push(gif);

        button_pusher();
    });

    button_pusher();

    var gif_state = function() {
        switch (src) {
            case 0:

        }
    }