import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { AuthService } from 'services/AuthService';
import { Router } from '@angular/router';
import { MessageService } from 'services/MessageService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  loginForm!: FormGroup;
  username = '';
  password = '';

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.maxLength(20)]],
    });
  }

  ngOnInit(): void {

  }
  register() {
    const dialogRef = this.dialog.open(RegisterDialogComponent);
  }
  login() {

    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    
    this.authService.login(this.username, this.password)
      .then(response => {
        // Successful login
        this.router.navigate(['/mainpage']);
      })
      .catch(error => {
        // Login errors 
        this.messageService.showMessage('Login error')
        this.router.navigate(['']);
      });
  }
}
