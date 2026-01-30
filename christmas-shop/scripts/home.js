const slider = document.getElementById('slider-row');
const sliderCaptionText = document.getElementById('slider-caption-text');
const sliderLeftBTN = document.getElementById('left-btn');
const sliderRightBTN = document.getElementById('right-btn');
const days = document.getElementById('cta-timer-days');
const hours = document.getElementById('cta-timer-hours');
const minutes = document.getElementById('cta-timer-minutes');
const seconds = document.getElementById('cta-timer-seconds');

const currentDate = new Date();
const currentUTCDate = new Date(currentDate.toISOString());
const newYearTimeUTCStamp = new Date(Date.UTC(currentUTCDate.getFullYear() +1, 0, 1));
const nextYear = new Date().getFullYear();

const cardContainer = document.getElementById('best-gifts-container');

sliderLeftBTN.BTN_ON = false;
sliderRightBTN.BTN_ON = true;
let windowWidth = 1440;
let sliderStrokes = 3;
let sliderPosition = 0;
let sliderWidth = 1993;
let sliderPadding;
let sliderInvisibleWidth;
let giftsQTY = 36;

checkWinWidth();
showFourRandomGifts();
showSliderCaptionText();
setInterval(ctaTimer, 1000);

window.addEventListener('resize', checkWinWidth);

sliderLeftBTN.addEventListener('click', () => {
  if(!sliderLeftBTN.BTN_ON) return;
  sliderPosition--;
  if(sliderPosition === 0) toggleSliderBTN(sliderLeftBTN, 'disable');
  if(sliderPosition === sliderStrokes - 1) toggleSliderBTN(sliderRightBTN, 'enable');
  slider.style.transform = `translateX(-${(sliderInvisibleWidth / (sliderStrokes)) * sliderPosition}px)`;
})

sliderRightBTN.addEventListener('click', () => {
  if(!sliderRightBTN.BTN_ON) return;
  sliderPosition++;
  if(sliderPosition === sliderStrokes) toggleSliderBTN(sliderRightBTN, 'disable');
  if(sliderPosition === 1) toggleSliderBTN(sliderLeftBTN, 'enable');
  slider.style.transform = `translateX(-${(sliderInvisibleWidth / (sliderStrokes)) * sliderPosition}px)`;  
})

cardContainer.addEventListener('click', (event) => {
  let key;
  if(event.target.parentElement.classList.contains('best-gift-card')) {
    key = event.target.parentElement.getAttribute('key');
  } else {
    key = event.target.parentElement.parentElement.getAttribute('key');
  }
  if(key) showModal(key);
})

function checkWinWidth () {
  windowWidth = window.innerWidth;
  // Adjust behavior depending on screen width
  if(windowWidth <= 768 && !burgerMNU_ON) {
    sliderStrokes = 6;
    burgerMNU.style.display = 'flex';
    burger.style.display = 'flex';
    burgerMNU_ON = true;
  } else if (windowWidth > 768 && burgerMNU_ON) {
    sliderStrokes = 3;
    toggleBurgerBackgroundLock();  
    burgerMNU.style.display = 'none';
    burger.style.display = 'none';
    burgerMNU_ON = false;
    burger.classList.remove('cross-btn');
    burgerMNU.classList.remove('burger-menu-drive-in');
  } 
  if (windowWidth <= 1290) {
    sliderPadding = 16;
  } else if (windowWidth <= 1440) {
    sliderPadding = windowWidth - 1276;
  } else {
    sliderPadding = 164;
  }

  sliderInvisibleWidth = sliderWidth - content.clientWidth + sliderPadding;
  toggleSliderBTN(sliderLeftBTN, 'disable');
  toggleSliderBTN(sliderRightBTN, 'enable');
  sliderPosition = 0;
  slider.style.transform = `translateX(0)`
}

function toggleSliderBTN(BTN, action) {
  if(action === 'disable') {
    BTN.BTN_ON = false;
    BTN.classList.remove('slider-button-active');
  } else if (action === 'enable') {
    BTN.BTN_ON = true;
    BTN.classList.add('slider-button-active');
  }  
}

function ctaTimer() {
  const timeStampNow = new Date();  
  const timeUTCLeft = newYearTimeUTCStamp - timeStampNow;

  const daysLeft = Math.floor(timeUTCLeft / ( 60 * 60 * 24 * 1000));
  const hoursLeft = Math.floor((timeUTCLeft % ( 60 * 60 * 24 * 1000)) / ( 60 * 60 * 1000));
  const minutesLeft = Math.floor((timeUTCLeft % ( 60 * 60 * 1000)) / ( 60 * 1000));
  const secondsLeft = Math.floor((timeUTCLeft % ( 60 * 1000)) / 1000);
  days.innerText = daysLeft;
  hours.innerText = hoursLeft;
  minutes.innerText = minutesLeft;
  seconds.innerText = secondsLeft;
}

function showSliderCaptionText() {
  sliderCaptionText.innerText = `in the new ${new Date().getFullYear() + 1}`;
}

function showFourRandomGifts() {
  let giftSet = [];
  do {
    const index = Math.floor(Math.random() * (giftsQTY));
    if(!giftSet.includes(index)) giftSet.push(index);
  } while(giftSet.length < 4)

  const cards = document.querySelectorAll('.best-gift-card');
  for(let i = 0; i < 4; i++) {
    let cardImage = cards[i].querySelector('img');
    let cardCategory = cards[i].querySelector('.best-gift-card-descr-caption');
    let cardName = cards[i].querySelector('.best-gift-card-descr-text');    
    switch(gifts[giftSet[i]].category) {
      case 'For Work':
        cardImage.src = './assets/img/gift-for-work.png';
        cardImage.setAttribute('alt', `${gifts[giftSet[i]].name} image`);
        cardCategory.innerText = 'for work';
        cardCategory.classList.add('txt-blue');
        cardName.innerText = gifts[giftSet[i]].name;
        break;
      case 'For Health':
        cardImage.src = './assets/img/gift-for-health.png';
        cardImage.setAttribute('alt', `${gifts[giftSet[i]].name} image`);
        cardCategory.innerText = 'for health';
        cardCategory.classList.add('txt-green');
        cardName.innerText = gifts[giftSet[i]].name;
        break;
      case 'For Harmony':
        cardImage.src = './assets/img/gift-for-harmony.png';
        cardImage.setAttribute('alt', `${gifts[giftSet[i]].name} image`);
        cardCategory.innerText = 'for harmony';
        cardCategory.classList.add('txt-purple');
        cardName.innerText = gifts[giftSet[i]].name;
        break;
    }
    cards[i].setAttribute('key', `${giftSet[i]}`);
  }
}