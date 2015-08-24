window.onload = function() {
  console.log('I am loaded');
  document.getElementById("search").addEventListener('click', findMovies);
};

// List Movies from search result

function findMovies(){
  var movieInput = document.getElementById("inputtedMovie").value;
  var formattedmovieInput = movieInput.split(" ").join('+');
  var request = new XMLHttpRequest();
  request.open('GET', "http://www.omdbapi.com/?s=" + formattedmovieInput + "&r=json", true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      console.log(request.responseText);
      var data = JSON.parse(request.responseText);
      createHeaders(["Title", "Year", "imdbID", "Type", "Favorite"]);
      displayDataInTable(data["Search"]);
    } else {
      console.log("Estabished Connection But There is an Error");
    }
  };

  request.onerror = function() {
    console.log("Cannot establish connection to server");
  };

  request.send();
}

// Creates and appends the Headers for the table
function createHeaders(dataTableCellArray){
  var movieDiv = document.getElementById("movieList");
  movieDiv.innerHTML = "";
  var dataTable = document.createElement('table');
  var dataTablerow = document.createElement('tr');
  for (var i = 0; i < dataTableCellArray.length; i++){
    var dataTableCell = document.createElement('th');
    dataTableCell.innerHTML = dataTableCellArray[i];
    dataTablerow.appendChild(dataTableCell);
  }
  dataTable.appendChild(dataTablerow);
  movieDiv.appendChild(dataTable);
}

// Appends the Movie data to the Table
function displayDataInTable(data){
  var dataTable = document.getElementsByTagName('table')[0];
  for (var i = 0; i < data.length; i++){
  var dataTablerow = document.createElement('tr');
    for (var key in data[i]){
      var dataTableCell = document.createElement('th');
      dataTableCell.innerHTML = data[i][key];
      if (key == "Title") {
        var dataTableCellLink = document.createElement('a');
        dataTableCellLink.setAttribute("id", "movieSearch");
        dataTableCellLink.setAttribute("href", "#");
        dataTableCellLink.addEventListener('click', findMovie);
        dataTableCellLink.appendChild(dataTableCell);
        dataTableCell = dataTableCellLink;
      }
      dataTablerow.appendChild(dataTableCell)
    }
  var favoriteButton = document.createElement("button");
  favoriteButton.setAttribute("id", "favorite");
  favoriteButton.addEventListener('click', favoriteMovie);
  favoriteButton.innerHTML = "Favorite this Movie";
  dataTableCell.appendChild(favoriteButton);
  dataTable.appendChild(dataTablerow);
  }
}

function findMovie(){
  var movie = this.innerText
  var formattedmovieInput = movie.split(" ").join('+');
  var request = new XMLHttpRequest();
  request.open('GET', "http://www.omdbapi.com/?t=" + formattedmovieInput + "&y=&plot=full&r=json", true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      console.log(request.responseText)
      var data = JSON.parse(request.responseText);
      createHeadersInObject(["Title", "Year", "Rated", "Released", "Runtime", "Genre", "Director", "Writer", "Actors", "Plot", "Language", "Country", "Awards", "Poster", "Metascore", "imdbRating", "imdbRatingVotes", "imdbID", "Type", "Favorite"]);
      displayDataInTableForObject(data);
    } else {
      console.log("Estabished Connection But There is an Error");
    }
  };

  request.onerror = function() {
    console.log("Cannot establish connection to server");
  };

  request.send();
}

function createHeadersInObject(dataTableCellArray){
  var movieDiv = document.getElementById("movieList");
  movieDiv.innerHTML = "";
  var dataTable = document.createElement('table');
  for (var i = 0; i < dataTableCellArray.length; i++){
    var dataTablerow = document.createElement('tr');
    var dataTableCell = document.createElement('th');
    dataTableCell.innerHTML = dataTableCellArray[i];
    dataTablerow.appendChild(dataTableCell);
    dataTable.appendChild(dataTablerow);
  }
  movieDiv.appendChild(dataTable);
}

function displayDataInTableForObject(data){
  var movieDiv = document.getElementById("movieList");
  movieDiv.innerHTML = "";
  var dataTable = document.createElement('table');
    for (var key in data){
      var dataTablerow = document.createElement('tr');
      var dataTableCell = document.createElement('th');
      dataTableCell.innerHTML = data[key];
      dataTablerow.appendChild(dataTableCell)
    }
  var favoriteButton = document.createElement("button");
  favoriteButton.setAttribute("id", "favorite");
  favoriteButton.innerHTML = "Favorite this Movie";
  dataTableCell.appendChild(favoriteButton);
  dataTable.appendChild(dataTablerow);
}

function favoriteMovie(){
  debugger;

  favoriteMovieObject = {};
  favoriteMovieObject.Title =
  favoriteMovieObject.Year =
  favoriteMovieObject.imdbID

  var request = new XMLHttpRequest();
  request.open('POST', "/favorite", true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      createHeaders(["Title", "Year", "Rated", "Released", "Runtime", "Genre", " Director", "Writer", "Actors", "Plot", "Language", "Country", "Awards", "Favorite"]);
      displayDataInTable(data);
    } else {
      console.log("Estabished Connection But There is an Error");
    }
  };

  request.onerror = function() {
    console.log("Cannot establish connection to server");
  };

  request.send(data);

}
