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
const { // pull all backend helper functions for server and database interaction
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
  const { title, overview, poster_path, vote_count, vote_average } = req.body;
  storeMovie( // store movie data in database relative to schema
    title,
    overview,
    poster_path,
    vote_count,
    vote_average
  )
  .then(() => res.send(201))
  .catch(error => {
    console.error(error);
    res.sendStatus(500);
  })
});

app.post('/users', (req, res) => {
  const { username, email } = req.body; // pull username and email from body sent from frontend
  storeUser(username, email) // store user info into database
    .then(() => res.send(201))
    .catch(error => {
      console.error(error);
      res.sendStatus(500);
    })
})

app.put('/votes', (req, res) => {
  changeVotes(); // more logic needed
  grabUserVotes();
  // respond with changed object
})

app.get('/now-playing', (req, res) => {
  nowPlaying()
    .then(movies => {
      const { results } = movies.data; // pull results from movies.data
      const currentMovies = results.map(movie => { // return an array of objects for each movie
        console.log(movie);
        return {
          movieId: movie.id,
          title: movie.title,
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

// testing needed
app.get('/movie/:movieName', (req, res) => { // route that points to a movie name search
  const { movieName } = req.params; // pull movieName from body sent from front end
  getMovie(movieName)
    .then(searchResults => {
      const searchedMovies = searchResults.map(movie => {
        return {
          movieId: movie.id,
          title: movie.title,
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
      res.sendStatus(500);
    })
});

app.post('/reviews', (req, res) => { // Testing needed -- edge case and destructuring
  const { movieId } = req.body; // pull movieId from body sent from front end
  getReviews(movieId)
    .then(reviews => {
      // test edgecase of no reviews in front end
      const shortReviews = reviews.map(review => { // format reviews into array of objects containing shortened reviews
        return { 
          author: review.author,
          content: review.content.substring(0, 500) + '...',
          url: review.url,
        }
      });
      res.send({reviews: shortReviews}); // respond with reviews array stored on an object
    })
    .catch(error => {
      console.error(error);
      res.sendStatus(500);
    });
});

app.get('/popular', (req, res) => { 
  getPopular()
    .then(popularMovies => res.send(popularMovies)); // send back popular movies
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
