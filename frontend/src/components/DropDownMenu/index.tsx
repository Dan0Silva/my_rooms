import React from "react"
import { useAuth } from "../../services/contexts/AuthContext"

export default ({ ref, toggleDropdown }: { ref: React.RefObject<HTMLDivElement | null>, toggleDropdown: () => void }) => {
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    toggleDropdown()
  }

  return (
    <div className="absolute right-0 mt-50 mr-8 w-52 bg-stone-500 border border-stone-700 rounded-md shadow-lg" ref={ref}>
      <div className="py-2">
        <button className="w-full text-left px-4 py-3 text-white hover:bg-stone-600 transition-colors duration-300">
          Settings
        </button>
        <button className="w-full text-left px-4 py-3 text-white hover:bg-stone-600 transition-colors duration-300"
          onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}