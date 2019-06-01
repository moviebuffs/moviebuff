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

const grabUserVotes = movieId => 
  Movie.findAll({
    attributes: ['userVotes'],
    where: {
      id: movieId,
    },
  });

const changeVotes = (movieId, sym) => 
  sym === '+' ? Movie.update({ userVotes: Movie.userVotes + 1 }, { where: { id: movieId } }) 
    : Movie.update({ userVotes: Movie.userVotes - 1 }, { where: { id: movieId } })

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


const getReviews = movieId => // grabs movie reviews
  axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      page: 1,
    }
  })
  .then(response => response.data.results)


// module.exports.getMovie = getMovie;
// module.exports.getPopular = getPopular;
// module.exports.getReviews = getReviews;
// module.exports.nowPlaying = nowPlaying;
// module.exports.storeMovie = storeMovie;
// module.exports.storeUser = storeUser;
// module.exports.grabUserVotes = grabUserVotes;
// module.exports.changeVotes = changeVotes;

module.exports = {
  getMovie,
  getPopular,
  getReviews,
  nowPlaying,
  storeMovie,
  storeUser,
  grabUserVotes,
  changeVotes
}
