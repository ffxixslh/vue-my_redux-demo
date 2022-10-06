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
    <ChangeDialog
      :dialogFormVisible="dialogFormVisible"
      :form="form"
      @handle-submit="handleSubmit"
    />
  </div>
</template>

<script setup>
import store from "@/utils/store";
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import ChangeDialog from "@/components/ChangeDialog.vue";

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

:deep(.el-autocomplete) {
  width: 50%;
}
</style>
