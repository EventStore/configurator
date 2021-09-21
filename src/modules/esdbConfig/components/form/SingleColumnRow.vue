<template>
  <ElRow :gutter="20">
    <ElCol>
      <slot></slot>
    </ElCol>
  </ElRow>
</template>

<script>
export default {
  name: "SingleColumnRow"
}
</script>

<style scoped lang="scss">
.ElRow {
  margin-bottom: -20px;
}
</style>
