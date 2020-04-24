let validateLoginUser = document.querySelector('#validateUser');
let noteEverything = document.querySelector('.noteEverything');
let noteTextResolve = document.querySelector('.note-text-resolve');
let resolveButton = document.querySelector('.resolve-button');
let needText;
let enterResolve = document.querySelector('.enterResolve');


function validateUser() {
	//getting previously recorded username and password
	let recordedUsername = localStorage.getItem("username");
  let recordedPassword = localStorage.getItem("password");
  let recordedWhoComesIn = localStorage.getItem("whoCome");
	let recordedCheckEnter = localStorage.getItem("checkEnter");
  let username = document.querySelector("#login").value;
  let password = document.querySelector("#userPassword").value;

  console.log('recordedUsername', recordedUsername);
  console.log('recordedPassword', recordedPassword);
  console.log('whoCome', recordedWhoComesIn);
	console.log('checkEnter', recordedCheckEnter);

	//doing it as simple as possible, no validation at all
	if (username == recordedUsername && password == recordedPassword) {
		needText= `<b>Приветствуем Вас, ${username}!</b><br>Вы лучший ${recordedWhoComesIn}!`;
		noteTextResolve.innerHTML = needText;
		enterResolve.classList.remove('specialityHidden');
		let checkEnter = true;
		localStorage.setItem('checkEnter', checkEnter);

		if (recordedWhoComesIn == 'Тренер') {
			resolveButton.setAttribute('href', 'index.html');
		} else if (recordedWhoComesIn == 'Спортсмен') {
			resolveButton.setAttribute('href', 'user.html');
		}

  } else {
  	noteEverything.classList.remove('specialityHidden');
    setTimeout("noteEverything.classList.add('specialityHidden')", 2000);
  }

}

validateLoginUser.addEventListener('click', validateUser);
