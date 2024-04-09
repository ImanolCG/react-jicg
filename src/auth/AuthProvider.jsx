import { useContext, createContext, useEffect, useState } from "react";

const AuthContext = createContext({
    isAuthenticated: false,
    authUser: {},
    saveUser: (userData, accessToken) => {}
});

export const AuthProvider = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authUser, setAuthUser] = useState({});


    function saveUser(userData, accessToken){
        const authenticatedUser = {
            id: userData.id,
            name: userData.name,
            access_token: accessToken
        }
        setAuthUser(authenticatedUser);
        setIsAuthenticated(true);
    }

    return(
        <AuthContext.Provider value={{isAuthenticated, authUser, saveUser}}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => useContext(AuthContext);