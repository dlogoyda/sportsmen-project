let pageUserName = document.querySelector('.pageUser_name'),
    pageUserPhone = document.querySelector('.pageUser_phone'),
    pageUserDate = document.querySelector('.pageUser_dateBirth'),
    pageUserCreateProfile = document.querySelector('.pageTrainer_createProfile'),
    finishedBlock = document.getElementById('finishedBlock'),
    textareaAbout = document.querySelector('.pageTrainer_textArea'),
    addImage = document.getElementById('AddImage'),
    bodyUser = document.getElementsByTagName('body')[0];


pageUserCreateProfile.addEventListener('click', createUserProfile);

//При нажатии на кнопку, создается личная анкета спортсмена
function createUserProfile() {
  let divCreateBlock = document.createElement('div');

  if (textareaAbout.value == '') {
    textareaAbout.value = "Спортсмен, который хочет заниматься!";
  }

  if (pageUserName.value == '') {
    pageUserName.value = "NoName";
  }

  if (addImage.value == '') {
    addImage.value = 'img/user.svg';
  }

  divCreateBlock.innerHTML = `
      <div class="pageTrainerCreateBack">
        <div>
          <div class="pageTrainer-space">
            <p><b>Поздравляем!</b><br>Ваша страница обновлена!</p>
          </div>
        </div>
        <section class="pageTrainer_blockWithInputs flexUserPosition">
          <div class="user_widthLeft">
            <div>
              <img src='${addImage.value}' alt="avatar" class="avatarPhoto userPage">
            </div>
          </div>
          <div class="user_widthRight">
            <p class="ownText">Спортсмен <b>${pageUserName.value}</b></p>
            <div class="pageTrainer_margin">
                <p>Дата рождения: ${pageUserDate.value}</p>
            </div>
            <div class="pageTrainer_margin">
                <p>Номер телефона: ${pageUserPhone.value}</p>
            </div>
            <div class="pageTrainer_margin">
              <p>Мои цели для достижения спортивного успеха:</p>
              <p class="ownText">${textareaAbout.value}</p>
            </div>
          </div>
        </section>
        <a href="user.html" class="button_main goToUserPage">Вперед на поиски тренера!</a>
      </div>
  `;
  finishedBlock.appendChild(divCreateBlock);
  finishedBlock.scrollIntoView();
  pageUserCreateProfile.removeEventListener('click', createUserProfile);
  pageUserCreateProfile.innerHTML = 'Данные сохранены';
  pageUserCreateProfile.style.backgroundColor = '#888888';
};
