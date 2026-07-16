import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@shared/material/material.module';
import { RouterModule } from '@angular/router';
import { UiButtonComponent } from './components/ui-button/ui-button.component';
import { UiInputComponent } from './components/ui-input/ui-input.component';
import { HeaderComponent } from './layout/header/header.component';

@NgModule({
  declarations: [UiButtonComponent, UiInputComponent, HeaderComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, RouterModule],
  exports: [
    UiButtonComponent,
    UiInputComponent,
    MaterialModule,
    HeaderComponent,
  ],
})
export class SharedModule {}
