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
            if(data){
                setLoginVis(false);
                setDoctorPanelVis(true);
            }
        }
    });
}

function checkLoginStatus(){
    $.ajax({
        type: "GET",
        url: '/app/docLoggedIn',
        success: function (data) {
            console.log(data);
            if(data){
                setDoctorPanelVis(true);
            }else{
                setLoginVis(true);
            }
        }
    });
}

function setLoginVis(state){
    if(state){
        document.getElementById('loginDiv').style.display = 'block';    
    }else{
        document.getElementById('loginDiv').style.display = 'none';    
    }
};

function setDoctorPanelVis(state){
    if(state){
        document.getElementById('doctorDiv').style.display = 'block';    
    }else{
        document.getElementById('doctorDiv').style.display = 'none';    
    }
};

checkLoginStatus();