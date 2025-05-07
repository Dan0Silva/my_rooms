import apiClient from "../apiClient"

export const getReservations = async (setReservations: Function) => {
  try {
    const response = await apiClient.get('/reservations')

    if (response.data && response.data.data) {
      setReservations(response.data.data)
    } else {
      console.error('Dados inválidos recebidos da API:', response.data);
    }
  } catch (error) {
    console.error('Erro ao buscar reservas', error);
  }
}

export const deleteReservation = async (id: string) => {
  try {
    const response = await apiClient.delete(`/reservations/${id}`)

    if (response.status != 200) {
      throw new Error("Erro ao tentar deletar a reserva")
    }
  } catch (error) {
    console.error('Erro ao deletar reserva: ', error);
  }
}