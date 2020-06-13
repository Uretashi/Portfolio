//mode strict JavaScript
'use strict';

/*************************************************************************************************/
/* ****************************************** DONNEES ****************************************** */
/*************************************************************************************************/

const nav = document.querySelectorAll('#navLink');

const liDots = document.querySelectorAll('.dotsRandomColour');

const expH2 = document.querySelectorAll('.mainH2');

const expH2span = document.querySelectorAll('.paddingSpan');

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

/*************************************************************************************************/
/* ************************************** CODE PRINCIPAL *************************************** */
/*************************************************************************************************/

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
      expH2span[i].style.padding = '0 10em';
    }
    else
    {
      expH2span[i].style.padding = '0 1em';
    }
  }
});

nav.forEach((currentA) => {
  currentA.onmouseover = function(){currentA.style.color = randomColour();};
  currentA.onmouseout = function(){currentA.style.color = 'white'};
});

for(let i = liDots.length; i--;)
{
  liDots[i].style.backgroundColor = randomColour();
}
