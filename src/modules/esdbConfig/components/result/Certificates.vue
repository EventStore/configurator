<template>
  <div>
    <h2>Certificates</h2>
    <div>
      <div v-if="config.publicCa">
        <SingleColumnRow>
          You need a wildcard certificate signed by a public trusted certificate authority (CA).
          The certificate private key <b>must be in RSA format</b>.
        </SingleColumnRow>
        <SingleColumnRow>
          The certificate needs to have the following attributes:
        </SingleColumnRow>
        <CertCn :common-name="config.cn"/>
        <CertSan ext-type="DNS Name" :ext-value="config.cn"/>
        <CertSan v-if="config.extraDns" ext-type="DNS Name" :ext-value="config.extraDns"/>
      </div>
      <div v-else>
        We have a <a href="https://developers.eventstore.com/server/v20/security/configuration.html#certificate-generation-cli" target="_blank">certificate
        generation
        tool</a>, which creates certificated adapted for EventStoreDB.<br><br>

        <ElDivider content-position="right">Download the tool</ElDivider>

        <ElForm :model="form" ref="form" label-width="350px" label-position="top">
          <ElFormItem label="Choose which OS will you be running the tool:">
            <ElRadioGroup v-model="form.os">
              <ElRadioButton label="linux">Linux</ElRadioButton>
              <ElRadioButton label="windows">Windows</ElRadioButton>
              <ElRadioButton label="macos">macOS</ElRadioButton>
              <ElRadioButton label="docker">Docker (any OS)</ElRadioButton>
            </ElRadioGroup>
          </ElFormItem>
        </ElForm>

        <div v-if="form.os === 'docker'">
          Pull the latest tool image from Docker Hub.
          <prism language="bash">docker pull eventstore/es-gencert-cli</prism>
        </div>
        <div v-else>
          Download and extract the binary from the tool repository
          <a href="https://github.com/EventStore/es-gencert-cli/releases" target="_blank">Releases</a> page.
          <div v-show="form.os === 'macos'">
            <br>
            On macOS you will get a warning that the binary is not trusted. You will have to run the tool from
            Finder once. Right click on the <code>es-gencert-cli</code> binary and choose <code>Open</code>.
            Then, choose <code>Open</code> again in the warning window. The tool will run once in the terminal window.
            From that moment on you will be run the tool using the command line.
          </div>
        </div>

        <br>
        In the directory where you'll be running the tool, create a <code>certs</code> subdirectory.
        <prism language="bash">mkdir certs</prism>

        <ElDivider content-position="right">Generate the CA certificate</ElDivider>
        <p></p>
        Then, generate the CA certificate, which you'd need to trust for each of the nodes:<br><br>
        <prism language="bash">{{ config.caGenCmd }}</prism>
        By default, the tool will create the <code>ca</code> directory in the <code>certs</code> directory you created
        earlier and add two files there:
        <p></p><code>ca.crt</code> and <code>ca.key</code>.

        <ElDivider content-position="right">Generate certificates for nodes</ElDivider>

        You need to generate certificates signed by the CA for each node as described below.

        <NodeCertificate
                v-for="node in config.nodes"
                :key="`node-${node.index}`"
                :node-config="node"
        />

        <ElDivider content-position="right">Copy files to servers</ElDivider>
        You will need to copy the <code>ca.crt</code> file to each node to <code>{{ config.caDir }}</code>.

        <p></p>
        In addition, you need to copy the certificate and the key for each node to the
        machine of the node. Both files (<code>node.crt</code> and <code>node.key</code>)
        need to be placed in the <code>{{ config.certDir }}</code> directory of the server.

        <div v-show="config.isLinux">
          <ElDivider content-position="right">Permissions</ElDivider>
          Remember that all certificate files should have restrictive rights, otherwise the OS won't allow using them.
          Usually, you'd need to change rights for each certificate file to prevent the "permissions are too open"
          error.
          You can do it by running the following command:
          <prism language="bash">chmod 600 [file]</prism>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ElForm from "element-ui/lib/form";
import ElFormItem from "element-ui/lib/form-item";
import ElDivider from "element-ui/lib/divider";
import ElRadioGroup from "element-ui/lib/radio-group";
import ElRadioButton from "element-ui/lib/radio-button";

import SingleColumnRow from "../form/SingleColumnRow";
import CertCn from "../security/CertCn";
import CertSan from "../security/CertSan";
import certificates from "../../calc/certificates";
import NodeCertificate from "./NodeCertificate";

export default {
    name:       "Certificates",
    components: {NodeCertificate, CertCn, CertSan, SingleColumnRow,
    ElDivider, ElForm, ElRadioGroup, ElRadioButton, ElFormItem},
    props:      {
        directories: Object,
        topology:    Object,
        client:      Object
    },
    data() {
        return {
            form: {
                os: "linux"
            }
        }
    },
    computed: {
        config() {
            return certificates(this.form.os);
        }
    },
}
</script>

<style lang="scss">
h3 {
  padding-bottom: 0;
  padding-top: 1rem;
}

h4 {
  padding-bottom: 0;
  padding-top: 0.3rem;
}
</style>
