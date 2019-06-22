// require("dotenv").config();

var request = require("request");
var keys = require("./keys.js");
// var Spotify = require('node-spotify-api');
// var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require('moment');
moment().format();

var searchRequest = process.argv[2];
var input = process.argv[3];

// search requests
if (searchRequest === "concert-this") {
    concert(searchRequest, input);
}
if (searchRequest === "movie-this") {
    omdb(searchRequest, input);
}


//search functions
function concert() {

    if (searchRequest === "concert-this") {
        console.log("You Asked For Concert Info");
        var input = process.argv[3];
        if (input === undefined) {
            var input = "The Wiggles"; //default search
        }
        // var input = process.argv[3];
        var bandsUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
        bands(bandsUrl);
    }
    return false;
};

if (searchRequest === "spotify-this-song") {
    console.log("You Asked For Spotify");

    // var input = process.argv[3];
    // var spotifyUrl = "https://api.spotify.com/v1";
    // spotify(spotifyUrl);
};

function omdb() {
    if (searchRequest === "movie-this") {
        console.log("You Asked For A Movie");
        var input = process.argv[3];
        if (input === undefined) {
            // input = "Mr. Nobody"
            console.log("------------------------------------------");
            console.log("Go Watch Mr. Nobody");
            console.log("It's on Netflix");
            console.log("Link: http://www.imdb.com/title/tt0485947/");
            console.log("------------------------------------------");
            return false;
        }
        var movieUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";
        movie(movieUrl);
    }
};

if (process.argv[2] === "do-what-it-says") {
    console.log("Reading From the Text File");

    // var input = process.argv[3];
    // var movieUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";
}


//bands in town data call
function bands(bandsUrl) {

    axios.get(bandsUrl).then(
        function(bandsResponse) {
            // console.log(bandsResponse);

            var searchLimit = 10;

            for (i = 0; i < searchLimit; i++) {

                var showDate = bandsResponse.data[i].datetime
                var showDateRtn = moment(showDate).format("MM/DD/YYYY");

                console.log("--------------Event: " + [i + 1] + "---------------");
                console.log("Artist: " + bandsResponse.data[i].lineup);
                console.log("Location: " + bandsResponse.data[i].venue.city);
                console.log("Venue Name: " + bandsResponse.data[i].venue.name);
                console.log("Event Date: " + showDateRtn);
                console.log("Tickets URL: " + bandsResponse.data[i].url);
                console.log("-------------------------------------");
            }
        }
    );
}

//spotify data call
function spotify(spotifyUrl) {

    axios.get(spotifyUrl).then(
        function(spotifyResponse) {
            // console.log(bandsResponse);

            var searchLimit = 10;

            for (l = 0; l < searchLimit; l++) {
                console.log(spotifyResponse);

                // console.log("-------------------------------------");
                // console.log("Artist: " + spotifyResponse.tracks[l]);
                // console.log("The Song Name: " + spotifyResponse.tracks[l]);
                // console.log("Preview Link: " + spotifyResponse.tracks[l]);
                // console.log("Album: " + spotifyResponse.tracks[l]);
                // console.log("-------------------------------------");
            }
        }
    );
}

//omdb data call
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