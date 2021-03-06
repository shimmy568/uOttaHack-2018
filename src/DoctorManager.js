const userManager = require('./UserManager.js');

function registerDoctor(datastore, username, password, roomNum) {
    return new Promise((res, rej) => {
        const taskKey = datastore.key('Doctor');
        const entity = {
            key: taskKey,
            data: [{
                    name: 'username',
                    value: username,
                },
                {
                    name: 'password',
                    value: password
                },
                {
                    name: 'roomNum',
                    value: roomNum
                }
            ],
        };
        datastore.save(entity).then(() => {
            res(taskKey.id);
        }).catch(err => {
            console.error('ERROR:', err);
        });
    });
}

function getCurrentPatient(datastore, username, password){
    return new Promise((res, rej) => {
        loginDoctor(datastore, username, password).then((id) => {
            let query = datastore.createQuery('User').filter('Being served by', '=', id);
            datastore.runQuery(query).then((data) => {
                res(data[0][0]);
            }).catch((err) => {
                rej(err);
            });
        }).catch((err) => {
            rej(err);
        });
    });
}

function getNextPatient(datastore, username, password) {
    return new Promise((res, rej) => {
        loginDoctor(datastore, username, password).then((id) => {
            if(id == null){
                rej('doctor not logged in');
                return;
            }
            finishServe(datastore, id);
            let query = datastore.createQuery('User')
                .filter('Being served by', '=', -1)
                .order('created');
            datastore.runQuery(query).then((resp) => {
                let first = resp[0][0];
                if (first == null) {
                    res(false);
                    return;
                }
                first['Being served by'] = id;
                res(first);
                datastore.update(first).then(() => {}).catch((err) => {
                    rej(err);
                });
            }).catch((err) => {
                rej(err);
            });
        }).catch((err) => {
            rej(err);
        });
    });
}

function loginDoctor(datastore, username, password) {
    return new Promise((res, rej) => {
        let query = datastore.createQuery('Doctor')
            .filter('username', '=', username)
            .filter('password', '=', password);
        datastore.runQuery(query).then((data) => {
            let user = data[0][0];
            if (user == null) {
                res(null);
                return;
            }
            res(user[datastore.KEY].id);
        }).catch((err) => {
            rej(err);
        });
    });
}

function finishServe(datastore, docKey){
    return new Promise((res, rej) => {
        let query = datastore.createQuery('User').filter('Being served by', '=', docKey);
        datastore.runQuery(query).then((data) => {
            let user = data[0][0];
            if(user == null){
                res(null);
                return;
            }
            userManager.removeUser(datastore, user[datastore.KEY].id);
        }).catch((err) => {
            rej(err);
        });
    });
}

exports.registerDoctor = registerDoctor;
exports.loginDoctor = loginDoctor;
exports.getNextPatient = getNextPatient;
exports.getCurrentPatient = getCurrentPatient;