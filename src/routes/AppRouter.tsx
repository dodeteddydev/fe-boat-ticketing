import { useAuth } from "@/features/auth/contexts/useAuth";
import { BaseLayout } from "@/layouts/BaseLayout";
import { LocalStorageHelpers } from "@/utilities/localStorageHelpers";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { pageRoutes } from "./PageRoutes";
import { ProtectedRoute } from "./ProtectedRoute";
import { UnprotectedRoute } from "./UnprotectedRoute";

export const AppRouter = () => {
  const { authState, setSession } = useAuth();

  useEffect(() => {
    const sessionStorage = LocalStorageHelpers.getSession();

    if (sessionStorage) {
      setSession(undefined, sessionStorage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      {pageRoutes.map((route) => {
        if (route.type === "public") {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <UnprotectedRoute
                  isUnauthenticated={Boolean(!authState.session)}
                >
                  {route.element}
                </UnprotectedRoute>
              }
            />
          );
        }

        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <ProtectedRoute isAuthenticated={Boolean(authState.session)}>
                <BaseLayout>{route.element}</BaseLayout>
              </ProtectedRoute>
            }
          />
        );
      })}
    </Routes>
  );
};
