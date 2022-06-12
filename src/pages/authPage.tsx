import {FormEvent} from "react";
import {useLocation, useNavigate} from "react-router-dom";

interface StateType {
    from: { pathname: string }
}

export const AuthPage = () => {
    let navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {

        console.log("signin")

    }
    return <div className={"grid place-content-center bg-purple-700 text-white min-h-screen"}> Auth Page
        <form onSubmit={handleSubmit}>
            <button type={"submit"}>signin</button>
        </form></div>
}