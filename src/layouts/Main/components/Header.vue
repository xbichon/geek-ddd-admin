<template>
    <el-header>
        <div class="header-content">
            <div class="header-left">
                <el-button type="text" class="menu-toggle-btn" @click="$emit('toggleMenu')">
                    <el-icon>
                        <Menu />
                    </el-icon>
                </el-button>
            </div>
            <div class="header-right">
                <el-dropdown @command="$emit('userCommand', $event)">
                    <div class="user-avatar">
                        <el-avatar :size="32" :src="userAvatar" />
                        <span class="user-name">{{ userName }}</span>
                    </div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="profile">
                                <el-icon>
                                    <User />
                                </el-icon>
                                个人信息
                            </el-dropdown-item>
                            <el-dropdown-item divided command="logout">
                                <el-icon>
                                    <SwitchButton />
                                </el-icon>
                                退出系统
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </el-header>
</template>

<script setup lang="ts">
import { User, SwitchButton, Menu } from '@element-plus/icons-vue'

interface Props {
    userName?: string
    userAvatar?: string
}

withDefaults(defineProps<Props>(), {
    userName: '',
    userAvatar: ''
})

const emit = defineEmits<{
    userCommand: [command: string]
    toggleMenu: []
}>()
</script>

<style scoped>
/* Header 样式 */
:deep(.el-header) {
    background-color: #fff;
    border-bottom: 1px solid #f0f0f0;
    padding: 0 16px;
    height: 64px;
    display: flex;
    align-items: center;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.header-content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 64px;
}

.header-left {
    display: flex;
    align-items: center;
    height: 100%;
}

.header-right {
    display: flex;
    align-items: center;
    height: 100%;
}

.menu-toggle-btn {
    padding: 8px;
    border-radius: 6px;
    transition: background-color 0.3s;
    color: #262626;
}

.menu-toggle-btn:hover {
    background-color: #f5f5f5;
}

.user-avatar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s;
    height: 100%;
}

.user-avatar:hover {
    background-color: #f5f5f5;
}

.user-name {
    font-size: 14px;
    color: #262626;
}

/* 移除下拉菜单的黑色边框 */
:deep(.el-dropdown) {
    outline: none;
}

:deep(.el-dropdown .el-dropdown__popper) {
    border: none;
}

:deep(.el-dropdown .el-dropdown-menu) {
    border: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* 移除用户头像区域的焦点边框 */
:deep(.el-dropdown .el-tooltip__trigger) {
    outline: none !important;
}

:deep(.el-dropdown .el-tooltip__trigger:focus) {
    outline: none !important;
}

:deep(.el-dropdown .el-tooltip__trigger:focus-visible) {
    outline: none !important;
}
</style>