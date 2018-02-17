
function show(shown, hidden) {
  document.getElementById(shown).style.display='block';
  document.getElementById(hidden).style.display='none';
  return false;
}

function dropin(){
  $.ajax({
    type: "POST",
    url: '/app/register',
    data: {
      name: document.getElementById('name').value,
      healthNumber: document.getElementById('hCard').value,
      studentNumber: document.getElementById('sCard').value
    },
    success: function(data){
      
    }
  });
}