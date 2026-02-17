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
