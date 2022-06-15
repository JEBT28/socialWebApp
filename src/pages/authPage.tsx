import {FormEvent, useContext, useEffect, useState} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {AuthService} from "../services/authService";
import {authContext} from "../contexts/authContext";
import {useAuth} from "../hooks/useAuth";
import {Splash} from "../components/splash";

interface StateType {
    from: { pathname: string }
}

export const AuthPage = () => {
    const authService = new AuthService();
    const [isLoading, setIsLoading] = useState(false);
    const [isValidating, setIsValidating] = useState(false)
    const navigate = useNavigate()

    const auth = useAuth()
    useEffect(() => {
        let token = localStorage.getItem("token") || ""
        if (!auth && token) {
            setIsValidating(true)
            authService.renew().subscribe({
                    next: (value: any) => {
                        if (value.ok) {
                            localStorage.setItem("token", value.results.token)
                            localStorage.setItem("username", value.results.usuario)
                            navigate("/home")
                        }
                    },
                    error: err => {
                        setIsValidating(false)
                    }
                }
            )
        }
    }, [])


    if (auth && auth.auth.isAuthenticated) {
        navigate("/home")
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault()

        const {user, password}: any = event.target

        const data = {user: user.value, password: password.value}
        // console.table(data)
        setIsLoading(true)
        authService.signin(data).subscribe({
            next: (value: any) => {
                if (value.ok) {
                    localStorage.setItem("token", value.results.token)
                    navigate("/home")
                }
                setIsLoading(false)
            }, error: err => {
                console.log("Error", err)

                setIsLoading(false)
            },
        })
    }

    if (isValidating) {
        return <Splash/>
    }

    return <div className={"flex flex-col justify-around items-center min-h-screen"}>
        <h1 className={"text-3xl font-medium text-center mb-5"}>Social</h1>
        <form onSubmit={handleSubmit} className={"flex flex-col gap-4"} action={""}>
            <div className={"formGroup"}>
                <label htmlFor="user">Username</label>
                <input type="text" id={"user"} placeholder={"Type your username..."}/>
            </div>
            <div className={"formGroup"}>
                <label htmlFor="password">Password</label>
                <input type="password" id={"password"} placeholder={"Type your password..."}/>
            </div>
            <input type={"submit"} value={"Sign in"} disabled={isLoading}/>
        </form>
        <div className={""}>
            <span>If you have not an account, <Link to={"/singup"} className={"text-blue-700"}>Sign Up</Link></span>
        </div>
    </div>
}