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
    document.getElementById('waitTime').innerText = minutes + ":" + seconds
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
                if (spotInLine != null) {
                    timeCount(data.spotInLine); 
                    timeoutLoop();
                }
                else{
                    
                }
            }
        }
    });
}
pageLoad();