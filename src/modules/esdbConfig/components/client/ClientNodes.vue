<template>
  <div v-show="advertiseToClient">
    <transition-group name="slide" mode="in-out">
      <ElForm
              label-width="240px"
              v-for="item in nodes"
              :key="`clientNode-${item.index}`"
              :ref="`clientNode-${item.index}`"
              :model="item"
              :inline="true"
              @validate="(field, result, error) => checkNodeField(item.index, field, result, error)"
      >
        <ElFormItem
                prop="clientAddress"
                :label="`Node ${item.index} translated address:`"
                :rules="[
                    { required: advertiseToClient, trigger: 'blur', message: 'Translated address is required'},
                    { validator: validateNodeAddress, required: advertiseToClient, trigger: 'blur'}
                    ]"
        >
          <ElInput
                  placeholder="DNS name"
                  v-model="item.clientAddress"
                  autocomplete="false"
          >
          </ElInput>
        </ElFormItem>
      </ElForm>
    </transition-group>
  </div>
</template>

<script>
import nodeMixin from "../../../common/nodeMixin";

export default {
    name:    "ClientNodes",
    mixins:  [nodeMixin],
    props:   {
        nodes:             Array,
        advertiseToClient: Boolean
    },
    watch:   {
        advertiseToClient(v) {
            if (v) return;
            // eslint-disable-next-line no-unused-vars
            setTimeout(_ => this.revalidate("clientNode", "clientAddress"), 100);
        }
    },
    methods: {
        ignore(field) {
            return !this.advertiseToClient || field !== "clientAddress";
        },
        validate() {
            this.nodes.forEach(async node => {
                try {
                    await this.$refs[`clientNode-${node.index}`][0].validate();
                } catch {
                    // expected
                }
            });
        }
    }
}
</script>
