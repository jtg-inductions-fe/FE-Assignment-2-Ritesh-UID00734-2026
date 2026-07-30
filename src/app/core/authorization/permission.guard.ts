import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';

import { ROUTES } from '@core/constants/routes.constants';

import { Permission } from './permission.model';
import { PermissionService } from './permission.service';

export const PermissionGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
) => {
  const router = inject(Router);
  const permissionService = inject(PermissionService);
  const permission = route.data['permission'] as Permission;

  if (permissionService.hasPermission(permission)) {
    return true;
  }

  router.navigate([`/${ROUTES.NOT_FOUND}`]);
  return false;
};
