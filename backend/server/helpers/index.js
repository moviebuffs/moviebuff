const axios = require('axios');


const getMovie = (movieName) => {
    return axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
            api_key: 'f2e2040f39de7b736d7468ad02b4f3c7',
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
            api_key: 'f2e2040f39de7b736d7468ad02b4f3c7',
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
            api_key: 'f2e2040f39de7b736d7468ad02b4f3c7',
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