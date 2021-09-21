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
import ElForm from "element-ui/lib/form";
import ElFormItem from "element-ui/lib/form-item";
import ElDivider from "element-ui/lib/divider";
import ElRadioGroup from "element-ui/lib/radio-group";
import ElRadioButton from "element-ui/lib/radio-button";
import store from "../../domain/platform";

export default {
    name:     "Platform",
    components: {ElForm, ElFormItem, ElDivider, ElRadioGroup, ElRadioButton},
    computed: {
        platform: store.extendedProperty("platform", "changePlatform")
    }
}
</script>
