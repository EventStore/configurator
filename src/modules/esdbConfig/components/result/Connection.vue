<template>
  <div>
    <h2>Connecting clients</h2>

    <ElRadioGroup v-model="client">
      <ElRadioButton label="tcp" :disabled="!conn.isTcpEnabled">TCP</ElRadioButton>
      <ElRadioButton label="grpc">gRPC</ElRadioButton>
    </ElRadioGroup>

    <p>Connection string:</p>
    <prism>{{ conn.connectionString }}</prism>

    <div v-show="conn.selfSigned">
      <p>Note:</p>
      <p>
        You either need to add the CA certificate to the trusted CA store of the client machine, or add
        <code>{{ conn.disableValidate }}</code> to the connection string.
      </p>
    </div>

    <slot></slot>
    <ElButton
            type="primary"
            @click="gotoClientDocs"
    >Go to the gRPC clients documentation
    </ElButton>
  </div>
</template>

<script>
import ElButton from "element-ui/lib/button";
import ElRadioGroup from "element-ui/lib/radio-group";
import ElRadioButton from "element-ui/lib/radio-button";
import connection from "../../calc/connection";

export default {
    name: "Connection",
    components: {ElButton, ElRadioButton, ElRadioGroup},
    // mixins: []
    data() {
        return {
            client: "grpc"
        }
    },
    computed: {
        conn() {
            return connection(this.client);
        }
    },
    methods:  {
        gotoClientDocs() {
            window.location.href = "https://developers.eventstore.com/clients/grpc/getting-started/";
        }
    }
}
</script>
