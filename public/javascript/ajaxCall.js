// Wrap the Ajax Call in a function
// Keeps Code DRY
function ajaxCall(action, url, successCallback, sendObject){

  var request = new XMLHttpRequest();

  request.open(action, url, true);

  // do action if the ajax call is successful. Else console.log errors
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

  // if sendObject is undefined it is a get method else it is a post method
  if (sendObject === undefined) {
    request.send();
  } else {
    request.send(JSON.stringify(sendObject));
  }
}
