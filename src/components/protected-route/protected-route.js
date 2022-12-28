import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({ condition, redirectTo }) => {
  if (condition) {
    return <Navigate to={redirectTo} replace />
  }
  return <Outlet />
}
export default ProtectedRoute
