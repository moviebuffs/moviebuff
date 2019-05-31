const axios = require('axios');

axios.get('https://api.themoviedb.org/3/search/movie', {
    params: {
        api_key: 'f2e2040f39de7b736d7468ad02b4f3c7',
        query: 'Saw',
    }
}).then((response) => {
    console.log(response);
}).catch((err) => {
    console.error(err);
})

const nowPlaying = () => {
    return axios.get('https://api.themoviedb.org/3/movie/now_playing', {
        params: {
            api_key: 'f2e2040f39de7b736d7468ad02b4f3c7',
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

// nowPlaying();

module.exports.nowPlaying = nowPlaying;
