//mode strict JavaScript
'use strict';

/*************************************************************************************************/
/* ****************************************** DONNEES ****************************************** */
/*************************************************************************************************/

const nav = document.querySelectorAll('#navLink');

const liDots = document.querySelectorAll('.dotsRandomColour');

const expH2 = document.querySelectorAll('.mainH2');

const expH2span = document.querySelectorAll('.paddingSpan');

const smoothBar = document.querySelectorAll('#smoothBar');

const chevronDown = document.querySelector('.fa-chevron-circle-down');

const startGame = document.getElementById('game');

const showWinner = document.getElementById('winner');

const userPoint = document.querySelectorAll('.userPoint'),
      jsPoint = document.querySelectorAll('.jsPoint'),
      randomChoice = document.getElementById('JScontent');


let userScore = 0,
    jsScore = 0,
    roundNumber = 1;

/*************************************************************************************************/
/* ***************************************** FONCTIONS ***************************************** */
/*************************************************************************************************/

function randomColour()
{
  let number = 6, hexColor = '#';

	while(number--)
  {
		hexColor += (Math.random() * 16 | 0).toString(16);
	}

  return hexColor;
}

function getCurrentHour()
{
  //onload="getCurrentHour(); setInterval('getCurrentHour()', 1000)"
  const date = new Date();

  let hours = date.getHours(), minutes = date.getMinutes(), seconds = date.getSeconds();

  minutes = (minutes < 10 ? "0" : "") + minutes;
  seconds = (minutes < 10 ? "0" : "") + seconds;

  let currentTime = hours + ':' + minutes + ':' + seconds;

  document.getElementById('currentTime').innerHTML = currentTime;
}

function resetGame()
{
  userScore = 0;
  jsScore = 0;
  roundNumber = 1;

  userPoint.forEach((point, i) => {
    point.style.backgroundColor = 'transparent';
    jsPoint[i].style.backgroundColor = 'transparent';
  });

  document.querySelector('.roundDiv').innerHTML = '';
  document.getElementById('userContent').innerHTML = '';
  document.getElementById('gameTimer').innerHTML = '';
  randomChoice.innerHTML = '';

  showWinner.innerHTML = '';
  startGame.innerHTML = 'Start';
}

function gameTimer()
{
  const gameWords = ['Pierre 🤜', 'Papier ✋', 'Ciseaux ✂️ !'];

  let i = 0;

  let interval = setInterval(function(){
    document.getElementById('gameTimer').innerHTML = gameWords[i];
    i++;
    if(i === 3)
    {
      clearInterval(interval);
      i = 0;
    }
  }, 1000);
}

function gameplay()
{
  const shifumiArray = ['&#x1F91C;', '✋', '✂️'];

  const random = Math.floor(Math.random() * Math.floor(3)),
        userChoice = document.getElementById('userContent');

  document.querySelectorAll('.choice').forEach((choice) => {
    choice.onclick = function(){document.getElementById('userContent').innerHTML = choice.textContent};
  });

  setTimeout(function(){

    randomChoice.innerHTML = shifumiArray[random];

    let roundTag = document.createElement('p');

    switch (true)
    {
      case randomChoice.textContent === '🤜' && userChoice.textContent === '✂️':
        roundTag.textContent = 'Round N°'+ roundNumber++ +' Player : ✂️ _ 🤜 : JS ';
        jsPoint[jsScore].style.backgroundColor = '#de4545';
        jsScore++;
        break;

      case randomChoice.textContent === '🤜' && userChoice.textContent === '✋':
        roundTag.textContent = 'Round N°'+ roundNumber++ +' Player : ✋ _ 🤜 : JS ';
        userPoint[userScore].style.backgroundColor = '#45b3f7';
        userScore++;
        break;

      case randomChoice.textContent === '✋' && userChoice.textContent === '🤜':
        roundTag.textContent = 'Round N°'+ roundNumber++ +' Player : 🤜 _ ✋ : JS ';
        jsPoint[jsScore].style.backgroundColor = '#de4545';
        jsScore++;
        break;

      case randomChoice.textContent === '✋' && userChoice.textContent === '✂️':
        roundTag.textContent = 'Round N°'+ roundNumber++ +' Player : ✂️ _ ✋ : JS ';
        userPoint[userScore].style.backgroundColor = '#45b3f7';
        userScore++
        break;

      case randomChoice.textContent === '✂️' && userChoice.textContent === '🤜':
        roundTag.textContent = 'Round N°'+ roundNumber++ +' Player : 🤜 _ ✂️ : JS ';
        userPoint[userScore].style.backgroundColor = '#45b3f7';
        userScore++;
        break;

      case randomChoice.textContent === '✂️' && userChoice.textContent === '✋':
        roundTag.textContent = 'Round N°'+ roundNumber++ +' Player : ✋ _ ✂️ : JS ';
        jsPoint[jsScore].style.backgroundColor = '#de4545';
        jsScore++;
        break;

      case userChoice.textContent.length === 0:
        roundTag.textContent = 'Vous n\'avez rien choisi';
        break;

      default:
        roundTag.textContent = 'Round N°'+ roundNumber++ +' égalité !';
    }

    document.querySelectorAll('.choice').forEach((choice) => {
      choice.onclick = function(){};
    });

    document.querySelector('.roundDiv').append(roundTag);

    startGame.innerHTML = 'Round N°'+ roundNumber;

    if(userScore === 3)
    {
      showWinner.innerHTML = '<i class="fas fa-flag-checkered"></i>Vous avez gagné !<i class="fas fa-flag-checkered"></i>';
      startGame.innerHTML = 'Rejouer';
    }
    else if(jsScore === 3)
    {
      showWinner.innerHTML = '<i class="fas fa-flag-checkered"></i>JS à gagné !<i class="fas fa-flag-checkered"></i>';
      startGame.innerHTML = 'Rejouer';
    }
  },3000);
}

