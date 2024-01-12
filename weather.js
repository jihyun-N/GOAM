// 날씨정보 

const apiKey = "f162b62c6936eee4a0f31beb5737f50f"

// https://openweathermap.org/current 에서 가져왔습니다
// https://api.openweathermap.org/data/2.5/weather?lat=37.5985&lon=126.9783&appid=$f162b62c6936eee4a0f31beb5737f50f&units=metric
// 위 사이트로 가시면 어떤 정보가 있는지 볼수있어요

function weatherApi() {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=37.5985&lon=126.9783&appid=${apiKey}&units=metric`
    fetch(url).then(response => response.json()).then(data => {
        const weather = document.querySelector("#weatherText");
        const round = Math.round(data.main.temp * 10) / 10;

        // https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2 에 맞는 아이콘 사용
        const weatherText =`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

        weather.innerHTML = `<img src="${weatherText}" alt="Weather Icon" /> / ${round}°`;
    });
}

weatherApi();