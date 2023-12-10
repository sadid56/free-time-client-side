/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";


export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    //create user
    const createUser = (email , password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // update profile
    const profileUpdate = (name, photo)=>{
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser)
            setLoading(false)
        })

        return ()=> unSubscribe()

    },[])

    const authInfo = {
        user,
        loading,
        createUser,
        profileUpdate
    }
    return ( 
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
     );
}
 
export default AuthProvider;