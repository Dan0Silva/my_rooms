type Props = {
  date: string
  setDate: Function

  email: string
  setEmail: Function
}

const validateReserveForm = ({ date, setDate, email, setEmail }: Props): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const today = new Date()
  const selectedDate = new Date(date)

  if (!emailRegex.test(email)) {
    alert("O email não está no formato esperado.")
    setEmail("")
    setDate("")
    return false
  }

  if (selectedDate < today) {
    alert("A data selecionada não pode ser anterior à data atual.")
    setEmail("")
    setDate("")
    return false
  }

  return true
}

export default validateReserveForm