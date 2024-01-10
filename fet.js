let searchdata;
let movieCardList;

document.addEventListener("DOMContentLoaded", function () {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmM2ZkOTY3ZGY4MDk2N2YxMzhkMjEyNWI5YWRkYTdlOCIsInN1YiI6IjY1OTY5NmRmYTZjMTA0MTFhOWZhNjBjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ldu5SC3JcH2TndeO8jWD7dOAS6EPxB_EQaLFGaIpQu0"
    }
  };

  fetch(
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      movieCardList = document.getElementById("movieCardList");
      searchdata = response.results;
      response.results.forEach((movie) => {
        movieCardList.innerHTML += `
              <div class="movie-card" id="${movie.id}" onclick="movieId(${movie.id})">
                <img src="https://image.tmdb.org/t/p/w342${movie.poster_path}" alt="${movie.original_title}">  
                <h3 class="movie-title">${movie.original_title}</h3>
                <p>${movie.overview}</p>
                <p>Rating:${movie.vote_average}</p>
              </div>`;
      });
    })
    .catch((err) => console.error(err));
});
// 클릭시 alert 창
function movieId(id) {
  alert(`아이디는 : ${id}인데~~`);
}

// 검색기능 구현
function searchMovie() {
  let searchTagValue = document.getElementById("search-input").value.toLowerCase();

  const searchMovieList = searchdata.filter((movie) => {
    return movie.title.toLowerCase().includes(searchTagValue);
  });

  movieCardList.innerHTML = "";
  searchMovieList.forEach((movie) => {
    movieCardList.innerHTML += `<div class="movie-card" id="${movie.id}" onclick="movieId(${movie.id})">
      <img src="https://image.tmdb.org/t/p/w342${movie.poster_path}" alt="${movie.original_title}">  
      <h3 class="movie-title">${movie.original_title}</h3>
      <p>${movie.overview}</p>
      <p>Rating:${movie.vote_average}</p>
    </div>`;
  });

  console.log(searchMovieList);
}
