// List all movies from search result

function searchMovies(){
  var movieInput = document.getElementById("inputtedMovie").value;
  var formattedmovieInput = movieInput.split(" ").join('+');
  ajaxCall('GET', "https://www.omdbapi.com/?s=" + formattedmovieInput + "&r=json", searchMoviesCallback);
}

// action after a successful ajaxCall
function searchMoviesCallback(data){
  console.log(data);
  var data = JSON.parse(data);
  createHeaders(["Title", "Year", "imdbID", "Type", "Favorite"]);
  displayDataInTable(data["Search"]);
}
