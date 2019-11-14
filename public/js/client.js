const form = document.querySelector('form');
const input = document.querySelector('input');
const cardsContainer = document.querySelector('.cards-container');
const results = document.querySelector('.results');


form.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = input.value;

    fetch(`/weather?address=${location}`).then(res => {
        res.json().then(data => {
            if (data.error) {
                results.classList.add('results-error');
                results.innerHTML = `${data.error}`;
                cardsContainer.innerHTML = ``;
            } else {
                input.blur();
                results.classList.remove('results-error');
                results.innerHTML = ``;
                cardsContainer.innerHTML = `
                <div class="card">
                <h3>${data.location}</h3>
                <span class="temp">${Math.round(data.temperature)} °C</span>

                <div class="card-bg">
                    <div class="weather-container-up">
                        <span><img class="weather-icon" src="../img/${data.icon}.svg"></span>
                    </div>
                    <div class="weather-container-down">${data.summary}</div>
                    <p>
                    ${data.summaryDaily}
                    </p>
                </div>

                <div class="card-info">
                    <div>Temperature High</div>
                    <div class="card-info-value">${Math.round(data.temperatureHigh)}°</div>

                    <div>Temperature Low</div>
                    <div class="card-info-value">${Math.round(data.temperatureLow)}°</div>

                    <div>Humidity</div>
                    <div class="card-info-value">${(100 * data.humidity).toFixed(0)}%</div>

                    <div>Wind Speed</div>
                    <div class="card-info-value">${(data.windSpeed * 1.609).toFixed(2)} <span style="font-size: 0.5em; color: #777aa0">km/h</span></div>

                    <div>Precip Probability</div>
                    <div class="card-info-value">${(100 * data.precipProbability).toFixed(0)}%</div>
                </div>
                </div>
                                 `
            }
        })
    })
});