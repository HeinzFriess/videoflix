import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Video } from 'src/models/video.class';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private apiUrl = 'https://heinz-friess.developerakademie.org/videos/';
  private authToken = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  getVideos(): Observable<Video[]> {
    
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${this.authToken}`, // Include your token here
      });

    return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
      map((videos: any[]) => {
        return videos.map((videoData) => new Video(videoData));
      })
    );
  }
}
