const body = document.querySelector("body");
const time = document.querySelector('.time');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const windDescription = document.querySelector('.wind');
const humidityDescription = document.querySelector('.humidity');
const city = document.querySelector(".city");
const greeting = document.querySelector(".greeting");
const nameInfo = document.querySelector(".name");
const languageBtn = document.querySelector(".langswitch");
let urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=a9bafc247a28e8811ea82f6ded59a0ec&units=metric`;

// Language

var toggle = true;

function switchLang(){

  if(toggle){
    languageBtn.classList.add("pressed");
    toDoListName.innerHTML = "Список Дел";
    playlistHeader.innerHTML = "Список Песен";
    city.placeholder = "Введите город";
    nameInfo.placeholder = "Введите ваше имя";
  }else{
    languageBtn.classList.remove("pressed");
    toDoListName.innerHTML = "To-Do List";
    playlistHeader.innerHTML = "Playlist";
    city.placeholder = "Enter city";
    nameInfo.placeholder = "Enter your name";
  }
  toggle=!toggle;
}

languageBtn.addEventListener("click", switchLang);

// To-Do list

let addToDoButton = document.getElementById('addToDo');
let toDoContainer = document.getElementById('toDoContainer');
let inputField = document.getElementById('inputField');
let toDoListName = document.querySelector(".list-header");

addToDoButton.addEventListener('click', function(){
    var paragraph = document.createElement('p');
    paragraph.classList.add('paragraph-styling');
    paragraph.innerText = inputField.value;
    toDoContainer.appendChild(paragraph);
    inputField.value = "";
    paragraph.addEventListener('click', function(){
        paragraph.style.textDecoration = "line-through";
    })
    paragraph.addEventListener('dblclick', function(){
        toDoContainer.removeChild(paragraph);
    })
})

// Weather

async function getWeather() {

  if(languageBtn.classList.contains("pressed")){
    urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=a9bafc247a28e8811ea82f6ded59a0ec&units=metric`;
  }else{
    urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=a9bafc247a28e8811ea82f6ded59a0ec&units=metric`;
  }

  const res = await fetch(urlWeather);
  
  if (res.status === 404) {
    city.value = "Invalid city";
    temperature.textContent = "";
    weatherDescription.textContent = ``;
    windDescription.textContent = ``;
    humidityDescription.textContent = ``;
    
  }

  if (res.status === 404 && languageBtn.classList.contains("pressed")) {
    city.value = "Ошибка";
    temperature.textContent = "";
    weatherDescription.textContent = ``;
    windDescription.textContent = ``;
    humidityDescription.textContent = ``;
   
  }

  const data = await res.json();

  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
  windDescription.textContent = `Wind speed: ${data.wind.speed}m/s`;
  humidityDescription.textContent = `Humidity: ${data.main.humidity}%`;

  if (languageBtn.classList.contains("pressed")) {
  windDescription.textContent = `Скорость ветра: ${data.wind.speed}m/s`;
  humidityDescription.textContent = `Влажность: ${data.main.humidity}%`;
  }

  setTimeout(getWeather, 500);
}

getWeather();

// City change

function setCity(event) {
    if (event.type === 'change') {
        getWeather();
        city.blur();
        localStorage.setItem("city", city.value);
    }
};

city.addEventListener('change', setCity);


// Time

function showTime() {
  const date = new Date();
  time.innerHTML = date.toLocaleTimeString();
  setTimeout(showTime, 1000);
}

showTime();

// Date

const currentdate = document.querySelector('.date');

function showDate() {
  const date = new Date();
  const options = {weekday: 'long', month: 'long', day: 'numeric'};
  currentdate.innerHTML = date.toLocaleDateString('en-En', options);

  if (languageBtn.classList.contains("pressed")) {
    currentdate.innerHTML = date.toLocaleDateString('ru-Ru', options);
  }

  setTimeout(showDate, 1000);
}

showDate();


function getTimeOfDay() {
  date = new Date();
  let hours = date.getHours();
  let message = "";
  
  if(date.getHours() >= 6 && date.getHours() < 12){
   message = "morning"
  }else if(date.getHours() >= 12 && date.getHours() < 18){
    message = "afternoon"
  }else if(date.getHours() >= 18 && date.getHours() <= 23.59){
    message = "evening"
  }else{
    message = "night"
  }

  window.setTimeout(getTimeOfDay, 1000);
  return message;
}

const timeOfDay = getTimeOfDay();

function showGreeting() {
  if (languageBtn.classList.contains("pressed") && date.getHours() >= 6 && date.getHours() < 12) {
    greeting.innerHTML = `Доброе утро, `; 
  }else if(languageBtn.classList.contains("pressed") && date.getHours() >= 12 && date.getHours() < 18){
    greeting.innerHTML = `Добрый день, `;
  }else if (languageBtn.classList.contains("pressed") && date.getHours() >= 18 && date.getHours() <= 23.59){
    greeting.innerHTML = `Добрый вечер, `;
  }else if(languageBtn.classList.contains("pressed")){
    greeting.innerHTML = `Доброй ночи, `;
  }else{
  greeting.innerHTML = `Good ${timeOfDay}, `;
  }
}
showGreeting();

languageBtn.addEventListener("click", showGreeting)

// Image slider

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNum;
}
getRandomNum();

function setBg() {
  const img = new Image();
  bgNum = getRandomNum(1, 20).toString().padStart(2, "0");
  img.src = `https://raw.githubusercontent.com/CaptainJackNerd/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.onload = () => {
     document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/CaptainJackNerd/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
  };
}
setBg();

