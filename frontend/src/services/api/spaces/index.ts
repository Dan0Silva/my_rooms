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

export const getSingleSpace = async (id: string, setPost: Function) => {
  try {
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

export const updateSpaceStatus = async (id: string, currentStatus: boolean) => {
  try {
    const body = {
      is_available: !currentStatus
    }

    const response = await apiClient.patch(`/spaces/${id}/status`, body)

    if (response.status != 200) {
      throw new Error('Erro ao alterar status do espaço')
    }

    return true

  } catch (error) {
    console.error('Erro ao alterar status do espaço: ', error)
    return false
  }
}

export const deleteSpace = async (id: string) => {
  try {
    const response = await apiClient.delete(`/spaces/${id}`)

    if (response.status !== 200) throw new Error("Erro ao tentar deletar o espaço")
  } catch (error) {
    console.error('Erro ao deletar espaço: ', error);
  }
}