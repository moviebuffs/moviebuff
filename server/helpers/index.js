const axios = require('axios');
const { API_KEY } = require('../../config')
const { User, Movie, UsersMovies } = require('../../database');

// Database Helpers

// Creation Functions

const storeUser = (username, email) => User.findOrCreate({ // create user with params to match schema
  where: { email }, 
  defaults: { username, email }
}); 

const storeMovie = (title, movieDescription, posterPath, voteCount, voteAverage) =>
  Movie.findOrCreate({ // creates database entry with params as keys to match schema
    where: { title },
    defaults: { 
      title,
      movieDescription,
      posterPath,
      voteCount,
      voteAverage,
    }
});

const storeUsersMovies = (uDbId, movDbId) => 
  UsersMovies.findOrCreate({ 
    where: { userId: uDbId, movieId: movDbId }, 
    defaults: { userId: uDbId, movieId: movDbId }
  })


// Retrieval functions

const grabUserVotes = movDbId => // param passed in is the movie id from database 
  Movie.findAll({ // grab current userVotes value for a given movie by its id that is stored on the database
    attributes: ['userVotes'],
    where: {
      id: movDbId,
    },
  });

const findUserId = email => 
  User.findOne({ where: { email } })
    .then(user => user.id); // sends back id of the user that matches username on User table

const findMovieId = title =>
  Movie.findOne({ where: { title } })
    .then(movie => movie.id); // sends back id of the movie that matches title on Movie table

// Update functions

const changeVotes = (movDbId, numFlag) =>  // change userVotes in database -- Expects numFlag to be 1 or -1 -- Handles string edge case for numFlag value
  Movie.increment('userVotes', { by: Number(numFlag), where: { id: movDbId } }) // increments the userVotes of the movie matching the movie id
    .then(movie => movie[0][0][0].id); // No idea why the model object is this deeply nested but it is. Leave this alone. It works


// API Helpers

const nowPlaying = () => // grabs movies that are currently playing
  axios.get('https://api.themoviedb.org/3/movie/now_playing', {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      page: 1,
      region: 'US',
    }
  })
  .then(response => response)
  .catch(err => console.error(err))


const getMovie = movieName => // grabs searched movies
  axios.get('https://api.themoviedb.org/3/search/movie', {
    params: {
      api_key: API_KEY,
      query: `${movieName}`,
    }
  })
  .then(response => response.data.results)
  .catch(err => console.error(err))

const getPopular = () => // grabs popular movies
  axios.get('https://api.themoviedb.org/3/movie/popular', {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      page: 1,
      region: 'US'
    }
  })
  .then(response => response.data.results)

const getReviews = movieId => // param passed in is the movie id from api call
  axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, { // grabs movie reviews
    params: {
      api_key: API_KEY,
      language: 'en-US',
      page: 1,
    }
  })
  .then(response => response.data.results)

module.exports = {
  getMovie,
  getPopular,
  getReviews,
  nowPlaying,
  storeMovie,
  storeUser,
  grabUserVotes,
  changeVotes,
  findUserId,
  findMovieId,
  storeUsersMovies
}
