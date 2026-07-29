import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { StorageService } from '@core/services/storage.service';

export const LoginGuard: CanActivateFn = () => {
  const storageService = inject(StorageService);
  const router = inject(Router);

  if (storageService.isLoggedIn()) {
    router.navigate(['/dashboard']);
    return false;
  }
  return true;
};
