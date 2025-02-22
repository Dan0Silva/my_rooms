import axios from 'axios';

const baseURL = 'http://localhost:5050';

export const getPosts = async (setPosts: Function) => {
  try {
    const response = await axios.get(`${baseURL}/spaces`);
    if (response.data && response.data.data) {
      setPosts(response.data.data);
    } else {
      console.error('Dados inválidos recebidos da API:', response.data);
    }
  } catch (error) {
    console.error('Erro ao buscar espaços', error);
  }
};
