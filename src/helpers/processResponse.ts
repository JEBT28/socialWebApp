import {catchError, Observable, of, switchMap, throwError} from "rxjs";

export const ProcessResponse = (observable: Observable<Response>) => {
    return observable.pipe(
        switchMap(response => {
                if (response.ok) {
                    return of(response);
                } else {
                    return throwError(response)
                }
            }
        )
    );
}