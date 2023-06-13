const jsWarning = document.getElementById('js-warning');
jsWarning.classList.add('hidden');

const dismissButtons = document.querySelectorAll(".dismiss-button");
dismissButtons.forEach(button => {
  button.addEventListener("click", event => {
    const parentDiv = event.currentTarget.parentNode;
    parentDiv.classList.add("hidden");
  });
});

const movingWarning = document.getElementById('moving-warning');
const currentUrl = location.hostname;
if(currentUrl=="pomojs.ignisdev.xyz"){
  movingWarning.classList.add('hidden');
}