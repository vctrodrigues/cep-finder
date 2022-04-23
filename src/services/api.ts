import axios from 'axios';

const apiService = axios.create({
  baseURL: 'https://viacep.com.br/ws',
});

export { apiService };
