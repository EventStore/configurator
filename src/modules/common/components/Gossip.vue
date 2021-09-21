<template>
  <transition name="slide">
    <ElForm
            :model="gossip"
            ref="gossipForm"
            label-width="240px"
            v-show="showGossip"
            @validate="checkField"
    >
      <ElFormItem :label="methodLabel" prop="method">
        <ElCol :span="16">
          <ElRadioGroup
                  v-model="gossip.method"
                  :disabled="gossip.disableGossipMethod"
                  @change="validate"
          >
            <ElRadioButton label="dns">Cluster DNS</ElRadioButton>
            <ElRadioButton label="seed">Nodes seed</ElRadioButton>
          </ElRadioGroup>
        </ElCol>
        <ElCol :span="14" class="form-help">
        </ElCol>
      </ElFormItem>

      <transition name="slide">
        <ElFormItem
                :label="label"
                prop="dnsName"
                v-show="isDnsGossip"
                :rules="[
              {required: isDnsGossip, message: 'Gossip DNS name required', trigger: 'blur'},
              {validator: validateGossip, trigger: 'blur'}
            ]"
        >
          <ElCol :span="10">
            <ElInput
                    placeholder="Cluster DNS name"
                    v-model="gossip.dnsName"
            >
            </ElInput>
          </ElCol>
        </ElFormItem>
      </transition>
    </ElForm>
  </transition>
</template>

<script>
import ElForm from "element-ui/lib/form";
import ElFormItem from "element-ui/lib/form-item";
import ElInput from "element-ui/lib/input";
import ElCol from "element-ui/lib/col";
import ElRadioGroup from "element-ui/lib/radio-group";
import ElRadioButton from "element-ui/lib/radio-button";
import validationMixin from "../validationMixin";

export default {
    name:       "Gossip",
    components: {
        ElForm,
        ElFormItem,
        ElCol,
        ElInput,
        ElRadioGroup,
        ElRadioButton
    },
    mixins:     [validationMixin],
    props:      {
        gossip: Object,
        nodes:  Array
    },
    computed:   {
        isDnsGossip() {
            return this.gossip.isDnsGossip();
        },
        showGossip() {
            return this.gossip.showGossip;
        },
        label() {
            return this.gossip.type + " gossip DNS name:";
        },
        methodLabel() {
            return `Gossip for ${this.gossip.message}:`;
        },
        section() {
            switch (this.gossip.type) {
                case "Cluster":
                    return "Deployment topology";
                case "Client":
                    return "Client connection";
            }
            return null;
        }
    },
    methods:    {
        async validateGossip(rule, value, callback) {
            if (!this.nodes) return;

            await this.gossip.validateGossip(this.nodes, value, callback);
        },
        async validate() {
            try {
                await this.$refs.gossipForm.validate();
            } catch {
                // expected
            }
        }
    }
}
</script>

