<template>
  <ElFormItem
          :label="label"
          :prop="prop"
          :rules="[ {required: required, message: `${prompt} is required`, trigger: 'blur'} ]"
  >
    <ElCol :span="10">
      <ElInput
              :placeholder="prompt"
              v-bind:value="value"
              v-on:input="updateValue($event)"
              autocomplete="false"
              :disabled="disabled"
              clearable>
      </ElInput>
    </ElCol>
  </ElFormItem>

</template>

<script>
import ElFormItem from "element-ui/lib/form-item";
import ElInput from "element-ui/lib/input";
import ElCol from "element-ui/lib/col";

export default {
    name:       "FormInput",
    components: {
        ElFormItem, ElInput, ElCol
    },
    props:      {
        label:    String,
        required: Boolean,
        prompt:   String,
        prop:     String,
        value:    String,
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
