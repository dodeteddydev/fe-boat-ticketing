import { v4 as uuid } from "uuid";

export class LocalStorageHelpers {
  static accessToken: string | undefined = undefined;

  static setSession({
    newAccessToken,
    role,
  }: {
    newAccessToken?: string;
    role?: string;
  }) {
    this.accessToken = newAccessToken;
    localStorage.setItem("session", `${role}|${uuid()}`);
  }
  static getSession() {
    return localStorage.getItem("session");
  }

  static removeSession() {
    localStorage.removeItem("session");
    this.accessToken = undefined;
  }
}
