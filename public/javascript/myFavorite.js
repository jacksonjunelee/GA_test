function myFavorite(){
  ajaxCall("GET", "favorites", myFavoriteCallback)
}

function myFavoriteCallback(data){
  console.log(data);
  var data = JSON.parse(data);
  createHeaders(["Title", "imdbID"]);
  displayDataInTable(data, "doNotDisplay");
}
