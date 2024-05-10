
function creerXMLHttpRequete()
 {
  var xhr;
  if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
  } else {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  return xhr;
}


function deconnection()
{
  var xhr = creerXMLHttpRequete();
  xhr.onreadystatechange = function()
  {
    if (this.readyState == 4 && this.status == 200) 
    {
      window.location.reload();
    }
  };

    xhr.open("POST", "../(DE)connexion/confirmLogout.php", true);
    xhr.send();
  }