import imgCardTpl from './templates/imgCardTpl.hbs';
import './sass/main.scss';
import { searchForm, gallery, loadMoreButton } from './js/refs';
import ImagesApiService from './js/apiService';
import LoadMoreBtn from './js/loadMoreBtn';

searchForm.addEventListener('submit', onSearch);

const imgApiService = new ImagesApiService();

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

loadMoreBtn.refs.button.addEventListener('click', getImages);

function onSearch(event) {
  event.preventDefault();
  imgApiService.query = event.currentTarget.elements.query.value;

  loadMoreBtn.show();
  imgApiService.resetPage();
  clearGallery();
  getImages();
}

function getImages() {
  loadMoreBtn.disable();
  imgApiService.fetchImages().then(images => {
    imgMarkup(images);
    loadMoreBtn.enable();
  });
}

function imgMarkup(images) {
  const imgMarkup = imgCardTpl(images);
  //console.log(imgMarkup);
  gallery.insertAdjacentHTML('beforeend', imgMarkup);
  handleButtonClick();
}

function clearGallery() {
  gallery.innerHTML = '';
}

function handleButtonClick() {
  gallery.scrollIntoView({ block: 'end', behavior: 'smooth' });
}
