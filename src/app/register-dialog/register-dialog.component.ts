import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterService } from 'services/RegisterSerivce';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';


@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent {

  constructor(
    public dialog: MatDialog,
    public registerService: RegisterService,
    private router: Router,
    ) { }
  username: any;
  email: any;
  password: any;
  register() {
    this.registerService.register(this.username,this.password, this.email)
        .then(response => {
          // Handle successful login if needed
          console.log('Registration successful!', response);
          const dialogRef = this.dialog.open(LoginDialogComponent);
        })
        .catch(error => {
          // Handle login errors here
          console.error('Register error', error);
          this.router.navigate(['']); // Use the route path you've configured
          // Show error message to the user or perform other actions
        });
  }

}
