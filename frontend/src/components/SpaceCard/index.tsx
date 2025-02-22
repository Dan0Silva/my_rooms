type Props = {
  key: string
  space: Space
};

export default (props: Props) => {
  return (
    <div
      className="cursor-pointer w-56 h-[20rem] p-4 rounded-4xl overflow-hidden drop-shadow-md
       bg-white transition-transform transform duration-500 hover:scale-[102%] hover:translate-y-[-10px]"
      key={props.key}>
      <img
        src="./default_photo.jpg"
        alt="photo"
        className=" w-full object-cover rounded-2xl"
      />
      <div className="flex flex-col h-full">
        <p className="text-xl font-medium mt-2">{props.space.name}</p>
        <p className="text-[16px] font-medium w-16 text-center rounded-2xl mt-2 bg-zinc-800 text-white">
          2/50
        </p>
      </div>
    </div>
  );
};
