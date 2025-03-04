import apiClient from "../apiClient";

export const createReserve = async (space: Space | null, user: User, date: Date) => {
  if (space == null) return false

  const body = {
    user_name: user.name,
    user_email: user.email,
    space_id: space.id,
    reserve_date: date
  }

  try {
    const response = await apiClient.post('/reservations', body)

    if (response.status != 204) {
      console.error("Erro ao tentar realizar uma nova reserva")
      return false
    }

    return true

  } catch (error) {
    console.error("Erro ao criar uma nova reserva", error)

    return false
  }
}