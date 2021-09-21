<template>
  <div>
    <ElFormItem label="Number of nodes:" prop="nodesCount">
      <ElCol :span="5">
        <ElInput-number
                v-model="nodesCount"
                :min="minNodes"
                :max="maxNodes"
        >
        </ElInput-number>
      </ElCol>
      <ElCol :span="1">&nbsp;</ElCol>
      <ElCol :span="16" v-show="isCluster" class="form-help">
        We recommend <b>three nodes</b> for an HA cluster. The number of nodes should be odd.
      </ElCol>
    </ElFormItem>

    <transition-group name="slide">
      <ClusterNode
              v-for="item in nodes"
              :ref="`node-${item.index}`"
              :key="`node-${item.index}`"
              :node-index="item.index"
              :show-int-ip="showIntIp"
              :hostname-required="hostnameRequired"
      />
    </transition-group>

  </div>
</template>

<script>
import ClusterNode from "./ClusterNode";
import nodesStore from "../../domain/nodes";

export default {
    name:       "ClusterNodes",
    components: {ClusterNode},
    props:      {
        showIntIp:        Boolean,
        isCluster:        Boolean,
        hostnameRequired: Boolean
    },
    computed:   {
        nodes:      () => nodesStore.nodes,
        minNodes:   () => nodesStore.minNodes,
        maxNodes:   () => nodesStore.maxNodes,
        nodesCount: nodesStore.property("nodesCount")
    },
    methods:    {
        validate() {
            this.nodes.forEach(node => this.$refs[`node-${node.index}`][0].validate());
        }
    }
}
</script>
