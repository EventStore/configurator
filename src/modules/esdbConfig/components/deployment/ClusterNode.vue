<template>
  <ElForm
          label-width="240px"
          ref="clusterNode"
          :model="node"
          :inline="true"
          @validate="(field, result, error) => checkNodeField(nodeIndex, field, result, error)"
  >
    <ElFormItem
            prop="dnsName"
            :label="`Node ${nodeIndex} address:`"
            :rules="[
                  {required: hostnameRequired, message: 'Node hostname is required'},
                  { validator: validateNodeDns, trigger: 'blur'}
                  ]"
    >
      <ElInput
              :placeholder="`DNS name ${hostnameRequired ? '' : ' (optional)'}`"
              v-model="node.dnsName"
              @change="resolveNodeDns()"
              autocomplete="false"
              clearable>
      </ElInput>
    </ElFormItem>

    <ElFormItem
            prop="extIp"
            :rules="[
                  {required: true, message: 'Node IP address is required'},
                  {validator: validateNodeIp, trigger: 'blur'}
                ]"
            style="width: 130px"
    >
      <ElInput
              placeholder="External IP"
              v-model="node.extIp"
              autocomplete="false"
              clearable>
      </ElInput>
    </ElFormItem>

    <transition name="el-zoom-in-center">,
      <ElFormItem
              prop="intIp"
              v-show="showIntIp"
              :rules="[
                  {required: showIntIp, message: 'Node IP address is required'},
                  {validator: validateNodeIp, trigger: 'blur'}
                  ]"
              style="width: 130px"
      >
        <ElInput
                placeholder="Internal IP"
                v-model="node.intIp"
                autocomplete="false"
                clearable>
        </ElInput>
      </ElFormItem>
    </transition>
  </ElForm>
</template>

<script>
/* eslint-disable no-unused-vars */
import nodesStore from "../../domain/nodes";
import nodeMixin from "../../../common/nodeMixin";

export default {
    name:     "ClusterNode",
    mixins:   [nodeMixin],
    props:    {
        nodeIndex:        Number,
        showIntIp:        Boolean,
        hostnameRequired: Boolean
    },
    watch:    {
        showIntIp(v) {
            if (v) return;
            setTimeout(_ => this.revalidate("node", "intIp"), 100);
        },
        hostnameRequired(v) {
            if (!v) return;
            setTimeout(_ => this.revalidate("node", "dnsName"), 100);
        }
    },
    computed: {
        node() {
            return nodesStore.getNode(this.nodeIndex);
        },
    },
    methods:  {
        ignore(field) {
            return !this.showIntIp && field === "intIp";
        },
        async validate() {
            try {
                await this.$refs.clusterNode.validate();
            } catch {
                // expected
            }
        }
    }
}
</script>
