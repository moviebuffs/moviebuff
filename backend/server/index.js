//Load HTTP module
require('dotenv').config();
const db = require('../database/index');
const path = require('path');
const http = require("http");
const hostname = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT;
const express = require('express');
const app = express();
//const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, "../../frontend/public/index.html")));
//app.use(bodyParser.json());


//listen for request on port 3000, and as a callback function have the port listened on logged
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});