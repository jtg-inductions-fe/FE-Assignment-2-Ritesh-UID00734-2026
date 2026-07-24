import { Permission } from '@app/core/authorization/permission.model';
import { Role } from '../authorization/role.enum';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  avatar: string;
  permissions: Permission[];
  restaurantId?: number;
}
