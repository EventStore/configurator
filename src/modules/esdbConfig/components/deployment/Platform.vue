<template>
  <ElForm label-width="240px">
    <ElDivider content-position="right">Platform</ElDivider>

    <ElFormItem label="Platform:">
      <ElRadioGroup v-model="platform">
        <ElRadioButton label="linux">Linux</ElRadioButton>
        <ElRadioButton label="windows">Windows</ElRadioButton>
      </ElRadioGroup>
    </ElFormItem>
  </ElForm>
</template>

<script>
import store from "../../domain/platform";

export default {
    name:     "Platform",
    computed: {
        platform: store.extendedProperty("platform", "changePlatform")
    }
}
</script>
