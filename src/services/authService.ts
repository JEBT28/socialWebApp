import {catchError, Observable, of, switchMap} from "rxjs";
import {fromFetch} from "rxjs/fetch";
import {ProcessResponse} from "../helpers/processResponse";

export class AuthService {
    private baseUrl: string = "https://ios-backend-tec.herokuapp.com/usuarios/auth";

    signin({user, password}: { user: String, password: String }): Observable<Response | unknown> {
        const data = {
            usuario: user,
            contrasena: password
        }

        let body = JSON.stringify(data);

        return ProcessResponse(fromFetch(this.baseUrl, {
            body,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            method: "POST",
            selector: response => response.json(),
            // mode: "cors"
        }))
    }

    renew(): Observable<Response> {
        const url = `${this.baseUrl}/renew`
        return ProcessResponse(fromFetch(url, {
            headers: {
                "content-type": "application/json",
                "accept": "application/json",
                "x-token": localStorage.getItem("token") || ""
            },
            method: "GET",
            selector: response => response.json()
        }))
    }


}