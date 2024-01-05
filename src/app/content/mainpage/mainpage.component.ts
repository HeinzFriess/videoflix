import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VideoService } from 'services/VideoService';
import { UploadDialogComponent } from 'src/app/upload-dialog/upload-dialog.component';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss'],
})
export class MainpageComponent implements OnInit {
  videos: any[] = [];
  loading: boolean = true;
  resolution: '480p' | '720p' = '720p';

  constructor(private videoService: VideoService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.loadVideos();
  }

  loadVideos() {
    this.videoService.getVideos().subscribe(
      (videos) => {
        this.videos = videos;
        this.loading = false;
        // Handle the received videos here
      },
      (error) => {
        console.error('Error fetching videos:', error);
        // Handle the error as needed
      }
    );
  }

  openDialog(){
    this.dialog.open(UploadDialogComponent);
  }

}
