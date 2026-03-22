import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function showLoader() {
  const loader = document.querySelector('#loader');
  loader.classList.add('visible');
}

export function hideLoader() {
  const loader = document.querySelector('#loader');
  loader.classList.remove('visible');
}

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}

export function renderImages(images) {
  const gallery = document.querySelector('.gallery');
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
  const loadMoreButton = document.querySelector('#load-more');
  loadMoreButton.classList.add('visible');
}

export function hideLoadMoreButton() {
  const loadMoreButton = document.querySelector('#load-more');
  loadMoreButton.classList.remove('visible');
}
