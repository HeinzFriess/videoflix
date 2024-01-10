import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    private apiUrl = 'https://heinz-friess.developerakademie.org/register/';
    //private csrfUrl = 'https://heinz-friess.developerakademie.org/';

    constructor(private http: HttpClient) { }

    register(username: string, password: string, email: string) {
       
            const headers = new HttpHeaders({
                'Content-Type': 'application/json'
            });
           
            return this.http
                .post(this.apiUrl, { username, password, email })
                .toPromise()
                .then((response) => {
                    return response;
                })
                .catch((error) => {
                    throw error;
                });
        
    }



    

}
