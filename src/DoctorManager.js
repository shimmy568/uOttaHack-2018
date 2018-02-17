function registerDoctor(datastore, username, password) {
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

function getNextPatient(datastore, username, password){
    return new Promise((res, rej) => {
        
    });
}

function loginDoctor(datastore, username, password) {
    return new Promise((res, rej) => {
        let query = datastore.createQuery('Doctor')
            .filter('username', '=', username)
            .filter('password', '=', password);
        datastore.runQuery(query).then((data) => {
            let user = data[0][0];
            if(user == null){
                res(false);
                return;
            }
            res(true);
        }).catch((err) => {
            rej(err);
        });
    });
}