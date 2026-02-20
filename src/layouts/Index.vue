<template>
    <el-container class="layout">
        <Sidebar :is-collapse="isCollapse" :active-tab="activeTab" @menu-select="handleMenuSelect" />
        <el-container direction="vertical">
            <Header :user-name="userName" :user-avatar="userAvatar" @user-command="handleUserCommand" @toggle-menu="toggleMenu" />
            <el-main>
                <el-tabs type="card" v-model="activeTab" class="demo-tabs" @tab-remove="handleTabRemove">
                    <el-tab-pane v-for="item in tabs" :key="item.name" :label="item.title" :name="item.name"
                        :closable="item.name !== 'home'" />
                </el-tabs>
                <div class="main-content">
                    <router-view v-slot="{ Component }">
                        <keep-alive>
                            <component :is="Component" :key="$route.fullPath" />
                        </keep-alive>
                    </router-view>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { ElMessage } from 'element-plus'

// 导入组件
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'

interface TabItem {
    title: string
    name: string
}

const route = useRoute()
const router = useRouter()

const isCollapse = ref(false)
const activeTab = ref('home')
const tabs = ref<TabItem[]>([])

// 用户信息
const userName = ref('管理员')
const userAvatar = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')

// 菜单点击处理
function handleMenuSelect(index: string, title: string) {
    createTab(title, index);
}

// Tab关闭处理
function handleTabRemove(targetName: string) {
    const index = tabs.value.findIndex(tab => tab.name === targetName)

    // 当目标Tab是home时 或者 目标Tab不存在时，不允许关闭
    if (index < 0 || targetName === 'home') {
        return
    }

    // 移除Tab
    tabs.value.splice(index, 1)

    // 判断关闭的tab是否是当前激活的tab，不是则结束流程
    if (activeTab.value !== targetName) return

    // 获取新的激活的Tab,并计划跳转
    const newActiveTab = tabs.value[tabs.value.length - 1]
    activeTab.value = newActiveTab?.name || 'home'
    router.push({ name: newActiveTab.name })
}

// 创建Tab
function createTab(title: string, name: string) {
    // 检查标签是否已存在
    const existingTab = tabs.value.find(tab => tab.name === name);

    if (!existingTab) {
        tabs.value.push({
            title: title,
            name: name
        });

    }
    activeTab.value = name;
}

// 监听activeTab变化，用于处理tab切换时的路由导航
watch(activeTab, (newTab, oldTab) => {
    if (newTab !== oldTab) {
        const tab = tabs.value.find(t => t.name === newTab)
        if (tab && tab.name !== route.name) {
            router.push({ name: tab.name })
        }
    }
})

// 处理用户下拉菜单命令
function handleUserCommand(command: string) {
    switch (command) {
        case 'profile':
            // 查看个人信息
            ElMessage.info('查看个人信息')
            break
        case 'logout':
            // 退出系统
            localStorage.removeItem('authorization')
            ElMessage.success('退出成功')
            router.push('/login')
            break
    }
}

// 切换菜单折叠状态
function toggleMenu() {
    isCollapse.value = !isCollapse.value
}

// 组件挂载时初始化首页标签
onMounted(() => {
    // 初始化首页标签
    createTab('首页', 'home')

    // 检查当前路由，如果不在首页则自动打开对应标签
    if (route.name && route.name !== 'home') {
        createTab(route.meta?.title as string || '未命名标签', route.name.toString());
        activeTab.value = route.name.toString();
    }
})
</script>

<style scoped>
@import './layout.scss';
</style>
