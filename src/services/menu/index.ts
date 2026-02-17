import { getMenuData } from './config';
import { permissionApi } from '@/api/permission';
import type { MenuItem } from './types';

/**
 * 获取用户授权菜单
 * @returns Promise<MenuItem[]> 授权后的菜单数据
 */
async function getAuthorizedMenu(): Promise<MenuItem[]> {
    // 获取用户权限列表
    const permissions = await permissionApi.getPermissions();
    const menuData = getMenuData();

    // 递归过滤菜单
    return filterMenuByPermissions(menuData, permissions);
}

/**
 * 递归过滤菜单项
 * @param menuItems 菜单项数组
 * @param permissions 用户权限列表
 * @returns 过滤后的菜单项数组
 */
function filterMenuByPermissions(menuItems: MenuItem[], permissions: string[]): MenuItem[] {
    return menuItems
        .map(item => {
            // 如果是目录，递归过滤子菜单
            if (item.type === 'DIRECTORY' && item.children) {
                const filteredChildren = filterMenuByPermissions(item.children, permissions);

                // 如果目录有过滤后的子菜单，保留该目录
                if (filteredChildren.length > 0) {
                    return {
                        ...item,
                        children: filteredChildren
                    };
                }
                // 如果目录没有子菜单，移除该目录
                return null;
            }

            // 如果是菜单项，检查权限
            if (item.type === 'MENU') {
                // 如果没有权限要求，或者有权限要求且用户有该权限，保留菜单项
                if (!item.permission || permissions.includes(item.permission)) {
                    return item;
                }
                // 没有权限，移除菜单项
                return null;
            }

            return null;
        })
        .filter((item): item is MenuItem => item !== null);
}

export const menuService = {
    getAuthorizedMenu
};

// 从 config 重新导出，方便外部统一导入
export { getMenuData, type MenuItem } from './config';
