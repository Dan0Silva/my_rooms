import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../services/contexts/AuthContext"
import Loading from "../../scenes/Loading"

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <Loading />
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={"/not-found"} />
}

export default ProtectedRoute