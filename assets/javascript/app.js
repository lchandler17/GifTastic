$(document).ready(function(){

//VARIABLES & FUNCTIONS//
var animals = ["dog", "cat", "raccoon", "squirrel", "bear", "owl", "penguin", "goat"];

function displayGifs() {

	var search = $(this).attr("searchFor");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg-13";

	$.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          $("#gifDisplay").empty();
          for (var i = 0; i < 10; i++) {
          	var gifSet = $("<div class='gifShow'>");
          	gifSet.append("<div class='ratings'> Rated: " + response.data[i].rating + "</div>");
          	gifSet.append("<div class='gifs'><iframe src='" + response.data[i].embed_url + "' /></div>");
          	// gifSet.append("<div class='gifs'><iframe src='" + response.data[i].images.original_still.url + "' /></div>");
          	$("#gifDisplay").append(gifSet);
          	}
        });
	  }

function renderButtons() {

        $("#gifButtons").empty();

        for (var i = 0; i < animals.length; i++) {
          var a = $("<button type='button' class='btn btn-default btn-md'>");
          a.addClass("animalButton");
          a.attr("searchFor", animals[i]);
          a.text(animals[i]);
          $("#gifButtons").append(a);
        }
      }

//when "add animal" button is clicked
$("#add-animal").on("click", function(event) {
        event.preventDefault();
        var newAnimal = $("#animal-input").val().trim();
        animals.push(newAnimal);
        renderButtons();
      });

//when "animal" button is clicked
$(document).on("click", ".animalButton", displayGifs);

// Calling the renderButtons function to display the intial buttons
renderButtons();

});