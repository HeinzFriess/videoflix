export class Video {
    id?: number | null;
    title: string;
    description: string;
    category: string | null;
    video_file?: File | null;
    video_file360p?: File | null;
    video_file720p?: File | null;
    video_file1080p?: File | null;
    video_fileThumbnail?: File | null;
    created_at: any;
  
    constructor(data: any) {
      // You can add more validations or transformation logic as needed
      this.id = data.id;
      this.title = data.title;
      this.description = data.description;
      this.category = data.category;
      this.video_file = data.video_file;
      this.video_file360p = data.video_file360p;
      this.video_file720p = data.video_file720p;
      this.video_file1080p = data.video_file1080p;
      this.video_fileThumbnail = data.video_fileThumbnail;
    }
  }
  