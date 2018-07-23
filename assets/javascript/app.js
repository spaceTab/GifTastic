$(function () {
    var KEY = "BGaM1jYG0smzvDDx488IG1gNmV6ENOYB";
    // var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&apikey=" + APIKey + "&limit=10";
    var gifAmount = 10;
    var gifArr = [
        'Neon Genesis Evangellion',
        'Cowboy Bepop',
        'Berserk',
        'Yu Yu Hakusho',
        'Full Metal Alchemist',
        'Dragonball Z',
        'Scooby doo',
        'Speed Racer',
        'Sponge Bob',
        'Doug',
        'Trending',
        'Random'
    ];

    //adds buttons from the array. also my ex's favorite pastime
    var push_buttons = function () {
        $('.buttons').empty();
        for (var j = 0; j < gifArr.length; j++) {

            var btns = $('<button>');
            btns.addClass('gif animated fadeInUp')               //adds class of gif
                .attr('data-name', gifArr[j]) //adds gif as data name
                .text(gifArr[j]);            //to each index along with text

            $('.buttons').append(btns);
            $('#gif-input').val("");    //clears text from form input after enter.
        }
    }
    push_buttons();

    //function to append user input to button list    
    $("#addGif").on("click", function (event) {
        event.preventDefault();                    //prevents from opening in new page/refresh?
        var x = $('#gif-input').val().trim();
        if (x != "") {                            //appends the text to the new button
            gifArr.push(x);                      //pushes the user input into the Gif array
            push_buttons();
        }
    })


    var get_gif = function () {

        $('.gifIMG').empty();

        if ($('#addLimit').data('clicked')) increaseAMNT();
            
        
        btnData = $(this).attr("data-name");
        var queryURL = `https://api.giphy.com/v1/gifs/search?q=${btnData}
            &apikey=${KEY}&limit=${gifAmount}`;
        console.log(queryURL);
        console.log(btnData);
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;

            if (results == "") alert("Gifs not available");

            $('#gif-view').empty();
            for (var i = 0; i < results.length; i++) {
                console.log(btnData)
                var gifDiv = $('<div>');  
                       //appends Rating of each Gif
                var p = $("<p>").text("Gif Rating: " + results[i].rating + ' ');
                var $IMG = $("<img>");
                //sets the height of the api results to small, to keep uniformed
                $IMG.attr("src", results[i].images.original_still.url)
                    .attr("data-still", results[i].images.original_still.url)
                    .attr("data-animate", results[i].images.original.url)
                    .attr("data-state", "still");
                $IMG.attr("class", "gifIMG");

                gifDiv.append(p);
                gifDiv.append($IMG);
                $('#gif-view').addClass("ani animated lightSpeedIn");
                $('#gif-view').append(gifDiv); //appends each give to the gif view div
                console.log(results[i].rating);
                console.log(results.length);
                gifAmount = 10;
            }
        })
    };
    
    //allows your changing the API limit parameter
   //Closest I could get to the bonus :\ 
    var increaseAMNT = function () {
        limitOn = false;
        gifAmount += 10;
        console.log('clicked ' + gifAmount);
        
    }

    // function utilizing a switch statement to change the data-state of gif on click
    var gif_states = function () {
        var state = $(this).attr("src");
        var animated = $(this).attr("data-animate");
        var still = $(this).attr("data-still");
        console.log('WE MADE IT')

        switch (state) {
            case still:
                console.log('case 1');
                $(this).attr("src", animated);
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
    $(document).on('click', '#addLimit', increaseAMNT);
});


  //function to pause / unpause gifs by user
	/*var gif_state = function(){
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
    }*/