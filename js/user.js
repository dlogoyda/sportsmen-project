let showMore = document.querySelectorAll(`span[data-name="showMore"]`);
let speciality = [];

let arrLi = document.querySelectorAll('.specification li'),
    filterSpeciatity = document.querySelector('.filterTrainer-text'),
    filterTrainerOne = document.querySelector('.filterTrainerOne'),
    filterTrainerOneClose = document.querySelector('.filterTrainerOne-close'),
    trainerBlock = document.querySelectorAll('.trainer-block'),
    specialityBlock = document.querySelector('.specialityBlock');


// Listener on trainer block "Show More"
for (let i = 0; i < showMore.length; i++) {
  showMore[i].addEventListener('click', showHidden);
}

// Show block or hide
function showHidden() {

  let box = this.closest('.trainer-block');
  box.classList.toggle('openBox');

  if (box.classList.contains('openBox')) {
    this.innerHTML = "Скрыть";
  } else {
      this.innerHTML = "Узнать больше";
  }

}


// Берем все ЛИ-шки, которые есть и вставляем в массив
for(let i = 0; i < arrLi.length; i++) {
  speciality.push(arrLi[i].innerHTML);
  speciality.sort();
}

// Создаем новый массив, который не содержит повторяющихся значений
let specialityNew = speciality.reduce(function(a,b){
    if (a.indexOf(b) < 0 ) a.push(b);
    return a;
  },[]);

// Создаем специальный блок специальностей
for(let i = 0; i < specialityNew.length; i++) {
  specialityBlock.innerHTML += (`<div class="${specialityNew[i]}">${specialityNew[i]}</div>`);
}


filterSpeciatity.addEventListener('input', writeSpeciality);
// Функция, которая ищет специальность по написанному в инпуте
function writeSpeciality() {
  let val = filterSpeciatity.value.toUpperCase();
  let divElem = specialityBlock.getElementsByTagName("div");

  for (let i = 0; i < divElem.length; i++) {
    let txtValue = divElem[i].innerText;

    if (txtValue.toUpperCase().indexOf(val) > -1) {
      divElem[i].style.display = "";

    } else {
      divElem[i].style.display = "none";
    }

    if (val == '') {
      divElem[i].style.display = '';
    }
  }
}

// Создаем переменную для тэга Main
let elemMain = document.getElementsByTagName('main')[0];

// Вешаем слушатель на весь MAIN
if (elemMain) {
  elemMain.addEventListener("click", hideAllBlocksInHeader, true);
}
// Что если есть клик на Main - то все блоки с абсолютной позицией с Хэдэра скрыть
function hideAllBlocksInHeader() {
  specialityBlock.classList.add('specialityHidden');
  specialityRange.classList.add('specialityHidden');
  calendarDaysAll.classList.add('specialityHidden');
  nationalityDropdown.classList.add('specialityHidden');
}

// при нажатии на блок с инпутом - открыть окно с списком;
function openSpeciality(e) {
  specialityBlock.classList.toggle('specialityHidden');
}

// выбор нужной специальности
function chooseSpeciality(e) {

  toggleItemsByPrice(minPrice, maxPrice);
  e.stopPropagation();
  if (e.target !== e.currentTarget) {
    filterSpeciatity.value = e.target.innerHTML;

    if (filterSpeciatity.value !== ' ') {
      specialityBlock.classList.add('specialityHidden');
    }

// запускаем цикл по блокам тренеров и ищем все возможные ЛИшки,
// и изначально говорим всем блокам, что их все сделаем невидимыми
    for (let i = 0; i < trainerBlock.length; i++) {
      let lis = trainerBlock[i].getElementsByTagName("li");
      let needHidden = true;

// Запускаем цикл по всем ЛИшкам в каждом блоке
// И говорим: если хотя бы одна ЛИ будет включать в cебя такой же текст как в стоящий в инпуте,
// то мы просим не скрывать блок.
      for (let j = 0; j < lis.length; j++) {
        if (lis[j].innerText.includes(e.target.innerHTML)) {
          needHidden = false;
          break;
        }
      }

      if (needHidden) {
          trainerBlock[i].classList.add('specialityHidden');
      } else {
         trainerBlock[i].classList.remove('specialityHidden');
      }
    }
  }
}

