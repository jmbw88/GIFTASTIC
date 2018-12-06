// Create an initial array of games to search
var games = [
        "Fortnite",
        "Overwatch",
        "Super Mario",
        "Legend of Zelda",
        "Sonic The Hedgehog"

    ];

// Declare the function to create the buttons
    function renderButtons() {
        $("#buttonRow").empty();

// For Loop to create a button for each string in the array
        for (i=0; i < games.length; i++) {
            b = $("<button>");
            b.addClass("searchButton");
            b.attr("data-search", games[i]);
            b.text(games[i]);
            $("#buttonRow").append(b);
        }
    }

// Declare function to create the GIF
    function renderGIFs() {
// API Call

        var query = $(this).attr("data-search");
        var offset= Math.floor((Math.random() * 30) + 1);

// Query matches the search the user puts in, and the random offset number means each search return is different.         
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=$" + query + "&api_key=svUujerrDXiAalWGSdDcJfhc5HxiVGlc&limit=10&offset=" + offset
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function(response) {

// Create local variables to pull the animated URL, static URL and GIF rating. 
                for (i=0; i < response.data.length; i++) {
                    var animate = response.data[i].images.original.url;
                    var static = response.data[i].images.original_still.url;
                    var rating = response.data[i].rating;
                    // console.log(response)

// Local Variables to store the data
                    var imgBox = $("<div>");
                    var img = $("<img>");
                    var rated = $("<p>");

// Adding a class for CSS
                    imgBox.addClass("imageBox")

// Apply the data attributes and class for the GIF, and appending it to the GIF holder.
                    img.attr("data-animate", animate);
                    img.attr("data-static", static);
                    img.attr("class", "gifs");
                    img.attr("data-status", "static");
                    img.attr("src", static);
                    imgBox.append(img);

// Creating a space for the rating, and appending it to the GIF holder.
                    rated.html("Rating: " + rating + "<br>");
                    rated.attr("class", "rating");
                    imgBox.append(rated);

// Place the entire GIF holder into the DOM.
                    $("#gifHolder").prepend(imgBox);
                  
                }
            })
    }

// Creating the Submit button to create new buttons. 
    $("#addGame").on("click", function(event) {
        event.preventDefault();
        var newSearch = $("#gifSearch").val().trim();

// Setting protections against creating duplicate buttons. 
        if (newSearch != "" && $.inArray(newSearch, games) == -1) {
        games.push(newSearch);
        console.log (games);
        renderButtons();
        }
        else {
            alert ("That search already exists! Press the button for new GIFs.")
        }
    })

// Clicking the created the button will run the renderGIFs function
$(document).on("click", ".searchButton", renderGIFs);

// Clicking the GIF should switch it between Static and Animated
$(document).on("click", ".gifs", function(){
    var status = $(this).attr("data-status")

// If the status is static, switch the URL to the animated URL, and set status as animated.
    if (status == "static") {
        $(this).attr("src", $(this).attr("data-animate"))
        $(this).attr("data-status", "animate")
    }

// Else (Since there are only two choices, this means the status is Animated) switch the URL to the status URL, and set status as static.
    else {
        $(this).attr("src", $(this).attr("data-static"))
        $(this).attr("data-status", "static")
    }
})

// Run the initial renderButtons function. 
renderButtons();

