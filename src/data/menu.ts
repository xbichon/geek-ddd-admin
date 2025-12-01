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
    }
];


export interface MenuItem {
    title: string;
    type: 'MENU' | 'DIRECTORY'
    name: string;
    permission?: string;
    children?: MenuItem[];
}

export function getMenuData(): MenuItem[] {
    return menuData;
}