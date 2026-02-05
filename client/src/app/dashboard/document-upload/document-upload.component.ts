import { Component } from '@angular/core';
import { DocumentService } from '../../core/services/document.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css']
})
export class DocumentUploadComponent {

  title = '';
  description = '';
  tags = '';
  accessLevel = 'PRIVATE';
  file: File | null = null;

  isUploading = false;
  errorMessage = '';
  
  constructor(private documentService: DocumentService,
    private router: Router
  ) {}

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
    }
  }

  upload(): void {
    console.log("Upload1");
    if (!this.file || !this.title) {
      this.errorMessage = 'Title and file are required';
      return;
    }
    console.log("Upload2");
    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('tags', this.tags);
    formData.append('accessLevel', this.accessLevel);

    console.log('Uploading document...', formData);

    this.isUploading = true;

    this.documentService.uploadDocument(formData).subscribe({
      next: () => {
        this.isUploading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error(err);
        this.isUploading = false;
        this.errorMessage = 'Upload failed';
      }
    });
  }

  goToUpload() {
    this.router.navigate(['/dashboard/upload']);
  }

}
