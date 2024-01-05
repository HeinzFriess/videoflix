import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Video } from 'src/models/video.class';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private apiUrl = 'https://heinz-friess.developerakademie.org/videos/'; 
  private authToken = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  uploadVideo(video: Video) {
    const formData: FormData = new FormData();
    formData.append('title', video.title);
    formData.append('description', video.description);
    if (video.video_file) {
      formData.append('video_file', video.video_file, video.video_file.name);
    }

    const headers = new HttpHeaders({
      Authorization: `Token ${this.authToken}`,
    });

    return this.http.post<any>(this.apiUrl, formData, { headers })
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(error => {
        console.error('Video upload error', error);
        throw error;
      });
  }
}
