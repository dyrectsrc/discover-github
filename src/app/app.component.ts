import {Component, OnInit} from '@angular/core';
import {User} from "./models/user";
import {UserService} from "./services/user.service";
import {Subject} from "rxjs-compat";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = '{discoverGithub}';


    cache = {
        users: [],
        selectedUser: [],
    };

    users: User[] = [];
    search: Subject<string> = new Subject<string>();
    selectedUser: User = new User();
    loadingRepos: boolean = false;
    loadingUser: boolean = false;


    constructor(private userService: UserService) {

        this.search.debounceTime(200).distinctUntilChanged().subscribe((searchTerm) => {

            // call to user service and search by query

            this.userService.search(searchTerm).subscribe(res => {

                this.users = res.items as User[];
               

            });
        })
    }

    ngOnInit() {


        this.userService.getUsers().subscribe(res => {
           
            this.cache.users = res; // store cached for next time.

            this.users = res;
            console.log(this.users);
        }, error => {

            console.log(error); // for development only.
        });

    }

    /**
     * On user typing key to search.
     */
    onSearch(q: string) {

        if (q !== "") {
            this.search.next(q);
        } else {
            //if empty search box we restore first users
            this.users = this.cache.users;
        }

    }

    go(s: string) {

        if (s == 'home') {

            this.selectedUser = new User();
            this.users = this.cache.users;
        }
    }

    viewUser(user: User) {

        this.selectedUser = user;
       

        let userInCache: User = this.findUserInCache(user);
        // let find if existing in cache we return and no longer call to api again
        if (userInCache) {
            this.selectedUser = userInCache;
        } else {
            // get repos of this user
            this.loadingRepos = true;
            this.loadingUser = true;

            this.userService.getUserRepos(user.login).subscribe(res => {
                this.selectedUser.repos = res as User[];
console.log(res);
                this.cacheSelectUser(this.selectedUser);

                this.loadingRepos = false;

            }, err => {
                console.log(err);
                this.loadingRepos = false;
            });

            this.userService.getUser(user.login).subscribe(res => {
                this.selectedUser.currentUser = res as User[];
console.log(res);
                this.cacheSelectUser(this.selectedUser);

                this.loadingUser = false;

            }, err => {
                console.log(err);
                this.loadingUser = false;
            });

        }


    }

    /**
     * we storage selected user and dont again to api. just simply function for now.
     * */

    cacheSelectUser(user: User) {
        if (!this.findUserInCache(user)) {
            this.cache.selectedUser.push(user);
        }

    }

    /**
     * Find user if exist in cache we return user object
     * @param user
     * @returns {boolean}
     */
    findUserInCache(user: User): User {

        for (var i = 0; i < this.cache.selectedUser.length; i++) {
            if (this.cache.selectedUser[i].login == user.login) {
                return this.cache.selectedUser[i];
            }
        }

        return null;
    }
  }