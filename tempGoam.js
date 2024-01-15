// 스크롤 맨 위
const scrollTop = document.getElementById("scrollToTopBtn");

scrollTop.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* 전역변수 */
// 넘어온 영화ID 값으로 영화 Details API 요청 (아래와 같이 localStorage.getItem 메소드를 사용하면 localStorage저장소에서 key를 통해 저장된 value 값을 불러올 수 있습니다.)
const movieId = localStorage.getItem("movieId");
const replyData = JSON.parse(localStorage.getItem(movieId));
const replyList = []; // 리뷰 작성 값을 담기 위해 전역 배열로 선언

// 함수안에 지역변수로 선언하면 함수가 호출될 때마다 지역변수가 새로 정의되고 초기화 됨
// 그래서 전역변수로 선언하여 계속 배열에 담는다.

// 저장된 댓글 페이지에 출력
if (replyData != null) {
  replyData.forEach((data, idx) => {
    // div
    const newComment = createCommentElement(data);

    const commentsList = document.getElementById("commentsList");
    commentsList.appendChild(newComment);
  });
}

/**
 * Helper function to create a comment element.
 * @param {Object} data - Comment data { nickname, pw, rating, commentText }.
 */
function createCommentElement(data) {
  const newComment = document.createElement("div");
  newComment.setAttribute("class", "input-group comment");
  // span
  const $readSpanStrong = document.createElement("span");
  $readSpanStrong.setAttribute("class", "input-group-text");
  $readSpanStrong.innerHTML = `<strong>${data.nickname}</strong><span>${data.rating}</span>`;
  // textarea
  const $readTextarea = document.createElement("textarea");
  $readTextarea.setAttribute("class", "form-control");
  $readTextarea.setAttribute("aria-label", "With textarea");
  $readTextarea.setAttribute("disabled", "true");
  $readTextarea.innerText = `${data.commentText}`;
  // 버튼만들기
  const $readButton = document.createElement("button");
  $readButton.setAttribute("type", "button");
  $readButton.setAttribute("class", "btn btn-outline-dark");
  $readButton.addEventListener("click", function () {
    // 선택된 버튼의 부모태그
    const parentElement = $readButton.closest(".input-group");
    // 선택된 태그 안의 이름, 평점, 리뷰 가져오기
    const nicknameElement = parentElement.querySelector("strong");
    const ratingElement = parentElement.querySelector("span span");
    const commentTextElement = parentElement.querySelector("textarea");

    // 로컬스토리지에서 선택된 값
    const data = JSON.parse(localStorage.getItem(movieId));
    // 이름, 평점, 리뷰 내용 가져오기
    const nickname = nicknameElement.textContent;
    const rating = ratingElement.textContent;
    const commentText = commentTextElement.value;

    let realData = 0;

    // 선택된 태그와 로컬스토리지의 값이 같은거 찾기
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (item.nickname === nickname && item.rating === rating && item.commentText === commentText) {
        realData = i;
        break;
      }
    }

    // data 값의 패스워드 가져오기
    const pw = data[realData].pw;

    function delRev() {
      const result = confirm("삭제 해줭??");
      if (!result) {
        alert("없애지마~~");
        return;
      }

      const pwtext = prompt("비번~~");
      if (!pwtext) {
        alert("취소~");
        return;
      }

      if (pwtext !== pw) {
        alert("비번 알아와~");
        return;
      }

      const onemore = confirm("이젠 돌이킬 수 없는데?");
      if (!onemore) {
        alert("삭제 취소용");
        return;
      } else {
        alert("흑 ㅠㅠ");
      }
      // 보통 리뷰 쓰다가 지우면 새로고침은 되지않고 그거만 지워지니 지워지도록 보여주기위해 display none
      parentElement.style.display = "none";
      // 선택된 데이터 지우기
      data.splice(realData, 1);
      // 남은 데이터 최신화
      localStorage.setItem(movieId, JSON.stringify(data));
    }
    delRev();
  });
  $readButton.innerText = `삭제`;

  // 위에 만든것들 각각 넣기
  newComment.append($readSpanStrong);
  newComment.append($readTextarea);
  newComment.append($readButton);

  return newComment;
}

// API에 던질 옵션 Param
const defaultOptions = {
  method: "GET",
  headers: {
    accept: "application/json"
  }
};

