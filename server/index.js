//Load HTTP module
require('dotenv').config();
const db = require('../database/index');
const helpers = require('./helpers/index');
const path = require('path');
const http = require("http");
const hostname = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const { nowPlaying } = require('./helpers/index');

app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(bodyParser.json());

app.get('/now-playing', (req, res) => {
  nowPlaying().then((movies) => {
    const { results } = movies.data;
    const currentMovies = results.map((movie) => {
      return {
        movieId: movie.id,
        originalTitle: movie.original_title,
        overview: movie.overview,
        posterPath: movie.poster_path,
        voteAvg: movie.vote_average,
        voteCount: movie.vote_count,
      }
    });
    res.json({ data: currentMovies });
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




//route for homepage
// app.get('/', (req, res) => {

//     res.render('homepage')
// })
// .then(() => {})
// .catch(() => {});

//GET request for movie and movie review simultaneously
app.get('/movie/:movieName', (req, res) => {
  helpers.getMovie(req.params.movieName)
    .then((searchResults) => {
      console.log(searchResults);
      const searchedMovies = searchResults.map((movie) => {
        return {
          movieId: movie.id,
          originalTitle: movie.original_title,
          overview: movie.overview,
          posterPath: movie.poster_path,
          voteAvg: movie.vote_average,
          voteCount: movie.vote_count,
        }
      });
      res.json({ data: searchedMovies });
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(404);
    })
});

// handle get request for movie reviews
app.post('/reviews', (req, res) => {
  console.log("REQUEST", req.body, req.params);
  helpers.getReviews(req.body.movieId)
    .then((reviews) => {
      console.log(reviews);
      res.send({reviews: reviews});
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(404);
    });
});

app.get('/popular', (req, res) => {
  helpers.getPopular()
    .then((popularMovies) => res.send(popularMovies));
})

//route for user account page
app.get('/account', (req, res) => {
  res.render('account')
})


//route for login page
app.get('/login', (req, res) => {
  res.render('login')
})


//route for search results page
app.get('/results', (req, res) => {
  res.render('results')
})
