import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { Permission } from './permission.enum';
import { PermissionService } from './permission.service';

export const permissionGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
) => {
  const router = inject(Router);
  const permissionService = inject(PermissionService);
  const permission = route.data['permission'] as Permission;

  if (permissionService.hasPermission(permission)) {
    return true;
  }

  return router.createUrlTree(['/unauthorized']);
};
