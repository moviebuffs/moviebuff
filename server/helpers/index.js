const axios = require('axios');
const { API_KEY } = require('../../config')
const { User, Movie } = require('../../database');

// Database Helpers

const storeUser = (username, email) => User.create({ username, email }); // create user with params to match schema

const storeMovie = (title, movieDescription, posterPath, voteCount, voteAverage, userVotes = 0) =>
  Movie.create({ // creates database entry with params as keys to match schema
    title,
    movieDescription,
    posterPath,
    voteCount,
    voteAverage,
    userVotes
  });

const grabUserVotes = movDbId => // param passed in is the movie id from db
  Movie.findAll({ // grab current userVotes value for a given movie by its id that is stored on the database
    attributes: ['userVotes'],
    where: {
      id: movDbId,
    },
  });

const findUserId = username => 
  User.findOne({ where: { username } })
    .then(user => user.id); // sends back id of the user that matches username on User table

const findMovieId = title =>
  Movie.findOne({ where: { title } })
    .then(movie => movie.id); // sends back id of the movie that matches title on Movie table

const changeVotes = (movDbId, sym) =>  // change userVotes in database -- Expects sym to be 1 or -1 -- Handles string edge case for sym value
  Movie.increment('userVotes', { by: Number(sym), where: { id: movDbId } }) // increments the userVotes of the movie matching the movie id
    .then(movie => movie.id);


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
  findMovieId
}