// нажатие на крестик очистит инпут и сделает все блоки видимыми
function removeValueFilter(e) {
  let divElem = specialityBlock.getElementsByTagName("div");
  for (let i = 0; i < divElem.length; i++) {
    divElem[i].style.display = "";
  }

  filterSpeciatity.value = "";

  for (let i = 0; i < trainerBlock.length; i++) {
    trainerBlock[i].classList.remove('specialityHidden');
  }
  toggleItemsByPrice(minPrice, maxPrice);
}

if (filterTrainerOne) {
  filterTrainerOne.addEventListener('click', openSpeciality);
}

if (specialityBlock) {
  specialityBlock.addEventListener('click', chooseSpeciality);
}

if (filterTrainerOneClose) {
  filterTrainerOneClose.addEventListener('click', removeValueFilter);
}


let trainerAllBlock = document.querySelectorAll('.wrapperForTrainer');
let timeBlock = document.querySelectorAll('.table-trainer');
// создаем слушатели на наведение на блоки с тренерами
for (let i = 0; i < trainerAllBlock.length; i++) {
  trainerAllBlock[i].addEventListener("mouseover", showWorkTime);
  trainerAllBlock[i].addEventListener("mouseout", showWorkTime);
}
// функция для показа блока с свободными днями в неделе
function showWorkTime(e){

    for (let j = 0; j < timeBlock.length; j++) {
      if (this == timeBlock[j].closest('.wrapperForTrainer')) {
        if(e.type==="mouseover") {
          timeBlock[j].classList.remove('specialityHidden');
        } else if(e.type==="mouseout") {
          timeBlock[j].classList.add('specialityHidden');
        }
      }
    }
}



let filterTrainerRange = document.querySelector('.filterTrainerRange');
let specialityRange = document.querySelector('.specialityRange');
// функция на показ блока с регулирование цены
function showRangeBox(e) {
  if (e.target !== e.currentTarget) return;

  specialityRange.classList.toggle('specialityHidden');
}

if (filterTrainerRange) {
  filterTrainerRange.addEventListener('click', showRangeBox);
}


let rangeButtonLeft = rangeRange.querySelector('.rangeButton-left'),
    rangeButtonRight = rangeRange.querySelector('.rangeButton-right'),
    rangeSelected = rangeRange.querySelector('.rangeSelected'),
    rangeText = document.querySelector('.rangeText'),
    rangeDivForPrice = document.querySelector('.rangeDiv'),
    priceAll = document.querySelectorAll('.price'),
    minPrice = 50,
    maxPrice = 2200;

// Для двиения левого кружочка
rangeButtonLeft.onmousedown = function(event) {
  event.preventDefault(); // предотвратить запуск выделения (действие браузера)

  let shiftX = event.clientX - rangeButtonLeft.getBoundingClientRect().left;

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

  function onMouseMove(event) {
    let newLeft = event.clientX - Math.round(shiftX) - Math.round(rangeRange.getBoundingClientRect().left);

    // курсор вышел из слайдера => оставить бегунок в его границах.
    if (newLeft < 0) {
      newLeft = 0;
    }
    let rightEdge = rangeRange.offsetWidth - rangeButtonLeft.offsetWidth;
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }

    rangeButtonLeft.style.left = newLeft + 'px';
    rangeSelected.style.left = rangeButtonLeft.style.left;
    if (newLeft % 10 === 0) {
      if (newLeft <= 0) {
        minPrice = 50;
      } else {
        minPrice = newLeft * 10;
      }
    }

    rangeText.innerHTML = `${minPrice} грн - ${maxPrice} грн`;
    rangeDivForPrice.innerText = rangeText.innerHTML;

    toggleItemsByPrice(minPrice, maxPrice);
  }

  function onMouseUp() {
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mousemove', onMouseMove);
  }
}



