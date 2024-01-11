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
      renderCard(response.results);
    })
    .catch((err) => console.error(err));
});

function renderCard(movies) {
  movieCardList.innerHTML = "";
  movies.forEach((movie) => {
    movieCardList.innerHTML += `
          <div class="movie-card" id="${movie.id}" onclick="movieIdtemp(id)">
          <div>
            <img src="https://image.tmdb.org/t/p/w342${movie.poster_path}" alt="${movie.original_title}">  
            <h3 class="movie-title">${movie.original_title}</h3>
            <p>${movie.overview}</p>
            <p>Rating:${movie.vote_average}</p>
          </div>
          </div>`;
  });
}
// 클릭시 alert 창 (일단 임시함수로 변경..)
function movieIdtemp(id) {
  localStorage.setItem("movieId", id); // 저장공간 -> 바구니
  //위와 같이 setItem 메소드를 사용하면 key와 value를 로컬 스토리지에 저장할 수 있습니다. 만약 이미 저장된 key 값이 있다면, 이전에 저장된 value 값을 대체합니다.
  let targetUrl = "mission2.html";

  location.href = targetUrl;
  // 페이지 이동하기, 새창 띄우기
  //   var link = "http://www.naver.com";
  //   location.href = link;
  //   location.replace(link);
  //   window.open(link);
  //   replace와 href의 차이는
  // href는 그대로 페이지 이동을 의미하지만,
  // replace는 현재 페이지에 덮어씌우기 때문에 replace를 사용한 다음에는 이전 페이지로 돌아갈 수 없다.
}

// 검색기능 구현
function searchMovie() {
  let searchTagValue = document.getElementById("search-input").value.toLowerCase();

  const searchMovieList = searchdata.filter((movie) => {
    return movie.title.toLowerCase().includes(searchTagValue);
  });
  renderCard(searchMovieList); // 이 함수를 통해 전역변수를 끌어다가 함수 분리 및 movieCardList.innerHTML 통합
  console.log(searchMovieList);
}
