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

export const userLink = {
  profile: 'profile',
};