// Для движения правого кружочка
rangeButtonRight.onmousedown = function(event) {
  event.preventDefault(); // предотвратить запуск выделения (действие браузера)
  let shiftX = event.clientX - rangeButtonRight.getBoundingClientRect().right;

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

  function onMouseMove(event) {
    let newRight = event.clientX - Math.round(shiftX) - Math.round(rangeRange.getBoundingClientRect().right);
    let rightEdge = rangeRange.offsetWidth - rangeButtonRight.offsetWidth;
    let newMaxPrice = 2200;

    if (newRight > 0) {
      newRight = 0;
    }

    if (-newRight > rightEdge) {
      newRight = -rightEdge;
    }

    rangeButtonRight.style.right = -newRight + 'px';
    rangeSelected.style.right = rangeButtonRight.style.right;

    if (-newRight % 10 === 0) {
      maxPrice = newMaxPrice - (-newRight * 10);
    }

    rangeText.innerHTML = `${minPrice} грн - ${maxPrice} грн`;
    rangeDivForPrice.innerText = rangeText.innerHTML;

    toggleItemsByPrice(minPrice, maxPrice);
  }

  function onMouseUp() {
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mousemove', onMouseMove);
  }
}

rangeText.innerHTML = `${minPrice} грн - ${maxPrice} грн`;
rangeDivForPrice.innerText = rangeText.innerHTML;


function toggleItemsByPrice(minPrice, maxPrice) {
  for (let i = 0; i < priceAll.length; i++) {
    let letHide = priceAll[i].closest('.trainer-block');
    let parsed = parseInt(priceAll[i].innerText);

    if (parsed > maxPrice || parsed < minPrice) {
      letHide.classList.add('hiddenForPrice');
    } else if (!letHide.classList.contains('specialityHidden')){
      letHide.classList.remove('hiddenForPrice');
    } else {
      letHide.classList.remove('hiddenForPrice');
    }
  }
}


let calendarDay = document.querySelectorAll('.tableCalendarDay');
let timeToDay = document.querySelectorAll('.timeToDay');
// навешиваем слушатель на дни недели и на время суток в хэдэре
for (let i = 0; i < calendarDay.length; i++) {
  calendarDay[i].addEventListener('click', chooseFreeDay);
}

for (let i = 0; i < timeToDay.length; i++) {
  timeToDay[i].addEventListener('click', chooseFreeDay);
}
// окрашивает выбраные блоки
function chooseFreeDay(e) {
  this.classList.toggle('tableCalendarDaySelected');
}



let trainerCalendar = document.querySelector('.filterTrainerCalendar'),
    calendarDaysAll = document.querySelector('.calendarDaysAll'),
    allDaysInWeek = document.querySelector('.table-flex'),
    allTimesInDay = document.querySelector('.calenderTimeAll'),
    tableFlexDay = document.querySelectorAll('.table-flex_day'),
    tableFlexElem = document.querySelectorAll('.opacityDay'),
    buttonSearchNeedDay = document.querySelector('.buttonSearchNeedDay'),
    buttonClear = document.querySelector('.buttonClear');

// открывает блок для выбора нужной даты для фильтрации
function openCalendar(e) {
  if (e.target !== e.currentTarget) return;

  calendarDaysAll.classList.toggle('specialityHidden');
}


trainerCalendar.addEventListener('click', openCalendar);
allDaysInWeek.addEventListener('click', chooseDay);
allTimesInDay.addEventListener('click', chooseTimeDay);
buttonSearchNeedDay.addEventListener('click', chooseCalendarDay);
buttonClear.addEventListener('click', buttonClearAllDays);

