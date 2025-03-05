import { useState } from "react"
import { MdArrowBack } from "react-icons/md";
import Input from "../Input";
import Button from "../Button";
import { useAuth } from "../../services/contexts/AuthContext";
import { toast } from "react-toastify";

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default ({ isOpen, onClose }: Props) => {
  const [nick, setNick] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const [errorMessage, setErrorMessage] = useState(false)

  const { login } = useAuth()

  const handleSubmit = async () => {
    try {
      await login(nick, password)

      toast.success('Signed Successfully', {
        hideProgressBar: true
      })
      setErrorMessage(false)
      onClose()

    } catch {
      setErrorMessage(true)
    }
  }

  if (!isOpen) return null

  return (
    <div className="z-10 fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
      <div className="bg-white w-96 rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-row items-center mb-8">
          <button className="pt-1 cursor-pointer" onClick={() => {
            setErrorMessage(false)
            onClose()
          }}>
            <MdArrowBack size={32} />
          </button>
          <h2 className="text-2xl text-zinc-800 font-bold ml-6">Login</h2>
        </div>

        {errorMessage ? <p className="text-red-600 mb-4 ">Erro ao realizar login</p> : null}

        <div>
          <Input label="Admin" setValue={setNick} value={nick} type="text" />
          <Input label="Password" setValue={setPassword} value={password} type="text" />

          <div className="flex justify-end mt-8">
            <Button content="Sign In" onClick={handleSubmit} />
          </div>
        </div>

      </div>
    </div>
  )
}