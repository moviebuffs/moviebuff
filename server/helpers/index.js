const axios = require('axios');
const { API_KEY } = require('../../config')
const { User, Movie } = require('../../database');

const storeUser = (username, email) => User.create({ username, email }); // create user with params to match schema

const storeMovie = (movieTitle, movieDescription, posterPath, voteCount, voteAverage) =>
  Movie.create({ // creates database entry with params as keys to match schema
    movieTitle,
    movieDescription,
    posterPath,
    voteCount,
    voteAverage
  });

const nowPlaying = () => 
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


const getMovie = movieName => 
  axios.get('https://api.themoviedb.org/3/search/movie', {
    params: {
      api_key: API_KEY,
      query: `${movieName}`,
    }
  })
  .then(response => response.data.results)
  .catch(err => console.error(err))



const getPopular = () => 
  axios.get('https://api.themoviedb.org/3/movie/popular', {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      page: 1,
      region: 'US'
    }
  })
  .then(response => response.data.results)


const getReviews = movieId => 
  axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      page: 1,
    }
  })
  .then(response => response.data.results)


module.exports.getMovie = getMovie;
module.exports.getPopular = getPopular;
module.exports.getReviews = getReviews;
module.exports.nowPlaying = nowPlaying;
module.exports.storeMovie = storeMovie;
module.exports.storeUser = storeUser;