let needDays = [];
let needTimeDay = [];
// Выбираем нужные дни недели, и добавляем выбраные дни в новый массив(глобальный)
function chooseDay(e) {

  if (e.target.classList.contains('tableCalendarDaySelected')) {
    needDays.push(e.target);
  }

  for (let i = 0; i < needDays.length; i++) {
    if (!needDays[i].classList.contains('tableCalendarDaySelected')) {
      needDays.splice(i, 1);
    }
  }
}

function chooseTimeDay(e) {
  if (e.target.classList.contains('tableCalendarDaySelected')) {
    needTimeDay.push(e.target);
  }

  for (let i = 0; i < needTimeDay.length; i++) {
    if (!needTimeDay[i].classList.contains('tableCalendarDaySelected')) {
      needTimeDay.splice(i, 1);
    }
  }
}

// функция, которая создает массив с выбраными элементами
// и если этот элемент есть в блоке с тренером, то скрываем этот блок
function chooseCalendarDay() {

  let closeToday = [];
  let closeAllTimeAndDay = [];
  let needDayHidden = [];

    for (let j = 0; j < tableFlexElem.length; j++) {
        for (let p = 0; p < needTimeDay.length; p++) {
          if (tableFlexElem[j].classList.contains('elemMorning') && needTimeDay[p].classList.contains('elemMorning')) {
            closeToday.push(tableFlexElem[j]);
          }  else if (tableFlexElem[j].classList.contains('elemAfternoon') && needTimeDay[p].classList.contains('elemAfternoon')) {
            closeToday.push(tableFlexElem[j]);
          }  else if (tableFlexElem[j].classList.contains('elemEvening') && needTimeDay[p].classList.contains('elemEvening')) {
            closeToday.push(tableFlexElem[j]);
          } else if (tableFlexElem[j].classList.contains('elemNight') && needTimeDay[p].classList.contains('elemNight')) {
            closeToday.push(tableFlexElem[j]);
          }
        }
    }

    for (let b = 0; b < needDays.length; b++) {
      for (let k = 0; k < closeToday.length; k++) {
        if (closeToday[k].classList.contains('one') && needDays[b].classList.contains('one')) {
          closeAllTimeAndDay.push(closeToday[k]);
        } else if (closeToday[k].classList.contains('two') && needDays[b].classList.contains('two')) {
          closeAllTimeAndDay.push(closeToday[k]);
        } else if (closeToday[k].classList.contains('three') && needDays[b].classList.contains('three')) {
          closeAllTimeAndDay.push(closeToday[k]);
        } else if (closeToday[k].classList.contains('four') && needDays[b].classList.contains('four')) {
          closeAllTimeAndDay.push(closeToday[k]);
        } else if (closeToday[k].classList.contains('five') && needDays[b].classList.contains('five')) {
          closeAllTimeAndDay.push(closeToday[k]);
        } else if (closeToday[k].classList.contains('six') && needDays[b].classList.contains('six')) {
          closeAllTimeAndDay.push(closeToday[k]);
        } else if (closeToday[k].classList.contains('seven') && needDays[b].classList.contains('seven')) {
          closeAllTimeAndDay.push(closeToday[k]);
        }
      }
    }

    for (let y = 0; y < trainerAllBlock.length; y++) {
      for (let i = 0; i < closeAllTimeAndDay.length; i++) {
          if (trainerAllBlock[y].contains(closeAllTimeAndDay[i])) {
            trainerAllBlock[y].classList.add('elseSpecialityHidden');
           }
       }

       if (closeAllTimeAndDay.length === 0) {
         trainerAllBlock[y].classList.remove('elseSpecialityHidden');
       }
    }
}

// кнопка, которая очищает в поиске дни и время суток и если есть скрытые блоки - открывает их
function buttonClearAllDays() {
  for (let i = 0; i < needDays.length; i++) {
    needDays[i].classList.remove('tableCalendarDaySelected');
  }

  for (let j = 0; j < needTimeDay.length; j++) {
    needTimeDay[j].classList.remove('tableCalendarDaySelected');
  }

  for (let y = 0; y < trainerAllBlock.length; y++) {
    trainerAllBlock[y].classList.remove('elseSpecialityHidden');
  }
}


