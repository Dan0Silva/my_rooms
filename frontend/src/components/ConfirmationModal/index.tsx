import { useEffect, useRef } from 'react';
import Button from '../Button';

type Props = {
  isOpen: boolean; // Controla a visibilidade do modal
  onClose: () => void; // Função para fechar o modal
  onConfirm: () => void; // Função para confirmar a ação
  message: string; // Texto dinâmico (ex: "deletar esta reserva")
};

export default ({ isOpen, onClose, onConfirm, message }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null)

  const handleConfirm = () => {
    onClose()
    onConfirm()
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose(); // Fecha o modal se o clique foi fora
      }
    };

    // Adiciona o listener ao documento
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Remove o listener ao desmontar o componente
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null

  return (
    <div className="z-10 fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
      <div ref={modalRef} className="bg-white w-96 rounded-2xl p-6 shadow-2xl">
        {/* Cabeçalho */}
        <div className="flex flex-row items-center mb-8">
          <h2 className="text-2xl text-zinc-800 font-bold">Confirmação</h2>
        </div>

        {/* Mensagem dinâmica */}
        <p className="text-zinc-600 mb-8">Tem certeza que deseja {message}?</p>

        {/* Botões de ação */}
        <div className="flex justify-between space-x-4">
          <Button
            content="Não"
            onClick={onClose}
          />
          <Button
            content="Sim"
            onClick={handleConfirm}
          />
        </div>
      </div>
    </div>
  );
};