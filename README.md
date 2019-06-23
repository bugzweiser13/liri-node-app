# lori-node-app

Search Three APIs in one.

***"node liri.js"***

Will console log a statement "Invalid Search, please type any of the following command options: " 

    -concert-this
    -spotify-this-song
    -movie-this
    -do-what-it-says

***"node liri.js concert-this (band-name)":***

This command will produce a console log print out (and log to the log.txt file) of 10 upcoming events (search limit can be changed within code) of the following:

    -Artist: <name>
    -Location: <city>
    -Venue Name: <venue>
    -Event Date <dateTime (moment.js to date format only)>
    -Ticket URL: <link to ticket purchasing>

If ***(band-name)*** is left blank, the search will default to "The Wiggles

***"node liri.js spotify-this-song (song-name, all or partial)":***

This command will produce a console log print out (also logs to log.tx file) of 10 songs (search limit can be changed within code) of the following:

    -Artist: <name>
    -Song Name: <title>
    -Preview Link: <link to song preview>
    -Album: <album song can be found on>
    -Release Date: <date release, moment.js format to keep date look consistant>

If ***(song-name)*** is left blank, the search will default to "macarena"

***"none liri.js movie-this (movie-tile)":***

This command will produce a console log print out (also log to the log.txt file) the requested movies's information as follows:

    -Movie Title: <movie-name>
    -Release Date: <date of release, moment.js formatting for consistancy>
    -IMDB Rating: <rating from IMDB website>
    -Rotten Tomatoes Rating: <rating from Rotten Tomatoes website>
    -Country Produced: <where movie was produced>
    -Language: <movie language>
    -Plot: <plot synapsis>
    -Actors: <title actors>

If ***(movie-name)*** is left blank, the search will default to a statement "Go Watch Mr. Nobody"

***"node liri.js do-what-it-says"***

Will perform the spotify song search for the title "I Want it That Way" from infomation within the random.txt file

-entries within the random.txt file need to be seporated by a "," and entered in the following format "<search-command>,<search-criteria>"
