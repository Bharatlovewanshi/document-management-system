import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../../core/services/document.service';

@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.css']
})
export class DocumentViewComponent implements OnInit {

  document: any;
  isLoading = false;
  canEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private documentService: DocumentService
  ) {}

  ngOnInit(): void {
    const documentId = this.route.snapshot.paramMap.get('id');
    if (documentId) {
      this.loadDocument(documentId);
    }
  }

  loadDocument(documentId: string): void {
    this.isLoading = true;

    this.documentService.getDocumentById(documentId).subscribe({
      next: (res) => {
        this.document = res;
        this.canEdit = this.checkEditPermission(res);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      }
    });
  }

  checkEditPermission(doc: any): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return (
      doc.uploadedBy?._id === user._id ||
      doc.permissions?.some(
        (p: any) => p.userId === user._id && p.canEdit
      )
    );
  }
}
