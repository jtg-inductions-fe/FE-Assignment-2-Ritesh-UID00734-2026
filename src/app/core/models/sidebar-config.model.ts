import { SidebarItem } from './sidebar-item.model';

export interface SidebarConfig {
  primary: SidebarItem[];
  secondary: SidebarItem[];
  footer: SidebarItem[];
}
