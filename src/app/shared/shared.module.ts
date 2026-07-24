import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@shared/material/material.module';

import { UiButtonComponent } from './components/ui-button/ui-button.component';
import { UiInputComponent } from './components/ui-input/ui-input.component';
import { HeaderComponent } from './layout/header/header.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { SidebarItemComponent } from './layout/sidebar-item/sidebar-item.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListCardComponent } from './components/list-card/list-card.component';

@NgModule({
  declarations: [
    UiButtonComponent,
    UiInputComponent,
    HeaderComponent,
    MainLayoutComponent,
    SidebarComponent,
    SidebarItemComponent,
    FooterComponent,
    ListCardComponent,
  ],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, RouterModule],
  exports: [
    UiButtonComponent,
    UiInputComponent,
    MaterialModule,
    HeaderComponent,
    MainLayoutComponent,
    SidebarComponent,
    FooterComponent,
    ListCardComponent,
  ],
})
export class SharedModule {}
