import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import '../css/style.css';
import SlimSelect from 'slim-select';
import '/node_modules/slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

fetchBreeds()
  .then(breeds => {
    refs.breedSelect.classList.remove('hidden');
    refs.loader.classList.add('hidden');

    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      refs.breedSelect.appendChild(option);
    });
    new SlimSelect({
      select: '.breed-select',
    });
  })
  .catch(error => {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  });

refs.breedSelect.addEventListener('change', function () {
  const selectedBreedId = refs.breedSelect.value;

  refs.catInfo.classList.add('hidden');
  refs.loader.classList.remove('hidden');
  fetchCatDetails(selectedBreedId);
});

function fetchCatDetails(breedId) {
  fetchCatByBreed(breedId)
    .then(showCatInfo)
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}
function showCatInfo(cat) {
  refs.catInfo.classList.remove('hidden');
  refs.loader.classList.add('hidden');
  const { name, description, temperament } = cat.breeds[0];

  refs.catInfo.innerHTML = `
    <img src="${cat.url}" alt="Cat Image" width="500" ;class="cat-image">
    <div class="cat-container-info">
      <h2 class="cat-name">${name}</h2>
      <p class="cat-description">${description}</p>
      <p class="cat-temperament"><strong>Temperament:</strong> ${temperament}</p>
    </div>`;
}
