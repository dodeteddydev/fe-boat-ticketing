import { Navigate } from "react-router-dom";
import { pathRoutes } from "./PageRoutes";

type ProtectedRouteProps = {
  isAuthenticated: boolean;
  children: React.ReactNode;
};

export const ProtectedRoute = ({
  isAuthenticated,
  children,
}: ProtectedRouteProps) => {
  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={pathRoutes.signIn} replace={true} />
  );
};
