import { useEffect, useRef, useState } from 'react';
import { MdArrowBack } from 'react-icons/md';
import Input from '../Input';
import Button from '../Button';
import { toast } from 'react-toastify';
import { updateSpace } from '../../services/api/spaces';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  space: Space
  onSave: (space: Space) => void
};

export default ({ isOpen, onClose, space, onSave }: Props) => {
  const [name, setName] = useState(space.name);
  const [description, setDescription] = useState(space.description);
  const [photoUrl, setPhotoUrl] = useState(space.photo_url);
  const [locate, setLocate] = useState(space.locate);
  const [errorMessage, setErrorMessage] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSave = () => {
    if (!name || !description || !photoUrl || !locate) {
      setErrorMessage(true);
      return;
    }

    const updatedSpace: Space = {
      id: space.id,
      name,
      description,
      photo_url: photoUrl,
      locate,
      is_available: space.is_available
    };

    onSave(updatedSpace)
  };

  if (!isOpen) return null;

  return (
    <div className="z-10 fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
      <div ref={modalRef} className="bg-white w-96 rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-row items-center mb-8">
          <button
            className="pt-1 cursor-pointer"
            onClick={() => {
              setErrorMessage(false);
              onClose();
            }}
          >
            <MdArrowBack size={32} />
          </button>
          <h2 className="text-2xl text-zinc-800 font-bold ml-6">Editar Espaço</h2>
        </div>

        {errorMessage ? (
          <p className="text-red-600 mb-4">Preencha todos os campos!</p>
        ) : null}

        <div>
          <Input
            label="Nome"
            setValue={setName}
            value={name}
            type="text"
          />
          <Input
            label="Descrição"
            setValue={setDescription}
            value={description}
            type="text"
          />
          <Input
            label="Foto_URL"
            setValue={setPhotoUrl}
            value={photoUrl}
            type="text"
          />
          <Input
            label="Localização"
            setValue={setLocate}
            value={locate}
            type="text"
          />

          <div className="flex justify-end mt-8">
            <Button content="Salvar" onClick={handleSave} />
          </div>
        </div>
      </div>
    </div>
  );
};