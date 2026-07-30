import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES } from '@core/constants/routes.constants';

import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: ROUTES.NOT_FOUND,
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: ROUTES.NOT_FOUND,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorPagesRoutingModule {}
