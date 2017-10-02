$(document).ready(function() {

	// creates an array of strings called topics
	var topics = ["cycling", "yoga", "hiking", "snowboarding"];


	// ***** RENDERS BUTTONS FUNCTION *****
	// creates the buttons
	var renderButtons = function() {
		// resets the button-container
		$("#buttons-container").empty();

		// creates the buttons for each topic
		for ( i = 0; i < topics.length; i++) {
			//creates new button
			var newButton = $("<button>");
			// adds classes and type attribute to the button
			newButton.addClass("btn btn-outline-secondary btn-sm");
			newButton.attr("type", "button");
			// adds text to the button
			newButton.text(topics[i]);
			// appends each new button to the buttons-container
			$("#buttons-container").append(newButton);
		}

	} // ***** END RENDERS BUTTONS FUNCTION *****


	// ***** CLICK BUTTON EVENT *****
	// when clicking on any of the buttons do the following...
	$(document).on("click", "#buttons-container .btn", function() {
		// reset gif container
		$("#gif-container").empty();
		// gets the text of the button clicked
		var buttonText = $(this).html();

		// builds the URL for the AJAX call
		var requestUrl = "http://api.giphy.com/v1/gifs/search?q=" + buttonText + "&api_key=dc6zaTOxFJmzC&limit=10";
		console.log(requestUrl);

		// ***** AJAX CALL *****
		$.ajax({
			url : requestUrl,
			method : "GET"
		}).done(function(response){
			// console.log(response)
			// gets data for each response and stores it into resultData
			for ( var j = 0; j < response.data.length; j++) {
				var resultData = response.data[j];
				// console.log(resultData);
				// stores the images.fixed_width_still url
				var resultGifStill = resultData.images.fixed_width_still.url;
				// stores the images.fixed_width (where animates) url
				var resultGifAnimate = resultData.images.fixed_width.url;
				console.log(resultGifStill , resultGifAnimate)
				// stores the rating data
				var resultRating = resultData.rating;

				// creates new image tag and assings class, src and data attributes
				var resultGifImg = $("<img>");
				resultGifImg.attr("class", "img-fluid img-thumbnail");
				resultGifImg.attr("src", resultGifStill);
				resultGifImg.attr("width", "100%");
				resultGifImg.attr("data-still", resultGifStill);
				resultGifImg.attr("data-animate", resultGifAnimate);
				resultGifImg.attr("data-state", "still");

				// builds new div container for holding the ratings
				var ratingDiv = $("<div>");
				ratingDiv.text("Rating: " + resultRating.toUpperCase());

				// builds new div container for the image and ratings
				var gifDiv = $("<div class='col-lg-3 col-md-4 col-xs-6'>");
				gifDiv.append(resultGifImg);
				gifDiv.append(ratingDiv);

				// appends gifDiv to the main container
				$("#gif-container").append(gifDiv);

			} // ***** END FOR LOOP *****


		}); // ***** END AJAX CALL *****


	}); // ***** END CLICK BUTTON EVENT *****

	
	// ***** GIF CLICK EVENT *****
	// if any image clicked do the following
	$(document).on("click", "#gif-container img", function() {
		// stores the state of the gif
		var state = $(this).attr("data-state");
		// console.log(this)

		// if state is still
		if ( state === "still" ) {
			// plays gifs
			// gets the animate url link
			$(this).attr("src", $(this).attr("data-animate"));
			// sets state to animate
			$(this).attr("data-state", "animate");

		} else {
			// stops gifs
			// gets the still url link
			$(this).attr("src", $(this).attr("data-still"));
			// sets state to still
			$(this).attr("data-state", "still");
		}

	}); // ***** END GIF CLICK EVENT *****


	// ***** SEARCH BUTTON EVENT *****
	$("#search-button").click(function(){
		// Preventing the button from trying to submit the form
	    event.preventDefault();

		// gets user input value
		var userInput = $("input").val().trim();
		// pushes to the topics array
		topics.push(userInput);

		renderButtons();

	}); // ***** SEARCH BUTTON EVENT *****

	renderButtons();

})