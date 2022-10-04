<template>
  <h1>添加</h1>
  <el-form :model="form" label-width="120px">
    <el-form-item label="姓名">
      <el-input
        class="long-input"
        v-model="form.name"
        placeholder="姓名格式: 3-5个字符"
      />
    </el-form-item>
    <el-form-item label="生日">
      <el-input
        class="long-input"
        v-model="form.birthday"
        placeholder="生日格式: yyyy-mm-dd"
      />
    </el-form-item>
    <el-form-item label="住址">
      <el-input
        class="long-input"
        v-model="form.address"
        placeholder="地址格式: 门牌号-街道-市"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button @click="router.push('/index')">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { onUpdated, reactive } from "vue";
import store from "@/utils/store";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const router = useRouter();
let nextId = 5;
const form = reactive({
  id: ++nextId,
  name: "",
  address: "",
  birthday: "",
});

const onSubmit = () => {
  console.log("submit!");
  for (const key in form) {
    if (!form[key]) {
      ElMessage({ message: `请填写完整！`, type: "error" });
      return;
    }
  }
  store.dispatch({ type: "added", form: form });
  store.subscribe(() => console.log(store.getState()));
  router.push("/index");
};

onUpdated(() => {
  console.log(form);
});
</script>
<style scoped>
.long-input {
  width: 50%;
}
</style>
