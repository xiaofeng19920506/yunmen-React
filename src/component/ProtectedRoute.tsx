// Example ProtectedRoute component
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import { RootState } from "../redux/store/store";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  const id = useAppSelector((state: RootState) => state.user.id);
  const isAuthenticated = id === "" ? false : true;

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
