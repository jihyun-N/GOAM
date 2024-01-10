// let movieCardListData;
// let searchMovieListData;
// let movieCardList;

let searchdata;
let movieCardList; // 전역 변수로 선언 함으로써 카드 이미지를 검색구현의 가져갈수 있음
// document.addEventListener : 해당 요소에서 이벤트가 발생했을 때 호출할 함수를 등록합니다.
// DOMContentLoaded <= Dom이 Content가 Loaded 로딩이 되었을때 가 이벤트**
document.addEventListener("DOMContentLoaded", function () {
  // options는 tmdb api 명세의 기본 틀에 존재하기에 필요합니다.
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmM2ZkOTY3ZGY4MDk2N2YxMzhkMjEyNWI5YWRkYTdlOCIsInN1YiI6IjY1OTY5NmRmYTZjMTA0MTFhOWZhNjBjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ldu5SC3JcH2TndeO8jWD7dOAS6EPxB_EQaLFGaIpQu0"
    }
  };

  /**
   * 데이터 불러오기(fetch)
   */
  fetch(
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
    options
  )
    .then((response) => response.json()) // then -> 그리고나서 실행하겠다.
    .then((response) => {
      // 1.
      movieCardList = document.getElementById("movieCardList"); // 태그
      searchdata = response.results;
      // 2.
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
  //  alt 해당 이미지를 위한 대체 텍스트를 명시함.
  // 내부 fetch에서 rated 영화 데이터를 못 가져오면 에러를 밷습니다.
});

function movieId(id) {
  alert(`아이디는 : ${id}인데~~`);
} // 함수의 매개변수 id는 34열 온클릭 이벤트의 함수를 넣어 매게변수를 받는다.

// 검색 버틍 클릭시 콘솔로 알림이 뜬다.
function searchMovie() {
  // 인풋에서 텍스트 입력이 텍스트를 콘솔로 뜨게하기.
  let searchTagValue = document.getElementById("search-input").value.toLowerCase(); // 검색어 (검색어 다 소문자로)

  const searchMovieList = searchdata.filter((movie) => {
    // id = search-input 이 검색 될수 있도록 돔요소를 사용
    // 인풋의 값(value)를 반환하려고 값을 표기
    // 20개의 카드를 사용하기 위해 위에 스크립트에서 forEach문을 돌린 객체를 전역 변수로 돌려서 끌어옴
    // filter 메소드를 사용하여 원하는 객체만 반환\

    return movie.title.toLowerCase().includes(searchTagValue); // 다 소문자
    // 리턴은 true를 반환한다.
    // return false를 하게 되면 빈 배열이 되어 버린다.
  });

  // movieCarList 안에 있는 태그들 싹 지우고 다시 searchMovieList 배열 안에 있는 영화들로 재배치
  movieCardList.innerHTML = ""; // 라우팅 초기화 설정 즉 빈 문자열을 줘서 안에 태그들을 지우는 코딩
  searchMovieList.forEach((movie) => {
    movieCardList.innerHTML += `<div class="movie-card" id="${movie.id}">
      <img src="https://image.tmdb.org/t/p/w342${movie.poster_path}" alt="${movie.original_title}">  
      <h3 class="movie-title">${movie.original_title}</h3>
      <p>${movie.overview}</p>
      <p>Rating:${movie.vote_average}</p>
    </div>`;
  }); // 값 이 무비카드가 들어오도록

  console.log(searchMovieList);
}

// /**
//  * 검색 함수
//  */
// function searchMovie() {
//   // 1. 검색버튼 누르면 첫번쨰로 input에 있는 text를 읽어와보자
//   //   조건 : 아무것도 없을 때는 그냥 null로 들어옴
//   let inputIdValue = document.getElementById("search-input").value; // 검색어

//   searchMovieListData = movieCardListData.filter((searchMovie) => {
//     return searchMovie.title.includes(inputIdValue);
//   });

//   movieCardList = document.getElementById("movieCardList"); // 태그

//   movieCardList.innerHTML = "";

//   searchMovieListData.forEach((movie) => {
//     movieCardList.innerHTML += `
//                   <div class="movie-card" id="${movie.id}">
//               <img src="https://image.tmdb.org/t/p/w342${movie.poster_path}" alt="${movie.original_title}">
//               <h3 class="movie-title">${movie.original_title}</h3>
//               <p>${movie.overview}</p>
//               <p>Rating:${movie.vote_average}</p>
//           </div>`;
//   })

// }

// https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg

// https://image.tmdb.org/t/p/w500/sRLC052ieEzkQs9dEtPMfFxYkej.jpg
// https://image.tmdb.org/t/p/w500/ui4DrH1cKk2vkHshcUcGt2lKxCm.jpg
// "/sRLC052ieEzkQs9dEtPMfFxYkej.jpg"
// "/ui4DrH1cKk2vkHshcUcGt2lKxCm.jpg"

// 'https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=f3fd967df80967f138d2125b9adda7e8'

// document.addEventListener("DOMContentLoaded", function(){ ... 코드});
