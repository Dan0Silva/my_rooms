import { useEffect, useMemo, useState } from 'react';
import Button from '../Button';
import { getSpaces } from '../../services/api/spaces';

export default () => {
  const [page, setPage] = useState(1)
  const [items, setItems] = useState<Space[]>([]);

  const spacesPerPage = 8

  const paginatedItems = useMemo(() => {
    const indexOfLastItem = page * spacesPerPage
    const indexOfFistItem = indexOfLastItem - spacesPerPage
    return items.slice(indexOfFistItem, indexOfLastItem)
  }, [page, items])

  const handleCreateSpace = () => {
    console.log('Criar novo espaço');
  };

  const handleEditSpace = (id: number) => {
    console.log('Editar espaço:', id);
  };

  const handleDeleteSpace = (id: number) => {
    // setItems(items.filter((space) => space.id !== id));
  };

  useEffect(() => {
    getSpaces(setItems);
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-6 h-12">
        <h1 className="text-2xl font-semibold">Espaços</h1>
        <Button content="Criar Espaço" onClick={handleCreateSpace} />
      </div>

      <div className="h-[calc(100vh-16rem)] border border-stone-500 overflow-hidden rounded-md shadow-md">
        <table className="w-full">
          {/* Cabeçalho da tabela */}
          <thead className="bg-stone-200 border-b border-stone-500">
            <tr>
              <th className="p-4 text-left text-stone-800 font-semibold border-r border-stone-500">Nome</th>
              <th className="p-4 text-left text-stone-800 font-semibold border-r border-stone-500">Descrição</th>
              <th className="p-4 text-left text-stone-800 font-semibold">Ações</th>
            </tr>
          </thead>

          {/* Corpo da tabela */}
          <tbody>
            {paginatedItems.map((space, index) => (
              <tr
                key={space.id}
                className={`${index % 2 === 0 ? 'bg-stone-50' : 'bg-stone-100'}`}
              >
                {/* Nome */}
                <td className="p-4 text-stone-800 border-r border-b border-stone-500">{space.name}</td>

                {/* Descrição */}
                <td className="p-4 text-stone-600 border-r border-b border-stone-500">{space.description}</td>

                {/* Ações */}
                <td className="p-4 border-b border-stone-500">
                  <div className="flex space-x-2">
                    <Button content="Editar" onClick={() => handleEditSpace(space.id)} />
                    <Button content="Deletar" onClick={() => handleDeleteSpace(space.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};



{/* <div className='h-[calc(100vh-12rem)] overflow-y-auto '>
        <div className="space-y-4">
          {items.map((space: any) => (
            <div key={space.id} className="p-4 rounded-md shadow-md flex">
              <div className='flex items-center '>
                <img
                  src={space.photo_url}
                  alt={space.name}
                  className="w-32 h-24 mr-4 object-cover rounded-xl"
                />
              </div>
              <div>
                <h3 className="text-xl font-medium">{space.name}</h3>
                <p className="text-stone-600">{space.description}</p>
                <div className="mt-2 space-x-2">
                  <Button content="Editar" onClick={() => handleEditSpace(space.id)} />
                  <Button content="Deletar" onClick={() => handleDeleteSpace(space.id)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}