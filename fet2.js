// 스크롤 맨 위
const scrollTop = document.getElementById("scrollToTopBtn");

scrollTop.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
// 넘어온 영화ID 값으로 영화 Details API 요청
let movieId = localStorage.getItem("movieId");
// 위와 같이 getItem 메소드를 사용하면 key를 통해 저장된 value 값을 불러올 수 있습니다.
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmM2ZkOTY3ZGY4MDk2N2YxMzhkMjEyNWI5YWRkYTdlOCIsInN1YiI6IjY1OTY5NmRmYTZjMTA0MTFhOWZhNjBjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ldu5SC3JcH2TndeO8jWD7dOAS6EPxB_EQaLFGaIpQu0"
  }
};

fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=ko`, options)
  .then((response) => response.json())
  .then((response) => {
    let cardReview = document.getElementById("cardReview");
    // 영화 장르 구하기
    const genreNames = response.genres.map((genre) => genre.name);
    // 국가 분류
    const countries = response.production_countries.map((country) => country.name);

    // 국가 한글로 번역
    const optionsCountries = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmE1ZGVmODMzYWZjNmVmOGQ2ZjQwY2Q0YjcwYTAzMyIsInN1YiI6IjY1OWE1MTAzYmQ1ODhiMDIwNDU3YTEwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4Hloft7510m0mwl5LvZ5P_d_BjLkkVF-oc_SRJPlZe4"
      }
    };

    fetch("https://api.themoviedb.org/3/configuration/countries?language=ko", optionsCountries)
      .then((response) => response.json())
      .then((response) => {
        const countriesTap = document.getElementById("countries");
        function getNativeName(englishName) {
          const country = response.find((item) => item.english_name === englishName);
          return country ? country.native_name : null;
        }

        const nativeName = getNativeName(...countries);
        console.log(nativeName);

        countriesTap.innerHTML += `
      <div>국가 : ${nativeName}</div>
    `;
      })
      .catch((err) => console.error(err));

    // 평점
    const voteAverage = response.vote_average;
    // 소수점 두번째까지는 나오게
    const round = Math.round(voteAverage * 100) / 100;

    cardReview.innerHTML += `
        <div class="cardBox">
            <img class="imgStyle" src="https://image.tmdb.org/t/p/original${response.backdrop_path}">
            <div><h3>${response.title}</h3></div>
            <div>개봉 : ${response.release_date}</div>
            <div id="countries"></div>
            <div>장르 : ${genreNames}</div>
            <div>상영시간 : ${response.runtime}분</div>
            <div>평점 : ✰ ${round}</div>
            <div>줄거리 : ${response.overview}</div>
        </div>`;
  })
  .catch((err) => console.error(err));

// 예고편 등등 영상자료
const optionsVideos = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmE1ZGVmODMzYWZjNmVmOGQ2ZjQwY2Q0YjcwYTAzMyIsInN1YiI6IjY1OWE1MTAzYmQ1ODhiMDIwNDU3YTEwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4Hloft7510m0mwl5LvZ5P_d_BjLkkVF-oc_SRJPlZe4"
  }
};

fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=ko`, optionsVideos)
  .then((response) => response.json())
  .then((response) => {
    const cardVideos = document.getElementById("cardVideos");
    const videoInfoArray = response.results.map((video) => ({ name: video.name, key: video.key }));
    videoInfoArray.forEach((videoInfo) => {
      cardVideos.innerHTML += `
        <div>
          <h3>${videoInfo.name}</h3>
          <iframe src="https://www.youtube.com/embed/${videoInfo.key}"></iframe>
        </div>`;
    });
  })
  .catch((err) => console.error(err));

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("reply").addEventListener("click", function (event) {
    if (event.target.id === "submitBtn") {
      const nickname = document.getElementById("nickname").value;
      const pw = document.getElementById("pw").value;
      const rating = document.getElementById("rating").value;
      const commentText = document.getElementById("comment").value;

      // 유효성 검사
      if (!nickname || !pw || rating === "별점 선택" || !commentText) {
        alert("안 쓴게 있네요!");
        return;
      }

      const newComment = document.createElement("div");
      newComment.className = "comment";
      newComment.innerHTML = `
  <strong>${nickname}</strong> (${rating}): ${commentText}
  <button class="btn btn-outline-dark" onclick="deleteComment(this)">삭제</button>`;

      const commentsList = document.getElementById("commentsList");
      commentsList.appendChild(newComment);
    }
  });
});