const requestOptions = {
  1: { ...defaultOptions }, // 영화 디테일 Param
  2: { ...defaultOptions } // 국가 한글로 번역 Param, 예고편 등등 영상자료 Param
};

requestOptions[1].headers.Authorization =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmM2ZkOTY3ZGY4MDk2N2YxMzhkMjEyNWI5YWRkYTdlOCIsInN1YiI6IjY1OTY5NmRmYTZjMTA0MTFhOWZhNjBjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ldu5SC3JcH2TndeO8jWD7dOAS6EPxB_EQaLFGaIpQu0";
requestOptions[2].headers.Authorization =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmE1ZGVmODMzYWZjNmVmOGQ2ZjQwY2Q0YjcwYTAzMyIsInN1YiI6IjY1OWE1MTAzYmQ1ODhiMDIwNDU3YTEwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4Hloft7510m0mwl5LvZ5P_d_BjLkkVF-oc_SRJPlZe4";

const commentsList = document.getElementById("commentsList");

// 리뷰 작성 버튼
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

    if (nickname.length > 5) {
      alert("닉네임 너무길엉~");
      return;
    }

    if (pw.length > 11) {
      alert("비번 너무길엉~");
      return;
    }

    if (pw.length < 5) {
      alert("비번 너무짧엉~");
      return;
    }

    const newComment = createCommentElement({ nickname, pw, rating, commentText });
    commentsList.appendChild(newComment);

    let replyData = {
      nickname,
      pw,
      rating,
      commentText
    };

    replyList.push(replyData); // 인덱스안에 obj를 넣는다. [{}, {}, {}, {}, {}, {}....]
    localStorage.setItem(movieId, JSON.stringify(replyList));
    // 그 배열의 안에 객체(각각의 영화리뷰 1개씩을 뜻함)를 push해서 담아도 배열 1개 즉 value 1개만 된다.
    // history.scrollRestoration = "auto";
    // location.reload(true);

    // Clear input fields
    clearInputFields();
  }
});

// ... (previous code)

//입력 필드 클리어
function clearInputFields() {
  document.getElementById("nickname").value = "";
  document.getElementById("pw").value = "";
  document.getElementById("rating").value = "별점 선택";
  document.getElementById("comment").value = "";
}

/** API fetch 함수 */
// 영화 단건 디테일 API
fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=ko`, requestOptions[1])
  .then((response) => response.json())
  .then((response) => {
    const detailInfo = document.getElementById("cardReview");
    // 영화 장르 구하기
    const genreNames = response.genres.map((genre) => genre.name);
    // 국가 분류
    const countries = response.production_countries.map((country) => country.name);

    // 국가 한글로 번역 API
    fetch("https://api.themoviedb.org/3/configuration/countries?language=ko", requestOptions[2])
      .then((response) => response.json())
      .then((response) => {
        const countriesTap = document.getElementById("countries");
        function getNativeName(englishName) {
          const country = response.find((item) => item.english_name === englishName);
          return country ? country.native_name : null;
        }

        const nativeName = getNativeName(...countries);

        countriesTap.innerHTML += `국가 : ${nativeName}`;
      })
      .catch((err) => console.error(err));

    // 평점
    const voteAverage = response.vote_average;
    // 소수점 두번째까지는 나오게
    const round = Math.round(voteAverage * 100) / 100;

    const back = document.getElementById("back");
    back.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${response.backdrop_path})`;
    const title = document.createElement("h1");
    title.textContent = `${response.title}`;
    back.appendChild(title);

    //position: absolute 레이어를 하나 더 생성하는 개념. 위 레이어랑 아래 레이어는 분리 됨
    detailInfo.innerHTML += `
    <div style="position: absolute; top: 350px; left: 80%;">
      <img src="https://image.tmdb.org/t/p/w185${response.poster_path}" alt="${response.original_title}">
    </div>
    <div class="grdHz">
      <div>
        <span>평점 : ✰ ${round}</span>
        <br>
        <span>${response.overview}</span>
      </div>
      <div>
        <span>개봉 : ${response.release_date}</span>
        <br>
        <span id="countries"></span>
        <br>
        <span>장르 : ${genreNames}</span>
        <br>
        <span>상영시간 : ${response.runtime}분</span>
      </div>
    </div>
  `;
  })
  .catch((err) => console.error(err));

// 예고편 등등 영상자료 API
fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=ko`, requestOptions[2])
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
