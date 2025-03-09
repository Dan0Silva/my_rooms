import { useEffect, useRef, useState } from "react";
import Button from "../Button";
import SignInModal from "../SignInModal";
import { FaRegUserCircle } from "react-icons/fa";
import { useAuth } from "../../services/contexts/AuthContext";
import DropDownMenu from "../DropDownMenu";
import { Link } from "react-router-dom";

export default ({ title }: { title?: string }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false)

  const { isAuthenticated } = useAuth()

  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsDropdownMenuOpen(!isDropdownMenuOpen)
  }

  const updateLoginModalState = () => {
    setIsLoginModalOpen(!isLoginModalOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className="w-full h-20 bg-stone-800 flex justify-between items-center px-8 shadow-lg">

      <Link to={"/"} >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
            <img src="/cat1.jpg" alt="logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl text-white font-semibold">My Rooms {title ? (" - " + title) : ""}</h1>
        </div>
      </Link>

      <div>
        {isAuthenticated ?
          <div className="flex flex-row items-center h-12 min-w-36 rounded-md bg-stone-500 px-6 text-white font-semibold shadow-md cursor-pointer" onClick={toggleDropdown}>
            <p className="text-white mr-4">Hello, Admin</p>
            <FaRegUserCircle size={32} color="text-zinc-800" />
          </div> :
          <Button content="Sign in" onClick={updateLoginModalState} />}
      </div>
      {isDropdownMenuOpen && (
        <DropDownMenu ref={dropdownRef} toggleDropdown={toggleDropdown} />
      )}

      <SignInModal isOpen={isLoginModalOpen} onClose={updateLoginModalState} />
    </header>
  );
};