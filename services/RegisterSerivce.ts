import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    private apiUrl = 'https://heinz-friess.developerakademie.org/register/';

    constructor(private http: HttpClient) { }

    register(username: string, password: string, email: string) {
        return this.getCSRFToken().then((csrftoken) => {
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken || '',
            });

            return this.http
                .post<any>(this.apiUrl, { username, password, email }, { headers })
                .toPromise()
                .then((response) => {
                    console.log('Registration successful', response);
                    return response;
                })
                .catch((error) => {
                    console.error('Register error', error);
                    throw error;
                });
        });
    }

    private async getCSRFToken(): Promise<string | undefined> {
        try {
            const requestHeaders = new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'
                // Add other required headers here
            });

            const response: HttpResponse<any> | undefined = await this.http
                .get<any>('https://heinz-friess.developerakademie.org/', { headers: requestHeaders, observe: 'response' })
                .toPromise();

            const csrfToken = (response && response.headers.get('Set-Cookie')) || undefined;
            console.log(csrfToken);
            return csrfToken;
        } catch (error) {
            console.error('Error fetching CSRF token:', error);
            return undefined;
        }
    }

}
