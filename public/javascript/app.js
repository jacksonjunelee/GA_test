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
  dataTablerow.setAttribute("class", "top");
    for (var key in data[i]){
      var dataTableCell = document.createElement('th');
      dataTableCell.innerHTML = data[i][key];
      if (key == "Title" || key == "Year" || key == "imdbID") {
        dataTableCell.setAttribute("class", key);
      }
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
  var favoriteButton = CreateFavoriteButton()
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

function displayDataInTableForObject(data){
  var movieDiv = document.getElementById("movieList");
  movieDiv.innerHTML = "";
  var dataTable = document.createElement('table');
  dataTable.setAttribute("class", "top");
    for (var key in data){
      var dataTablerow = document.createElement('tr');
      var dataTableCell = document.createElement('th');
      if (key == "Title" || key == "Year" || key == "imdbID") {
        dataTableCell.setAttribute("class", key);
      }
      if (key == "Poster"){
        var dataTableCell = document.createElement('img');
        dataTableCell.setAttribute("src", data[key]);
      } else {
        dataTableCell.innerHTML = data[key];
      }
      dataTablerow.innerHTML = "<th>" + key + "</th>";
      dataTablerow.appendChild(dataTableCell);
      dataTable.appendChild(dataTablerow);
    }
  var dataTablerow = document.createElement('tr');
  var dataTableCell2 = document.createElement('th');
  var favoriteButton = CreateFavoriteButton();
  dataTablerow.innerHTML = "<th>" + "Favorite" + "</h1>";
  dataTablerow.appendChild(favoriteButton);
  dataTable.appendChild(dataTablerow);
  movieDiv.appendChild(dataTable);
}

function CreateFavoriteButton(){
  var favoriteButton = document.createElement("button");
  favoriteButton.setAttribute("id", "favorite");
  favoriteButton.addEventListener('click', favoriteMovie);
  favoriteButton.innerHTML = "Favorite this Movie";
  return favoriteButton;
}

function favoriteMovie(e){
  e.preventDefault();
  var item = this.closest(".top");

  favoriteMovieObject = {};
  favoriteMovieObject.name = item.getElementsByClassName("Title")[0].innerText;
  favoriteMovieObject.oid = item.getElementsByClassName("imdbID")[0].innerText;

  var request = new XMLHttpRequest();
  request.open('POST', "favorites", true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      console.log("favorited")
    } else {
      console.log("Estabished Connection But There is an Error");
    }
  };
  request.onerror = function() {
    console.log("Cannot establish connection to server");
  };
  request.send(JSON.stringify(favoriteMovieObject));

}
