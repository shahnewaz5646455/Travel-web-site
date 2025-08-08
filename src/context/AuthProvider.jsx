import React, { useEffect, useState } from "react";
import { AuthContext } from "./Authcontext";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  signOut,
} from "firebase/auth";
import app from "../firebase/firebase.config";

const auth = getAuth(app);

export default function Authprovider({ children }) {
  const [user, setUser] = useState(null); // null means no user by default
  const [userRole, setUserRole] = useState(null); // null means no user by default
  const [loading, setLoading] = useState(true);

  // Create new user with email and password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login with email and password
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google sign-in

  const signInWithGoogle = (provider) => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  // Logout
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const uploadProfile = (profileInfo) => {
    return updateProfile(auth.currentUser, profileInfo);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      // Only fetch user role if it's not already set
      if (currentUser) {
        if (userRole) {
          setLoading(false);
          return;
        }
        try {
          // Fetch user role when user is logged in
          const response = await fetch(
            `https://travelserver-three.vercel.app/user-role/${currentUser.email}`
          );
          if (!response.ok) throw new Error("Failed to fetch role");

          const data = await response.json();
          setUserRole(data.role);
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUserRole(null);
        }
      } else {
        setUserRole(null); // Clear role when logged out
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [userRole]);
  console.log(userRole);

  // Context value
  const authInfo = {
    user,
    loading,
    createUser,
    login,
    userRole,
    signInWithGoogle,
    uploadProfile,
    setUserRole,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}
