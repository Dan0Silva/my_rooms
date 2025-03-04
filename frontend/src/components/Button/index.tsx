interface ButtonProps {
  type?: "submit" | "reset" | "button" | undefined;
  content: string
  className?: string
  onClick?: () => void
  disabled?: boolean
}

export default ({ type, content, onClick, className, disabled = false }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${className} h-10 min-w-36 rounded-md bg-zinc-100 text-zinc-700 font-semibold shadow-md transition duration-500 ease-in-out 
        ${disabled ? 'bg-zinc-400 text-zinc-200 cursor-not-allowed' : 'cursor-pointer hover:bg-zinc-600 hover:text-zinc-100'} `}
    >
      {content}
    </button>
  );
};
