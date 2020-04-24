let opportunity = document.querySelector('.opportunity'),
    showBlockOne = document.querySelector('.orderBackground'),
    blockWithImage = document.querySelector('.whiteBackFlex'),
    arrowNext = document.querySelector('.whiteBackNext'),
    arrowPrev = document.querySelector('.whiteBackPrev'),
    divWithElem = document.querySelectorAll('.whiteBackOneBox'),
    ulList = document.querySelector('.absoluteList'),
    counter = 0,
    divElemInBox = [...divWithElem];


for (let i = 0; i < divWithElem.length; i++) {
  ulList.innerHTML += `<li class='liList'></li>`;
}

let liList = ulList.querySelectorAll('.liList');
let newListItem = [...liList];

function showDiv() {
  for (let i = 0; i < divElemInBox.length; i++) {
    if (counter == divElemInBox.indexOf(divElemInBox[i])) {
      divElemInBox[i].classList.remove('specialityHidden');
    } else {
      divElemInBox[i].classList.add('specialityHidden');
    }
  }
}

function countCicle(counter) {
  for (let j = 0; j < newListItem.length; j++) {
    if (counter == newListItem.indexOf(newListItem[j])) {
      newListItem[j].classList.add('bigLi');
    } else {
      newListItem[j].classList.remove('bigLi');
    }

    newListItem[j].addEventListener('click', chooseSlide);
  }
}

function chooseSlide() {
  newListItem.forEach(item => {
    item.classList.remove('bigLi')
  })
  counter = newListItem.indexOf(this);
  this.classList.add('bigLi');
  showDiv();
  if (counter == divElemInBox.length - 1) {
    arrowNext.style.display = 'none';
  } else {
    arrowNext.style.display = '';
  }

  if (counter == 0) {
    arrowPrev.style.display = 'none';
  } else {
    arrowPrev.style.display = '';
  }

}

arrowPrev.style.display = 'none';

opportunity.addEventListener('click', openWindow);
arrowNext.addEventListener('click', nextTop);
arrowPrev.addEventListener('click', backTop);
showBlockOne.addEventListener('click', closeWindow);

function openWindow() {
  countCicle(counter);
  showBlockOne.classList.remove('specialityHidden');
}

function closeWindow(e) {
  if (e.target !== e.currentTarget) return;
  showBlockOne.classList.add('specialityHidden');
}

function nextTop() {
  counter += 1;

  if (counter == divElemInBox.length - 1) {
    arrowNext.style.display = 'none';
  } else {
    arrowNext.style.display = '';
  }

  showDiv();
  countCicle(counter);

  if (counter == 0) {
    arrowPrev.style.display = 'none';
  } else {
    arrowPrev.style.display = '';
  }
}

function backTop() {
  counter -= 1;
  countCicle(counter);
  showDiv();

  if (counter == 0) {
    arrowPrev.style.display = 'none';
  } else {
    arrowPrev.style.display = '';
  }

  if (counter == divElemInBox.length - 1) {
    arrowNext.style.display = 'none';
  } else {
    arrowNext.style.display = '';
  }
}


let order = document.querySelector('.personalTrain'),
    orderBackgroundTwo = document.querySelector('.orderBackgroundTwo'),
    secondArrowNext = document.querySelector('.secondNext'),
    secondArrowPrev = document.querySelector('.secondPrev'),
    secondBlockWithImage = document.querySelector('.secondFlex'),
    ulListTwo = document.querySelector('.absoluteSecondList'),
    divWithElemTwo = document.querySelectorAll('.whiteBackTwoBox'),
    divElemInBoxTwo = [...divWithElemTwo],
    secondCounter = 0,
    secondMargin = 0;

for (let i = 0; i < divWithElemTwo.length; i++) {
  ulListTwo.innerHTML += `<li class='liListTwo'></li>`;
}

secondArrowPrev.style.display = 'none';

let liListTwo = ulListTwo.querySelectorAll('.liListTwo');
let newListItemTwo = [...liListTwo];

function showDivTwo() {
  for (let i = 0; i < divElemInBoxTwo.length; i++) {
    if (secondCounter == divElemInBoxTwo.indexOf(divElemInBoxTwo[i])) {
      divElemInBoxTwo[i].classList.remove('specialityHidden');
    } else {
      divElemInBoxTwo[i].classList.add('specialityHidden');
    }
  }
}

function countCicleTwo(secondCounter) {
  for (let j = 0; j < newListItemTwo.length; j++) {
    if (secondCounter == newListItemTwo.indexOf(newListItemTwo[j])) {
      newListItemTwo[j].classList.add('bigLi');
    } else {
      newListItemTwo[j].classList.remove('bigLi');
    }

    newListItemTwo[j].addEventListener('click', chooseSlideTwo);
  }
}

function chooseSlideTwo() {
  newListItemTwo.forEach(item => {
    item.classList.remove('bigLi')
  })
  secondCounter = newListItemTwo.indexOf(this);
  this.classList.add('bigLi');
  showDivTwo();
  if (secondCounter == divElemInBoxTwo.length - 1) {
    secondArrowNext.style.display = 'none';
  } else {
    secondArrowNext.style.display = '';
  }

  if (secondCounter == 0) {
    secondArrowPrev.style.display = 'none';
  } else {
    secondArrowPrev.style.display = '';
  }
}

order.addEventListener('click', openOrderWindow);
secondArrowNext.addEventListener('click', secondNextTop);
secondArrowPrev.addEventListener('click', secondBackTop);
orderBackgroundTwo.addEventListener('click', closeWindowTwo);

function openOrderWindow() {
  countCicleTwo(secondCounter);
  orderBackgroundTwo.classList.remove('specialityHidden');
}


function closeWindowTwo(e) {
  if (e.target !== e.currentTarget) return;
  orderBackgroundTwo.classList.add('specialityHidden');
}

function secondNextTop() {
  secondCounter += 1;

  if (secondCounter == divElemInBoxTwo.length - 1) {
    secondArrowNext.style.display = 'none';
  } else {
    secondArrowNext.style.display = '';
  }

  showDivTwo();
  countCicleTwo(secondCounter);

  if (secondCounter == 0) {
    secondArrowPrev.style.display = 'none';
  } else {
    secondArrowPrev.style.display = '';
  }
}

function secondBackTop() {
  secondCounter -= 1;
  countCicleTwo(secondCounter);
  showDivTwo();

  if (secondCounter == 0) {
    secondArrowPrev.style.display = 'none';
  } else {
    secondArrowPrev.style.display = '';
  }

  if (secondCounter == divElemInBoxTwo.length - 1) {
    secondArrowNext.style.display = 'none';
  } else {
    secondArrowNext.style.display = '';
  }
}
