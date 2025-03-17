import { useEffect, useMemo, useState } from 'react';
import Button from '../Button';
import { deleteSpace, getSpaces } from '../../services/api/spaces';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { BiSolidEdit, BiTrash } from "react-icons/bi";
import ConfirmationModal from '../ConfirmationModal';

export default () => {
  const [page, setPage] = useState(1)
  const [spaces, setSpaces] = useState<Space[]>([]);

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isConfirmDeleteAction, setIsConfirmDeleteAction] = useState<boolean>(false)
  const [spaceIdToDelete, setSpaceIdToDelete] = useState<string>("")

  const spacesPerPage = 8

  const paginatedSpaces = useMemo(() => {
    const indexOfLastItem = page * spacesPerPage
    const indexOfFistItem = indexOfLastItem - spacesPerPage
    return spaces.slice(indexOfFistItem, indexOfLastItem)
  }, [page, spaces])

  const handleConfirmationModal = () => {
    setIsOpenModal(!isOpenModal)
  }

  const handleDeleteSpace = (id: string) => {
    handleConfirmationModal()
    setSpaceIdToDelete(id)
  };

  const handleConfirmDeleteAction = () => {
    setIsConfirmDeleteAction(true)
  }

  const handleCreateSpace = () => {
    console.log('Criar novo espaço');
  };

  const handleEditSpace = (id: string) => {
    alert('Editar espaço:' + id);
    // add edit space 
  };

  const handlePageChange = (action: 'next' | 'previous') => {
    if (action == 'next' && spaces.length > page * spacesPerPage) {
      setPage(page + 1)
    } else if (action == 'previous' && page > 1) {
      setPage(page - 1)
    }
  }

  useEffect(() => {
    if (isConfirmDeleteAction) {
      deleteSpace(spaceIdToDelete)

      setSpaces(spaces.filter(item => item.id !== spaceIdToDelete))
    }

    setIsConfirmDeleteAction(false)
  }, [isConfirmDeleteAction])

  useEffect(() => {
    getSpaces(setSpaces);
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-4 h-12">
        <h1 className="text-2xl font-semibold">Espaços</h1>
        <Button content="Criar Espaço" onClick={handleCreateSpace} />
      </div>

      <div className="border border-stone-500 border-b-0 overflow-hidden rounded-md shadow-md">
        <table className="w-full">
          <thead className="bg-stone-200 border-b border-stone-500">
            <tr>
              <th className="p-4 w-64 text-left text-stone-800 font-semibold border-r border-stone-500">Nome</th>
              <th className="p-4 w-[78rem] text-left text-stone-800 font-semibold border-r border-stone-500">Descrição</th>
              <th className="p-4 w-32 text-left text-stone-800 font-semibold border-r border-stone-500">Situação</th>
              <th className="p-4 text-left text-stone-800 font-semibold justify-center flex">Ações</th>
            </tr>
          </thead>

          <tbody>
            {paginatedSpaces.map((space, index) => (
              <tr
                key={space.id}
                className={`${index % 2 === 0 ? 'bg-stone-50' : 'bg-stone-100'} border-b border-stone-500`}
              >
                <td className="p-4 text-stone-800 border-r border-stone-500">{space.name}</td>
                <td className="p-4 text-stone-600 border-r border-stone-500">{space.description}</td>
                <td className="p-4 text-stone-600 border-r border-stone-500">
                  <div
                    className={`h-6 w-16 flex items-center justify-center rounded-full text-sm font-semibold mt-2 text-white ${space?.is_available ? "bg-green-500" : "bg-red-500"
                      }`}
                  >{space.is_available ? 'Ativo' : 'Inativo'}</div>
                </td>
                <td className="p-4 border-b border-stone-500">
                  <div className="flex gap-2 items-center justify-center">
                    <div
                      className="h-9 w-9 flex items-center justify-center cursor-pointer rounded-full hover:bg-gray-200 transition-colors duration-200"
                      onClick={() => handleEditSpace(space.id)}
                    >
                      <BiSolidEdit size={24} />
                    </div>
                    <div
                      className="h-9 w-9 flex items-center justify-center cursor-pointer rounded-full hover:bg-gray-200 transition-colors duration-200"
                      onClick={() => handleDeleteSpace(space.id)}
                    >
                      <BiTrash size={24} />
                    </div>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end pr-6 items-center mt-3 fixed bottom-16 right-4">
        <div
          className="cursor-pointer rounded-full hover:bg-gray-200 transition-colors duration-200"
          onClick={() => handlePageChange("previous")}
        >
          <GoChevronLeft size={24} />
        </div>
        <p className="text-xl font-medium px-4">{page}</p>
        <div
          className="cursor-pointer rounded-full hover:bg-gray-200 transition-colors duration-200"
          onClick={() => handlePageChange("next")}
        >
          <GoChevronRight size={24} />
        </div>
      </div>

      <ConfirmationModal isOpen={isOpenModal} onClose={handleConfirmationModal} message='deletar este spaço' onConfirm={handleConfirmDeleteAction} />
    </>
  );
};
