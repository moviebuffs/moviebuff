//Load HTTP module
const http = require("http");
const hostname = '127.0.0.1';
const port = 3000;
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');

//Create HTTP server and listen on port 3000 for requests
const server = http.createServer((req, res) => {

    //Set the response HTTP header with HTTP status and Content type
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});
axios.get('https://api.themoviedb.org/3/search/movie', {
    params: {
        api_key: 'f2e2040f39de7b736d7468ad02b4f3c7',
        query: 'Saw',
    }
}).then((response) => {
    console.log(response);
})

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});