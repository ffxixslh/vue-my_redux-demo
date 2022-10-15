<template>
  <div class="index-container">
    <h1>主页</h1>
    <el-table :data="tableData" :key="tableData.length">
      <el-table-column prop="id" label="工号" width="80">
        <template #default="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="birthday" label="生日" width="200" />
      <el-table-column prop="address" label="住址" width="280" />
      <el-table-column prop="actions" label="操作" width="160" fixed="right">
        <template #default="scope">
          <el-button type="primary" @click="handleSelect(scope.row)"
            >修改</el-button
          >
          <el-button type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <ChangeDialog
      :dialogFormVisible="dialogFormVisible"
      :form="form"
      @handle-submit="handleSubmit"
    />
  </div>
</template>

<script setup>
import store from "@/utils/store";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import ChangeDialog from "@/components/ChangeDialog.vue";

let tableData = ref(store.getState());
let form = ref(null);
const dialogFormVisible = ref(false);

// 获取el-table选中行的内容
const handleSelect = (row) => {
  console.log("row", row);
  dialogFormVisible.value = true;
  form.value = row;
};

// 处理删除事件
const handleDelete = (row) => {
  store.dispatch({ type: "deleted", id: row.id });
  store.subscribe(() => console.log(store.getState()));
  tableData.value = store.getState();
};

// 处理弹窗内保存事件
const handleSubmit = () => {
  store.dispatch({
    type: "changed",
    form,
  });
  dialogFormVisible.value = false;
  ElMessage({ type: "success", message: "修改成功" });
};
</script>

<style scoped>
.index-container {
  overflow: auto;
}
</style>
