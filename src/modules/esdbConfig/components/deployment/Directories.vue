<template>
  <ElForm
          :model="state"
          ref="directoriesForm"
          label-width="240px"
          @validate="checkField"
  >
    <ElDivider content-position="right">Directories</ElDivider>

    <FormInput
            label="Data:"
            prop="data"
            prompt="Data directory"
            :required="true"
            v-model="data"
    />
    <FormInput
            label="Index:"
            prop="index"
            prompt="Index directory"
            :required="true"
            v-model="index"
    />
    <FormInput
            label="Logs:"
            prop="logs"
            prompt="Logs directory"
            :required="true"
            v-model="logs"
    />
    <FormInput
            label="Configuration:"
            prop="config"
            placeholder="Configuration directory"
            :required="true"
            :disabled="disableConfig"
            v-model="config"
    />
  </ElForm>
</template>

<script>
import ElForm from "element-ui/lib/form";
import ElDivider from "element-ui/lib/divider";
import FormInput from "../form/FormInput";
import store from "../../domain/directories";
import validationMixin from "../../../common/validationMixin";

export default {
    name:       "Directories",
    mixins:     [validationMixin],
    components: {FormInput, ElForm, ElDivider},
    computed:   {
        state:         () => store,
        data:          store.property("data"),
        index:         store.property("index"),
        logs:          store.property("logs"),
        config:        store.property("config"),
        disableConfig: () => store.disableConfig(),
        section:       () => "Directories"
    },
    methods:    {
        validate() {
            this.$refs.directoriesForm.validate();
        }
    }
}
</script>
