import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'services/AuthService';
import { MessageService } from 'services/MessageService';
import { LoginDialogComponent } from 'src/app/login-dialog/login-dialog.component';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent {
  constructor(public messageService: MessageService,
     public dialog: MatDialog,
     private authService: AuthService,
    private router: Router,) {}
  texts: string[] = ['The Website to upload and watch your favourite Videoclips',
  'Login to get access'];
  currentIndex: number = 0;
  blinking: boolean = true;

  openDialog() {
    this.dialog.open(LoginDialogComponent);
  }

  ngOnInit() {
    setInterval(() => {
      this.changeText();
    }, 1500);
  }

  changeText() {
    this.currentIndex = (this.currentIndex + 1) % this.texts.length;
    this.blinking = false; // Stop blinking momentarily
    setTimeout(() => {
      this.blinking = true; // Resume blinking after a short delay
    }, 100);
  }

  guestLogin(): void {
    this.authService.guestLogin();
    this.router.navigate(['/mainpage']);
    // Optionally, navigate to a different page after guest login
  }
  
}
