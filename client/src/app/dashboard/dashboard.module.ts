import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentViewComponent } from './document-view/document-view.component';
import { DocumentEditComponent } from './document-edit/document-edit.component';
import { VersionHistoryComponent } from './version-history/version-history.component';
import { DashboardComponent } from './dashboard.component';


@NgModule({
  declarations: [
    DocumentUploadComponent,
    DocumentListComponent,
    DocumentViewComponent,
    DocumentEditComponent,
    VersionHistoryComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,             
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule {}
