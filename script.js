const app = document.getElementById('app');

const screens = [
  {id:'intro', html:`<div class="screen"><p>Привет.</p><p>Это сайт для тебя.</p><p>Я сделал его, чтобы сказать кое-что честно.</p></div>`},
  {id:'moments', html:`<div class="screen"><h1>Моменты</h1><p id="moment-text">Тот вечер, когда ты смеялась.</p></div>`},
  {id:'parallel', html:`<div class="screen"><h1>Параллельная реальность</h1><p>В одном из миров мы идём рядом.</p><div class="heart" style="top:20%; left:10%;"></div><div class="heart" style="top:50%; left:60%;"></div></div>`},
  {id:'cards', html:`<div class="screen"><h1>То, что я заметил</h1><div class="card">Ты умеешь слушать</div><div class="card">С тобой спокойно</div><div class="card">Ты настоящая</div><div class="card">Ты даришь тепло</div></div>`},
  {id:'letter', html:`<div class="screen"><h1>Письмо</h1><p class="typewriter">Мне важно, чтобы ты знала: ты была чем-то настоящим в моём времени.</p></div>`},
  {id:'choice', html:`<div class="screen"><h1>И на этом всё</h1><button id="smile">Улыбнуться</button><button id="close">Закрыть страницу</button></div>`},
  {id:'signature', html:`<div class="screen"><p>С теплом,</p><h1>ТВОЁ ИМЯ</h1><p>14 февраля</p></div>`}
];

let current = 0;

// Рендерим все экраны сразу, чтобы не было белого экрана
screens.forEach(s=> app.innerHTML += s.html);
const screenElements = document.querySelectorAll('.screen');

function updateView(){
  app.style.transform = `translateX(-${current*100}%)`;
}

function next(){ current++; if(current>=screens.length) current = screens.length-1; updateView(); }
function prev(){ current--; if(current<0) current=0; updateView(); }

// Моменты
const momentsArr = [
  "Тот вечер, когда ты смеялась.",
  "Сообщение, после которого я долго сидел в тишине.",
  "Как рядом с тобой не нужно было притворяться.",
  "Маленькие разговоры, которые остались со мной."
];
let curMoment = 0;
const momentText = document.getElementById('moment-text');
if(momentText){
  momentText.parentElement.onclick = ()=>{
    curMoment = (curMoment+1)%momentsArr.length;
    momentText.textContent = momentsArr[curMoment];
    next();
  }
}

// Кнопки выбор
const smileBtn = document.getElementById('smile');
const closeBtn = document.getElementById('close');
if(smileBtn) smileBtn.onclick = ()=>{ alert("Тогда я рад 🤍"); next();}
if(closeBtn) closeBtn.onclick = ()=>{ alert("Спасибо, что дочитала."); next(); }

// Свайпы на телефоне
let startX=0;
app.addEventListener('touchstart', e=> startX=e.touches[0].clientX);
app.addEventListener('touchend', e=>{
  let endX = e.changedTouches[0].clientX;
  if(startX-endX>50) next();
  if(endX-startX>50) prev();
});

updateView();
