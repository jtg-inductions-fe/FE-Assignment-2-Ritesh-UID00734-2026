import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorPagesRoutingModule } from './error-pages-routing.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule, SharedModule, ErrorPagesRoutingModule],
})
export class ErrorPagesModule {}
