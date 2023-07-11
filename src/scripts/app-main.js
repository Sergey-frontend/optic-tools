const cardsContainer = document.querySelector('.cards');

cardsContainer.addEventListener('click', (e) => {
  e.preventDefault();
  const targetCard = e.target.closest('.card');
  if (!targetCard) return;

  const pathToFile = `./${targetCard.id}.html`;
  if (pathToFile) {
    window.location.href = pathToFile;
  }
});
