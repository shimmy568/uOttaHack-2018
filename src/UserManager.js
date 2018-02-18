function registerUser(datastore, data) {
    return new Promise((res, rej) => {
        const taskKey = datastore.key('User');
        const entity = {
            key: taskKey,
            data: [{
                    name: 'created',
                    value: new Date().getTime(),
                },
                {
                    name: 'student number',
                    value: data.studentNumber,
                    excludeFromIndexes: true
                },
                {
                    name: "Name",
                    value: data.name
                },
                {
                    name: 'Health card number',
                    value: data.healthCard,
                    excludeFromIndexes: true
                },
                {
                    name: 'Being served by',
                    value: -1
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

function loginUser(datastore, key) {
    return new Promise((res, rej) => {
        console.log(key);
        // Find the user and return the first task
        let query = datastore.createQuery('User').filter('__key__', '=', datastore.key(['User', key]));
        datastore.runQuery(query).then((data) => {
            const tasks = data[0];
            if(tasks == []){
                res(false);
                return;
            }
            let userLoggingIn = tasks[0];
            console.log(userLoggingIn);
            let bigQuery = datastore.createQuery('User').filter('Being served by', '=', -1).order('created');
            datastore.runQuery(bigQuery).then((data) => {
                const allUsersInWait = data[0];
                let pos = 1;
                allUsersInWait.forEach((user) => {
                    if (userLoggingIn['created'] == user['created']) {
                        res({
                            spotInLine: pos
                        });
                    } else {
                        pos += 1;
                    }
                });
            });
        }).catch((err) => {
            rej(err);
        });
    });
}

function removeUser(datastore, key) {
    console.log(key);
    return new Promise((res, rej) => {
        let keyDel = datastore.key(['User', key]);
        datastore.delete(keyDel).then(() => {
            res();
        }).catch((err) => {
            rej(err);
        });
    });
}

exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.removeUser = removeUser;