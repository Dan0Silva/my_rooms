import apiClient from "../apiClient";

export const getSpaces = async (setPosts: Function) => {
  try {
    const response = await apiClient.get(`/spaces`);
    if (response.data && response.data.data) {
      setPosts(response.data.data);
    } else {
      console.error('Dados inválidos recebidos da API:', response.data);
    }
  } catch (error) {
    console.error('Erro ao buscar espaços', error);
  }
};


export const getSingleSpace = async (id: string | undefined, setPost: Function) => {
  try {
    if (id == undefined) {
      console.error('ID invalido')
    }

    const response = await apiClient.get(`/spaces/${id}`)

    if (response.data && response.data.data) {
      setPost(response.data.data)
    } else {
      console.error('Dados inválidos recebidos da API: ', response.data)
    }

  } catch (error) {
    console.error('Erro ao buscar detalhes do espaço')
  }
}