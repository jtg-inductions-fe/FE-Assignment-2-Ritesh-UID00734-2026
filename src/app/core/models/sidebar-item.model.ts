import { Permission } from '@app/core/authorization/permission.model';

export interface SidebarItem {
  id: string;
  label: string;
  icon?: string;
  route?: string;
  badge?: number;
  permission?: Permission;
  children?: SidebarItem[];
}
