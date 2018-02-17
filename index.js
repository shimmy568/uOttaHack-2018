const express = require("express");
const Datastore = require("@google-cloud/datastore");
const userManager = require("./src/UserManager.js");
const doctorManager = require("./src/DoctorManager.js");
const bodyParser = require("body-parser");

const datastore = new Datastore({
    keyFilename: "./keyfile.json"
});

const app = express();

app.use(express.static("www"));
app.use(bodyParser.urlencoded());

app.get('/app/login', (req, res) => {

});

app.post('/app/register', (req, res) => {
    let loginData = {
        name: req.body.name,
        healthCard: parseInt(req.body.healthNumber, 10),
        studentNumber: parseInt(req.body.studentNumber, 10)
    }
    console.log("hey");
    userManager.registerUser(datastore, loginData).then((resp) => {
        console.log(';)');
        res.json(resp);
    }).catch((err) => {
        res.json({
            error: 'lots'
        });
    });
});

/*
userManager.registerUser(datastore, {
    studentNumber: 12384832,
    healthCard: 147732232,
    name: "Fucky MC cuntshit"
}).then((key) => {
    console.log(key);
});
*/

/*
userManager.loginUser(datastore, 5649391675244544).then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
});
*/

/* userManager.removeUser(datastore, 5639445604728832).then(() => {
    console.log('removed');
}).catch((err) => {
    console.error(err);
}); */

/*
doctorManager.registerDoctor(datastore, 'fuck', 'this').then((id) => {
    console.log(id);
}).catch((err) => {
    console.error(err);
})
*/

/*
doctorManager.getNextPatient(datastore, 'fuck', 'this').then((shit) => {
    console.log(shit);
}).catch((err) => {
    console.error(err);
});
*/

app.listen(8080);
