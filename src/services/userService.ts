import {Observable} from "rxjs";
import {ProcessResponse} from "../helpers/processResponse";
import {fromFetch} from "rxjs/fetch";


export class UserService {
    private baseUrl: string = "https://ios-backend-tec.herokuapp.com/usuarios/";

    getUser(username:string): Observable<Response | unknown> {

        let url = `${this.baseUrl}${username}`;

        return ProcessResponse(fromFetch(url, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*",
                "x-token": localStorage.getItem("token") || ""
            },
            method: "GET",
            selector: response => response.json(),
            // mode: "cors"
        }))
    }
}