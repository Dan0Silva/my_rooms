import { useEffect, useMemo, useState } from 'react';
import Button from '../Button';
import { deleteSpace, getSpaces } from '../../services/api/spaces';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import ConfirmationModal from '../ConfirmationModal';
import SpaceLineOnList from '../SpaceLineOnList';
import SpaceFormModal from '../SpaceFormModal';

export default () => {
  const [page, setPage] = useState(1)
  const [spaces, setSpaces] = useState<Space[]>([]);

  const [isConfirmModalOpen, setisConfirmModalOpen] = useState<boolean>(false)
  const [isConfirmDeleteAction, setIsConfirmDeleteAction] = useState<boolean>(false)

  // criar espaco
  const [isCreateSpaceModalOpen, setIsCreateSpaceModalOpen] = useState<boolean>(false)

  const [spaceIdToDelete, setSpaceIdToDelete] = useState<string>("")

  const spacesPerPage = 8

  const paginatedSpaces = useMemo(() => {
    const indexOfLastItem = page * spacesPerPage
    const indexOfFistItem = indexOfLastItem - spacesPerPage
    return spaces.slice(indexOfFistItem, indexOfLastItem)
  }, [page, spaces])

  const handleCreateSpaceModal = () => {
    setIsCreateSpaceModalOpen(!isCreateSpaceModalOpen)
  }

  const handleConfirmationModal = () => {
    setisConfirmModalOpen(!isConfirmModalOpen)
  }

  const handleDeleteSpace = (id: string) => {
    handleConfirmationModal()
    setSpaceIdToDelete(id)
  };

  const handleConfirmDeleteAction = () => {
    setIsConfirmDeleteAction(true)
  }

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
        <Button content="Criar Espaço" onClick={handleCreateSpaceModal} />
      </div>

      <div className="border border-stone-500 border-b-0 overflow-hidden rounded-md shadow-md">
        <table className="w-full">
          <thead className="bg-stone-200 border-b border-stone-500">
            <tr>
              <th className="p-4 w-64 text-left text-stone-800 font-semibold border-r border-stone-500">Nome</th>
              <th className="p-4 w-[78rem] text-left text-stone-800 font-semibold border-r border-stone-500">Descrição</th>
              <th className="p-4 w-32 text-stone-800 font-semibold border-r border-stone-500 text-center px-4">Situação</th>
              <th className="p-4 text-stone-800 font-semibold text-center px-4">Ações</th>
            </tr>
          </thead>

          <tbody>
            {paginatedSpaces.map((space, index) => (
              <SpaceLineOnList space={space}
                index={index}
                handleDeleteSpace={handleDeleteSpace} />
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

      <ConfirmationModal isOpen={isConfirmModalOpen} onClose={handleConfirmationModal} message='deletar este spaço' onConfirm={handleConfirmDeleteAction} />
      <SpaceFormModal isOpen={isCreateSpaceModalOpen} onClose={handleCreateSpaceModal} space={{}} onSave={() => alert('salvou')} />
    </>
  );
};
