const API_KEY =
  'live_TrS19Kwl97618lIqTZGGNvqd8Kmru4aLtkXcdSHBDvu9xpJN346l82g7ukXxKBhf';
const BASE_URL = `https://api.thecatapi.com/v1`;

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
};

export function fetchBreeds() {
  refs.breedSelect.classList.add('hidden');
  refs.loader.classList.remove('hidden');

  return fetch(`${BASE_URL}/breeds?api_key=${API_KEY}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .catch(error => {
      console.error(error);
    });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `${BASE_URL}/images/search?breed_ids=${breedId}&api_key=${API_KEY}`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch cat by breed');
      }
      return response.json();
    })
    .then(cat => {
      return cat[0];
    })
    .catch(error => {
      console.error('Error fetching cat data:', error);
      throw error;
    });
}
