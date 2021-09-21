<template>
  <ElRow :gutter="20">
    <ElCol :span="12">
      Subject Name - Common Name (CN):
    </ElCol>
    <ElCol :span="12">
      <code>{{ commonName }}</code>
    </ElCol>
  </ElRow>
</template>

<script>
export default {
    name:  "CertCn",
    props: {
        commonName: String
    }
}
</script>
<style scoped lang="scss">
.ElRow {
  margin-bottom: -20px;
}
</style>
