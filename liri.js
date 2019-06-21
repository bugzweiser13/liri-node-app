// require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");

var moment = require('moment');
moment().format();

// var spotify = new Spotify(keys.spotify);

//search processes
if (process.argv[2] === "concert-this") {
    // console.log("you asked for a concert");

    var input = process.argv[3];
    var bandsUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"
    bands(bandsUrl);
}
if (process.argv[2] === "spotify-this-song") {
    console.log("you asked for spotify");

    // var input = process.argv[3];
    // var bandsUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"
}
if (process.argv[2] === "movie-this") {
    console.log("you asked for a movie");
    // var input = process.argv[3];
    // var bandsUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"
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
                console.log("Venue Name: " + bandsResponse.data[i].venue.name);
                console.log("Location: " + bandsResponse.data[i].venue.city);
                // console.log("Date: " + bandsResponse.data[i].datetime);
                console.log("Location: " + showDateRtn);
                console.log("Tickets: " + bandsResponse.data[i].url);
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