<template>
    <el-aside :style="{ width: isCollapse ? '64px' : '200px' }">
        <div class="header">
            <img class="logo" src="@/assets/logo.png" alt="logo">
            <span v-show="!isCollapse" class="title">后台管理</span>
        </div>
        <el-menu :default-active="activeTab" class="menu" :collapse="isCollapse" router :collapse-transition="false"
            @select="handleMenuSelect" unique-opened>
            <!-- 动态生成的菜单树 -->
            <template v-for="menu_level1 in menuData" :key="menu_level1.name">

                <!-- 单独的菜单项 -->
                <el-menu-item v-if="menu_level1.type === 'MENU'" :index="menu_level1.name"
                    :route="{ name: menu_level1.name, meta: { title: menu_level1.title } }">
                    <el-icon>
                        <component :is="getIconComponent(menu_level1.icon) || 'location'" />
                    </el-icon>
                    <span> {{ menu_level1.title }}</span>

                </el-menu-item>

                <!-- 目录类型的菜单 -->
                <el-sub-menu
                    v-if="menu_level1.type === 'DIRECTORY' && menu_level1.children && menu_level1.children.length > 0"
                    :index="menu_level1.name">
                    <template #title>
                        <el-icon>
                            <component :is="getIconComponent(menu_level1.icon) || 'location'" />
                        </el-icon>
                        <span>{{ menu_level1.title }}</span>
                    </template>
                    <!-- 子菜单项 -->
                    <el-menu-item v-for="menu_level2 in menu_level1.children" :key="menu_level2.name"
                        :index="menu_level2.name"
                        :route="{ name: menu_level2.name, meta: { title: menu_level2.title } }">
                        <el-icon>
                            <component :is="getIconComponent(menu_level2.icon) || 'location'" />
                        </el-icon>
                        <span>{{ menu_level2.title }}</span>
                    </el-menu-item>
                </el-sub-menu>
            </template>
        </el-menu>
    </el-aside>
</template>

<script setup lang="ts">
import { ref, onMounted, shallowRef, defineAsyncComponent } from 'vue'
import { menuService, type MenuItem } from '@/services/manager'
import { type MenuItemClicked } from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

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

const menuData = ref<MenuItem[]>([])
const loading = ref(false)

// 动态获取图标组件
const getIconComponent = (iconName?: string) => {
    if (!iconName) return null
    return ElementPlusIconsVue[iconName as keyof typeof ElementPlusIconsVue]
}

function handleMenuSelect(index: string, _indexPath: string, menuItem: MenuItemClicked) {
    const title = (menuItem.route as { meta?: { title?: string } })?.meta?.title || '未命名'
    emit('menuSelect', index, title)
}

// 获取菜单数据
async function fetchMenuData() {
    loading.value = true
    try {
        menuData.value = await menuService.getAuthorizedMenu()
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
@import './Index.scss';
</style>
