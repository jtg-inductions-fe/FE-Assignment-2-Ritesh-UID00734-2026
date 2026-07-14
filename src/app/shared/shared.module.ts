import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@shared/material/material.module';
import { UiButtonComponent } from './components/ui-button/ui-button.component';
import { UiInputComponent } from './components/ui-input/ui-input.component';

@NgModule({
  declarations: [UiButtonComponent, UiInputComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [UiButtonComponent, UiInputComponent, MaterialModule],
})
export class SharedModule {}
