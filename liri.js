require("dotenv").config();

//operational variables
var request = require("request");
var file = require('file-system');
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require('moment');
moment().format();

//input variables
var searchRequest = process.argv[2];
var input = process.argv[3];
var searchLimit = process.argv[4];

//Execute functions
UserInputs(searchRequest, input, searchLimit);

//function requests
// search functions for each API
function UserInputs(searchRequest, input) {
    switch (searchRequest) {
        case 'concert-this':
            concertSearch(input, searchLimit);
            break;
        case 'spotify-this-song':
            //debubbing do-what-it-says
            // console.log("UserInput Function: " + searchRequest);
            // console.log("UserInput Function: " + input);
            spotifySearch(input, searchLimit);
            break;
        case 'movie-this':
            omdbSearch(input, searchLimit);
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

        fs.appendFileSync("log.txt", "\n"); //append to log.txt file
        fs.appendFileSync("log.txt", "\n"); //append to log.txt file
        fs.appendFileSync("log.txt", "Concert Search Info\n"); //append to log.txt file
        fs.appendFileSync("log.txt", "\n"); //append to log.txt file

        console.log("Within Function: " + input);

        var bandsUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";

        //concert data retrieval
        axios.get(bandsUrl).then(
            function(bandsResponse) {
                // console.log(bandsResponse);
                if (input === undefined) {
                    var input = "The Wiggles"; //default search if none selected
                }
                // default search amount if left blank
                if (searchLimit === undefined) {
                    searchLimit = 10;
                }

                for (i = 0; i < searchLimit; i++) {

                    var showDate = bandsResponse.data[i].datetime
                    var showDateRtn = moment(showDate).format("MM/DD/YYYY");

                    console.log("------------------------------Event#: " + [i + 1] + "-----------------------------------");
                    fs.appendFileSync("log.txt", "-------------------------------Event: " + [i + 1] + "-----------------------------------\n"); //append to log.txt file
                    console.log("Artist: " + bandsResponse.data[i].lineup);
                    fs.appendFileSync("log.txt", "Artist: " + bandsResponse.data[i].lineup + "\n"); //append to log.txt file
                    console.log("Location: " + bandsResponse.data[i].venue.city);
                    fs.appendFileSync("log.txt", "Location: " + bandsResponse.data[i].venue.city + "\n"); //append to log.txt file
                    console.log("Venue Name: " + bandsResponse.data[i].venue.name);
                    fs.appendFileSync("log.txt", "Venue Name: " + bandsResponse.data[i].venue.name + "\n"); //append to log.txt file
                    console.log("Event Date: " + showDateRtn);
                    fs.appendFileSync("log.txt", "Event Date: " + showDateRtn + "\n"); //append to log.txt file
                    console.log("Tickets URL: " + bandsResponse.data[i].url);
                    fs.appendFileSync("log.txt", "Tickets URL: " + bandsResponse.data[i].url + "\n"); //append to log.txt file
                    console.log("---------------------------------------------------------------------------");
                    fs.appendFileSync("log.txt", "---------------------------------------------------------------------------" + "\n"); //append to log.txt file
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

        fs.appendFileSync("log.txt", "\n"); //append to log.txt file
        fs.appendFileSync("log.txt", "\n"); //append to log.txt file
        fs.appendFileSync("log.txt", "Spotify Search Info\n"); //append to log.txt file
        fs.appendFileSync("log.txt", "\n"); //append to log.txt file
        fs.appendFileSync("log.txt", "\n"); //append to log.txt file

        //debugging do-what-it-says
        // console.log("This Function Ran");
        // console.log("Within Function Search: " + searchRequest);
        // console.log("Within Function Input: " + input);

        if (input === undefined) {
            input = "macarena"; //default search if none selected
        }

        spotify.search({ type: 'track', query: input }, function(err, spotifyResponse) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            // console.log(spotifyResponse);
            // console.log("Within Function Input: " + input);

            // default search amount if left blank
            if (searchLimit === undefined) {
                searchLimit = 10;
            }

            for (l = 0; l < searchLimit; l++) {

                var trackDate = spotifyResponse.tracks.items[l].album.release_date;
                var trackDateRtn = moment(trackDate, "YYYY-MM-DD").format("MM/DD/YYYY");

                // console.log(spotifyResponse.tracks.items[0]);
                // console.log(data);
                console.log("---------------------------Track#: " + [l + 1] + " --------------------------------");
                fs.appendFileSync("log.txt", "----------------------------Track# " + [l + 1] + " --------------------------------\n") //append to log.txt file
                console.log("Artist: " + spotifyResponse.tracks.items[l].artists[0].name);
                fs.appendFileSync("log.txt", "Artist: " + spotifyResponse.tracks.items[l].artists[0].name + "\n") //append to log.txt file
                console.log("Song Name: " + spotifyResponse.tracks.items[l].name);
                fs.appendFileSync("log.txt", "Song Name: " + spotifyResponse.tracks.items[l].name + "\n") //append to log.txt file
                console.log("Preview Link: " + spotifyResponse.tracks.items[l].href);
                fs.appendFileSync("log.txt", "Preview Link: " + spotifyResponse.tracks.items[l].href + "\n") //append to log.txt file
                console.log("Album: " + spotifyResponse.tracks.items[l].album.name);
                fs.appendFileSync("log.txt", "Album: " + spotifyResponse.tracks.items[l].album.name + "\n") //append to log.txt file
                console.log("Release Date: " + trackDateRtn);
                fs.appendFileSync("log.txt", "Release Date: " + trackDateRtn + "\n") //append to log.txt file
                console.log("----------------------------------------------------------------------");
                fs.appendFileSync("log.txt", "----------------------------------------------------------------------\n") //append to log.txt file
            }
        });
    }

};

// omdb API
function omdbSearch() {
    if (searchRequest === "movie-this") {
        console.log("You Asked For A Movie");

        fs.appendFileSync("log.txt", "\n"); //append to log.txt file
        fs.appendFileSync("log.txt", "\n"); //append to log.txt file
        fs.appendFileSync("log.txt", "OMDB Search Info\n"); //append to log.txt file
        fs.appendFileSync("log.txt", "\n"); //append to log.txt file
        fs.appendFileSync("log.txt", "\n"); //append to log.txt file

        console.log("Within Function: " + input);

        if (input === undefined) { //default search if none selected

            fs.appendFileSync("log.txt", "\n"); //append to log.txt file
            fs.appendFileSync("log.txt", "No Data Received\n"); //append to log.txt file
            fs.appendFileSync("log.txt", "\n"); //append to log.txt file

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
                fs.appendFileSync("log.txt", "---------------------------Info-------------------------------\n"); //append log.txt file
                console.log("Movie Title: " + movieResponse.data.Title);
                fs.appendFileSync("log.txt", "Movie Title: " + movieResponse.data.Title + "\n");
                console.log("Release Date: " + movieDateRtn);
                fs.appendFileSync("log.txt", "Release Date: " + movieDateRtn + "\n");
                console.log("IMDB Rating: " + movieResponse.data.imdbRating);
                fs.appendFileSync("log.txt", "IMDB Rating: " + movieResponse.data.imdbRating + "\n");
                console.log("Rotton Tomatoes Rating: " + movieResponse.data.Ratings[1].Value);
                fs.appendFileSync("log.txt", "Rotton Tomatoes Rating: " + movieResponse.data.Ratings[1].Value + "\n");
                console.log("Country Produced: " + movieResponse.data.Country);
                fs.appendFileSync("log.txt", "Country Produced: " + movieResponse.data.Country + "\n");
                console.log("Language: " + movieResponse.data.Language);
                fs.appendFileSync("log.txt", "Language: " + movieResponse.data.Language + "\n");
                console.log("Plot: " + movieResponse.data.Plot);
                fs.appendFileSync("log.txt", "Plot: " + movieResponse.data.Plot + "\n");
                console.log("Actors: " + movieResponse.data.Actors);
                fs.appendFileSync("log.txt", "Actors: " + movieResponse.data.Actors + "\n");
                console.log("--------------------------------------------------------------");
                fs.appendFileSync("log.txt", "--------------------------------------------------------------\n"); //append log.txt file
            }
        );
    }
};

// text file spotify search
function txtShowSearch() {

    console.log("Reading From the Text File");

    fs.readFile('random.txt', 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }

        var dataArr = data.split(',');

        //debugging
        // console.log("Before Function: " + dataArr[0]);
        // console.log("Before Function: " + dataArr[1]);

        searchRequest = dataArr[0];
        input = dataArr[1];

        //spotify song search function call
        UserInputs(searchRequest, input)

    });

}