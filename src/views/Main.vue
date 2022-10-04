<template>
  <el-container class="layout-container-demo" style="height: 100vh">
    <el-aside width="200px">
      <el-scrollbar>
        <h1 style="margin: 0.5rem; text-align: center">管理菜单</h1>
        <el-menu>
          <el-menu-item index="1" @click="handleRouterPush('index')">
            <template #title>
              <el-icon><House /></el-icon>主页
            </template>
          </el-menu-item>
          <el-menu-item index="2" @click="handleRouterPush('add')">
            <template #title>
              <el-icon><CirclePlus /></el-icon>添加
            </template>
          </el-menu-item>
          <el-menu-item index="3" @click="handleRouterPush('find')">
            <template #title>
              <el-icon><Search /></el-icon>查找
            </template>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px">
              <setting />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>Tom</span>
        </div>
      </el-header>

      <el-main>
        <el-scrollbar class="main-view">
          <RouterView :key="route.path"></RouterView>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { Menu as IconMenu, Message, Setting } from "@element-plus/icons-vue";

const route = useRoute();
const router = useRouter();

const handleRouterPush = (pageName) => {
  router.push(`/${pageName}`);
};
</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
.main-view {
  padding: 1rem;
  overflow: hidden;
}
</style>