/*************************************************************************************************/
/* ************************************** CODE PRINCIPAL *************************************** */
/*************************************************************************************************/

document.getElementById('reset').addEventListener('click', resetGame);

startGame.addEventListener('click', function(){

  if(userScore === 3 || jsScore === 3)
  {
    resetGame();
  }
  else
  {
    gameplay();
    gameTimer();
  }
});

window.addEventListener('scroll', function(e){

  if(window.scrollY > 600)
  {
    document.querySelectorAll('.expDiv').forEach((thisDiv, i) => {
      setInterval(function(){
        thisDiv.style.left = '0';
      }, i * 400)
    });
  }

  for(let i = 0; i < expH2.length; i++)
  {
    if(expH2[i].getBoundingClientRect().top < 125)
    {
      expH2span[i].style.padding = '0 20%';
    }
    else
    {
      expH2span[i].style.padding = '0 1em';
    }
  }

  for (let i = 0; i < smoothBar.length; i++)
  {
    if(smoothBar[i].getBoundingClientRect().top < 350)
    {
      smoothBar[i].style.width = '100%';
    }
    else
    {
      smoothBar[i].style.width = '0';
    }
  }

});

nav.forEach((currentA) => {

  if(window.innerWidth < 1024)
  {
    let color1 = randomColour(), color2 = randomColour();
    currentA.style.borderBottom = 'solid 2px';
    currentA.style.borderImageSource = 'linear-gradient(to right, '+ color1 +' 0%, '+ color2+' 100%)'
  }

  currentA.onmouseover = function(){currentA.style.color = randomColour();};
  currentA.onmouseout = function(){currentA.style.color = 'white'};
});

for(let i = liDots.length; i--;)
{
  liDots[i].style.backgroundColor = randomColour();
}


document.getElementById('contactForm').addEventListener('submit', function(){

  event.preventDefault();

  const mail = 'mailto:alexandrehoffmann50@gmail.com'
             + '?from='+document.getElementById('userMail').value
             + '&subject='+document.getElementById('subject').value
             + '&body='+document.getElementById('message').value;

  window.location.href = mail;

});

chevronDown.onclick = function(){

  document.getElementById('rulsUl').classList.toggle('collapsed');
  chevronDown.classList.toggle('rotateChevron');
  /*
  if(document.getElementById('rulsUl').classList != 'collapsed')
  {
    chevronDown.style.transform = 'rotate(180deg)';
    console.log('ok');
  }
  else if(chevronDown.style.transform = 'rotate(180deg)')
  {
    chevronDown.style.transform = 'rotate(360deg)';
    console.log('not ok');
  }
  */
};
