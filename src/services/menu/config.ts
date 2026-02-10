import type { MenuItem } from '@/types/menu';

/**
 * 菜单配置数据
 * 集中管理所有菜单定义
 */
const menuData: MenuItem[] = [
    {
        title: '首页',
        type: 'MENU',
        name: 'home',
        // permission: 'manager:dashboard:read',
    },
    {
        title: '系统管理',
        type: 'DIRECTORY',
        name: 'manager',
        children: [
            {
                title: '部门管理',
                type: 'MENU',
                name: 'manager-department',
                permission: 'manager:department:read',
            },
            {
                title: '用户管理',
                type: 'MENU',
                name: 'manager-user',
                permission: 'manager:user:read',
            },
            {
                title: '角色管理',
                type: 'MENU',
                name: 'manager-role',
                permission: 'manager:role:read',
            }
        ]
    },
    {
        title: '实习管理',
        type: 'DIRECTORY',
        name: 'internship',
        children: [
            {
                title: '选题管理',
                type: 'MENU',
                name: 'manager-department',
                // permission: 'manager:department:read',
            }
        ]
    }
];

/**
 * 获取菜单配置数据
 * @returns 菜单配置数组
 */
export function getMenuData(): MenuItem[] {
    return menuData;
}

// 重新导出类型，方便使用
export type { MenuItem };
