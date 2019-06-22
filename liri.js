require("dotenv").config();

//operational variables
var request = require("request");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require('moment');
moment().format();

//input variables
var searchRequest = process.argv[2];
var input;

//Execute functions
UserInputs(searchRequest, input);

//function requests
// search functions for each API
function UserInputs(searchRequest, input) {
    switch (searchRequest) {
        case 'concert-this':
            concertSearch(input);
            break;
        case 'spotify-this-song':
            spotifySearch(input);
            break;
        case 'movie-this':
            omdbSearch(input);
            break;
        case 'do-what-it-says':
            txtShowSearch();
            break;
        default:
            console.log("Invalid Search, please type any of the following command options: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says.")
    }
}

// Bands in Town Artist Events API
function concertSearch() {

    if (searchRequest === "concert-this") {
        console.log("You Asked For Concert Info");
        var input = process.argv[3];
        if (input === undefined) {
            var input = "The Wiggles"; //default search if none selected
        }
        var bandsUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";

        //concert data retrieval
        axios.get(bandsUrl).then(
            function(bandsResponse) {
                // console.log(bandsResponse);

                var searchLimit = 10;

                for (i = 0; i < searchLimit; i++) {

                    var showDate = bandsResponse.data[i].datetime
                    var showDateRtn = moment(showDate).format("MM/DD/YYYY");

                    console.log("-------------------------------Event: " + [i + 1] + "-----------------------------------");
                    console.log("Artist: " + bandsResponse.data[i].lineup);
                    console.log("Location: " + bandsResponse.data[i].venue.city);
                    console.log("Venue Name: " + bandsResponse.data[i].venue.name);
                    console.log("Event Date: " + showDateRtn);
                    console.log("Tickets URL: " + bandsResponse.data[i].url);
                    console.log("---------------------------------------------------------------------------");
                }
            }
        );
    }
    return false;
};

//spotify API
function spotifySearch() {

    if (searchRequest === "spotify-this-song") {
        console.log("You Asked For Spotify");

        var input = process.argv[3];
        if (input === undefined) {
            var input = "macarena"; //default search if none selected
        }

        spotify.search({ type: 'track', query: input }, function(err, spotifyResponse) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            var searchLimit = 10;
            // console.log(spotifyResponse);

            for (l = 0; l < searchLimit; l++) {

                var trackDate = spotifyResponse.tracks.items[l].album.release_date;
                var trackDateRtn = moment(trackDate, "YYYY-MM-DD").format("MM/DD/YYYY");

                // console.log(spotifyResponse.tracks.items[0]);
                // console.log(data);
                console.log("----------------------------Track# " + [l + 1] + " --------------------------------");
                console.log("Artist: " + spotifyResponse.tracks.items[l].artists[0].name);
                console.log("Song Name: " + spotifyResponse.tracks.items[l].name);
                console.log("Preview Link: " + spotifyResponse.tracks.items[l].href);
                console.log("Album: " + spotifyResponse.tracks.items[l].album.name);
                console.log("Release Date: " + trackDateRtn);
                console.log("----------------------------------------------------------------------");
            }

        });
    }

};

// omdb API
function omdbSearch() {
    if (searchRequest === "movie-this") {
        console.log("You Asked For A Movie");
        var input = process.argv[3];
        if (input === undefined) { //default search if none selected

            console.log("------------------------------------------");
            console.log("Go Watch Mr. Nobody");
            console.log("It's on Netflix");
            console.log("Link: http://www.imdb.com/title/tt0485947/");
            console.log("------------------------------------------");
            return false;
        }
        var movieUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";

        axios.get(movieUrl).then(
            function(movieResponse) {
                // console.log(bandsResponse);

                var movieDate = movieResponse.data.Released
                var movieDateRtn = moment(movieDate, "DDMMMYYYY").format("MM/DD/YYYY");

                console.log("---------------------------Info-------------------------------");
                console.log("Movie Title: " + movieResponse.data.Title);
                console.log("Release Date: " + movieDateRtn);
                console.log("IMDB Rating: " + movieResponse.data.imdbRating);
                console.log("Rotton Tomatoes Rating: " + movieResponse.data.Ratings[1].Value);
                console.log("Country Produced: " + movieResponse.data.Country);
                console.log("Language: " + movieResponse.data.Language);
                console.log("Plot: " + movieResponse.data.Plot);
                console.log("Actors: " + movieResponse.data.Actors);
                console.log("--------------------------------------------------------------");

            }
        );
    }
};

//text file search
function txtShowSearch() {
    if (searchRequest === "do-what-it-says") {
        console.log("Reading From the Text File");

        // var input = process.argv[3];
        // var movieUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";
    }
}