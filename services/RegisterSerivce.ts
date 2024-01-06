import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    private apiUrl = 'https://heinz-friess.developerakademie.org/register/';
    private csrfUrl = 'https://heinz-friess.developerakademie.org/';

    constructor(private http: HttpClient) { }

    register(username: string, password: string, email: string) {
        return this.getCSRFToken().then((csrftoken) => {
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken || ''
            });
           
            return this.http
                .post<any>(this.apiUrl, { username, password, email }, { headers },)
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

            const response = await this.http
                .get(this.csrfUrl, { headers: requestHeaders, responseType: 'text' })
                .toPromise();

            // Extract CSRF token based on the specific format of the response
            const csrfToken = this.extractCSRFTokenFromResponse(response);
            return csrfToken || undefined;
        } catch (error) {
            console.error('Error fetching CSRF token:', error);
            return undefined;
        }
    }

    private extractCSRFTokenFromResponse(response: any): string | undefined {
        const regex = /window\.drf\s*=\s*\{[^}]*csrfToken:\s*"([^"]+)"[^}]*\}/;
        const match = response.match(regex);

        if (match && match.length > 1) {
            return match[1]; // CSRF token found in the matched regex group
        } else {
            console.error('CSRF token not found in the response');
            return undefined;
        }
    }

    private async oldgetCSRFToken(): Promise<string | undefined> {
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
