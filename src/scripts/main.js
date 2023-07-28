import watchedObject from './app.js';

const cardsContainer = document.querySelector('.cards');

cardsContainer.addEventListener('click', (e) => {
  e.preventDefault();
  const targetCard = e.target.closest('.card');
  if (!targetCard) return;
  const cardName = targetCard.id;
  watchedObject.currentPage = cardName;
});
