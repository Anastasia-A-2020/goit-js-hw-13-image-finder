import axios from 'axios';

const MY_API_KEY = '15831772-a93111deddd9ec3e88224ce89';
const BASE_URL = 'https://pixabay.com/api';
axios.defaults.baseURL = BASE_URL;

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    const url = `/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${MY_API_KEY}`;
    const { data } = await axios.get(url);
    console.log(data.hits);
    this.nextPage();
    return data.hits;
  }

  nextPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
