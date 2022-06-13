import {Observable} from "rxjs";
import {ProcessResponse} from "../helpers/processResponse";
import {fromFetch} from "rxjs/fetch";

export class PostService {

    private baseUrl: string = "https://ios-backend-tec.herokuapp.com/posts";

    getPosts(): Observable<any> {
        return ProcessResponse(fromFetch(this.baseUrl, {
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json",
                    "x-token": localStorage.getItem("token") || ""
                },
                method: "GET",
                selector: response => response.json()
            })
        )
    }
}