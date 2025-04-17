import { BiSolidEdit, BiTrash } from "react-icons/bi"
import ToggleButton from "../ToggleButton"
import { useState } from "react"
import { updateSpace, updateSpaceStatus } from "../../services/api/spaces"
import { toast } from "react-toastify"
import SpaceFormModal from "../SpaceFormModal"

interface Props {
  space: Space
  index: number
  handleDeleteSpace: (id: string) => void
}

export default ({ space, index, handleDeleteSpace }: Props) => {
  const [isAvailable, setIsAvailable] = useState<boolean>(space.is_available)
  const [isEditSpaceModalOpen, setIsEditSpaceModalOpen] = useState(false)

  const handleToggleAction = () => {
    // requisitar a api alterar o status > esperar resposta > resposta ? altera o estado : nao altera
    updateSpaceStatus(space.id, isAvailable).then(response => {
      if (!response) {
        toast.error(`Erro ao ${isAvailable ? 'desativar' : 'ativar'} espaço`)
      } else {
        toast.success(`Sucesso ao ${isAvailable ? 'desativar' : 'ativar'} espaço`)
        setIsAvailable(!isAvailable)
      }
    })
  }

  const onSave = (updatedSpace: Space) => {
    updateSpace(updatedSpace.id, updatedSpace).then(res => {
      if (res) {
        toast.success('Espaço atualizado com sucesso!', {
          hideProgressBar: true,
        });
        updateEditSpaceModalState();
        window.location.reload()
      } else {
        toast.error('Falha ao atualizar espaço!', {
          hideProgressBar: true,
        });
      }
    })
  }

  const updateEditSpaceModalState = () => {
    setIsEditSpaceModalOpen(!isEditSpaceModalOpen)
  }

  return (
    <tr
      key={space.id}
      className={`${index % 2 === 0 ? 'bg-stone-50' : 'bg-stone-100'} border-b border-stone-500`}
    >
      <td className="p-4 text-stone-800 border-r border-stone-500">{space.name}</td>
      <td className="p-4 text-stone-600 border-r border-stone-500">{space.description}</td>
      <td className="p-4 text-stone-600 border-r border-stone-500 text-center">
        {/* criar um componente e adicionar o estado a ele */}
        <ToggleButton toggled={isAvailable} handleAction={handleToggleAction} />
      </td>
      <td className="p-4 text-center border-b border-stone-500">
        <div className="flex gap-2 items-center justify-center">
          <div
            className="h-9 w-9 flex items-center justify-center cursor-pointer rounded-full hover:bg-gray-200 transition-colors duration-200"
            onClick={updateEditSpaceModalState}
          >
            <BiSolidEdit size={24} />
          </div>
          <div
            className="h-9 w-9 flex items-center justify-center cursor-pointer rounded-full hover:bg-gray-200 transition-colors duration-200"
            onClick={() => handleDeleteSpace(space.id)}
          >
            <BiTrash size={24} />
          </div>
          <SpaceFormModal space={space} isOpen={isEditSpaceModalOpen} onClose={updateEditSpaceModalState} onSave={onSave} />

        </div>

      </td>

    </tr>
  )
}