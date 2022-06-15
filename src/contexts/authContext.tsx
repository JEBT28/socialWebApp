import {createContext, useContext, useEffect, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import {AuthService} from "../services/authService";
import {handledUnauthorized} from "../helpers/handledUnauthorized";

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
    const navigate = useNavigate()
    let [auth, setAuth] = useState<AuthInterface>({isAuthenticated: false});

    const token = localStorage.getItem("token") || ""

    if (token) {
        if (!auth.isAuthenticated) {
            authService.renew().subscribe({
                    next: (value: any) => {
                        if (value.ok) {
                            localStorage.setItem("token", value.results.token)
                            localStorage.setItem("username", value.results.usuario)
                            setAuth({isAuthenticated: true, username: value.results.usuario, token: value.results.token})
                        }
                    },
                    error: err => {
                        console.log("Error auth", err)
                        localStorage.removeItem("token")
                        setAuth({isAuthenticated: false})
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