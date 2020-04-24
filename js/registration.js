let createLoginUser = document.querySelector('#createUser'),
    radioChoose = document.getElementsByName('enter'),
    noteEverything = document.querySelector('.noteEverything'),
    registrationResolve = document.querySelector('.registrationResolve'),
    noteTextResolve = document.querySelector('.note-text-resolve'),
    resolveButton = document.querySelector('.resolve-button'),
    enterTrainer,
    enterUser,
    whoCome;



function createUser() {
	//using sessionstorage to keep user and password values
	let username = document.querySelector("#createLogin").value;
  let password = document.querySelector("#createUserPassword").value;
	let checkEnter = true;

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
