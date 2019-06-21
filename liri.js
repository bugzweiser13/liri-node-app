// require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");

var moment = require('moment');
moment().format();

// var spotify = new Spotify(keys.spotify);

//search processes
if (process.argv[2] === "concert-this") {
    console.log("You Asked For Concert Info");

    var input = process.argv[3];
    var bandsUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
    bands(bandsUrl);
}
if (process.argv[2] === "spotify-this-song") {
    console.log("You Asked For Spotify");

    // var input = process.argv[3];
    // var bandsUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"
}
if (process.argv[2] === "movie-this") {
    console.log("You Asked For A Movie");
    var input = process.argv[3];
    var movieUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";;
    movie(movieUrl);
}

//bands in town call
function bands(bandsUrl) {

    axios.get(bandsUrl).then(
        function(bandsResponse) {
            // console.log(bandsResponse);

            var searchLimit = 10;

            for (i = 0; i < searchLimit; i++) {

                var showDate = bandsResponse.data[i].datetime
                var showDateRtn = moment(showDate).format("MM/DD/YYYY");

                console.log("--------------Event: " + [i + 1] + "---------------");
                console.log("Location: " + bandsResponse.data[i].venue.city);
                console.log("Venue Name: " + bandsResponse.data[i].venue.name);
                console.log("Event Date: " + showDateRtn);
                console.log("Tickets URL: " + bandsResponse.data[i].url);
                console.log("-------------------------------------");
            }
        }
    );
}

function spotify(spotifyUrl) {

    axios.get(spotifyUrl).then(
        function(spotifyResponse) {
            // console.log(bandsResponse);

            var searchLimit = 10;

            for (i = 0; i < searchLimit; i++) {

                console.log("--------------Event: " + [i + 1] + "---------------");
                console.log("Venue Name: " + bandsResponse.data[i].venue.name);
                console.log("Location: " + bandsResponse.data[i].venue.city);
                console.log("Date: " + bandsResponse.data[i].datetime);
                console.log("Tickets: " + bandsResponse.data[i].url);
                console.log("-------------------------------------");
            }
        }
    );
}

function movie(movieUrl) {

    axios.get(movieUrl).then(
        function(movieResponse) {
            // console.log(bandsResponse);

            var movieDate = movieResponse.data.Released
            var movieDateRtn = moment(movieDate, "DDMMMYYYY").format("MM/DD/YYYY");

            console.log("------------------Info------------------");
            console.log("Movie Title: " + movieResponse.data.Title);
            console.log("Release Date: " + movieDateRtn);
            console.log("IMDB Rating: " + movieResponse.data.imdbRating);
            console.log("Rotton Tomatoes Rating: " + movieResponse.data.Ratings[1].Value);
            console.log("Country Produced: " + movieResponse.data.Country);
            console.log("Language: " + movieResponse.data.Language);
            console.log("Plot: " + movieResponse.data.Plot);
            console.log("Actors: " + movieResponse.data.Actors);
            console.log("----------------------------------------");

        }
    );
}