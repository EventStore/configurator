<template>
  <ElRow :gutter="20">
    <ElCol>
      <slot></slot>
    </ElCol>
  </ElRow>
</template>

<script>
import ElCol from "element-ui/lib/col";
import ElRow from "element-ui/lib/row";

export default {
    name:       "SingleColumnRow",
    components: {
        ElCol, ElRow
    }
}
</script>

<style scoped lang="scss">
.ElRow {
  margin-bottom: -20px;
}
</style>
