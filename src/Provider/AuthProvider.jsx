import { createContext, useEffect, useState } from "react";
import { auth } from './../firebase/firebase.init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import axios from "axios";
import useAxiosSecure from "../hooks/useAxiosSecure";

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {

    const axiosSecure = useAxiosSecure();

    const [user , setUser] = useState(null);
    const [loading , setLoading] = useState(true);
    console.log(user)
    // create user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // signin
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };
    // signout
    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    };
    // signin goggle
    const signInWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider();
        googleProvider.setCustomParameters({
            prompt: "select_account",
        });
        googleProvider.addScope('email');
        setLoading(true);

        return signInWithPopup(auth, googleProvider);
    };
    // 
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log(currentUser);
            if(currentUser?.email) {
                const loggedUser = {email: currentUser.email};
                axiosSecure.post('/jwt', loggedUser)
                .then(res => {
                    console.log(res.data)
                    setLoading(false);
                })
            }
            else {
                axiosSecure.post('/logout' , {} )
                .then(res => {
                    console.log('logout' , res.data)
                    setLoading(false);})
            }
            
        });

        return () => {
            unSubscribe();
        };
    },[]);
    const userInfo ={
        user,
        loading,
        createUser,
        signInUser,
        signOutUser,
        signInWithGoogle,
    }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;