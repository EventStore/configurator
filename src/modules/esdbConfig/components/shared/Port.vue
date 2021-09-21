<template>
  <ElFormItem
          :label="label + ' port:'"
          :prop="prop"
          :rules="portRules(enabled)"
  >
    <ElCol :span="5">
      <ElInput v-bind:value="value" v-on:input="updateValue($event)"/>
    </ElCol>
    <ElCol :span="1">&nbsp;</ElCol>
    <ElCol :span="16" class="form-help">
      <slot></slot>
    </ElCol>
  </ElFormItem>
</template>

<script>
import ElFormItem from "element-ui/lib/form-item";
import ElInput from "element-ui/lib/input";
import ElCol from "element-ui/lib/col";

export default {
    name:    "Port",
    components: {ElFormItem, ElCol, ElInput},
    props:   {
        label:   String,
        prop:    String,
        value:   [String, Number],
        enabled: Boolean
    },
    watch:   {},
    methods: {
        portRules(required) {
            return [
                {required: required, message: `${this.label} port is required`},
                {validator: this.validate}
            ]
        },
        updateValue(val) {
            this.$emit("input", val);
        },
        validate(rule, value, callback) {
            if (isNaN(value)) {
                callback(new Error(`${this.label} must be a number`));
            }
            callback();
        }
    }
}
</script>

<style scoped>

</style>
