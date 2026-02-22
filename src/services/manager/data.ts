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
    /** 菜单图标名称（Element Plus图标组件名） */
    icon?: string;
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
        icon: 'HomeFilled',
        // permission: 'manager:dashboard:read',
    },
    {
        title: '实习管理',
        type: 'DIRECTORY',
        name: 'internship',
        icon: 'Collection',
        children: [
            {
                title: '选题管理',
                type: 'MENU',
                name: 'internship-topic',
                icon: 'Edit',
                // permission: 'internship:topic:read',
            },
            {
                title: '学生管理',
                type: 'MENU',
                name: 'internship-intern',
                icon: 'User',
                // permission: 'internship:intern:read',
            }
        ]
    },
    {
        title: '系统管理',
        type: 'DIRECTORY',
        name: 'manager',
        icon: 'Setting',
        children: [
            {
                title: '部门管理',
                type: 'MENU',
                name: 'manager-department',
                icon: 'OfficeBuilding',
                permission: 'manager:department:read',
            },
            {
                title: '用户管理',
                type: 'MENU',
                name: 'manager-user',
                icon: 'User',
                permission: 'manager:user:read',
            },
            {
                title: '角色管理',
                type: 'MENU',
                name: 'manager-role',
                icon: 'UserFilled',
                permission: 'manager:role:read',
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
