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
            pageLoad();
        }
    });
}

function pageLoad(){
    $.ajax({
        type: "GET",
        url: '/app/login',
        success: function (data) {
            console.log(data);
            data.spotInLine
            if (data == false){
                show('Page1','Page2');
            }
            else{
                show('Page2','Page1');
            }
        }
    });
}
pageLoad();