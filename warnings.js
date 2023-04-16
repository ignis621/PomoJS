const dismissMobileBtn = document.getElementById('dismiss-mobile-btn');
const mobileWarning = document.getElementById('mobile-warning');
const jsWarning = document.getElementById('js-warning');

jsWarning.classList.add('hidden');

if(navigator.userAgent.match(/Mobile|Windows Phone|Lumia|Android|webOS|iPhone|iPod|Blackberry|PlayBook|BB10|Opera Mini|\bCrMo\/|Opera Mobi/i)){
  mobileWarning.classList.remove('hidden');
}

dismissMobileBtn.addEventListener('click', () => {
  mobileWarning.classList.add('hidden');
});