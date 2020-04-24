let pageTrainerName = document.querySelector('.pageTrainer_name'),
    pageTrainerCreateProfile = document.querySelector('.pageTrainer_createProfile'),
    finishedBlock = document.getElementById('finishedBlock'),
    checkboxGym = document.querySelector('.checkboxGym'),
    checkboxChat = document.querySelector('.checkboxChat'),
    checkboxDiet = document.querySelector('.checkboxDiet'),
    textareaAbout = document.querySelector('.pageTrainer_textArea'),
    addKindSportButton = document.querySelector('.pageTrainer_addKindSport'),
    ulList = document.querySelector('.specification'),
    inputForSpecialty = document.querySelector('.pageTrainer_inputForKindOfSport'),
    inputPrice = document.querySelector('.pageTrainer_inputPrice'),
    addImage = document.getElementById('AddImage'),
    priceVal,
    flexElem = document.querySelectorAll('.table-flex_elem'),
    tableTrainer = document.querySelector('.table-trainer'),
    newTable,
    bodyTrainer = document.getElementsByTagName('body')[0];



for (let i = 0; i < flexElem.length; i++) {
  flexElem[i].addEventListener('click', hearClickChooseDay);
}
// При клике дня, когда ты можешь принять людей, происходт изменение цвета
function hearClickChooseDay(e) {
  let chooseDayTrainer = e.target;
  chooseDayTrainer.classList.toggle('opacityDay');
}

newTable = tableTrainer;

addKindSportButton.addEventListener('click', addNewLi);
pageTrainerCreateProfile.addEventListener('click', createTrainerProfile);
inputForSpecialty.addEventListener('keydown', sendKey);
inputForSpecialty.addEventListener('keydown', sendKey);
// Слушатель, чтобы кнопка загоралась, как только инпут перестал быть пустым
inputForSpecialty.addEventListener('keydown', function(){
  addKindSportButton.style.backgroundColor = 'red';
});

// Функция, при которой при нажатии на клавишу 'Enter', вызывается функция добавления item  в список
function sendKey(e) {
  if(e.keyCode == "13") {
    addNewLi();
  }
}


//функция добавления item  в список
function addNewLi() {
  let newList = document.createElement('li');
  newList.setAttribute('class', 'removeLi');

  if (inputForSpecialty.value == '') {
    return;
  } else {
    newList.innerText = inputForSpecialty.value;
    ulList.appendChild(newList);
  }

  inputForSpecialty.value = '';
}

ulList.addEventListener('click', removeListItem);
// удаление item  из списка
function removeListItem(e) {
  this.removeChild(e.target);
}
//При нажатии на кнопку, создается личная анкета тренера
function createTrainerProfile() {
  let divCreateBlock = document.createElement('div');
  let divForTable = document.createElement('div');
  let listLi = document.querySelectorAll('.removeLi');
  let gymActive;
  let chatActive;
  let dietActive;

  for (let i = 0; i < listLi.length; i++) {
    if (listLi[i].classList.contains('removeLi')) {
      listLi[i].removeAttribute('class');
    }
  }

  if (textareaAbout.value == '') {
    textareaAbout.value = "Trainer";
  }

  if (pageTrainerName.value == '') {
    pageTrainerName.value = "NoName";
  }

  if (addImage.value == '') {
    addImage.value = 'img/user.svg';
  }


  if (checkboxGym.checked == true) {
    gymActive = "gym-active";
  } else {
    gymActive = "gym";
  }

  if (checkboxChat.checked == true) {
    chatActive = "chat-active";
  } else {
    chatActive = "chat";
  }

  if (checkboxDiet.checked == true) {
    dietActive = "diet-active";
  } else {
    dietActive = "diet";
  }

  if (Number(inputPrice.value) > 2200) {
    inputPrice.style.border = '1px solid #ff4040';
    priceVal = '2200';
  } else if (Number(inputPrice.value) < 50) {
    inputPrice.style.border = '1px solid #ff4040';
    priceVal = '50';
  } else {
    priceVal = inputPrice.value;
  }


  if (newTable.classList.contains('table-trainer_inTrainerPge')) {
    newTable.classList.remove('table-trainer_inTrainerPge')
  }

  divCreateBlock.innerHTML = `
      <div class="pageTrainerCreateBack">
        <div>
          <div class="pageTrainer-space">
            <p><b>Поздравляем!</b><br>Ваша страница обновлена!</p>
          </div>
        </div>
        <section class="wrapperForTrainer">
          <div class="trainer-block">
            <div class="trainer-block_avatar">
              <img src='${addImage.value}' alt="avatar" class="avatarPhoto">
            </div>
            <div class="trainer-block_about">
              <p class="userName">${pageTrainerName.value}</p>
              <span class="nationality"></span>
              <div class="trainer_icons_block">
                <div class="${gymActive} trainer_icons"></div>
                <div class="${chatActive} trainer_icons"></div>
                <div class="${dietActive} trainer_icons"></div>
              </div>
              <p class="aboutTrain">${textareaAbout.value}</p>
              <ul class="specification">
                ${ulList.innerHTML}
              </ul>
              <br>
              <span data-name="showMore">Узнать больше</span>
            </div>
            <div class="trainer-block_buttons">
              <div class="trainer-block_rate-price">
                <div class="trainer-block_rate">
                  <p>5</p>
                  <p class="boldComment">
                    <b>0</b>
                    отзыва
                  </p>
                </div>
                <div class="trainer-block_price">
                  <p class="price">${priceVal} <span class="price-currency">грн</span></p>
                  <p class="boldComment">
                    за час
                  </p>
                </div>
              </div>
              <div>
                <button class="trainer-block_button">Заказать услугу</button>
                <button class="trainer-block_chat">Связаться с тренером</button>
              </div>
            </div>
          </div>
          ${newTable.outerHTML}
        </section>
      </div>
  `;
  finishedBlock.appendChild(divCreateBlock);
  finishedBlock.scrollIntoView();

  let showMore = document.querySelector(`span[data-name="showMore"]`);

  showMore.addEventListener('click', showHidden);

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


  tableTrainer.classList.add('table-trainer_inTrainerPge');
  pageTrainerCreateProfile.removeEventListener('click', createTrainerProfile);
  pageTrainerCreateProfile.innerHTML = 'Данные сохранены';
  pageTrainerCreateProfile.style.backgroundColor = '#888888';
};

localStorage.removeItem('CreatedTrainer');
