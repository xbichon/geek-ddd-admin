<template>
    <el-aside :style="{ width: isCollapse ? '64px' : '200px' }">
        <div class="header">
            <img class="logo" src="@/assets/logo.png" alt="logo">
            <span class="title">后台管理</span>
        </div>
        <el-menu :default-active="activeTab" class="menu" :collapse="isCollapse" router :collapse-transition="false"
            @select="menu_click" unique-opened>
            <!-- 动态生成的菜单树 -->
            <template v-for="menu_level1 in menuData" :key="menu_level1.name">

                <!-- 单独的菜单项 -->
                <el-menu-item v-if="menu_level1.type === 'MENU'" :index="menu_level1.name"
                    :route="{ name: menu_level1.name, meta: { title: menu_level1.title } }">
                    <el-icon>
                        <location />
                    </el-icon>
                    <span> {{ menu_level1.title }}</span>

                </el-menu-item>

                <!-- 目录类型的菜单 -->
                <el-sub-menu
                    v-if="menu_level1.type === 'DIRECTORY' && menu_level1.children && menu_level1.children.length > 0"
                    :index="menu_level1.name">
                    <template #title>
                        <el-icon>
                            <location />
                        </el-icon>
                        <span>{{ menu_level1.title }}</span>
                    </template>
                    <!-- 子菜单项 -->
                    <el-menu-item v-for="menu_level2 in menu_level1.children" :key="menu_level2.name"
                        :index="menu_level2.name"
                        :route="{ name: menu_level2.name, meta: { title: menu_level2.title } }">
                        {{ menu_level2.title }}
                    </el-menu-item>
                </el-sub-menu>
            </template>
        </el-menu>
    </el-aside>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { menuService, type MenuItem } from '@/services/menu'
import { ElMessage, type MenuItemClicked } from 'element-plus'

interface Props {
    isCollapse?: boolean
    activeTab?: string
}

const props = withDefaults(defineProps<Props>(), {
    isCollapse: false,
    activeTab: 'home'
})

const emit = defineEmits<{
    menuSelect: [index: string, title: string]
}>()


function isRouteObject(route: any): route is { meta?: { title?: string } } {
    return typeof route === 'object' && route !== null && !Array.isArray(route);
}

function menu_click(index: string, index_path: string, menuItem: MenuItemClicked) {


    const title = isRouteObject(menuItem.route) ? menuItem.route.meta?.title : '未命名'
    emit('menuSelect', index, title || '未命名')
}

const menuData = ref<MenuItem[]>([])
const loading = ref(false)

// 获取菜单数据
async function fetchMenuData() {
    loading.value = true
    try {
        menuData.value = await menuService.getAuthorizedMenu()
    } catch (error: any) {
        ElMessage.error(error.message || '网络请求失败，请检查网络连接')
    } finally {
        loading.value = false
    }
}

// 组件挂载时获取菜单数据
onMounted(() => {
    fetchMenuData()
})
</script>

<style scoped>
/* 左侧导航设置 */
aside {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #001529;
}

aside .header {
    height: 60px;
    background-color: #001529;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid #0c2135;
    gap: 8px;
    padding: 0 8px;
}

aside .header .logo {
    width: 50px;
    height: 50px;
    object-fit: contain;
}

aside .header .title {
    font-size: 20px;
    font-weight: bold;
    white-space: nowrap;
}

aside .menu {
    flex-grow: 1;
    overflow: auto;
    background-color: #001529;
    border-right: none;
}

/* 菜单项样式 */
:deep(.el-menu) {
    background-color: #001529;
    border-right: none;
}

:deep(.el-menu-item) {
    color: #bfbfbf;
    background-color: #001529;
}

:deep(.el-menu-item:hover) {
    color: #fff;
    background-color: #1890ff;
}

:deep(.el-menu-item.is-active) {
    color: #fff;
    background-color: #1890ff;
}

:deep(.el-sub-menu__title) {
    color: #bfbfbf;
    background-color: #001529;
}

:deep(.el-sub-menu__title:hover) {
    color: #fff;
    background-color: #1890ff;
}

:deep(.el-sub-menu .el-menu-item) {
    background-color: #000c17;
    color: #8c8c8c;
}

:deep(.el-sub-menu .el-menu-item:hover) {
    color: #fff;
    background-color: #1890ff;
}

:deep(.el-sub-menu .el-menu-item.is-active) {
    color: #fff;
    background-color: #1890ff;
}

:deep(.el-icon) {
    color: inherit;
}

/* 折叠状态下的样式 */
:deep(.el-menu--collapse .el-menu-item),
:deep(.el-menu--collapse .el-sub-menu__title) {
    justify-content: center;
}

:deep(.el-menu--collapse .el-sub-menu__title .el-icon) {
    margin-right: 0;
}
</style>