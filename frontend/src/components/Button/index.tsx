interface ButtonProps {
  type?: "submit" | "reset" | "button" | undefined;
  content: string
  className?: string
  onClick?: () => void
  disabled?: boolean
}

// export default (props: ButtonProps) => {
//   return (
//     <>
//       <button
//         type={props.type}
//         onClick={props.onClick}
//         className={`cursor-pointer h-10 min-w-36 rounded-md bg-zinc-100 text-zinc-700 font-semibold shadow-md hover:bg-zinc-600 hover:text-zinc-100 duration-500`}
//       >
//         {props.content}
//       </button>
//     </>
//   );
// };

export default ({ type, content, onClick, className = "", disabled = false }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer h-10 min-w-36 rounded-md bg-zinc-100 text-zinc-700 font-semibold shadow-md transition duration-500 ease-in-out 
        ${disabled ? 'bg-zinc-400 text-zinc-200 cursor-not-allowed' : 'hover:bg-zinc-600 hover:text-zinc-100'} 
        ${className}`}
    >
      {content}
    </button>
  );
};
