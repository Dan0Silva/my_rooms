import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { signIn, checkAuth, logoutAuth } from "../../api/login";

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  login: (nick: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      try {
        await checkAuth()
        setIsAuthenticated(true);
        console.log('rod 1')
      } catch {
        setIsAuthenticated(false);
        console.log('rod 2')
      } finally {
        setIsLoading(false)
      }
    };
    check();
  }, [])

  const login = async (nick: string, password: string) => {
    await signIn({ nick, password })
    setIsAuthenticated(true)
  }

  const logout = async () => {
    await logoutAuth()
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
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