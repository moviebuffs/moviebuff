const axios = require('axios');
const { API_KEY } = require('../../config')
const { User, Movie } = require('../../database');

// Database Helpers

const storeUser = (username, email) => User.create({ username, email }); // create user with params to match schema

const storeMovie = (movieTitle, movieDescription, posterPath, voteCount, voteAverage) =>
  Movie.create({ // creates database entry with params as keys to match schema
    movieTitle,
    movieDescription,
    posterPath,
    voteCount,
    voteAverage,
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
    .then(user => user.id); // use user.id when selecting user id from User table

const findMovieId = title =>
  Movie.findOne({ where: { title } })
    .then(movie => movie.id); // use movie.id when selecting movie id from Movie table


const changeVotes = (movDbId, sym) => { // change userVotes in database -- needs testing (check value Movie.userVotes)
  
  return sym === '+' ? Movie.update({ userVotes: Movie.userVotes + 1 }, { where: { id: movDbId } }) 
        : Movie.update({ userVotes: Movie.userVotes - 1 }, { where: { id: movDbId } })
}

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
