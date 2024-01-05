import { Component, Inject } from '@angular/core';
import { Video } from 'src/models/video.class';
import { FileUploadService } from 'services/UploadService';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss']
})
export class UploadDialogComponent {

  video: Video = {
    created_at: new Date(),
    title: '',
    description: '',
    video_file: null
  };

  constructor(
    public dialogRef: MatDialogRef<UploadDialogComponent>,
    private fileUploadService: FileUploadService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onFileSelected(event: any) {
    this.video.video_file = event.target.files[0] as File;
  }

  uploadVideo() {
    this.fileUploadService.uploadVideo(this.video)
      .then(response => {
        // Perform actions upon successful upload
        this.dialogRef.close(response);
      })
      .catch(error => {
        // Show error message to the user or perform other actions
        console.error('Video upload error', error);
      });
  }
  
  closeDialog() {
    this.dialogRef.close();
  }
}