let prevButton = document.querySelector(".slidePrev");
let nextButton = document.querySelector(".slideNext");

function getSlidePrev() {
    let bgNumInt = parseInt(bgNum) - 1;
    if (bgNumInt == 0) {
      bgNum = `20`;
      setBg(bgNum);
      return;
    }
    bgNum = bgNumInt.toString().padStart(2, "0");
    setBg(bgNum);
  }
  function getSlideNext() {
    let bgNumInt = parseInt(bgNum) + 1;
    if (bgNumInt == 20) {
      bgNum = `01`;
      setBg(bgNum);
      return;
    }
    bgNum = bgNumInt.toString().padStart(2, "0");
    setBg(bgNum);
  }
  
  prevButton.addEventListener("click", function (e) {
    getSlidePrev();
    prevButton.disabled = true;
    setTimeout(function () {
      prevButton.disabled = false;
    }, 1000);
  });
  nextButton.addEventListener("click", function (e) {
    getSlideNext();
    nextButton.disabled = true;
    setTimeout(function () {
      nextButton.disabled = false;
    }, 1000);
  });

// Unsplash API

async function getLinkToImage() {
 const url = 'https://api.unsplash.com/photos/random?query=morning&client_id=p_5Y6zZazyCQLNPOaMcaLaok9K5zQSE_87ysHTVTlUc';
 const res = await fetch(url);
 const data = await res.json();
 console.log(data.urls.regular)
}

// Flickr API

