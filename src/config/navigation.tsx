import { userRoles } from '@/types/role';

type NavLink = { path: string; label: string; image?: string; isDesktopOnly?: boolean; icon?: JSX.Element };

const commonNavLinks: NavLink[] = [{ path: '/', label: 'Все путевки' }];

const roleSpecificNavLinks: { [key in string]?: NavLink[] } = {
  [userRoles.ADMIN]: [{ path: '/admin', label: 'Админ-панель', isDesktopOnly: true }],
  [userRoles.USER]: [{ path: '/vouchers', label: 'Мои путевки' }],
};

export function getNavLinks(role: string): NavLink[] {
  const specificLinks = roleSpecificNavLinks[role] || [];

  return [...commonNavLinks, ...specificLinks];
}

//admin list:
interface AdminNavListType {
  path: string;
  label: string;
  icon?: JSX.Element;
}

export function getAdminNavLinks(): AdminNavListType[] {
  return [
    { path: '/admin/vouchers', label: 'Управление путевками' },
    { path: '/admin/hotels', label: 'Управление отелями' },
    { path: '/admin/reports', label: 'Отчеты' },
    { path: '/admin/directory', label: 'Справочная информация' },
  ];
}

export const getAdminLinkInPath = (path: string): AdminNavListType[] | null => {
  const adminNavLinks = getAdminNavLinks();
  if (path.startsWith(adminNavLinks[0].path))
    return [
      {
        path: '/admin/vouchers/control',
        label: 'Путевки',
      },
      {
        path: '/admin/vouchers/travel-agency',
        label: 'Турагентства',
      },
      {
        path: '/admin/vouchers/tour-operator',
        label: 'Туроператоры',
      },
    ];
  if (path === adminNavLinks[1].path) {
    return null;
  }
  if (path === adminNavLinks[2].path) {
    return null;
  }
  if (path.startsWith(adminNavLinks[3].path)) {
    return [
      {
        path: '/admin/directory/units-of-measurement',
        label: 'Единицы измерения',
      },
      {
        path: '/admin/directory/service',
        label: 'Класс обслуживания',
      },
      {
        path: '/admin/directory/type-of-settlement',
        label: 'Тип населенного пункта',
      },
      {
        path: '/admin/directory/country',
        label: 'Страна',
      },
      {
        path: '/admin/directory/locality',
        label: 'Населенный пункт',
      },
    ];
  }
  return null;
};

export const userLink = {
  profile: '/profile',
};

export const adminLink = {
  createHotel: '/admin/hotels/create',
};
