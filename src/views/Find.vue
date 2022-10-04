<template>
  <div>
    <h1>查找</h1>

    <el-form :model="form" label-width="120px">
      <el-form-item label="请输入姓名">
        <el-autocomplete
          v-model="state"
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          :highlight-first-item="true"
          value-key="name"
          clearable
          placeholder="请输入关键字"
          :debounce="300"
          @select="handleSelect"
        />
      </el-form-item>
    </el-form>
    <el-dialog v-model="dialogFormVisible" title="搜索结果">
      <el-form :model="form" :label-width="120">
        <el-form-item label="工号">{{ form.id }}</el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="生日">
          <el-input v-model="form.birthday" />
        </el-form-item>
        <el-form-item label="住址">
          <el-input v-model="form.address" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import store from "@/utils/store";
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";

// 处理搜索结果显示
const state = ref("");

const data = ref([]);
const querySearch = (queryString, cb) => {
  const results = queryString
    ? data.value.filter(createFilter(queryString))
    : data.value;
  console.log("results", results);
  // call callback function to return suggestions
  cb(results);
};
const createFilter = (queryString) => {
  return (data) => {
    return data.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
  };
};
const loadAll = () => {
  return store.getState();
};

// 处理选中结果事件
const dialogFormVisible = ref(false);
let form = ref(null);

const handleSelect = (item) => {
  console.log("selected", item);

  form.value = item;
  dialogFormVisible.value = true;
};

const handleSubmit = () => {
  store.dispatch({
    type: "changed",
    form,
  });
  dialogFormVisible.value = false;
  ElMessage({ type: "success", message: "修改成功" });
};

onMounted(() => {
  data.value = loadAll();
});
</script>

<style scoped>
.my-autocomplete li {
  line-height: normal;
  padding: 7px;
}
.my-autocomplete li .name {
  text-overflow: ellipsis;
  overflow: hidden;
}
.my-autocomplete li .addr {
  font-size: 12px;
  color: #b4b4b4;
}
.my-autocomplete li .highlighted .addr {
  color: #ddd;
}

::v-deep .el-autocomplete {
  width: 50%;
}
</style>
