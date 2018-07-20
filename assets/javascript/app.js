$(function () {
    var KEY = "BGaM1jYG0smzvDDx488IG1gNmV6ENOYB";
   // var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&apikey=" + APIKey + "&limit=10";

    var gifArr = [
        'lols',
        'reaction',
        'cats',
        'puppies',
        'fail'
    ];

    //adds buttons from the array. also my ex's favorite pastime
    var push_buttons = function () {
        $('.buttons').empty();
        for (var j = 0; j < gifArr.length; j++) {

            var btns = $('<button>');
            btns.addClass('gif')    //adds class of gif
                .attr('data-gif', gifArr[j])
                .text(gifArr[j]);

            $('.buttons').append(btns);
        }
    } 
    push_buttons();

    //function to append user input to button list    
    $("#addGif").on("click", function(event){
        event.preventDefault();     //prevents from opening in new page?

        var x = $('#gif-input').val().trim(); //appends the text to the new button
        gifArr.push(x);  //pushes the user input into the Gif array
        push_buttons();
    })



    $(".buttons").on('click', function (){
        var btnData  = $(this).attr("data-gif");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q="
            + btnData + "&apikey=" + KEY + "&limit=5";
        
            console.log(btnData);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            var results = response.data;
            $('.btns').empty();

            for (var i = 0; i < results.length; i++){
                console.log(btnData)
                var gifDiv = $("<div>");
                var p = $("<p>").text("Gif Rating: " + results[i].rating);
                var $IMG = $("<img>");

                $IMG.attr("src", results[i].images.original_still.url)
                $IMG.attr("data-still", results[i].images.original_still.url)
                $IMG.attr("data-animate", results[i].images.original.url);
                $IMG.attr("data-state","still");
                $IMG.attr("class", "gifIMG");
                gifDiv.append(p);
                gifDiv.append($IMG);

                $('.buttons').append(gifDiv);
            }
        })
    })


    /*var gif_state = function(){
        var state = $(this).attr("data-state");
        var animated = $(this).attr("data-animate");
        var still = $(this).attr("data-still");

        if (state == "still"){
            $(this).attr("src", animated);
            $(this).attr("data-state", "animate");
            console.log('unstill');
        }
        else if (state == "animate") {
            $(this).attr("src", still);
            $(this).attr("data-state", "still");
            console.log('de-animate');
        }
        console.log('checked');
    }*/

	var gif_state = function(){
        console.log('wtf')
        //console.log(this);
        var state = $(this).attr("data-state");
        console.log(this)
		var animateImage = $(this).attr("data-animate");
		var stillImage = $(this).attr("data-still");

		if (state == "still") {
			$(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
            console.log('con1');
		}

		else if (state == "animate") {
			$(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
            console.log('con2')
		}
	}


    $(document).on('click', '.gifIMG', gif_state);

});
