import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VersionService } from '../../core/services/version.service';

@Component({
  selector: 'app-version-history',
  templateUrl: './version-history.component.html',
  styleUrls: ['./version-history.component.css']
})
export class VersionHistoryComponent implements OnInit {

  documentId!: string;
  versions: any[] = [];
  isLoading = false;
  restoringVersion: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private versionService: VersionService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/dashboard']);
      return;
    }
    this.documentId = id;
    this.loadVersions();
  }

  loadVersions(): void {
    this.isLoading = true;
    this.versionService.getVersions(this.documentId).subscribe({
      next: (res) => {
        this.versions = res;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  restore(version: number): void {
    if (!confirm(`Restore document to version ${version}?`)) {
      return;
    }

    this.restoringVersion = version;

    this.versionService.restoreVersion(this.documentId, version).subscribe({
      next: () => {
        this.restoringVersion = null;
        this.goBack();
      },
      error: () => {
        this.restoringVersion = null;
        alert('Failed to restore version.');
      }
    });
  }

  // SAFE for template 
  goBack(): void {
    this.router.navigate(['/dashboard/view', this.documentId]);
  }
}
