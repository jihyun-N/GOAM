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

console.log("replyData", replyData);

// 저장된 댓글 페이지에 출력
if (replyData != null) {
  replyData.forEach((data, idx) => {
    const newComment = document.createElement("div");
    newComment.className = "comment";
    newComment.innerHTML = `
          <div class="input-group">
          <span class="input-group-text"><strong>${data.nickname}</strong><span>${data.rating}</span></span>
          <textarea class="form-control" aria-label="With textarea" disabled>${data.commentText}</textarea>
          <button type="button" class="btn btn-outline-dark" id="deleteBtn">삭제</button>
          </div>`;

    const commentsList = document.getElementById("commentsList");
    commentsList.appendChild(newComment);
  });
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
      alert("너무길엉~");
      return;
    }

    const newComment = document.createElement("div"); // createElement 태그 요소를 만든다.
    newComment.className = "comment"; //newComment.className <div> 클래스네임은 말그대로 클래스 네임
    newComment.innerHTML = `
          <div class="input-group">
          <span class="input-group-text"><strong>${nickname}</strong><span>${rating}</span></span>
          <textarea class="form-control" aria-label="With textarea" disabled>${commentText}</textarea>
          <button type="button" class="btn btn-outline-dark" id="deleteBtn">삭제</button>
          </div>`;

    const commentsList = document.getElementById("commentsList");
    commentsList.appendChild(newComment); // appendChild <태그>안에 요소를 하나씩만 넣을 수 있다.

    let replyData = {
      nickname,
      pw,
      rating,
      commentText
    }; // 여러가지 데이터를 하나에 넣을 수 있다.

    replyList.push(replyData); // 인덱스안에 obj를 넣는다. [{}, {}, {}, {}, {}, {}....]
    localStorage.setItem(movieId, JSON.stringify(replyList));
    // localstorage 바구니안에 동일한 key이름으로는 1개의 value만 담을 수 있는데 전역변수로 선언 한 배열 하나만 넣는다
    // 그 배열의 안에 객체(각각의 영화리뷰 1개씩을 뜻함)를 push해서 담아도 배열 1개 즉 value 1개만 된다.
    

  }
});

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

// 삭제 버튼들 선택
const deleteBtns = document.querySelectorAll("#deleteBtn");

// 삭제기능
deleteBtns.forEach((deleteBtn, index) => {
  deleteBtn.addEventListener("click", function () {
    // 선택된 버튼의 부모태그 
    const parentElement = deleteBtns[index].closest('.input-group');
    // 로컬스토리지에서 선택된 값
    const data = JSON.parse(localStorage.getItem(movieId));
    
    // data 값의 패스워드 가져오기
    const pw = data[0].pw

    function delRev(){
      const result = confirm("삭제하시겠습니까?");
      if(!result){
        alert("취소되었습니다");
        return;
      }

      const pwtext = prompt("비밀번호를 입력하세요");
      if (!pwtext) {
        alert("비밀번호가 필요합니다");
        return;
      }

      if(pwtext !== pw){
        alert("비밀번호가 틀렸습니다");
        return;
      }

      const onemore = confirm("정말 삭제하시겠습니까?");
      if(!onemore){
        alert("취소되었습니다");
        return;
      }
      // 보통 리뷰 쓰다가 지우면 새로고침은 되지않고 그거만 지워지니 지워지도록 보여주기위해 display none
      parentElement.style.display = 'none';
      // 선택된 데이터 지우기
      data.splice(index, 1);
      // 남은 데이터 최신화
      localStorage.setItem(movieId, JSON.stringify(data));
    }
    delRev();
  });
});


