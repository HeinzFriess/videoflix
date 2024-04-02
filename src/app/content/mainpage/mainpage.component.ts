import { Component, ElementRef, OnInit, ViewChildren, Renderer2, AfterViewInit, QueryList } from '@angular/core';
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
export class MainpageComponent implements OnInit, AfterViewInit {
  @ViewChildren('categorysections') categorysections!: QueryList<ElementRef>;
  videos: any[] = [];
  loading: boolean = true;
  loggedIn: boolean = false;
  guest: boolean = false;
  play: boolean = false;
  file: any = '';
  description: any = '';
  title: any = '';
  screenWidth: number = 360;
  categories!: { [key: string]: Video[]; };
  scrollInterval: any;


  constructor(
    private videoService: VideoService,
    public dialog: MatDialog,
    private router: Router,
    private messageService: MessageService,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
    this.loadVideos();
    this.screenWidth = window.screen.width;
    this.loggedIn = (localStorage.getItem('auth') == 'true');
    this.guest = (localStorage.getItem('guest') == 'true');

    if (!this.loggedIn) {
      this.messageService.showMessage('Login succesfull')
    }
  }
  
  ngAfterViewInit(): void {
    // Perform any operations that require the initialized view
  }

  loadVideos() {
    this.videoService.getVideos().subscribe(
      (videos) => {
        this.videos = videos;
        this.loading = false;
        this.categories = this.separateByCategory();
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
    localStorage.setItem('guest', "false");
    this.router.navigate(['./']);
    this.messageService.showMessage('you are logged out')
  }

  playVideo(file: Video) {
    this.play = true;
    this.title = file.title;
    this.description = file.description;
    if (this.screenWidth > 360 && this.screenWidth < 720) {
      this.file = file.video_file360p;
    }
    if (this.screenWidth > 720 && this.screenWidth < 1080) {
      this.file = file.video_file720p;
    }
    if (this.screenWidth > 1080) {
      this.file = file.video_file1080p;
    }

  }

  stopVideo() {
    this.play = false;
  }

  separateByCategory(): { [key: string]: Video[] } {
    const separatedLists: { [key: string]: Video[] } = {};

    this.videos.forEach(video => {
      if (!separatedLists[video.category]) {
        separatedLists[video.category] = [];
      }
      separatedLists[video.category].push(video);
    });

    return separatedLists;
  }

  categoriesVideoKeys(): string[] {
    return Object.keys(this.categories);
  }

  stopContinuousScrolling() {
    clearInterval(this.scrollInterval);
  } 

  scrollLeft(index: number) {
    this.stopContinuousScrolling();
    this.scrollInterval = setInterval(() => {
      this.continuousscrollLeft(index);
    }, 10);
  }

  continuousscrollLeft(index: number) {
    const scrollAmount = 5; // Adjust as needed
    const element = this.categorysections.toArray()[index]?.nativeElement;
    if (element) {
      this.scroll(element, -scrollAmount);
    }
  }
  
  scrollRight(index: number) {
    this.stopContinuousScrolling();
    this.scrollInterval = setInterval(() => {
      this.continuousscrollRight(index);
    }, 10);
  }

  continuousscrollRight(index: number) {
    const scrollAmount = 5; // Adjust as needed
    const element = this.categorysections.toArray()[index]?.nativeElement;
    if (element) {
      this.scroll(element, scrollAmount);
    }
  }

  private scroll(element: HTMLElement, scrollAmount: number) {
    element.scrollLeft += scrollAmount;
  }

  
    
}
