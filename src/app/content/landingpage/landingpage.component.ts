import { Component } from '@angular/core';
import { MessageService } from 'services/MessageService';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent {
  constructor(public messageService: MessageService) {}
}
