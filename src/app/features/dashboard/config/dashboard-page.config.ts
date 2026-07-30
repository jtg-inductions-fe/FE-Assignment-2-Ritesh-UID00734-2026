export interface DashboardConfig {
  title: string;
  description: string;
}

export const DASHBOARD_PAGE_CONFIG: Record<'admin' | 'owner', DashboardConfig> =
  {
    admin: {
      title: 'Admin Dashboard',
      description:
        'System administrator overview panel. Impersonate owners or view aggregate metrics.',
    },
    owner: {
      title: 'Owner Dashboard',
      description:
        'Monitor your restaurant performance, track live orders, and review key business metrics.',
    },
  };
