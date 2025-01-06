import { Navigate } from "react-router-dom";
import { pathRoutes } from "./PageRoutes";

type UnprotectedRouteProps = {
  isUnauthenticated: boolean;
  children: React.ReactNode;
};

export const UnprotectedRoute = ({
  isUnauthenticated,
  children,
}: UnprotectedRouteProps) => {
  return isUnauthenticated ? (
    children
  ) : (
    <Navigate to={pathRoutes.dashboard} replace={true} />
  );
};
