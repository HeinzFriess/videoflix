import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl = 'https://heinz-friess.developerakademie.org/login/'; 

    isAuthenticated(): boolean {
        let auth = localStorage.getItem('auth');
        if (auth == "true") {
            return true;
        } else {
            return false;
        }
    }

    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(this.apiUrl, { username, password })
            .toPromise()
            .then(response => {
                //Successful login
                localStorage.setItem('token', response.token);
                localStorage.setItem('auth', "true");
                return response; 
            })
            .catch(error => {
                // Login error
                console.error('Login error', error);
                throw error; 
            });
    }

    guestLogin(): void {
        localStorage.setItem('token', 'a8af2b96720e4e32abe7e7dcdeed787f0c1bb811');
        localStorage.setItem('auth', "true");
        localStorage.setItem('guest', "true");
    }

    isGuest(): boolean {
        return !!localStorage.getItem('token');
    }
    
}
