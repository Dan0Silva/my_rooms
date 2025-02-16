type Props = {
  key: string;
};

export default (props: Props) => {
  return (
    <div className="w-56 h-[20rem] overflow-hidden" key={props.key}>
      <img
        src="./default_photo.jpg"
        alt="photo"
        className=" w-full object-cover rounded-2xl"
      />
      <div className="flex flex-col h-full">
        <p className="text-xl font-medium mt-2">Novo Espaço</p>
        <p className="text-[16px] font-medium w-16 text-center rounded-2xl mt-2 bg-zinc-800 text-white">
          2/50
        </p>
        {/* <div className="bg-amber-200 h-full w-1/3">
          <p>value</p>
        </div> */}
      </div>
    </div>
  );
};
