import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { AuthService } from 'services/AuthService';
import { Router } from '@angular/router';
import { MessageService } from 'services/MessageService';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) { }

  showErrorMessage(message: string): void {
    this.messageService.showMessage(message);
  }
  ngOnInit(): void {
  }
  register() {
    const dialogRef = this.dialog.open(RegisterDialogComponent);
  }
  login() {
    this.authService.login(this.username, this.password)
      .then(response => {
        // Successful login
        this.router.navigate(['/main']);
      })
      .catch(error => {
        // Login errors 
        this.showErrorMessage('Login error');
        this.router.navigate(['']); 
      });
  }

  username = '';
  email = '';
  password = '';
  loading = false;

}
