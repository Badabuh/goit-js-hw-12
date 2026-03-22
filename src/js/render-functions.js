import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function getElement(selector) {
  const element = document.querySelector(selector);

  if (!element) {
    console.error(`Expected element "${selector}" was not found in the DOM.`);
    return null;
  }

  return element;
}

export function showLoader() {
  const loader = getElement('#loader');

  if (!loader) {
    return;
  }

  loader.classList.add('visible');
}

export function hideLoader() {
  const loader = getElement('#loader');

  if (!loader) {
    return;
  }

  loader.classList.remove('visible');
}

export function clearGallery() {
  const gallery = getElement('.gallery');

  if (!gallery) {
    return;
  }

  gallery.innerHTML = '';
}

export function renderImages(images) {
  const gallery = getElement('.gallery');

  if (!gallery) {
    return;
  }

  const galleryFragment = document.createDocumentFragment();

  images.forEach(element => {
    const li = document.createElement('li');
    galleryFragment.appendChild(li);
    li.classList.add('gallery-item');
    const a = document.createElement('a');
    a.href = element.largeImageURL;
    li.appendChild(a);
    const img = document.createElement('img');
    img.classList.add('gallery-image');
    img.src = element.webformatURL;
    img.alt = element.tags.split(',').slice(0, 3).join(', ');
    img.dataset.views = element.views;
    img.dataset.downloads = element.downloads;
    img.dataset.likes = element.likes;
    img.dataset.comments = element.comments;

    const info = document.createElement('div');
    info.classList.add('info');
    info.innerHTML = `
      <p><b>Views:</b> ${element.views}</p>
      <p><b>Downloads:</b> ${element.downloads}</p>
      <p><b>Likes:</b> ${element.likes}</p>
      <p><b>Comments:</b> ${element.comments}</p>
    `;

    li.appendChild(info);
    a.appendChild(img);
  });

  gallery.append(galleryFragment);
  lightbox.refresh();
}

export function showLoadMoreButton() {
  const loadMoreButton = getElement('#load-more');

  if (!loadMoreButton) {
    return;
  }

  loadMoreButton.classList.add('visible');
}

export function hideLoadMoreButton() {
  const loadMoreButton = getElement('#load-more');

  if (!loadMoreButton) {
    return;
  }

  loadMoreButton.classList.remove('visible');
}
