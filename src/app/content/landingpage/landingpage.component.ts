import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'services/MessageService';
import { LoginDialogComponent } from 'src/app/login-dialog/login-dialog.component';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent {
  constructor(public messageService: MessageService, public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(LoginDialogComponent);
  }
}
