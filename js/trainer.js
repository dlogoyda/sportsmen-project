let  questionBlock = document.querySelectorAll('.popularQuestion_block');

// Listener on blocks in page for trainers
for (let i = 0; i < questionBlock.length; i++) {
  questionBlock[i].addEventListener('click', showBlock);
}

// Show block on page for trainers
function showBlock() {
  let arrow = this.children[1];
  arrow.classList.toggle('transform');

  let paragraph = this.nextElementSibling;
  paragraph.classList.toggle('popularQuestion_text');
  paragraph.classList.toggle('popularQuestion_textVisual');
}


let createLoginUser = document.querySelector('#createUser'),
    radioChoose = document.getElementsByName('enter'),
    noteEverything = document.querySelector('.noteEverything'),
    noteEverythingEnter = document.querySelector('.noteEverythingEnter'),
    registrationResolve = document.querySelector('.registrationResolve'),
    noteTextResolve = document.querySelector('.note-text-resolve'),
    resolveButton = document.querySelector('.resolve-button'),
    enterTrainer,
    enterUser,
    whoCome,
    validateLoginUser = document.querySelector('#validateUser'),
    noteTextResolveEnter = document.querySelector('.note-text-resolveEnter'),
    resolveButtonEnter = document.querySelector('.resolve-buttonEnter'),
    enterResolve = document.querySelector('.enterResolve');

function createUser() {
	//using sessionstorage to keep user and password values
	let username = document.querySelector("#createLogin").value;
  let password = document.querySelector("#createUserPassword").value;
  let checkEnter = true

  if (username.length == 0 || password.length == 0) {
    noteEverything.classList.remove('specialityHidden');

    setTimeout("noteEverything.classList.add('specialityHidden')", 2000);

  } else {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    localStorage.setItem('checkEnter', checkEnter);

    registrationResolve.classList.remove('specialityHidden');

    for (let i = 0; i < radioChoose.length; i++) {
        if (radioChoose[i].checked) {
					whoCome = radioChoose[i].value;
					localStorage.setItem("whoCome", whoCome);
          let needText = `<b>Поздравляем!</b><br>Аккаунт ${whoCome}а создан!`;
          noteTextResolve.innerHTML = needText;
          if (radioChoose[i].value == 'Спортсмен') {
            resolveButton.setAttribute('href', 'userPage.html');
          } else {
            resolveButton.setAttribute('href', 'trainerPage.html');
          }
        }
    }
  }
}


if(createLoginUser) {
  createLoginUser.addEventListener('click', createUser);
}


function validateUser() {
	//getting previously recorded username and password
	let recordedUsername = localStorage.getItem("username");
  let recordedPassword = localStorage.getItem("password");
  let recordedWhoComesIn = localStorage.getItem("whoCome");
  let username = document.querySelector("#login").value;
  let password = document.querySelector("#userPassword").value;



	if (username == recordedUsername && password == recordedPassword) {
		needText= `<b>Приветствуем Вас, ${username}!</b><br>Вы лучший ${recordedWhoComesIn}!`;
		noteTextResolveEnter.innerHTML = needText;
		enterResolve.classList.remove('specialityHidden');

		if (recordedWhoComesIn == 'Тренер') {
			resolveButtonEnter.setAttribute('href', 'trainerPage.html');
		} else if (recordedWhoComesIn == 'Спортсмен') {
			resolveButtonEnter.setAttribute('href', 'user.html');
		}

  } else if (username.length == 0 || password.length == 0) {
    noteEverything.classList.remove('specialityHidden');
    setTimeout("noteEverything.classList.add('specialityHidden')", 2000);
  } else {
    noteEverythingEnter.classList.remove('specialityHidden');
    setTimeout("noteEverythingEnter.classList.add('specialityHidden')", 2000);
  }
}

validateLoginUser.addEventListener('click', validateUser);
