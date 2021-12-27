<template>
  <ElForm
          :model="model"
          ref="securityForm"
          label-width="240px"
          @validate="checkField"
  >
    <ElDivider content-position="right">Security</ElDivider>

    <ElFormItem label="Protocol security:" prop="secure">
      <ElSwitch
              v-model="secure"
              active-text="Secure"
              inactive-text="Insecure">
      </ElSwitch>
    </ElFormItem>

    <transition name="slide">
      <div v-show="secure">
        <ElFormItem
                label="Certificate:"
                prop="cert">
          <ElRadioGroup v-model="cert">
            <ElRadioButton label="self-signed">Private CA</ElRadioButton>
            <ElRadioButton label="trusted">Public CA</ElRadioButton>
          </ElRadioGroup>
        </ElFormItem>

        <ElFormItem
                label="Certificate common name:"
                prop="certCommonName"
                :rules="[
                      {required: secure, message: 'Certificate CN is required'},
                      {validator: validateCertCn, trigger: 'blur'},
                    ]"
        >
          <ElCol :span="10">
            <ElInput
                    v-model="certCommonName"
                    :disabled="isSelfSigned"
                    :placeholder="publicCaPrompt"
            >
            </ElInput>
          </ElCol>
          <ElCol :span="10" class="form-help">
            <span v-html="certCnHelp"></span>
          </ElCol>
        </ElFormItem>
      </div>
    </transition>

  </ElForm>
</template>

<script>
import ElForm from "element-ui/lib/form";
import ElFormItem from "element-ui/lib/form-item";
import ElDivider from "element-ui/lib/divider";
import ElCol from "element-ui/lib/col";
import ElRadioGroup from "element-ui/lib/radio-group";
import ElRadioButton from "element-ui/lib/radio-button";
import ElSwitch from "element-ui/lib/switch";
import ElInput from "element-ui/lib/input";
import store from "../../domain/security";
import {error, ok} from "../../../lib/validate";
import validationMixin from "../../../common/validationMixin";

export default {
    name:     "Security",
    components: {ElForm, ElFormItem, ElCol, ElDivider, ElRadioGroup, ElRadioButton, ElSwitch, ElInput},
    mixins:   [validationMixin],
    computed: {
        secure:         store.extendedProperty("secure", "updateSecurity"),
        cert:           store.extendedProperty("cert", "updateCertType"),
        certCommonName: store.extendedProperty("certCommonName", "updateCn"),

        model:          () => store,
        publicCaPrompt: () => store.cnPrompt,
        certCnHelp:     () => store.certCnHelp,
        isSelfSigned:   () => store.isSelfSigned,
        section:        () => "Security"
    },
    methods:  {
        validateCertCn(rule, value, callback) {
            const result = store.validateCertCn(value);
            return result == null ? ok(callback) : error(callback, result);
        },
        validate() {
            this.$refs.securityForm.validate();
        }
    }
}
</script>
