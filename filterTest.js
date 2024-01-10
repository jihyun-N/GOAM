const moiveArr = [
  {
    id: 1,
    movieName: "귀멸의칼날"
  },
  {
    id: 2,
    movieName: "진격의거인"
  },
  {
    id: 3,
    movieName: "반지의제왕"
  },
  {
    id: 4,
    movieName: "어벤저스1"
  },
  {
    id: 5,
    movieName: "어벤저스2"
  },
  {
    id: 6,
    movieName: "외계인"
  },
  {
    id: 7,
    movieName: "외계인2"
  }
];

const searchMovie = moiveArr.filter((newMovie) => {
  console.log("-------------------------");
  console.log("자 fileter~돕니다~~~~");
  console.log(newMovie);
  console.log("newMoive 콘솔 찍고 난 바로 다음");
  console.log("-------------------------");
  //    return newMovie.id >= 3 && newMovie.id <= 5 ? true : false;
  // [
  //   { id: 3, movieName: '반지의제왕' },
  //   { id: 4, movieName: '어벤저스1' },
  //   { id: 5, movieName: '어벤저스2' }
  // ]

  return newMovie.movieName.includes("의");
});
console.log("-----------------------------------");
console.log(searchMovie);

// let nameStr = "남지현";
// nameStr.includes("지"); // true
// nameStr.includes("지현"); // true
// nameStr.includes("현지"); // false
// nameStr.includes("남현지"); // false
