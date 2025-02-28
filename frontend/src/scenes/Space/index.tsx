import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Header from "../../components/Header"
import { getSingleSpace } from "../../services/api/api"
import Button from "../../components/Button"
import Input from "../../components/Input"

export default () => {
  const { id } = useParams<{ id: string }>()
  const [space, setSpace] = useState<Space | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [date, setDate] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    getSingleSpace(id, setSpace)
  }, [id])

  const handleReserve = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const today = new Date()
    const selectedDate = new Date(date)

    if (!emailRegex.test(email)) {
      alert("O email não está no formato esperado.")
      setEmail("")
      setDate("")
      return
    }

    if (selectedDate < today) {
      alert("A data selecionada não pode ser anterior à data atual.")
      setEmail("")
      setDate("")
      return
    }

    setIsSubmitted(true)
  }

  return (
    <div className="bg-stone-100 h-screen flex flex-col">
      <Header />

      {/* Área principal */}
      <div className="container mx-auto px-6 py-8 flex-1">
        <div className="bg-white shadow-lg rounded-3xl overflow-hidden">
          <div className="p-6 h-20 bg-stone-800">
            <Button
              content="Voltar para a Home"
              onClick={() => window.history.back()}
              className="text-sm text-stone-600 hover:text-stone-800 mb-4"
            />
          </div>

          <div className="flex px-6 py-6">
            <div className="w-1/2 pr-6">
              <div className="relative h-[64lvh]">
                <img
                  src={space?.photo_url}
                  alt="Space"
                  className="object-cover w-full h-full rounded-2xl"
                />
              </div>
            </div>

            <div className="w-1/2">
              <h2 className="text-6xl font-bold text-stone-800">{space?.name}</h2>
              <p className="text-lg text-stone-600 mt-2">{space?.description}</p>
              <p className="text-sm text-stone-500 mt-4">Localização: {space?.locate}</p>
              <p
                className={`text-sm mt-2 ${space?.is_available ? "text-green-500" : "text-red-500"
                  }`}
              >
                {space?.is_available ? "Disponível para reserva" : "Indisponível"}
              </p>

              <div className="mt-6">
                <h3 className="text-xl font-medium text-stone-800 mb-4">Faça sua reserva</h3>

                <Input label="Nome" type="name" value={name} setValue={setName} disabled={!space?.is_available} />
                <Input label="Email" type="email" value={email} setValue={setEmail} disabled={!space?.is_available} />
                <Input label="Data da reserva" type="date" value={date} setValue={setDate} disabled={!space?.is_available} />

                <Button
                  content="Reservar"
                  onClick={handleReserve}
                  disabled={isSubmitted || !space?.is_available}
                />

                {isSubmitted && (
                  <div className="mt-4 text-green-600">
                    Reserva realizada com sucesso!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
