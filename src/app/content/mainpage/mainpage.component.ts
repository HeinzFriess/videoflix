import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageService } from 'services/MessageService';
import { VideoService } from 'services/VideoService';
import { UploadDialogComponent } from 'src/app/upload-dialog/upload-dialog.component';
import { Video } from 'src/models/video.class';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss'],
})
export class MainpageComponent implements OnInit {

  videos: any[] = [];
  loading: boolean = true;
  loggedIn: boolean = false;
  play: boolean = false;
  file: any = '';
  screenWidth: number = 360;


  constructor(
    private videoService: VideoService, 
    public dialog: MatDialog, 
    private router: Router,
    private messageService: MessageService,
    ) { }

  ngOnInit(): void {
    this.loadVideos();
    this.screenWidth = window.screen.width;
    this.loggedIn = (localStorage.getItem('auth') == 'true');
    if(!this.loggedIn){
      this.messageService.showMessage('Login succesfull')
    }
  }

  loadVideos() {
    this.videoService.getVideos().subscribe(
      (videos) => {
        this.videos = videos;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching videos:', error);
      }
    );
  }

  openDialog() {
    this.dialog.open(UploadDialogComponent);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.setItem('auth', "false");
    this.router.navigate(['./']);
    this.messageService.showMessage('you are logged out')
  }

  playVideo(file: Video){
    this.play = true;
    if(this.screenWidth > 360 && this.screenWidth < 720){
      this.file = file.video_file360p;
    }
    if(this.screenWidth > 720 && this.screenWidth < 1080){
      this.file = file.video_file720p;
    }
    if(this.screenWidth > 1080 ){
      this.file = file.video_file1080p;
    }

  }

  stopVideo() {
    this.play = false;
    }

}
