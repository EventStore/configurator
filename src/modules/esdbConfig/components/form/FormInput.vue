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
export default {
  name: "FormInput",
  props: {
    label: String,
    required: Boolean,
    prompt: String,
    prop: String,
    value: String,
    disabled: Boolean
  },
  methods: {
    updateValue(val) {
      this.$emit("input", val);
    }
  }
}
</script>

<style scoped>

</style>
