import { useReducer } from "react";
import { AuthContext, AuthState } from "./authContext";
import { v4 as uuid } from "uuid";
import { LocalStorageHelpers } from "@/utilities/localStorageHelpers";

type AuthAction =
  | { type: "SET_ROUTE_POSITION"; routePosition: string }
  | {
      type: "SET_SESSION";
      accessToken?: string;
      session?: string;
    }
  | { type: "REMOVE_SESSION" };

const initialState: AuthState = {
  routePosition: undefined,
  session: undefined,
};

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "SET_ROUTE_POSITION":
      return {
        ...state,
        routePosition: action.routePosition,
      };
    case "SET_SESSION":
      return {
        ...state,
        session: action.session,
        accessToken: action.accessToken,
      };
    case "REMOVE_SESSION":
      return {
        ...state,
        session: undefined,
        accessToken: undefined,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  const setRoutePosition = (routePosition: string) =>
    dispatch({ type: "SET_ROUTE_POSITION", routePosition });
  const setSession = (accessToken?: string, role?: string) => {
    const session = `${role}|${uuid()}`;
    dispatch({
      type: "SET_SESSION",
      accessToken: accessToken,
      session: session,
    });
    LocalStorageHelpers.setSession({ newAccessToken: accessToken, role: role });
  };
  const removeSession = () => {
    dispatch({ type: "REMOVE_SESSION" });
    LocalStorageHelpers.removeSession();
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        setRoutePosition,
        setSession,
        removeSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
