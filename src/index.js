import ApiService from "./js/apiService";
import refs from './js/refs'
import LoadMoreBtn from "./js/load-btn";
import onOpenBigImage from "./js/open-modal";
import {callError, callNotice} from "./js/notify";
import photoCardsTpl from './templates/photo-cards.hbs'
import './sass/main.scss';

const apiService = new ApiService();
const loadBtn = new LoadMoreBtn({
    selector: '[data-upload]',
    hidden: true,
});

const searchBtn = new LoadMoreBtn({
    selector: '[data-search]',
});

searchBtn.init();

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && apiService.query !== '') {
        renderCards();
        loadBtn.hide();
      };
  });
};

const observer = new IntersectionObserver(onEntry, {
    rootMargin: '150px',
});

const loadMoreCards = () => {
    observer.observe(refs.loadCards);
};


const renderCards = async () => {
    try {
        const hits = await apiService.fetchImages();
        if (hits.length < 12) {
            loadBtn.hide();
        } else {
            loadBtn.show();
        };
        return await refs.cardsGallery.insertAdjacentHTML('beforeend', photoCardsTpl(hits));
    } catch {
        callNotice()
    };
};

const onSearchBtn = async e => {
    e.preventDefault();
    loadBtn.hide();
    observer.unobserve(refs.loadCards);
    apiService.resetPage();
    refs.cardsGallery.innerHTML = '';
    apiService.query = e.currentTarget.elements.query.value.trim();
    
    if (apiService.query === '') {
        callError();
    } else {
        searchBtn.disable();
        const getCards = await renderCards();
        searchBtn.enable('Поиск');
    };
};

const onEnabledBtn = e => {
    searchBtn.enable('Поиск')
    if (e.target.value === '') {
        searchBtn.init();
    };
};

const uploadedCards = async e => {
    loadBtn.disable();
    const cards = await renderCards();
    loadBtn.enable('Загрузить еще');
    loadMoreCards();
};

refs.searchForm.addEventListener('submit', onSearchBtn);
refs.searchForm.addEventListener('input', onEnabledBtn);
loadBtn.refs.button.addEventListener('click', uploadedCards);
refs.cardsGallery.addEventListener('click', onOpenBigImage);