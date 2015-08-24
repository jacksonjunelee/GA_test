function findMovieInfo(){
  var movie = this.innerText
  var formattedmovieInput = movie.split(" ").join('+');
  ajaxCall("GET", "http://www.omdbapi.com/?t=" + formattedmovieInput + "&y=&plot=full&r=json", findMovieInfoCallback)

}

// action after a successful ajaxCall
function findMovieInfoCallback(data){
  console.log(data);
  var data = JSON.parse(data);
  displayDataInTableForObject(data);
}