async function getLinkToFlickr() {
  const res = await fetch(url);
  const data = await res.json();
  let pick = Math.floor(Math.random() * data.photos.photo.length);
  const img = new Image();
  img.src = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=ab8e31cb5899e606a1ece9a1f4c30ea8&tags=nature&extras=url_l&format=json&nojsoncallback=1`;
  img.addEventListener("load", () => {
    body.style.backgroundImage = `url(${data.photos.photo[pick].url_l}) `;
    body.classList.add("fromApi");
  });
}

// Random quote

let urlQuote = 'https://api.quotable.io/random';
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const quoteButton = document.querySelector('.change-quote');

function randQuote () {

  if(languageBtn.classList.contains("pressed")){
    urlQuote = '<http://api.forismatic.com/api/1.0/?method=getQuote&amp;format=jsonp&amp;jsonp=parseQuote';
  }else{
    urlQuote = 'https://api.quotable.io/random';
  }

    fetch(urlQuote)
  .then(response => response.json())
  .then(data => {
    quote.textContent = data.content;
    author.textContent = '- ' + data.author;
  });

  }

randQuote();
quoteButton.addEventListener('click', randQuote);
languageBtn.addEventListener('click', randQuote);

// Audio player

const audio = document.querySelector("audio");
const playPauseBtn = document.querySelector("#play-pause");
const nextBtn = document.querySelector("#next");
const preveBtn = document.querySelector("#previous");
const songList = document.querySelector(".song-list");
const title = document.querySelector("#title");
const record = document.querySelector(".record");
const volSlider = document.querySelector(".volumeline");
const volControl = document.querySelector(".vol_control");
const progressArea = document.querySelector(".progress-area");
let playlistHeader = document.querySelector(".playlist-header")

let songArray = [];
let songHeading = "";
let songIndex = 0;
let isPlaying = false;

function loadAudio(){
  audio.src = songArray[songIndex];
  
  let songListItems = songList.getElementsByTagName("li");
  songHeading = songListItems[songIndex].getAttribute("data-name");
  title.innerText = songHeading;
  
  for(i=0; i<songListItems.length;i++){
    songListItems[i].classList.remove("active");
  }
  
  songList.getElementsByTagName("li")[songIndex].classList.add("active");
}

function loadSongs(){
  let songs = songList.getElementsByTagName("li");
  for(i=0;i<songs.length;i++){
    songArray.push(songs[i].getAttribute("data-src"))
  };
  
  loadAudio();
}

loadSongs();

function playAudio(){
  audio.play();
  playPauseBtn.querySelector("i.fas").classList.remove("fa-play");
  playPauseBtn.querySelector("i.fas").classList.add("fa-pause");
  isPlaying = true;
}

function pauseAudio(){
  audio.pause();
  playPauseBtn.querySelector("i.fas").classList.remove("fa-pause");
  playPauseBtn.querySelector("i.fas").classList.add("fa-play");
  isPlaying = false;
}

function nextSong(){
  songIndex++;
  if(songIndex > songArray.length - 1){
    songIndex = 0;
  };
  loadAudio();
  playAudio();
}

function previousSong(){
  songIndex--;
  if(songIndex < 0){
    songIndex = songArray.length - 1;
  };
  loadAudio();
  playAudio();
}

playPauseBtn.addEventListener("click", function(){
  if(isPlaying){
    pauseAudio();
  }else{
    playAudio();
  }
}, false)

nextBtn.addEventListener("click", function(){
 nextSong();
}, false);

preveBtn.addEventListener("click", function(){
 previousSong();
}, false);

songList.addEventListener("click", function(e){
  songIndex = e.target.closest("li").getAttribute("data-index");
  loadAudio();
  playAudio();
}, false);

audio.addEventListener("ended", function(){
  nextSong();
});

volSlider.addEventListener("input", function(){
  audio.volume = volSlider.value / 100;
}, false)

var toggle = true;

function volumeSwitch(){
    if(toggle){
        audio.volume = 0;
  }else{
    audio.volume = volSlider.value / 100;
  }
  toggle=!toggle;
}

  volControl.addEventListener("click", function(){
    volumeSwitch();
  });

  function updateProgress(e){
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    const progressBar = document.querySelector(".progress-bar")
    progressBar.style.width = `${progressPercent}%`
  }

  audio.addEventListener("timeupdate", updateProgress)

  function setProgress(e){
    const width = this.clientWidth
    const clickX = e.offsetX
    const trackDuration = audio.duration;
    audio.currentTime = (clickX / width) * trackDuration
 }

  progressArea.addEventListener("click", setProgress)

  function setDuration(e){
    const musicDuration = document.querySelector(".max-duration");
    const trackDuration = audio.duration;
    let totalMin = Math.floor(trackDuration / 60);
      let totalSec = Math.floor(trackDuration % 60);
      if(totalSec < 10){ 
        totalSec = `0${totalSec}`;
      }
      musicDuration.innerText = `${totalMin}:${totalSec}`;
    }

    audio.addEventListener("loadeddata", setDuration)

    function updateCurrentTime(e){
        let musicCurrentTime = document.querySelector(".current-time");
        let currentMin = Math.floor(audio.currentTime / 60);
        let currentSec = Math.floor(audio.currentTime % 60);
        if(currentSec < 10){ 
            currentSec = `0${currentSec}`;
        }
        musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
    }

    audio.addEventListener("timeupdate", updateCurrentTime)

    // Settings

    const toDoListBlock = document.querySelector(".todo-list");
    const playerBlock = document.querySelector(".player-container");
    const weatherBlock = document.querySelector(".weather");
    const timeBlock = document.querySelector(".time");
    const dateBlock = document.querySelector(".date");
    const greetingBlock = document.querySelector(".greeting-container");
    const quoteBlock = document.querySelector(".quote-block");

    const toDoListBtn = document.querySelector(".todo-list-btn");
    const playerBlockBtn = document.querySelector(".player-container-btn");
    const weatherBlockBtn = document.querySelector(".weather-btn");
    const timeBlockBtn = document.querySelector(".time-btn");
    const dateBlockBtn = document.querySelector(".date-btn");
    const greetingBlockBtn = document.querySelector(".greeting-container-btn");
    const quoteBlockBtn = document.querySelector(".quote-btn");

    var toggle = true;

    function hideToDoListBlock(){
        if(toggle){
            toDoListBlock.classList.add("hidden-block");
            toDoListBlock.classList.remove("visible-block");
            localStorage.setItem("todo-list", toDoListBlock.classList);
        }else{
            toDoListBlock.classList.remove("hidden-block");
            toDoListBlock.classList.add("visible-block");
            localStorage.setItem("todo-list", toDoListBlock.classList);
        }
      toggle = !toggle; 
    }

    function hidePlayerBlock(){
        if(toggle){
            playerBlock.classList.add("hidden-block");
            playerBlock.classList.remove("visible-block");
            localStorage.setItem("player-container", playerBlock.classList); 
        }else{
            playerBlock.classList.remove("hidden-block");
            playerBlock.classList.add("visible-block");
            localStorage.setItem("player-container", playerBlock.classList);
        }
      toggle = !toggle;   
    }

    function hideWeatherBlock(){
        if(toggle){
            weatherBlock.classList.add("hidden-block"); 
            weatherBlock.classList.remove("visible-block");
            localStorage.setItem("weather", weatherBlock.classList);
        }else{
            weatherBlock.classList.remove("hidden-block");
            weatherBlock.classList.add("visible-block");
            localStorage.setItem("weather", weatherBlock.classList);
        }
      toggle = !toggle;   
    }

    function hideTimeBlock(){
        if(toggle){
            timeBlock.classList.add("hidden-block");
            timeBlock.classList.remove("visible-block");
            localStorage.setItem("time", timeBlock.classList); 
        }else{
           timeBlock.classList.remove("hidden-block");
           timeBlock.classList.add("visible-block");
           localStorage.setItem("time", timeBlock.classList); 
        }
      toggle = !toggle;   
    }

    function hideDateBlock(){
        if(toggle){
            dateBlock.classList.add("hidden-block"); 
            dateBlock.classList.remove("visible-block");
            localStorage.setItem("date", dateBlock.classList); 
        }else{
            dateBlock.classList.remove("hidden-block");
            dateBlock.classList.add("visible-block");
            localStorage.setItem("date", dateBlock.classList);
        }
      toggle = !toggle;   
    }

    function hideGreetingBlock(){
        if(toggle){
            greetingBlock.classList.add("hidden-block");
            greetingBlock.classList.remove("visible-block");
            localStorage.setItem("greeting", greetingBlock.classList); 
        }else{
            greetingBlock.classList.remove("hidden-block");
            greetingBlock.classList.add("visible-block");
            localStorage.setItem("greeting", greetingBlock.classList); 
        }
      toggle = !toggle;   
    }

    function hideQuoteBlock(){
        if(toggle){
            quoteBlock.classList.add("hidden-block");
            quoteBlock.classList.remove("visible-block");
            localStorage.setItem("quote", quoteBlock.classList);  
        }else{
            quoteBlock.classList.remove("hidden-block");
            quoteBlock.classList.add("visible-block");
            localStorage.setItem("quote", quoteBlock.classList);
        }
      toggle = !toggle;   
    }

    toDoListBtn.addEventListener("click", hideToDoListBlock)
    playerBlockBtn.addEventListener("click", hidePlayerBlock)
    weatherBlockBtn.addEventListener("click", hideWeatherBlock)
    timeBlockBtn.addEventListener("click", hideTimeBlock)
    dateBlockBtn.addEventListener("click", hideDateBlock)
    greetingBlockBtn.addEventListener("click", hideGreetingBlock)
    quoteBlockBtn.addEventListener("click", hideQuoteBlock)

    // Local Storage

    function setLocalStorage() {
        localStorage.setItem('name', nameInfo.value);
      }
      window.addEventListener('beforeunload', setLocalStorage)

      function getLocalStorage() {
        if(localStorage.getItem('name')) {
            nameInfo.value = localStorage.getItem('name');
        }

        if(localStorage.getItem('city')) {
            city.value = localStorage.getItem('city');
        }

        if(localStorage.getItem("todo-list")) {
          toDoListBlock.classList = localStorage.getItem("todo-list");
        }

        if(localStorage.getItem("player-container")) {
          playerBlock.classList = localStorage.getItem("player-container");
        }

        if(localStorage.getItem("weather")) {
          weatherBlock.classList = localStorage.getItem("weather");
        }

        if(localStorage.getItem("time")) {
          timeBlock.classList = localStorage.getItem("time");
        }

        if(localStorage.getItem("date")) {
          dateBlock.classList = localStorage.getItem("date");
        }

        if(localStorage.getItem("greeting")) {
          greetingBlock.classList = localStorage.getItem("greeting");
        }

        if(localStorage.getItem("quote")) {
          quoteBlock.classList = localStorage.getItem("quote");
        }

      }
      window.addEventListener('load', getLocalStorage)

