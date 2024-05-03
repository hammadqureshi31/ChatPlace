import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { useUserStore } from "../zustand/userStore";

const firebaseConfig = {
    apiKey: "AIzaSyAj642uC8MG4zwUkn0hkgdo46dKqzvmZKM",
    authDomain: "chatplace-react.firebaseapp.com",
    projectId: "chatplace-react",
    storageBucket: "chatplace-react.appspot.com",
    messagingSenderId: "505829829932",
    appId: "1:505829829932:web:ac69283f7beb8d48b75089"
  };

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore();
export const storage = getStorage();

export const FirebaseContext = createContext(null);

export const FirebaseProvider = (props) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signupUserWithEmailAndPass = (email, password) => {
        return createUserWithEmailAndPassword(firebaseAuth, email, password);
    };

    const loginUserWithEmailAndPass = (email, password) => {
        return signInWithEmailAndPassword(firebaseAuth, email, password);
    };

    const logout = () => {
        return signOut(firebaseAuth);
    };

    const sendEmailForgotPass = (email) => {
        return sendPasswordResetEmail(firebaseAuth, email);
    };

    const signinWithGoogle = async () => {
        const resp = await signInWithPopup(firebaseAuth, googleProvider);
        return resp;
    };

    const isLogin = !!user;

    return (
        <FirebaseContext.Provider
            value={{
                signupUserWithEmailAndPass,
                loginUserWithEmailAndPass,
                isLogin,
                signOut,
                logout,
                firebaseAuth,
                sendEmailForgotPass,
                signinWithGoogle,
                user,
                db,
                storage
            }}
        >
            {!loading && props.children}
        </FirebaseContext.Provider>
    );
};

export const useFirebase = () => {
    return useContext(FirebaseContext);
};
