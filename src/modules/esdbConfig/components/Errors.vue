<template>
  <div>
    <ErrorSection v-for="(e, index) in check" :key="`error-${index}`" :index="index" :section="e"></ErrorSection>

    <ElForm>
      <ElFormItem>
        <ElButton :type="!hasErrors() ? 'primary' : 'warning'" @click="validateConfiguration">
          {{ validateButtonLabel }}
        </ElButton>
        <ElButton
                :type="!validated ? 'info' : !hasErrors() ? 'success' : 'danger'"
                @click="proceed"
                :disabled="!validated"
        >
          {{ proceedButtonLabel }}
        </ElButton>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<script>
import ElForm from "element-ui/lib/form";
import ElFormItem from "element-ui/lib/form-item";
import ElButton from "element-ui/lib/button";

import ErrorSection from "./ErrorSection";
import validation from "../domain/validation";

export default {
    name:       "Errors",
    components: {ErrorSection, ElForm, ElFormItem, ElButton},
    data() {
        return {
            validated: false,
        }
    },
    computed: {
        check() {
            return validation.errors;
        },
        validateButtonLabel() {
            return `Validate${this.validated ? " again" : ""}`;
        },
        proceedButtonLabel() {
            return !this.validated ? "Validate first" : this.hasErrors() ? "Ignore issues and proceed" : "Proceed";
        }
    },
    methods:  {
        hasErrors() {
            return validation.hasErrors;
        },
        hasSectionErrors(section) {
            return validation.hasSectionErrors(section);
        },
        validateConfiguration() {
            this.$emit("validate");
            this.validated = true;
        },
        proceed() {
            this.$emit("proceed");
        }
    }
}
</script>
