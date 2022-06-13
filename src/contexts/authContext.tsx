import {createContext, useContext, useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import {AuthService} from "../services/authService";

interface AuthInterface {
    isAuthenticated: boolean;
    username?: string;
    token?: string;
}


interface AuthContextType {
    auth: AuthInterface;
    signin: (user: AuthInterface, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
}

export const authContext = createContext<AuthContextType>(null!);


const AuthProvider = ({children}: any) => {
    const authService = new AuthService()
    let [auth, setAuth] = useState<AuthInterface>({isAuthenticated: false});

    const token = localStorage.getItem("token") || ""

    if (token) {
        if (!auth.isAuthenticated) {
            authService.renew().subscribe({
                    next: (value: any) => {
                        if (value.ok) {
                            setAuth({isAuthenticated: true, username: value.results.usuario, token: value.results.token})
                        }
                    },
                    error: err => {
                        return <Navigate to={"/auth"}/>
                    }
                }
            )
        }
    } else {
        return <Navigate to={"/auth"}/>
    }

    let signin = (newUser: AuthInterface, callback: VoidFunction) => {
        setAuth({isAuthenticated: true})
        callback()
    };

    let signout = (callback: VoidFunction) => {
        setAuth(null!)
        callback()
    };


    return (<authContext.Provider value={{auth, signin, signout}}>
        {children}
    </authContext.Provider>)
}

export default AuthProvider