import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../models/user";
import {ApiService} from "./api.service";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class UserService {
    constructor(private api: ApiService) {
    }

    getUsers(filter?: string): Observable<User[]> {

        let endPoint = '/users';
        console.log(this.api.get(endPoint));
        return this.api.get(endPoint).map(res => res.json() as User[]).catch(err => Observable.throw(err));
    }

    search(q: string): Observable<any> {
        let endPoint = '/search/users?q=' + q;
        console.log(this.api.get(endPoint));
        return this.api.get(endPoint).map(res => res.json()).catch(err => Observable.throw(err));

    }

    getUserRepos(user: string): Observable<any> {

        let endPoint = '/users/' + user + '/repos';
        return this.api.get(endPoint).map(res => res.json()).catch(err => Observable.throw(err));
    }

    getUser(user: string): Observable<any> {

        let endPoint = '/users/' + user;
        return this.api.get(endPoint).map(res => res.json()).catch(err => Observable.throw(err));
    }

}