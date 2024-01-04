import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    private apiUrl = 'https://heinz-friess.developerakademie.org/register/'; 
    
    constructor(private http: HttpClient) { }

    register(username: string, password: string, email: string) {
        return this.http.post<any>(this.apiUrl, { username, password, email })
            .toPromise()
            .then(response => {
                // Successful login 
                console.log('Registration successful', response);
                return response; // You can return the response data if needed
            })
            .catch(error => {
                // Login errors
                console.error('Register error', error);
                throw error; // Rethrow the error for the component to handle
            });
    }

}
