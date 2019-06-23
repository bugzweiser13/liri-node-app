# lori-node-app

Search Three APIs in one.

***"node liri.js"***

Will console log a statement "Invalid Search, please type any of the following command options: " 

    -concert-this
    -spotify-this-song
    -movie-this
    -do-what-it-says

***"node liri.js concert-this (artist-name) + (search-limit#)":***

This command will produce a console log print out (and log to the log.txt file) the amount of events based on ***(search-amount)*** of the following:

    -Artist: <name>
    -Location: <city>
    -Venue Name: <venue>
    -Event Date <dateTime (moment.js to date format only)>
    -Ticket URL: <link to ticket purchasing>

If ***(artist-name)*** is left blank, the search will default to "The Wiggles
If ***(search-limit#)*** is left blank, default search amount will be 10

***"node liri.js spotify-this-song (song-name, all or partial) + (search amount#)":***

This command will produce a console log print out (also logs to log.tx file) the amount of events based on ***(search-amount)*** of the following:

    -Artist: <name>
    -Song Name: <title>
    -Preview Link: <link to song preview>
    -Album: <album song can be found on>
    -Release Date: <date release, moment.js format to keep date look consistant>

If ***(song name)*** is wrapped in "", will search for that specific title or titles with multiple words
If ***(song-name)*** is left blank, the search will default to "macarena"
If ***(search-limit)*** is left blank, default search amount will be 10

***"none liri.js movie-this (movie-title)":***

This command will produce a console log print out (also log to the log.txt file) the requested movies's information as follows:

    -Movie Title: <movie-name>
    -Release Date: <date of release, moment.js formatting for consistancy>
    -IMDB Rating: <rating from IMDB website>
    -Rotten Tomatoes Rating: <rating from Rotten Tomatoes website>
    -Country Produced: <where movie was produced>
    -Language: <movie language>
    -Plot: <plot synapsis>
    -Actors: <title actors>

If ***(movie-title)*** is left blank, the search will default to a statement "Go Watch Mr. Nobody"

***"node liri.js do-what-it-says"***

Will perform the spotify song search for the title "I Want it That Way" from infomation within the random.txt file

    -entries within the random.txt file need to be seporated by a "," 
    -need to be entered in the following format <search-command>,<"search-criteria">
    -only one entry within the .txt file operational at this time

***See opertional videos (title by each search) for demonstration.***
