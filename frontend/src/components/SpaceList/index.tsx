import { useState } from 'react';
import Button from '../Button';

const SpaceList = () => {
  const [spaces, setSpaces] = useState([
    { id: 1, name: 'Sala de Reunião 1', description: 'Uma sala compacta e moderna.' },
    { id: 2, name: 'Sala de Reunião 2', description: 'Uma sala espaçosa para grandes equipes.' },
  ]);

  const handleCreateSpace = () => {
    console.log('Criar novo espaço');
  };

  const handleEditSpace = (id: number) => {
    console.log('Editar espaço:', id);
  };

  const handleDeleteSpace = (id: number) => {
    setSpaces(spaces.filter((space) => space.id !== id));
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Espaços</h1>
        <Button content="Criar Espaço" onClick={handleCreateSpace} />
      </div>

      <div className="space-y-4">
        {spaces.map((space) => (
          <div key={space.id} className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-medium">{space.name}</h3>
            <p className="text-stone-600">{space.description}</p>
            <div className="mt-2 space-x-2">
              <Button content="Editar" onClick={() => handleEditSpace(space.id)} />
              <Button content="Deletar" onClick={() => handleDeleteSpace(space.id)} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SpaceList;