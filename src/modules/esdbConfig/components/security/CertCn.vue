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
import ElCol from "element-ui/lib/col";
import ElRow from "element-ui/lib/row";

export default {
    name:  "CertCn",
    components: {ElCol, ElRow},
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
