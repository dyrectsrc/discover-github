export class User {
    public login?: string;
    public name?: string;
    public id?: string;
    public avatar_url?: string;
    public url?: string;
    public repos_url?: string;
    public email?: string;
    public repos?: User[];
    public currentUser?: User[];
}