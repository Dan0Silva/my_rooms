import React from "react"
import { useAuth } from "../../services/contexts/AuthContext"
import { useNavigate } from "react-router-dom"

export default ({ ref, toggleDropdown }: { ref: React.RefObject<HTMLDivElement | null>, toggleDropdown: () => void }) => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toggleDropdown()
  }

  const handleSettings = () => {
    toggleDropdown()
    navigate("/dashboard")
  }

  return (
    <div className="absolute z-10 right-0 mt-50 mr-8 w-56 bg-stone-500 border border-stone-400 rounded-md shadow-lg" ref={ref}>
      <div className="py-2">
        <button className="w-full text-left px-4 py-3 text-white hover:bg-stone-600 transition-colors duration-500"
          onClick={handleSettings}>
          Settings
        </button>
        <button className="w-full text-left px-4 py-3 text-white hover:bg-stone-600 transition-colors duration-500"
          onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}