let orderServiseButton = document.querySelectorAll('.trainer-block_button'),
    orderBackground = document.querySelectorAll('.orderBackground'),
    chooseTime = document.querySelectorAll('.canChoose'),
    answerOk = document.querySelector('.answerOk'),
    sendMessage = document.querySelectorAll('.writeYourMessage-button'),
    textAreaForOrderTrain = document.querySelectorAll('.writeYourMessage-textarea'),
    buttonOk = document.querySelector('.answerOk-button'),
    backForExit = document.querySelector('.orderBackgroundOk'),
    connectWithTrainer = document.querySelectorAll('.trainer-block_chat'),
    divInCallBack = document.getElementById('callBack');

if(buttonOk) {
  buttonOk.addEventListener('click', closePopup);
}

if (backForExit) {
  backForExit.addEventListener('click', exitPopups);
}
for (let j= 0; j < orderBackground.length; j++) {
  orderBackground[j].addEventListener('click', exitPopups);
}
// Выход с попапов
function exitPopups(e) {
  if (e.target !== e.currentTarget) return;

  e.target.classList.add('specialityHidden');
}

for (let i = 0; i < orderServiseButton.length; i++) {
  orderServiseButton[i].addEventListener('click', makeOrder);
}
// Функция, которая открывает нужный блок с заказом услуг
function makeOrder(e) {

  let targetButton = e.target;
  let getCheckEnter = localStorage.getItem("checkEnter");

  if (getCheckEnter === 'true') {
    for (let j = 0; j < orderBackground.length; j++) {
      if (targetButton.closest('.wrapperForTrainer') == orderBackground[j].closest('.wrapperForTrainer')) {
        orderBackground[j].classList.remove('specialityHidden');
      }
    }
  } else {
    let divDivCallBack = document.createElement('div');

    divDivCallBack.innerHTML = `
    <div class="noteEverything">
      <div class="note-popup">
        <p class="note-text">Чтобы связаться с тренером - войдите в свой Аккаунт!</p>
      </div>
    </div>
    `;

    divInCallBack.appendChild(divDivCallBack);
    divInCallBack.classList.remove('specialityHidden');

    setTimeout("divInCallBack.classList.add('specialityHidden')", 2000);
  }
}

for (let i = 0; i < chooseTime.length; i++) {
  chooseTime[i].addEventListener('click', changeColorChooseDay);
}
// Функция, которая меняет цвет выбраному дню недели
function changeColorChooseDay(e) {
  let changeColor = e.target;
  changeColor.classList.toggle('changeColor');
}


for(let k = 0; k < sendMessage.length; k++) {
  sendMessage[k].addEventListener('click', sendMessageTo);
}
//Функция для отправки формы, которая скрывает блок с отправкой и показывает попап, что она отправилась
function sendMessageTo() {

  for (let a = 0; a < textAreaForOrderTrain.length; a++) {
    if (textAreaForOrderTrain[a].value == '') {
      textAreaForOrderTrain[a].placeholder = 'Пожалуйста, напишите Ваши требования';
    } else {
      for (let j = 0; j < orderBackground.length; j++) {
        orderBackground[j].classList.add('specialityHidden');
      }

      answerOk.classList.remove('specialityHidden');
    }
  }
}


// Функция, которая закрывает финальный попап
function closePopup() {
  answerOk.classList.add('specialityHidden');

  for (let b = 0; b < chooseTime.length; b++) {
    if (chooseTime[b].classList.contains('changeColor')) {
      chooseTime[b].classList.remove('changeColor');
    }
  }

  for (let a = 0; a < textAreaForOrderTrain.length; a++) {
    textAreaForOrderTrain[a].value = '';
    textAreaForOrderTrain[a].placeholder = '';
  }
}

for (let i = 0; i < connectWithTrainer.length; i++) {
  connectWithTrainer[i].addEventListener('click', callBackYou);
}

