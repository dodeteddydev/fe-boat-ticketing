import { createContext } from "react";

export type AuthState = {
  session?: string;
  routePosition?: string;
};

export type AuthContextType = {
  authState: AuthState;
  setRoutePosition: (position: string) => void;
  setSession: (token?: string, role?: string) => void;
  removeSession: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
