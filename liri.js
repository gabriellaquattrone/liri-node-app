require("dotenv").config();
const axios = require("axios");
const fs = require("fs");
const keys = require("./keys.js")
const Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);

function comprehend(command, param) {
    switch (command) {
        case 'concert-this':
            concertThis(param);
            break;
        case 'spotify-this-song':
            spotifyThisSong();
            break;
        case 'movie-this':
            movieThis(param);
            break;
        case 'do-what-it-says':
            doWhatItSays();
            break;
        default:
            console.log("Try a command like concert-this, spotify-this-song, movie-this, or do-what-it-says.");
    }   
}

comprehend(process.argv[2], process.argv[3]);

console.log("Second Argument: ", process.argv[3]);

function concertThis(arg) {
    let artist = arg;
    if (typeof artist != String){
        artist = "AceofBase";
    }
    console.log("Inside concertThis function, using: ", artist);
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
  .then(response => {
    console.log(response.data);
    console.log("Name of Venue: ", response.data[0].venue.name);
    console.log("Venue Location: ",  response.data[0].venue.city +  "," , response.data[0].venue.country);
    console.log("Date of Event: ", response.data[0].datetime);
  })
  .catch(error => {
    console.log(error);
  });
    
}

function spotifyThisSong() {
    console.log("Inside spotifyThis function.");
}
function movieThis(arg) {
    let movie = arg;
    if (typeof movie === 'undefined'){
        movie = "Mr.Nobody";
    }
    axios.get("http://www.omdbapi.com/?t=" + movie + "&apikey=trilogy")
    .then(response => {
        // console.log(response.data);
        console.log("Title of the Movie: ", response.data.Title);
        console.log("Year: ", response.data.Year);
        console.log("IMDB Rating: ", response.data.imdbRating);
        console.log("Rotten Tomatoes Rating: ", response.data.Ratings[1].Value); 
        console.log("Country(s): ", response.data.Country); 
        console.log("Language(s): ", response.data.Language); 
        console.log("Plot: ", response.data.Plot);
        console.log("Actors: ", response.data.Actors);
     
    })
    .catch(error => {
        console.log(error);
    });
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        console.log(data);

        // Then split it by commas (to make it more readable)
        let commands = data.split(",");

        // We will then re-display the content as an array for later use.
        console.log(commands);
        comprehend(commands[0], commands[1]);

    });
}

