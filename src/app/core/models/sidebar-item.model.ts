import { Permission } from '@core/authorization/permission.enum';

export interface SidebarItem {
  id: string;
  label: string;
  icon?: string;
  route?: string;
  badge?: number;
  permission?: Permission;
  children?: SidebarItem[];
}
