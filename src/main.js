import * as pixabay from './js/pixabay-api.js';
import * as render from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadMoreButton = document.querySelector('#load-more');

let pages;
let currentPage = 1;
let currentQuery = '';

function smoothScrollByGalleryCard() {
  const galleryItem = document.querySelector('.gallery-item');

  if (!galleryItem) {
    return;
  }

  const { height } = galleryItem.getBoundingClientRect();

  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}

form.addEventListener('submit', async event => {
  event.preventDefault();

  const query = event.currentTarget.elements['search-text'].value.trim();

  if (query === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query.',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;

  render.clearGallery();
  render.hideLoadMoreButton();
  render.showLoader();

  try {
    const data = await pixabay.getImagesByQuery(currentQuery, currentPage);

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      render.hideLoadMoreButton();
      return;
    }

    pages = Math.ceil(data.totalHits / 15);
    render.renderImages(data.hits);

    if (currentPage < pages) {
      render.showLoadMoreButton();
    } else {
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
      render.hideLoadMoreButton();
    }
  } catch {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
    });
  } finally {
    render.hideLoader();
  }

  form.reset();
});

loadMoreButton.addEventListener('click', async () => {
  if (currentPage >= pages) {
    iziToast.info({
      title: 'Info',
      message: "We're sorry, but you've reached the end of search results.",
    });
    render.hideLoadMoreButton();
    return;
  }

  const nextPage = currentPage + 1;

  render.hideLoadMoreButton();
  render.showLoader();

  try {
    const data = await pixabay.getImagesByQuery(currentQuery, nextPage);

    currentPage = nextPage;

    render.renderImages(data.hits);
    smoothScrollByGalleryCard();

    if (currentPage >= pages) {
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
      render.hideLoadMoreButton();
    } else {
      render.showLoadMoreButton();
    }
  } catch {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
    });

    if (currentPage < pages) {
      render.showLoadMoreButton();
    }
  } finally {
    render.hideLoader();
  }
});
