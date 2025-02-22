import { MouseEventHandler } from "react";

interface ButtonProps {
  type?: "submit" | "reset" | "button" | undefined;
  content: string;
  onClick?: MouseEventHandler;
}

export default (props: ButtonProps) => {
  return (
    <>
      <button
        type={props.type}
        onClick={props.onClick}
        className={`cursor-pointer h-10 min-w-36 rounded-md bg-zinc-100 text-zinc-700 font-semibold shadow-md hover:bg-zinc-600 hover:text-zinc-100 duration-500`}
      >
        {props.content}
      </button>
    </>
  );
};
