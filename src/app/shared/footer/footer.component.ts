import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ImprintComponent } from 'src/app/content/imprint/imprint.component';
import { PrivacyPolicyComponent } from 'src/app/content/privacy-policy/privacy-policy.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(
    public router: Router,
    public dialog: MatDialog,
  ) { }


  openImprint() {
    this.dialog.open(ImprintComponent);
  }
  openLegalNotice() {
    this.dialog.open(PrivacyPolicyComponent);
  }
}
