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
@import './Index.scss';
</style>
