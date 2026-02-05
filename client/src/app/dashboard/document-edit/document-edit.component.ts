import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../../core/services/document.service';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  documentId!: string;
  file: File | null = null;
  changeNote = '';
  isUploading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private documentService: DocumentService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/dashboard']);
      return;
    }
    this.documentId = id;
  }

  onFileChange(event: any): void {
    this.file = event.target.files[0];
  }

  submit(): void {
    if (!this.file) {
      this.errorMessage = 'Please select a file to upload.';
      return;
    }

    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('changeNote', this.changeNote);

    this.isUploading = true;

    this.documentService.editDocument(this.documentId, formData).subscribe({
      next: () => {
        this.isUploading = false;
        this.goBack();
      },
      error: () => {
        this.isUploading = false;
        this.errorMessage = 'Failed to upload new version.';
      }
    });
  }

  /**  SAFE method for template */
  goBack(): void {
    this.router.navigate(['/dashboard/view', this.documentId]);
  }
}