function callBackYou() {
  let divDivCallBack = document.createElement('div');
  let getCheckEnter = localStorage.getItem("checkEnter");

  if (getCheckEnter === 'true') {
    divDivCallBack.innerHTML = `
    <div class="noteEverything">
      <div class="note-popup">
        <p class="note-text">Спасибо! Тренер напишет Вам как только сможет.</p>
      </div>
    </div>
    `;
  } else {
    divDivCallBack.innerHTML = `
    <div class="noteEverything">
      <div class="note-popup">
        <p class="note-text">Чтобы связаться с тренером - войдите в свой Аккаунт!</p>
      </div>
    </div>
    `;
  }


  divInCallBack.appendChild(divDivCallBack);
  divInCallBack.classList.remove('specialityHidden');

  setTimeout("divInCallBack.classList.add('specialityHidden')", 2000);
}



let nationality = document.querySelectorAll('.nationality'),
    nationalityArray = [],
    nationalityDropdown = document.getElementById("myDropdown"),
    countryInput = document.getElementById("countryInput"),
    closeCountry = document.querySelector('.filterTrainerCheckbox-close');

nationalityDropdown.addEventListener('click', chooseCountry);
closeCountry.addEventListener('click', removeValueCountry);


// Берем все ЛИ-шки, которые есть и вставляем в массив
for(let i = 0; i < nationality.length; i++) {
  nationalityArray.push(nationality[i].innerHTML);
  nationalityArray.sort();
}

// Создаем новый массив, который не содержит повторяющихся значений
let nationalityArrayNew = nationalityArray.reduce(function(a,b){
    if (a.indexOf(b) < 0 ) a.push(b);
    return a;
  },[]);

// Создаем специальный блок специальностей
for(let i = 0; i < nationalityArrayNew.length; i++) {
  nationalityDropdown.innerHTML += (`<div class="${nationalityArrayNew[i]}">${nationalityArrayNew[i]}</div>`);
}

function myFunction() {
  nationalityDropdown.classList.toggle("specialityHidden");
}
//Функция дропдаун, чтобы можно было при нажатии на блок с поиском по тренерам,
//ввести нужную страну, либо выбрать из списка
function filterFunction() {
  let filter, a, i;
  filter = countryInput.value.toUpperCase();
  nationalityDropdown = document.getElementById("myDropdown");
  a = nationalityDropdown.getElementsByTagName("div");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }

  for (let i = 0; i < trainerBlock.length; i++) {
    if (filter.length === 0) {
      trainerBlock[i].classList.remove('countryHidden');
    }
  }
}

// выбор нужной страны
function chooseCountry(e) {

  toggleItemsByPrice(minPrice, maxPrice);
  e.stopPropagation();
  if (e.target !== e.currentTarget) {
    countryInput.value = e.target.innerHTML;

    if (countryInput.value !== ' ') {
      nationalityDropdown.classList.add('specialityHidden');
    }
// запускаем цикл по блокам тренеров
    for (let i = 0; i < trainerBlock.length; i++) {
// И запускаем цикл по всем национальностям в каждом блоке
// И говорим: если национальность не включает в себя такой же текст как в стоящий в инпуте,
// то мы скрываем блок.
      for (let j = 0; j < nationality.length; j++) {
        if (!nationality[j].innerText.includes(e.target.innerHTML)) {
          let nationHide = nationality[j].closest('.trainer-block');
          nationHide.classList.add('countryHidden');
        } else {
           trainerBlock[i].classList.remove('countryHidden');
        }
      }
    }
  }
}

// нажатие на крестик очистит инпут и сделает все блоки видимыми
function removeValueCountry(e) {
  let divElem = nationalityDropdown.getElementsByTagName("div");
  for (let i = 0; i < divElem.length; i++) {
    divElem[i].style.display = "";
  }

  countryInput.value = "";

  for (let i = 0; i < trainerBlock.length; i++) {
    trainerBlock[i].classList.remove('countryHidden');
  }
  toggleItemsByPrice(minPrice, maxPrice);
}
