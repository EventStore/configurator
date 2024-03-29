<template>
  <ElForm
          :model="topology"
          ref="topologyForm"
          label-width="240px"
          @validate="checkField"
  >

    <ElDivider content-position="right">Deployment topology</ElDivider>

    <ElFormItem label="Deployment topology:" prop="cluster">
      <ElSwitch
              v-model="cluster"
              active-text="Cluster"
              inactive-text="Single node">
      </ElSwitch>
    </ElFormItem>

    <FormSwitch label="Separate interfaces:" prop="separateNetworks" v-model="topology.separateNetworks">
      Enable this option if internal and external communication should use different network interfaces.
    </FormSwitch>

    <ClusterNodes
            ref="clusterNodes"
            :is-cluster="topology.cluster"
            :show-int-ip="topology.separateNetworks"
            :hostname-required="!isSelfSigned"
    />

    <Gossip ref="clusterGossip" :gossip="topology.gossip" :nodes="nodes"/>

    <Port
            label="HTTP"
            prop="httpPort"
            :enabled="true"
            v-model="topology.httpPort"
    >
      HTTP port for internal and external communication over gRPC and
      endpoints like stats and gossip.
    </Port>
    <Port
            label="Internal TCP"
            prop="internalTcpPort"
            :enabled="topology.cluster"
            v-model="topology.internalTcpPort"
    >
      Even when TCP is disabled, cluster nodes still perform replication over TCP internally.
    </Port>
    <Port
            label="External TCP"
            prop="externalTcpPort"
            :enabled="isTcpEnabled"
            v-model="topology.externalTcpPort"
    >
      This port is used for TCP clients. You only need it if you have application using legacy TCP clients.
    </Port>

  </ElForm>
</template>

<script>
import ElForm from "element-ui/lib/form";
import ElFormItem from "element-ui/lib/form-item";
import ElDivider from "element-ui/lib/divider";
import ElSwitch from "element-ui/lib/switch";

import FormSwitch from "../form/FormSwitch";
import Port from "../shared/Port";
import ClusterNodes from "./ClusterNodes";
import Gossip from "../../../common/components/Gossip";
import topology from "../../domain/topology";
import nodes from "../../domain/nodes";
import validationMixin from "../../../common/validationMixin";

export default {
    name:       "Topology",
    mixins:     [validationMixin],
    components: {ClusterNodes, FormSwitch, Port, Gossip, ElForm, ElFormItem, ElDivider, ElSwitch},
    computed:   {
        topology:     () => topology,
        nodes:        () => nodes.nodes,
        isTcpEnabled: () => topology.tcpEnabled,
        isSelfSigned: () => topology.selfSigned,

        cluster: topology.extendedProperty("cluster", "updateClustering"),

        section: () => "Deployment topology"
    },
    methods:    {
        validate() {
            this.$refs.topologyForm.validate();
            this.$refs.clusterNodes.validate();
            this.$refs.clusterGossip.validate();
        },
    }
}
</script>
