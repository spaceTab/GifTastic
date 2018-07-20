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
                .attr('data-name', gifArr[j])
                .text(gifArr[j]);

            $('.buttons').append(btns);
            $('.buttons').fadeIn("slow");
           // btnData  = $(this).attr("data-name");
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



    //$(".gif").on('click', function (event){ 
        var get_gif = function(){
        //push_buttons();
        $('.gifIMG').empty();
         btnData  = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q="
            + btnData + "&apikey=" + KEY + "&limit=5";
            console.log(queryURL);
            console.log(btnData);
        event.preventDefault();
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            var results = response.data;
            $('#gif-view').empty();
            if (results == "" ){
                alert("Gifs not available")
            }
            for (var i = 0; i < results.length; i++){
               
                console.log(btnData)
                var gifDiv = $("<div>");        //appends Rating of each Gif
                var p = $("<p>").text("Gif Rating: " + results[i].rating);
                var $IMG = $("<img>");
                                            //sets the height of the api results to small, to keep uniformed
                $IMG.attr("src", results[i].images.fixed_height_small_still.url)
                    .attr("data-still", results[i].images.fixed_height_small_still.url)
                    .attr("data-animate", results[i].images.fixed_height_small.url)
                    .attr("data-state","still");
                $IMG.attr("class", "gifIMG");
                gifDiv.append(p);
                gifDiv.append($IMG);

                $('#gif-view').append(gifDiv);
                $('#gif-view').fadeIn("slow");
                console.log(results[i].rating);
            }
        })
    };

    //function to pause / unpause gifs by user
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
    
    var gif_states = function(){
        var state = $(this).attr("src");
        var animated = $(this).attr("data-animate");
        var still = $(this).attr("data-still");
        console.log('WE MADE IT')

        switch (state){
            case still:
                console.log('case 1');
                $(this).attr("src",animated);
                $(this).attr("data-state", "animate");
                break;
            case animated:
            $(this).attr("src", still);
            $(this).attr("data-state", "still");
                console.log('case 2');
                break;
        }
    }


    $(document).on('click', '.gifIMG', gif_states);
    $(document).on('click', '.gif', get_gif);

});
