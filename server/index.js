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
const { 
  getMovie,
  getPopular,
  getReviews,
  nowPlaying,
  storeMovie,
  storeUser,
  grabUserVotes,
  changeVotes 
} = require('./helpers/index');

app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(bodyParser.json());

//listen for request on port 3000, and as a callback function have the port listened on logged
app.listen(port, hostname, () => console.log(`Server running at http://${hostname}:${port}/`));

app.post('/movies', (req, res) => { // More logic needed
  const movie = req.body;
  storeMovie( // store movie data in database relative to schema
    movie.title,
    movie.overview,
    movie.poster_path,
    movie.vote_count,
    movie.vote_average
  )
});

app.post('/users', (req, res) => {
  storeUser(); // more logic needed
})

app.put('/votes', (req, res) => {
  changeVotes(); // more logic needed
  grabUserVotes();
})

app.get('/now-playing', (req, res) => {
  nowPlaying().then(movies => {
    const { results } = movies.data; // pull results from movies.data with destructuring
    const currentMovies = results.map(movie => { // return an array of objects for each movie
      console.log(movie);
      return {
        movieId: movie.id,
        originalTitle: movie.title,
        overview: movie.overview,
        posterPath: movie.poster_path,
        voteAvg: movie.vote_average,
        voteCount: movie.vote_count,
      }
    });
    res.json({ data: currentMovies }); // respond with object movie data
  })
    .catch(error => {
      console.error(error);
      res.sendStatus(500);
    })
});

//GET request for movie and movie review simultaneously
app.get('/movie/:movieName', (req, res) => {
  getMovie(req.params.movieName)
    .then(searchResults => {
      const searchedMovies = searchResults.map(movie => {
        return {
          movieId: movie.id,
          originalTitle: movie.title,
          overview: movie.overview,
          posterPath: movie.poster_path,
          voteAvg: movie.vote_average,
          voteCount: movie.vote_count,
        }
      });

      res.json({ data: searchedMovies });
    })
    .catch(error => {
      console.error(error);
      res.sendStatus(404);
    })
});

// handle get request for movie reviews
app.post('/reviews', (req, res) => {
  getReviews(req.body.movieId)
    .then(reviews => {
      const shortReviews = reviews.map(review => {
        return {
          author: review.author,
          content: review.content.substring(0, 500) + '...',
          url: review.url,
        }
      });
      res.send({reviews: shortReviews});
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(404);
    });
});

app.get('/popular', (req, res) => {
  getPopular()
    .then(popularMovies => res.send(popularMovies));
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
