export interface DashboardKpiConfig {
  icon: string;
  iconColor: string;
  iconBackground: string;
}

export const DASHBOARD_KPI_CONFIG: Record<string, DashboardKpiConfig> = {
  revenue: {
    icon: 'attach_money',
    iconColor: '#2E7D32',
    iconBackground: '#E8F5E9',
  },

  orders: {
    icon: 'shopping_cart',
    iconColor: '#1565C0',
    iconBackground: '#E3F2FD',
  },

  'completed-orders': {
    icon: 'check_circle',
    iconColor: '#EF6C00',
    iconBackground: '#FFF3E0',
  },

  owners: {
    icon: 'local_pizza',
    iconColor: '#6A1B9A',
    iconBackground: '#F3E5F5',
  },
};
