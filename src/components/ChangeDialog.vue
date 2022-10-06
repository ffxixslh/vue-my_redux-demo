<template>
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
        <el-button type="primary" @click="$emit('handleSubmit')">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
const props = defineProps({
  dialogFormVisible: Boolean,
  form: Object,
});

const emits = defineEmits(["handleSubmit"]);
</script>

<style scoped></style>
