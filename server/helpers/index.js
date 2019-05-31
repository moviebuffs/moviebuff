const axios = require('axios');
const { API_KEY } = require('../../config')

const nowPlaying = () => {
  return axios.get('https://api.themoviedb.org/3/movie/now_playing', {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      page: 1,
      region: 'US',
    }
  })
    .then((response) => {
      console.log(response);
      return response;
    }).catch((err) => {
      console.error(err);
    })
};

module.exports.nowPlaying = nowPlaying;

const getMovie = (movieName) => {
  return axios.get('https://api.themoviedb.org/3/search/movie', {
    params: {
      api_key: API_KEY,
      query: `${movieName}`,
    }
  }).then((response) => {

    return response.data.results;
  }).catch((err) => {
    console.error(err);
  })
}


const getPopular = () => {
  return axios.get('https://api.themoviedb.org/3/movie/popular', {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      page: 1,
      region: 'US'
    }
  }).then((response) => {
    console.log(response.data.results);
    return response.data.results;
  })
}

const getReviews = (movieId) => {
  return axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      page: 1,
    }
  }).then((response) => {
    console.log(response.data.results);
    return response.data.results;
  })
}
module.exports.getMovie = getMovie;
module.exports.getPopular = getPopular;
module.exports.getReviews = getReviews;
module.exports.nowPlaying = nowPlaying;
