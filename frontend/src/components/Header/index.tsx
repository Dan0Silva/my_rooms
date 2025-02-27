import Button from "../Button";

// export default () => {
//   return (
//     <div className="w-full h-28 bg-stone-800 flex flex-row drop-shadow-md justify-between pr-16 pl-16 items-center">
//       <div className="flex flex-row items-center">
//         <div className="border-2 p-1 rounded-3xl border-white">
//           <img src="/cat1.jpg" alt="logo" className="w-16 h-16 rounded-2xl" />
//         </div>
//         <h1 className="text-4xl text-white ml-8 font-medium font">My Rooms</h1>
//       </div>

//       <div>
//         <Button content="Sign in" />
//       </div>
//     </div>
//   );
// };


export default () => {
  return (
    <header className="w-full h-20 bg-stone-800 flex justify-between items-center px-8 shadow-lg">

      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
          <img src="/cat1.jpg" alt="logo" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-2xl text-white font-semibold">My Rooms</h1>
      </div>

      <div>
        <Button content="Sign in" />
      </div>
    </header>
  );
};