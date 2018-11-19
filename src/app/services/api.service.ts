import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptionsArgs } from "@angular/http";
import { Observable } from "rxjs-compat";


@Injectable()
export class ApiService {

    private apiServer: string = "https://api.github.com";

    constructor(private http: Http) {

    }

    get(endPoint: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.get(this.createUrl(endPoint));
    }

    createUrl(endPoint): string {

        let url = this.apiServer + endPoint;
        if (!endPoint.startsWith('/')) {
            url = this.apiServer + '/' + endPoint;
        }
        return url;
    }


}