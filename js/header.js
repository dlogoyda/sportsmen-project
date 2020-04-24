let scrolled,
    header = document.getElementById('header'),
    burger = document.getElementsByClassName('header_burger')[0],
    headerText = document.querySelectorAll('.header_menu_list'),
    timeOut,
    burgerMenu = document.querySelector('.header_burger'),
    body = document.getElementsByTagName('body')[0],
    headerMenuBlock = document.createElement('div'),
    wrapperDivMenu = document.createElement('div'),
    checkExitOrEnter = localStorage.getItem('checkEnter');

body.appendChild(headerMenuBlock);


let exitOrEnter;
let hrefExitOrEnter;
if (checkExitOrEnter === 'true') {
  exitOrEnter = 'Выйти';
  hrefExitOrEnter = 'exitPage.html';
} else {
  exitOrEnter = 'Войти';
  hrefExitOrEnter = 'enter.html';
}

// When scrolling down, the header changes color
window.onscroll = function() {

    scrolled = window.pageYOffset || document.documentElement.scrollTop;
    if(scrolled > 100){
      header.classList.add("header_js");
      burger.classList.add("header_burger_black");

      for(let i = 0; i < headerText.length; i++) {
        headerText[i].classList.add("for_header_list");
      }
    }
    if(100 > scrolled){
      header.classList.remove("header_js");
      burger.classList.remove("header_burger_black");

      for(let i = 0; i < headerText.length; i++) {
        headerText[i].classList.remove("for_header_list");
      }
    }

}

// Returns to the top of the page
function goUp() {
  let top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
  if (top > 0) {
    window.scrollBy(0, -100);
    timeOut = setTimeout('goUp()', 20);
  } else clearTimeout(timeOut);
}


burgerMenu.addEventListener('click', showMenu);

// Открывает бургер меню.
function showMenu() {

  wrapperDivMenu.innerHTML = `
  <div class="wrapAll">
    <div class="burger-close"></div>
    <div id="burgerMenu">
      <div class="burgerMenu-block"><a href="index.html">Главная</a></div>
      <hr class="hrWhite">
      <div class="burgerMenu-block"><a href="trainer.html">Тренерам</a></div>
      <hr class="hrWhite">
      <div class="burgerMenu-block"><a href="user.html">Спортсменам</a></div>
      <hr class="hrWhite">
      <div class="burgerMenu-block"><a href="#">Блог</a></div>
      <hr class="hrWhite">
      <div class="burgerMenu-block"><a href="${hrefExitOrEnter}">${exitOrEnter}</a></div>
    </div>
  </div>
  `;

  headerMenuBlock.appendChild(wrapperDivMenu);
  let overlay = wrapperDivMenu.querySelector('.wrapAll');
  let close = wrapperDivMenu.querySelector('.burger-close');

  burgerMenu.classList.toggle('burgerCloseRed');

  overlay.addEventListener('click', hideMenu);
  close.addEventListener('click', hideMenu);
//Закрывает бургер меню
  function hideMenu(e) {
    if (e.target !== e.currentTarget) return;
    overlay.classList.add('wrapMenu-hidden');
    burgerMenu.classList.toggle('burgerCloseRed');
  }
}
