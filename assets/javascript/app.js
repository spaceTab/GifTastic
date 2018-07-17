

var APIKey   = "BGaM1jYG0smzvDDx488IG1gNmV6ENOYB";
var queryURL = "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&apikey=" + APIKey + "&limit=5"


var giphyArray = ["cats", "dogs", "frogs"];

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(queryURL);
    console.log(response);
})

//Adds button on input - named after my ex girlfriend
var button_pusher = function() {
    $("#gif-view").empty();

    for (var i=0; i < giphyArray.length; i++){
        var btn = $("<button>");
        btn.addClass("gif")
            .attr("data-name", giphyArray[i])
            .text(giphyArray[i]);

        $("#gif-view").append(btn)
    }
}



$("#giphy-button").on("click", function(event){
    event.preventDefault();
    var bub = $(this).attr("data-name");
    var gif = $("#add-giphy").val().trim();
    giphyArray.push(gif);

    button_pusher();
});

button_pusher();


