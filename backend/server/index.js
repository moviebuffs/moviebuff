//Load HTTP module
require('dotenv').config();
const db = require('../database/index');
const path = require('path');
const http = require("http");
const hostname = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const { nowPlaying } = require('./helpers/index');

app.use(express.static(path.join(__dirname, "../../frontend/public")));
app.use(bodyParser.json());

app.get('/now-playing', (req, res) => {
    nowPlaying().then((playingMovies) => {
        console.log('HIT', playingMovies);
        const { results } = playingMovies.data;
        const currentMovies = results.map((movie) => {
            return {originalTitle: movie.original_title,
            overview: movie.overview,
            posterPath: movie.poster_path,
            voteAvg: movie.vote_average,
            // voteCount: movie.cote_count,
            }
        });
        console.log('CURRENTMOVIES', currentMovies);
        res.json(currentMovies);
    })
    .catch((error) => {
        console.error(error);
        res.sendStatus(500);
    })
});

//listen for request on port 3000, and as a callback function have the port listened on logged
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});