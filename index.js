const express = require("express");
const Datastore = require("@google-cloud/datastore");

const datastore = new Datastore({
    keyFilename: "./../keyfile.json"
});

const app = express();

app.use(express.static("www"));

app.post('/app/login', (req, res) => {
    
});