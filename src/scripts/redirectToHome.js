const toMainPage = document.querySelector('.floating-button');
toMainPage.addEventListener('click', (event) => {
  event.preventDefault();
  const pathToFile = './app-main.html';
  window.location.href = pathToFile;
});
