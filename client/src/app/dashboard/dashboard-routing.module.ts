import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';

import { DashboardComponent } from './dashboard.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { DocumentViewComponent } from './document-view/document-view.component';
import { DocumentEditComponent } from './document-edit/document-edit.component';
import { VersionHistoryComponent } from './version-history/version-history.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,   // 🔥 THIS WAS MISSING
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DocumentListComponent
      },
      {
        path: 'upload',
        component: DocumentUploadComponent
      },
      {
        path: 'view/:id',
        component: DocumentViewComponent
      },
      {
        path: 'edit/:id',
        component: DocumentEditComponent
      },
      {
        path: 'versions/:id',
        component: VersionHistoryComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
