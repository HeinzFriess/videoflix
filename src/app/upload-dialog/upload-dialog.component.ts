import { Component, Inject, OnInit } from '@angular/core';
import { Video } from 'src/models/video.class';
import { FileUploadService } from 'services/UploadService';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MessageService } from 'services/MessageService';
import { Router } from '@angular/router';


@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss']
})
export class UploadDialogComponent implements OnInit {

  color: ThemePalette = 'primary';
  disabled: boolean = false;
  multiple: boolean = false;
  accept = ".mp4, .avi";
  fileControl: FormControl;
  public file: any;
  uploadForm!: FormGroup;

  video: Video = {
    created_at: new Date(),
    title: '',
    description: '',
    video_file: null
  };


  constructor(
    public dialogRef: MatDialogRef<UploadDialogComponent>,
    private fileUploadService: FileUploadService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.uploadForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.maxLength(200)]]
    });
    this.fileControl = new FormControl(this.file, [
      Validators.required
    ])
  }

  ngOnInit(): void {
    this.fileControl.valueChanges.subscribe((files: any) => {
      if (!Array.isArray(files)) {
        this.file = [files];
      } else {
        this.file = files;
      }
      this.fileControl.markAsTouched();
      this.uploadForm.updateValueAndValidity();
    });
  }

  uploadVideo() {

    this.video.title = this.uploadForm.value.title;
    this.video.description = this.uploadForm.value.description;
    this.video.video_file = this.file[0];

    this.messageService.showMessage("upload startet")

    this.fileUploadService.uploadVideo(this.video)
      .then(response => {
        this.messageService.showMessage("upload succesfull")
        this.dialogRef.close(response);
        this.router.navigate(['/mainpage']);
      })
      .catch(error => {
        this.messageService.showMessage("upload error")
        console.error('Video upload error', error);
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
