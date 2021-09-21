<template>
  <div>
    <h2>EventStoreDB installation and configuration</h2>

    <ElDivider content-position="right">Installation</ElDivider>

    <Installation/>

    <ElDivider content-position="right">Configuration</ElDivider>

    <NodeConfig
            v-for="node in nodes"
            :key="`node-${node.index}`"
            :node="node"
            :projections="projections"
    />
  </div>
</template>

<script>
import NodeConfig from "./NodeConfig";
import Installation from "./Installation";
import nodes from "../../domain/nodes";

export default {
    name:       "Configuration",
    components: {NodeConfig, Installation},
    props:      {
        projections: Object
    },
    computed:   {
        nodes: () => nodes.nodes
    },
}
</script>

<style lang="scss">
.ElTabs__item {
  font-size: 16px;
}
</style>
