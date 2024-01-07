import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private snackBar: MatSnackBar) {}

  showMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 4000, // 3 seconds
      panelClass: ['message'], // Customize with Angular Material classes
    });
  }
}
