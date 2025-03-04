import { createContext, ReactNode, useContext, useState } from "react";
import { signIn } from "../../api/login";

interface AuthContextType {
  isAuthenticated: boolean
  login: (nick: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = async (nick: string, password: string) => {
    const token = await signIn({ nick, password })
    // save token
    setIsAuthenticated(true)
  }

  const logout = () => {
    //remove token
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used in a AuthProvider')
  }
  return context
}