import { Injectable } from '@angular/core';
import { StorageService } from '@core/services/storage.service';
import { Permission } from './permission.enum';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  constructor(private readonly storageService: StorageService) {}

  hasPermission(permission: Permission): boolean {
    const user = this.storageService.getUser();
    if (!user) {
      return false;
    }
    return user.permissions.includes(permission);
  }

  hasAnyPermission(permissions: Permission[]): boolean {
    return permissions.some(permission => this.hasPermission(permission));
  }

  hasAllPermissions(permissions: Permission[]): boolean {
    return permissions.every(permission => this.hasPermission(permission));
  }
}
