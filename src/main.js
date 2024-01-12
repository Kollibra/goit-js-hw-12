// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
// import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';
// import axios from 'axios'; // Додано бібліотеку Axios

// const searchForm = document.querySelector('.form');
// const galleryContainer = document.querySelector('.gallery');
// const loaderElement = document.querySelector('.loader');
// const loadMoreButton = document.querySelector('.load-more-btn');

// let searchParamsDefaults = {
//   key: '41631198-f5cd04d694ed896bf4215baa6',
//   image_type: 'photo',
//   orientation: 'horizontal',
//   safesearch: true,
//   page: 1, // Додали початкове значення параметра page
//   per_page: 40, // Змінили значення параметра per_page на 40

// };

// let currentSearchQuery = ''; // Глобальна змінна 

// function showLoaderAndHideGallery() {
//   loaderElement.style.display = 'block';
//   galleryContainer.style.display = 'none';
//   loadMoreButton.style.display = 'none'; // Ховаємо кнопку при завантаженні
// }

// function hideLoaderAndShowGallery() {
//   loaderElement.style.display = 'none';
//   galleryContainer.style.display = 'flex';
//   loadMoreButton.style.display = 'block'; // Показуємо кнопку після завантаження
// }

// function generateGalleryHTML(hits) {
//   return hits.reduce((html, hit) => {
//     const { largeImageURL, webformatURL, tags, likes, views, comments, downloads } = hit;
//     return (
//       html +
//       `<li class="gallery-item">
//         <a href=${largeImageURL}> 
//           <img class="gallery-img" src=${webformatURL} alt=${tags} />
//         </a>
//         <div class="gallery-text-box">
//           <p>Likes: <span class="text-value">${likes}</span></p>
//           <p>views: <span class="text-value">${views}</span></p>
//           <p>comments: <span class="text-value">${comments}</span></p>
//           <p>downloads: <span class="text-value">${downloads}</span></p>
//         </div>
//       </li>`
//     );
//   }, '');
// }

// function renderGallery(hits) {
//   const galleryHTML = generateGalleryHTML(hits);
//   galleryContainer.innerHTML = galleryHTML;
// }

// function initializeImageLightbox() {
//   let lightbox = new SimpleLightbox('.gallery a', {
//     nav: true,
//     captionDelay: 250,
//     captionsData: 'alt',
//     close: true,
//     enableKeyboard: true,
//     docClose: true,
//   });
//   lightbox.refresh();
// }

// function handleNoResults() {
//   galleryContainer.style.display = 'none';
//   iziToast.error({
//     position: 'topRight',
//     color: 'red',
//     message: 'Sorry, there are no images matching your search query. Please try again!',
//   });
// }

// async function searchImages(params) {
//   showLoaderAndHideGallery();

//   try {
//     const response = await axios.get(`https://pixabay.com/api/?${params}`);
//     hideLoaderAndShowGallery();

//     if (response.status !== 200) {
//       throw new Error(response.statusText);
//     }

//     const { hits } = response.data;

//     if (hits.length > 0) {
//       renderGallery(hits);
//       initializeImageLightbox();
//     } else {
//       handleNoResults();
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

// searchForm.addEventListener('submit', async (event) => {
//   event.preventDefault();
//   searchParamsDefaults.q = event.target.elements.search.value.trim();
//   const searchParams = new URLSearchParams(searchParamsDefaults);
//   await searchImages(searchParams);
//   event.currentTarget.reset();
// });


import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

const searchForm = document.querySelector('.form');
const galleryContainer = document.querySelector('.gallery');
const loaderElement = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more-btn');

let searchParamsDefaults = {
  key: '41631198-f5cd04d694ed896bf4215baa6',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  page: 1, // Додали початкове значення параметра page
  per_page: 40, // Змінили значення параметра per_page на 40
};

let currentSearchQuery = ''; // Глобальна змінна для збереження останнього пошукового запиту

function showLoaderAndHideGallery() {
  loaderElement.style.display = 'block';
  galleryContainer.style.display = 'none';
  loadMoreButton.style.display = 'none'; // Ховаємо кнопку при завантаженні
}

function hideLoaderAndShowGallery() {
  loaderElement.style.display = 'none';
  galleryContainer.style.display = 'flex';
  loadMoreButton.style.display = 'block'; // Показуємо кнопку після завантаження
}

function generateGalleryHTML(hits) {
  return hits.reduce((html, hit) => {
    const { largeImageURL, webformatURL, tags, likes, views, comments, downloads } = hit;
    return (
      html +
      `<li class="gallery-item">
        <a href=${largeImageURL}> 
          <img class="gallery-img" src=${webformatURL} alt=${tags} />
        </a>
        <div class="gallery-text-box">
          <p>Likes: <span class="text-value">${likes}</span></p>
          <p>views: <span class="text-value">${views}</span></p>
          <p>comments: <span class="text-value">${comments}</span></p>
          <p>downloads: <span class="text-value">${downloads}</span></p>
        </div>
      </li>`
    );
  }, '');
}

function renderGallery(hits) {
  const galleryHTML = generateGalleryHTML(hits);
  galleryContainer.innerHTML = galleryHTML;
}

function appendToGallery(hits) {
  const galleryHTML = generateGalleryHTML(hits);
  galleryContainer.innerHTML += galleryHTML;
  initializeImageLightbox();
}

function initializeImageLightbox() {
  let lightbox = new SimpleLightbox('.gallery a', {
    nav: true,
    captionDelay: 250,
    captionsData: 'alt',
    close: true,
    enableKeyboard: true,
    docClose: true,
  });
  lightbox.refresh();
}

function handleNoResults() {
  galleryContainer.style.display = 'none';
  iziToast.error({
    position: 'topRight',
    color: 'red',
    message: 'Sorry, there are no images matching your search query. Please try again!',
  });
}

async function searchImages(params, append = false) {
  if (!append) {
    showLoaderAndHideGallery();
  }

  try {
    const response = await axios.get(`https://pixabay.com/api/?${params}`);
    hideLoaderAndShowGallery();

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    const { hits } = response.data;

    if (hits.length > 0) {
      if (append) {
        appendToGallery(hits);
      } else {
        renderGallery(hits);
      }

      initializeImageLightbox();
    } else {
      handleNoResults();
    }
  } catch (error) {
    console.error(error);
  }
}

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  searchParamsDefaults.q = event.target.elements.search.value.trim();
  currentSearchQuery = searchParamsDefaults.q; // Зберігаємо останній пошуковий запит
  searchParamsDefaults.page = 1; // Скидаємо значення page при новому пошуку
  await searchImages(new URLSearchParams(searchParamsDefaults));
  event.currentTarget.reset();
});

// Додаємо обробник події для кнопки "Load more"
loadMoreButton.addEventListener('click', () => {
  searchParamsDefaults.page++; // Збільшуємо значення page перед новим запитом
  searchImages(new URLSearchParams(searchParamsDefaults), true);
});

// Приховуємо кнопку "Load more", поки галерея пуста
loadMoreButton.style.display = 'none';