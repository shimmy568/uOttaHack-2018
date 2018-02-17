const express = require("express");
const Datastore = require("@google-cloud/datastore");
const userManager = require("./src/UserManager.js");

const datastore = new Datastore({
    keyFilename: "./keyfile.json"
});

const app = express();

app.use(express.static("www"));

app.get('/app/login', (req, res) => {

});

app.post('/app/register', (req, res) => {

});

/* userManager.registerUser(datastore, {
    studentNumber: 123456,
    healthCard: 123563
}).then((key) => {
    console.log(key);
}); */

userManager.loginUser(datastore, 5649391675244544).then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
});

/* userManager.removeUser(datastore, 5639445604728832).then(() => {
    console.log('removed');
}).catch((err) => {
    console.error(err);
}); */

//app.listen(8080);