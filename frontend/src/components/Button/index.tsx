interface ButtonProps {
  type?: "submit" | "reset" | "button" | undefined;
  content: string
  onClick?: () => void
  disabled?: boolean
}

export default ({ type, content, onClick, disabled = false }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`h-10 min-w-36 rounded-md bg-stone-500 px-6 text-white font-semibold shadow-md  transition duration-500 ease-in-out 
        ${disabled ? 'bg-zinc-400 text-zinc-200 cursor-not-allowed' : 'cursor-pointer hover:bg-stone-600'} `}
    >
      {content}
    </button>
  );
};
