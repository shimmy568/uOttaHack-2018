const express = require("express");
const Datastore = require("@google-cloud/datastore");
const userManager = require("./src/UserManager.js");
const doctorManager = require("./src/DoctorManager.js");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')

const datastore = new Datastore({
    keyFilename: "./keyfile.json"
});

const app = express();

app.use(express.static("www"));
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.get('/app/update', (req, res) => {
    if(req.cookies.userID == null){
        res.json(false);
    }else{
        userManager.loginUser(datastore, parseInt(req.cookies.userID, 10)).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({
                error: "lots"
            });
        });
    }
});

app.get('/app/queueLength', (req, res) => {
    userManager.getQueueLength(datastore).then((len) => {
        res.json(len);
    }).catch((err) => {
        res.json({
            errors: 'lots'
        });
    });
});

app.get('/app/docLoggedIn', (req, res) => {
    if(req.cookies.docLogin != null){
        res.json(true);
    }else{
        res.json(false);
    }
});

app.post('/app/docLogin', (req, res) => {
    doctorManager.loginDoctor(datastore, req.body.username, req.body.password).then((id) => {
        if(id == null){
            res.json(false);
            return;
        }
        res.cookie('docLogin', req.body.username + ":" + req.body.password, {httpOnly: true});
        res.json(true);
    }).catch((err) => {
        console.error(err);
    });
});

app.post('/app/docNext', (req, res) => {
    if(req.cookies.docLogin == null){
        res.json({
            errors: 'lots'
        });
        return;
    }else{
        let long = req.cookies.docLogin;
        let username = long.slice(0, long.indexOf(':'))
        let password = long.slice(long.indexOf(':') + 1, long.length);
        doctorManager.getNextPatient(datastore, username, password).then((user) => {
            res.json(user);
        }).catch((err) => {
            console.error(err);
        });
    }
});

app.get('/app/getCurrentPatient', (req, res) => {
    if(req.cookies.docLogin == null){
        res.json({
            errors: 'lots'
        });
        return;
    }else{
        let long = req.cookies.docLogin;
        let username = long.slice(0, long.indexOf(':'))
        let password = long.slice(long.indexOf(':') + 1, long.length);
        doctorManager.getCurrentPatient(datastore, username, password).then((info) => {
            if(info == null){
                res.json(false);
            }else{
                res.json(info);
            }
        }).catch((err) => {
            res.json({
                errors: lots
            });
        });
    }
});

app.post('/app/register', (req, res) => {
    let loginData = {
        name: req.body.name,
        healthCard: parseInt(req.body.healthNumber, 10),
        studentNumber: req.body.studentNumber
    }
    userManager.registerUser(datastore, loginData).then((resp) => {
        res.cookie('userID', resp, {httpOnly: true});
        res.json("done");
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
doctorManager.registerDoctor(datastore, 'Owen', 'password123', 69).then((id) => {
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
