"use client";

import { createContext } from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";

type AuthContextType = {
  user: any;
  loading: boolean;
  googleLoginHandler: () => Promise<void>;
  logout: () => void;
};
export const authContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  googleLoginHandler: async () => {},
  logout: async () => {},
});

export default function AuthContextProvider({ children }: any) {
  const [user, loading] = useAuthState(auth);

  const googleProvider = new GoogleAuthProvider();

  async function googleLoginHandler() {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      throw error;
    }
  }

  function logout() {
    signOut(auth);
  }

  const values = {
    user,
    loading,
    googleLoginHandler,
    logout,
  };
  return <authContext.Provider value={values}>{children}</authContext.Provider>;
}
