import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { StorageService } from '@core/services/storage.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const storageService = inject(StorageService);
  const router = inject(Router);

  const currentUser = storageService.getUser();

  if (!currentUser) {
    return router.createUrlTree(['/login']);
  }

  const expectedRole = route.data['role'];

  if (currentUser.role === expectedRole) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
