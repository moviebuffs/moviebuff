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
