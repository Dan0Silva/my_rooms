import { useState } from 'react';
import Button from '../Button';

const ReservationList = () => {
  const [reservations, setReservations] = useState([
    { id: 1, spaceId: 1, user: 'João Silva', date: '2023-10-15' },
    { id: 2, spaceId: 2, user: 'Maria Souza', date: '2023-10-16' },
  ]);

  const handleDeleteReservation = (id: number) => {
    setReservations(reservations.filter((reservation) => reservation.id !== id));
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Reservas</h1>
      </div>

      <div className="space-y-4">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-medium">Reserva #{reservation.id}</h3>
            <p className="text-stone-600">
              Espaço: {reservation.spaceId} | Usuário: {reservation.user} | Data: {reservation.date}
            </p>
            <div className="mt-2">
              <Button content="Deletar" onClick={() => handleDeleteReservation(reservation.id)} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ReservationList;