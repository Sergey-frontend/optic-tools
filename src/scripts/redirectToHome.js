const toMainPage = document.querySelector('.to-main');
toMainPage.addEventListener('click', (event) => {
  event.preventDefault();
  const pathToFile = './app-main.html';
  window.location.href = pathToFile;
});