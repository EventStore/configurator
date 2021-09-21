<template>
  <ElTabs v-model="activeTab">
    <ElTabPane label="Specification" name="spec">
      <br/>
      <span>
          Specify the configuration details in the form below, then click
          Validate and Proceed at the bottom.
        </span>

      <Platform/>

      <Directories ref="directories"/>

      <Security ref="security"/>

      <Topology ref="topology"/>

      <Client ref="client"/>

      <ElForm :model="projections" ref="projections" label-width="240px">
        <ElDivider content-position="right">Projections</ElDivider>
        <ElFormItem label="Run projections:" prop="enable">
          <ElCol :span="11">
            <ElRadioGroup v-model="projections.enable">
              <ElRadioButton label="None"></ElRadioButton>
              <ElRadioButton label="All"></ElRadioButton>
              <ElRadioButton label="System"></ElRadioButton>
            </ElRadioGroup>
          </ElCol>
          <ElCol :span="12" class="form-help">
            Enabling projections impacts performance. Read more at the
            <a target="_blank" href="https://developers.eventstore.com/server/v20/server/projections/#performance-impact">Projections</a>
            documentation page.
          </ElCol>
        </ElFormItem>
      </ElForm>

      <!-- Summary -->

      <ElDivider content-position="right">Summary</ElDivider>

      <Errors @validate="validateConfiguration" @proceed="gotoConfig"/>
    </ElTabPane>

    <ElTabPane
            label="Certificates"
            name="certs"
            :disabled="!proceed || !isSecure"
    >
      <Certificates/>

      <br/><br/>
      <ElButton @click="gotoTab('spec')">Back to specification</ElButton>
      <ElButton type="primary" @click="gotoTab('config')">
        Proceed to configuration
      </ElButton>
    </ElTabPane>

    <ElTabPane label="Configuration" name="config" :disabled="!proceed">
      <Configuration :projections="projections"/>

      <br/><br/>
      <ElButton @click="gotoTab('certs')">Back to certificates</ElButton>
      <ElButton type="primary" @click="gotoTab('client')"
      >Proceed to client connection
      </ElButton>
    </ElTabPane>

    <ElTabPane label="Client connection" name="client" :disabled="!proceed">
      <Connection>
        <ElButton @click="gotoTab('config')">Back to configuration</ElButton>
      </Connection>

    </ElTabPane>
  </ElTabs>
</template>

<script>
import Directories from "./deployment/Directories";
import Certificates from "./result/Certificates";
import Configuration from "./result/Configuration";
import Connection from "./result/Connection";
import Errors from "./Errors";
import Platform from "./deployment/Platform";
import Topology from "./deployment/Topology";
import Security from "./security/Security";
import security from "../domain/security";
import Client from "./client/Client";
import validation from "../domain/validation";

export default {
    name:       "Deployment",
    components: {
        Client,
        Topology,
        Platform,
        Directories,
        Security,
        Certificates,
        Configuration,
        Connection,
        Errors,
    },
    data() {
        return {
            projections: {
                enable: "All",
            },
            validated:   false,
            proceed:     false,
            activeTab:   "spec",
        };
    },
    computed: {
        isSecure: () => security.secure,
    },
    methods:  {
        async validateConfiguration() {
            validation.clear();
            this.$refs.directories.validate();
            this.$refs.topology.validate();
            this.$refs.security.validate();
            this.$refs.client.validate();
            this.validated = true;
        },
        gotoConfig() {
            this.proceed = true;
            this.gotoTab(this.isSecure ? "certs" : "config");
        },
        gotoTab(tab) {
            this.activeTab = tab;
        },
    },
};
</script>

<style lang="scss">
@import "../styles/slide";

.ElDivider__text.is-right {
  right: 30px !important;
  transform: translateY(-50%);
}

.ElRow {
  margin-bottom: 20px;
  height: 3.5rem;
}

.form-text {
  font-size: 16px;
}

.form-help {
  font-size: 14px;
  line-height: 18px;
  margin-left: 10px;
}

.ElDivider__text.is-right {
  right: 80px;
  transform: translateY(-50%);
}

.ElFormItem__label {
  line-height: 34px !important;
  padding-top: 4px !important;
}

.ElSwitch {
  padding-left: 20px;
  padding-top: 8px;
  line-height: 20px;
}

.ElInput-number {
  width: 110px !important;
  display: flex;
  justify-content: center;
}

.ElCol-12 {
  width: 45%;
  margin-left: 10px;
}

@media screen and (max-width: 600px) {
  .ElDivider__text.is-right {
    right: 10px;
    transform: translateY(-50%);
  }

  .ElFormItem__label {
    text-align: left;
    line-height: 20px;
    font-weight: 700;
  }

  .ElInput-number {
    width: 120px !important;
  }

  .ElFormItem__content {
    margin-left: 0 !important;
    margin-right: 5px !important;
  }

  .form-help {
    padding-top: 10px;
    padding-bottom: 20px;
  }

  .ElCol-4 {
    width: 90%;
  }

  .ElCol-10 {
    width: 90%;
    justify-content: left;
  }

  .ElCol-12 {
    width: 90%;
    margin-left: 0;
  }
}

@media screen and (max-width: 1048px) {
  .ElCol-10 {
    width: 100%;
    justify-content: left;
  }
}
</style>
