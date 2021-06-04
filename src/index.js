import ApiService from "./js/apiService";
import refs from './js/refs'
import onOpenBigImage from "./js/open-modal";
import photoCardsTpl from './templates/photo-cards.hbs'
import './sass/main.scss';

const apiService = new ApiService();

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && apiService.query !== '') {
        renderCards();
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
    const hits = await apiService.fetchImages();
    return refs.cardsGallery.insertAdjacentHTML('beforeend', photoCardsTpl(hits));
};



const onSearchBtn = async e => {
    e.preventDefault();
    observer.unobserve(refs.loadCards);
    apiService.resetPage();
    refs.cardsGallery.innerHTML = '';
    apiService.query = e.currentTarget.elements.query.value.trim();
    if (apiService.query.length === 0) {
        refs.uploadBtn.classList.remove('load-btn');
        refs.uploadBtn.hidden = true;
        return;
    }
        const getCards = await renderCards();
        refs.uploadBtn.hidden = false;
        refs.uploadBtn.classList.add('load-btn');
};



const onEnabledBtn = e => {
    refs.searchBtn.removeAttribute("disabled");
    if (e.target.value === '') {
        refs.searchBtn.setAttribute("disabled", "disabled");
    };
};


const uploadedCards = async e => {
    const cards = await renderCards();
    refs.uploadBtn.hidden = true;
    refs.uploadBtn.classList.remove('load-btn');
    loadMoreCards();
};

refs.searchForm.addEventListener('submit', onSearchBtn);
refs.searchForm.addEventListener('input', onEnabledBtn);
refs.uploadBtn.addEventListener('click', uploadedCards);
refs.cardsGallery.addEventListener('click', onOpenBigImage);