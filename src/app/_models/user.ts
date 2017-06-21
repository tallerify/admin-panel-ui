export class User {
    id?: string;
    userName: string;
    firstName: string;
    lastName: string;
    password: string;
    country: string;
    email: string;
    birthdate: string;
    avatar: File;
    contacts?: Array<string>;
}