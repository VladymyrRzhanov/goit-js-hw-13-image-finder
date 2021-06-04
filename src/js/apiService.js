const API_KEY = '21885623-886e6c500c2d42d8e0adff93d';
const BASE_URL = 'https://pixabay.com/api';


export default class ApiService {
    constructor() {
        this.searchquery = '';
        this.page = 1;
    };

    async fetchImages() {
        const responsive = await fetch(`${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchquery}&page=${this.page}&per_page=12&key=${API_KEY}`);
        const { hits } = await responsive.json();
        this.nextPage();
        return hits;
    };

    nextPage() {
        this.page += 1;
    };

    resetPage() {
        this.page = 1;
    };
    
    get query() {
        return this.searchquery;
    };

    set query(newQuery) {
        this.searchquery = newQuery;
    };
};