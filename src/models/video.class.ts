export class Video {
    id?: number | null;
    title: string;
    description: string;
    video_file?: File | null;
    created_at: any;
  
    constructor(data: any) {
      // You can add more validations or transformation logic as needed
      this.id = data.id;
      this.title = data.title;
      this.description = data.description;
      this.video_file = data.video_file;
    }
  }
  