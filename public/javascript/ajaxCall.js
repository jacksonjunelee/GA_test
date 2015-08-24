// Wrap the Ajax Call in a function
// Keeps Code DRY
function ajaxCall(action, url, successCallback){
  var request = new XMLHttpRequest();

  request.open(action, url, true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      successCallback(request.responseText);
    } else {
      console.log("Estabished Connection But There is an Error");
    }
  };

  request.onerror = function() {
    console.log("Cannot establish connection to server");
  };

  request.send();
}
