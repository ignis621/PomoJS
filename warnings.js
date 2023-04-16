const mobileWarning = document.getElementById('mobile-warning');
const jsWarning = document.getElementById('js-warning');

jsWarning.classList.add('hidden');

const isMobile = navigator.userAgentData.mobile
mobileWarning.classList.toggle('hidden', !isMobile);