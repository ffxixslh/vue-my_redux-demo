<template>
  <div class="index-container">
    <h1>主页</h1>
    <el-table
      :data="typeof tableData === 'object' ? tableData : null"
      :key="tableData.length"
    >
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
import { ElMessage, ElMessageBox } from "element-plus";
import ChangeDialog from "@/components/ChangeDialog.vue";
import getData from "@/utils/request";

let tableData = ref(store.getState());
let form = ref(null);
const dialogFormVisible = ref(false);

// 获取el-table选中行的内容
const handleSelect = (row) => {
  console.log("row", row);
  form.value = row;
  dialogFormVisible.value = true;
};

// 处理删除事件
const handleDelete = async (row) => {
  form.value = row;
  ElMessageBox.confirm("确定要删除该用户吗？", "删除", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(
    async (res) => {
      store.dispatch({ type: "deleted", id: row.id });
      store.subscribe(() => console.log(store.getState()));
      let result = await getData({
        method: "DELETE",
        url: `/api/users/delete/${row.id}`,
        data: form.value,
      });

      if (result.status === "200") {
        console.log("result", result);
        ElMessage({ type: "success", message: "删除成功" });
      }
      tableData.value = store.getState();
    },
    (err) => {
      console.log("delete err:", err);
      ElMessage({ type: "info", message: "删除失败" });
    }
  );
};

// 处理弹窗内保存事件
const handleSubmit = async () => {
  store.dispatch({
    type: "changed",
    form,
  });

  let result = await getData({
    method: "PUT",
    url: `/api/users/${form.value.id}`,
    data: form.value,
  });

  if (result.status === "200") {
    console.log("result", result);
    ElMessage({ type: "success", message: "修改成功" });
  }
  dialogFormVisible.value = false;
};
</script>

<style scoped>
.index-container {
  overflow: auto;
}
</style>
