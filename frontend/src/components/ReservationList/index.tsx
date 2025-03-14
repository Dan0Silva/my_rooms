import { useEffect, useMemo, useState } from 'react';
import { deleteReservation, getReservations } from '../../services/api/reservations'; // Supondo que você tenha uma função para buscar reservas
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { BiTrash } from 'react-icons/bi';
import ConfirmationModal from '../ConfirmationModal';

export default () => {
  const [page, setPage] = useState(1);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isConfirmDeleteAction, setIsConfirmDeleteAction] = useState<boolean>(false)
  const [reservationIdToDelete, setReservationIdToDelete] = useState<string>("")

  const reservationsPerPage = 8;

  const paginatedReservations = useMemo(() => {
    const indexOfLastItem = page * reservationsPerPage;
    const indexOfFirstItem = indexOfLastItem - reservationsPerPage;
    return reservations.slice(indexOfFirstItem, indexOfLastItem);
  }, [page, reservations]);

  const handleModal = () => {
    setIsOpenModal(!isOpenModal)
  }

  const handleConfirmDeleteAction = () => {
    setIsConfirmDeleteAction(true)
  }

  const handleDeleteReserve = (id: string) => {
    handleModal()
    setReservationIdToDelete(id)
  }

  const handlePageChange = (action: 'next' | 'previous') => {
    if (action === 'next' && reservations.length > page * reservationsPerPage) {
      setPage(page + 1);
    } else if (action === 'previous' && page > 1) {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    if (isConfirmDeleteAction) {
      deleteReservation(reservationIdToDelete)

      setReservations(reservations.filter(item => item.id !== reservationIdToDelete))
    }

    setIsConfirmDeleteAction(false)
  }, [isConfirmDeleteAction])

  useEffect(() => {
    getReservations(setReservations);
  }, []);

  console.log('s')

  return (
    <>
      <div className="flex justify-between items-center mb-4 h-12">
        <h1 className="text-2xl font-semibold">Reservas</h1>
      </div>

      <div className="border border-stone-500 border-b-0 overflow-hidden rounded-md shadow-md">
        <table className="w-full">
          <thead className="bg-stone-200 border-b border-stone-500">
            <tr>
              <th className="p-4 w-64 text-left text-stone-800 font-semibold border-r border-stone-500">Usuário</th>
              <th className="p-4 w-[78rem] text-left text-stone-800 font-semibold border-r border-stone-500">E-mail</th>
              <th className="p-4 w-64 text-left text-stone-800 font-semibold border-r border-stone-500">Data da Reserva</th>
              <th className="p-4 text-left text-stone-800 font-semibold justify-center flex">Ações</th>
            </tr>
          </thead>

          <tbody>
            {paginatedReservations.map((reservation, index) => (
              <tr
                key={reservation.id}
                className={`${index % 2 === 0 ? 'bg-stone-50' : 'bg-stone-100'} border-b border-stone-500`}
              >
                <td className="p-4 text-stone-800 border-r border-stone-500">{reservation.user_name}</td>
                <td className="p-4 text-stone-600 border-r border-stone-500">{reservation.user_email}</td>
                <td className="p-4 text-stone-600 border-r border-stone-500">
                  {new Date(reservation.reserve_date).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </td>

                <td className="p-4">
                  <div className="flex gap-2 items-center justify-center">
                    <div
                      className="h-9 w-9 flex items-center justify-center cursor-pointer rounded-full hover:bg-gray-200 transition-colors duration-200"
                      onClick={() => { handleDeleteReserve(reservation.id) }}
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
          onClick={() => handlePageChange('previous')}
        >
          <GoChevronLeft size={24} />
        </div>
        <p className="text-xl font-medium px-4">{page}</p>
        <div
          className="cursor-pointer rounded-full hover:bg-gray-200 transition-colors duration-200"
          onClick={() => handlePageChange('next')}
        >
          <GoChevronRight size={24} />
        </div>
      </div>

      <ConfirmationModal isOpen={isOpenModal} onClose={handleModal} message='deletar esta reserva' onConfirm={handleConfirmDeleteAction} />
    </>
  );
};