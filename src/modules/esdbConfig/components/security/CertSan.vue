<template>
  <ElRow :gutter="20">
    <ElCol :span="12">
      <b>Ext: Subject Alternative Name (SAN)</b>
    </ElCol>
    <ElCol :span="4">
      {{ extType }}
    </ElCol>
    <ElCol :span="8">
      <code>{{ value }} </code>
    </ElCol>
  </ElRow>
</template>

<script>
import ElCol from "element-ui/lib/col";
import ElRow from "element-ui/lib/row";
import {safe} from "../../../common/strings";

export default {
    name:     "CertSan",
    components: {ElCol, ElRow},
    props:    {
        extType:  String,
        extValue: String
    },
    computed: {
        value() {
            return safe(this.extValue);
        }
    }
}
</script>
<style scoped lang="scss">
.ElRow {
  margin-bottom: -20px;
}
</style>
