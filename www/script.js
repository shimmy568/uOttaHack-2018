function show(shown, hidden) {
    document.getElementById(shown).style.display = 'block';
    document.getElementById(hidden).style.display = 'none';
    return false;
}

function dropin() {
    let postData = {
        name: document.getElementById('name').value,
        healthNumber: document.getElementById('hCard').value,
        studentNumber: document.getElementById('sCard').value
    };
    $.ajax({
        type: "POST",
        url: '/app/register',
        data: postData,
        success: function (data) {
            console.log(data);
            show('Page2','Page1');
            timeoutLoop();
        }
    });
}
function timeoutLoop(){
    setTimeout(function(){
        pageLoad();
    }, 500);
}
function timeCount(s){
    let seconds = s * 425;
    let minutes = seconds / 60 | 0;
    seconds = seconds % 60;
    let secondsString = seconds + '';
    if (secondsString.length == 1){
        secondsString = ("0" + secondsString);
    }
    document.getElementById('waitTime').innerText = minutes + ":" + secondsString;
}
function pageLoad(){
    $.ajax({
        type: "GET",
        url: '/app/login',
        success: function (data) {
            console.log(data);
            if (data == false){
                show('Page1','Page2');
            }
            else{
                show('Page2','Page1');
                document.getElementById('count').innerText = data.spotInLine;
                timeCount(data.spotInLine); 
                timeoutLoop();
                if (spotInLine != null) {
                    show('line', 'noLine');
                }
                else{
                    document.getElementById('roomNum').innerText = data.roomNum;
                    document.getElementById('docName').innerText = data.docName;
                    show('noLine', 'line');
                }
            }
        }
    });
}
pageLoad();