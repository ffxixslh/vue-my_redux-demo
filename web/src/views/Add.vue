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
import { ElMessage, ElMessageBox } from "element-plus";
import getData from "@/utils/request";

const router = useRouter();
const form = reactive({
  name: "阿斯顿",
  address: "安徽省 蚌埠市 怀远县",
  birthday: "2001-01-01 00:00:00.000000",
});

const onSubmit = async () => {
  console.log("submit!");
  for (const key in form) {
    if (!form[key]) {
      ElMessage({ message: `请填写完整！`, type: "error" });
      return;
    }
  }
  store.dispatch({ type: "added", form: form });
  store.subscribe(() => console.log(store.getState()));
  let result = await getData({
    method: "POST",
    url: `/api/users/add`,
    data: form,
  });

  if (result.status === "200") {
    console.log("result", result);
    ElMessageBox.confirm("添加成功，是否返回主页？", "添加", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "success",
    })
      .then(() => {
        router.push("/index");
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "取消操作",
        });
      });
  }
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
