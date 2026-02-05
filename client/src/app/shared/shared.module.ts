import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 

import { LoaderComponent } from './components/loader/loader.component';
import { ModalComponent } from './components/modal/modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { HighlightPipe } from './pipes/highlight.pipe';

@NgModule({
  declarations: [
    LoaderComponent,
    ModalComponent,
    NavbarComponent,
    SidebarComponent,
    HighlightPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    LoaderComponent,
    ModalComponent,
    NavbarComponent,
    SidebarComponent,
    HighlightPipe
  ]
})
export class SharedModule {}
