function show(shown, hidden) {
    document.getElementById(shown).style.display = 'block';
    document.getElementById(hidden).style.display = 'none';
    return false;
}

function login() {
    let postData = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };
    $.ajax({
        type: "POST",
        url: '/app/docLogin',
        data: postData,
        success: function (data) {
            if (data) {
                setLoginVis(false);
                setDoctorPanelVis(true);
            }
        }
    });
}

function checkLoginStatus() {
    $.ajax({
        type: "GET",
        url: '/app/docLoggedIn',
        success: function (data) {
            if (data) {
                setDoctorPanelVis(true);
            } else {
                setLoginVis(true);
            }
        }
    });
}

function callNextIn() {
    $.ajax({
        type: "POST",
        url: '/app/docNext',
        success: function (data) {
            if (data === false) {
                setInfoVis(false);
            } else {
                setInfoVis(true);
                document.getElementById('name').innerText = data.Name;
                document.getElementById('studentNumber').innerText = data['student number'];
                document.getElementById('healthCard').innerText = data['Health card number'];
            }
        }
    });
}

function getCurrentPatient(){
    $.ajax({
        type: "GET",
        url: '/app/getCurrentPatient',
        success: function (data) {
            if (data === false) {
                setInfoVis(false);
            } else {
                setInfoVis(true);
                document.getElementById('name').innerText = data.Name;
                document.getElementById('studentNumber').innerText = data['student number'];
                document.getElementById('healthCard').innerText = data['Health card number'];
            }
        }
    });
}

getCurrentPatient();

function setLoginVis(state) {
    if (state) {
        document.getElementById('loginDiv').style.display = 'block';
    } else {
        document.getElementById('loginDiv').style.display = 'none';
    }
};

function setDoctorPanelVis(state) {
    if (state) {
        document.getElementById('doctorDiv').style.display = 'block';
    } else {
        document.getElementById('doctorDiv').style.display = 'none';
    }
};

function setInfoVis(state) {
    if (state) {
        document.getElementById('infoDiv').style.display = 'block';
    } else {
        document.getElementById('infoDiv').style.display = 'none';
    }
}

function updateQueueLength() {
    $.ajax({
        type: "GET",
        url: '/app/queueLength',
        success: function (data) {
            if(data == 0){
                document.getElementById('queueLen').innerText = "There is nobody waiting";
            }else if(data == 1){
                document.getElementById('queueLen').innerText = "There is 1 person waiting";
            } else {
                document.getElementById('queueLen').innerText = "There are " + data + " people waiting";
            }
            setTimeout(() => {
                updateQueueLength();
            }, 1000);
        }
    });
}

updateQueueLength();
checkLoginStatus();