<template>
  <ElFormItem
          :label="label"
          :prop="prop"
  >
    <ElCol :span="5">
      <ElSwitch
              v-bind:value="value"
              v-on:input="updateValue($event)"
              :disabled="disabled"
      />
    </ElCol>
    <ElCol :span="1">&nbsp;</ElCol>
    <ElCol :span="16" class="form-help">
      <slot></slot>
    </ElCol>
  </ElFormItem>
</template>

<script>
import ElFormItem from "element-ui/lib/form-item";
import ElSwitch from "element-ui/lib/switch";
import ElCol from "element-ui/lib/col";

export default {
    name:       "FormSwitch",
    components: {
        ElFormItem, ElSwitch, ElCol
    },
    props:      {
        label:    String,
        prop:     String,
        value:    Boolean,
        disabled: Boolean
    },
    methods:    {
        updateValue(val) {
            this.$emit("input", val);
        }
    }
}
</script>

<style scoped>

</style>
