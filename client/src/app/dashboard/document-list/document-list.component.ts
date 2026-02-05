import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../core/services/document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  documents: any[] = [];
  isLoading = false;
  searchText = '';

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments(): void {
  this.isLoading = true;

  this.documentService.getDocuments().subscribe({
    next: (res: any) => {
      console.log('Documents API response:', res);

      this.documents =
        res.documents ||
        res.data ||
        res.result ||
        [];

      this.isLoading = false;
    },
    error: (err) => {
      console.error(err);
      this.isLoading = false;
    }
  });
}


  getUserId(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user)._id : null;
  }

  canEdit(doc: any): boolean {
    const userId = this.getUserId();
    return (
      doc.uploadedBy?._id === userId ||
      doc.permissions?.some(
        (p: any) => p.userId === userId && p.canEdit
      )
    );
  }
}
