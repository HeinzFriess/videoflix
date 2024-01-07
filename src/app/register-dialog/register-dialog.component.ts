import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterService } from 'services/RegisterSerivce';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'services/MessageService';


@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent {
  loginForm!: FormGroup;
  username = '';
  email = '';
  password = '';

  constructor(
    public dialog: MatDialog,
    public registerService: RegisterService,
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(6)]],
    });
  }

  register() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    this.email = this.loginForm.value.email;
    this.registerService.register(this.username, this.password, this.email)
      .then(response => {
        // Successful registered
        this.messageService.showMessage('Check your Email Inbox')
        const dialogRef = this.dialog.open(LoginDialogComponent);
      })
      .catch(error => {
        this.messageService.showMessage('Registration error');
        this.router.navigate(['']);
      });
  }

}
