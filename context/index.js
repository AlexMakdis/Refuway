import React, { useContext, createContext, useState, useEffect } from 'react';

const _auth = createContext()
export const useAuth = () => useContext(_auth)

export const AuthProvider = ({children}) => {
    const [ user, setUser ] = useState();
    const logout = () => {
        setUser(null);
        localStorage.removeItem('token')
    }
    useEffect(() => {
        if(window){
            const token = localStorage.getItem('token');
            token && setUser(token);  
        }
      }, []);
    return <_auth.Provider value={[ user, setUser, logout ]}>
        {children}
    </_auth.Provider>
}