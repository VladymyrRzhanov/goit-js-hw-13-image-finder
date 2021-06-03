import ApiService from "./js/apiService";
import photoCardsTpl from './templates/photo-cards.hbs'
import './sass/main.scss';
import 'basiclightbox/dist/basicLightbox.min.css'
import * as basicLightbox from 'basiclightbox'


const apiService = new ApiService();

const refs = {
    searchForm: document.querySelector('#search-form'),
    cardsGallery: document.querySelector('.gallery'),
    uploadBtn: document.querySelector('[data-upload]'),
    loadCards: document.querySelector('#load-cards')
};


const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && apiService.query !== '') {
        renderCards();
        apiService.nextPage();
      };
  });
};

const loadMoreCards = () => {
    const observer = new IntersectionObserver(onEntry, {
        rootMargin: '150px',
    });
    observer.observe(refs.loadCards);
};

const renderCards = () => {
    return apiService.fetchImages()
        .then(hits => refs.cardsGallery.insertAdjacentHTML('beforeend', photoCardsTpl(hits)));
};
    

const onSearch = e => {
    e.preventDefault();

    apiService.resetPage();
    refs.uploadBtn.hidden = false;
    refs.uploadBtn.classList.add('load-btn');

    apiService.query = e.currentTarget.elements.query.value.trim();
    refs.cardsGallery.innerHTML = '';
    if (apiService.query) {
        renderCards();
    };
};

const uploadedCards = async e => {
    const cards = await renderCards();
    refs.uploadBtn.hidden = true;
    refs.uploadBtn.classList.remove('load-btn');
    loadMoreCards();
};

const onOpenBigImage = e => {
    e.preventDefault();

    if (e.currentTarget === e.target) {
        return;
    }

    const bigImageSrc = e.target.dataset.source;
    const instance = basicLightbox.create(`
    <img src="${bigImageSrc}" width="800" height="600">
`);
    instance.show();

    window.addEventListener('keydown', onKeyCloseModal);
};


refs.searchForm.addEventListener('submit', onSearch);
refs.uploadBtn.addEventListener('click', uploadedCards);
refs.cardsGallery.addEventListener('click', onOpenBigImage);