import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiButtonComponent } from './components/ui-button/ui-button.component';
import { MaterialModule } from '@shared/material/material.module';

@NgModule({
  declarations: [UiButtonComponent],
  imports: [CommonModule, MaterialModule],
  exports: [UiButtonComponent, MaterialModule],
})
export class SharedModule {}
