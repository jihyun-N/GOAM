document.addEventListener("DOMContentLoaded", function () {
  const clockContainer = document.querySelector("#clock");

  function getTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    clockContainer.innerText = hours + "시 " + minutes + "분 " + seconds + "초";
  }

  function init() {
    getTime();
    setInterval(getTime, 1000);
  }

  init();
});
