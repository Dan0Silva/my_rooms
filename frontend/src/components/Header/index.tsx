import Button from "../Button";

export default () => {
  return (
    <div className="w-full h-28 bg-zinc-800 flex flex-row justify-between pr-16 pl-16 items-center">
      <div className="flex flex-row items-center">
        <div className="border-2 p-1 rounded-3xl border-white">
          <img src="./cat1.jpg" alt="logo" className="w-16 h-16 rounded-2xl" />
        </div>
        <h1 className="text-4xl text-white ml-8 font-medium font">My Rooms</h1>
      </div>

      <div>
        <Button content="Sign in" />
      </div>
    </div>
  );
};
