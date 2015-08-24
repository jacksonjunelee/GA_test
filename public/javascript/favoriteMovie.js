function favoriteMovie(e){
  e.preventDefault();
  var item = this.closest(".top");

  favoriteMovieObject = {};
  favoriteMovieObject.name = item.getElementsByClassName("Title")[0].innerText;
  favoriteMovieObject.oid = item.getElementsByClassName("imdbID")[0].innerText;

  ajaxCall("POST", "favorites", favoriteMovieCallback, favoriteMovieObject)
}


// action after a successful ajaxCall
function favoriteMovieCallback(){
  console.log("Save to data.json");
}
