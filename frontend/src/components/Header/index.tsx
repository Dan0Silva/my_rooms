import { useState } from "react";
import Button from "../Button";
import SignInModal from "../SignInModal";

export default () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const updateLoginModalState = () => {
    setIsLoginModalOpen(!isLoginModalOpen)
  }


  return (
    <header className="w-full h-20 bg-stone-800 flex justify-between items-center px-8 shadow-lg">

      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
          <img src="/cat1.jpg" alt="logo" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-2xl text-white font-semibold">My Rooms</h1>
      </div>

      <div>
        <Button content="Sign in" onClick={updateLoginModalState} />
      </div>
      <SignInModal isOpen={isLoginModalOpen} onClose={updateLoginModalState} />
    </header>
  );
};