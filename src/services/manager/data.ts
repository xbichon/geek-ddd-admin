/**
 * 菜单项类型定义
 */
export interface MenuItem {
    /** 菜单标题 */
    title: string;
    /** 菜单类型：MENU-菜单项，DIRECTORY-目录 */
    type: 'MENU' | 'DIRECTORY';
    /** 菜单唯一标识（对应路由 name） */
    name: string;
    /** 所需权限，可选 */
    permission?: string;
    /** 子菜单，仅 DIRECTORY 类型有效 */
    children?: MenuItem[];
}

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
                name: 'internship-topic',
                // permission: 'internship:topic:read',
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
