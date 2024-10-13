<template>
  <v-dialog
    width="40%"
    v-model="actDialog"
    class="modal-popup"
    scrollable>
    <v-card>
      <v-toolbar
        class="top-tool-bar"
        density="compact">
        <v-toolbar-title tag="span">{{ this.param.macroName }}</v-toolbar-title>
      </v-toolbar>
      <v-container>
        <v-form
          ref="form0"
          v-model="form0.valid"
          lazy-validation
          class="modal-form"
          @submit.prevent>
          <v-row
            class="d-flex justify-start align-center"
            v-for="(items, index) in this.form0.data.list"
            :key="index">
            <v-col cols="12">
              <div class="modal-item rounded-lg">
                <v-text-field
                  type="input"
                  :id="'seq' + index"
                  v-model="items.reqItem"
                  variant="plain"
                  hide-details="false"
                  :rules="rules[items.parameterCode]"
                  clearable
                  solo
                  maxLength="12"
                  autofocus
                  @keyup.enter="save"
                  @click="selectReq(items)"
                  :disabled="this.isModify">
                  <template v-slot:prepend>
                    <v-label class="modal-item-divider labels">
                      {{ items.parameterName }}
                    </v-label>
                  </template>
                </v-text-field>
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
      <v-footer class="grp-btn">
        <v-spacer></v-spacer>
        <v-btn
          class="v-col-6 btn-loader cancel-btn"
          :loading="dataLoading"
          :disabled="dataLoading"
          @click="closeDialog(isOpen)">
          <!-- 닫기 -->
          {{ $t("common.cancelButton") }}
        </v-btn>
        <v-btn
          class="v-col-6 btn-loader excute-btn"
          :loading="dataLoading"
          :disabled="dataLoading"
          @click="save()">
          <!-- 저장 -->
          {{ $t("common.excute") }}
        </v-btn>
      </v-footer>
    </v-card>
  </v-dialog>
</template>
<script>
import {mapGetters} from "vuex";
import editGrid from "@/mixins/editGrid";
import * as filters from "@/filters";
import common from "@/utils/common";
import * as execReport from "@/api/exec/execReport.js";

export default {
  name: "execReportReg",
  // 추가 components (별도의 모듈 추가)
  components: {},
  mixins: [editGrid],
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    param: {
      type: Object,
      required: false
    }
  },
  // 반복적으로 연산되는 데이터 처리(state, complex data 등)
  computed: {
    ...mapGetters(["userInfo"]),
    // 다이얼로그 Close
    actDialog() {
      return this.isOpen;
    }
  },
  watch: {
    isOpen(value) {
      if (value) {
        this.dataLoading = value;
        this.initData();
      }
    }
  },
  // 데이터(이 페이지에서 사용할 변수)
  data() {
    return {
      isModify: false,
      isDialog: false,
      dataLoading: false,
      form0: {
        valid: true,
        data: {
          selectReqCode: "",
          list: []
        }
      },
      rules: {}
    };
  },
  created() {},
  mounted() {},
  methods: {
    /**************************************************************************
     * 현재 팝업을 닫을 시 Parent로 전달하는 이벤트
     *
     * @param {Boolean} dialog Close status
     **************************************************************************/
    closeDialog(dialog) {
      this.$emit("close", dialog);
    },
    /**************************************************************************
     * 현재 팝업을 닫을 시 Parent로 전달하는 이벤트
     *
     * @param {Boolean} dialog Close status
     **************************************************************************/
    initData() {
      this.form0.data.list = [];
      var transItems = [];
      let rules = {};

      for (var i = 0; i < this.param.parameters.length; i++) {
        transItems.push(Object.assign({}, this.param.parameters[i]));
      }

      if (this.param) {
        // 수정 팝업 일때 데이터 바인딩
        for (var i = 0; i < transItems.length; i++) {
          this.form0.data.list.push(transItems[i]);
          const parameterName = transItems[i].parameterName;

          const rule = {
            [transItems[i].parameterCode]: [
              (v) =>
                !!v || this.$t("wcs.common.validate.required", [parameterName])
            ]
          };
          rules = {...rules, ...rule};
        }
        this.rules = rules;
      }
      this.dataLoading = !this.dataLoading;
    },
    selectReq(items) {
      this.selectReqCode = items.parameterCode;
    },
    /**************************************************************************
     * Form Validation Chechk
     **************************************************************************/
    async validate() {
      const {valid, errors} = await this.$refs.form0.validate();
      if (!valid) {
        let errorMessage = "";
        try {
          errorMessage = errors[0].errorMessages[0];
        } catch (e) {
          errorMessage = this.$t("common.contactAdmin"); // 관리자에게 문의해주세요.
        }

        this.$alert({
          type: "error",
          title: this.$t("wcs.common.alertTitle.searchFail"),
          message: errorMessage
        });
      }

      return valid;
    },
    async save() {
      // 밸리데이션 체크 하지 말라는 요청으로 주석
      // const valid = await this.validate();
      const valid = true;

      let parameters = [];
      this.form0.data.list.forEach((d) => {
        parameters.push({
          parameterCode: d.parameterCode,
          parameterValue: ["undefined", "null"].includes(typeof d.reqItem)
            ? ""
            : d.reqItem
        });
      });

      if (valid) {
        try {
          this.$store.commit("app/SET_LOADING", {loading: true});

          const query = {
            lktHeader: {
              type: "REQUEST",
              call: "PAGE.MACRO.RESULT.GET",
              status: 0,
              message: "",
              encryption: "",
              centerCode: this.userInfo.centerCode,
              clientCode: this.userInfo.clientCode,
              warehouseCode: this.userInfo.warehouseCode
            },
            lktBody: [
              {
                procedureCode: this.param.macroCode,
                parameters: parameters
              }
            ]
          };

          const res = await execReport.getExecReport({
            id: common.encodeBase64(query)
          });
          if (res.lktBody) {
            this.$emit("sendData", res);
            // if (res.lktHeader.status === "01") {
            //   this.$notify({
            //     type: "success",
            //     title: this.$t("common.info"), // 알림
            //     text: this.$t("common.successMessage"), // 정상 처리 되었습니다.
            //     duration: 3000
            //   });
            // }
          }
        } catch (e) {
          if (e.message) {
            this.$alert(e.message);
          } else {
            this.$alert({
              title: this.$t("common.searchFailed"),
              message: this.$t("common.searchFailedDetail")
            });
          }
        } finally {
          this.$store.commit("app/SET_LOADING", {loading: false});
          this.closeDialog(this.isOpen);
          this.dataLoading = false;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
// .top-tool-bar {
//   span {
//     color: #000000;
//   }
// }
// .v-toolbar__content > .v-toolbar-title {
//   margin-inline-start: 57px;
// }
// .v-btn.v-btn--density-default {
//   height: calc(var(--v-btn-height) + 25px);
// }
// .form-column {
//   height: calc(100% - 22px);
// }
// ::v-deep .v-field__input {
//   border: solid 1px #b9cae2;
// }
.modal-form {
  .labels {
    width: 145px;
  }
}
</style>
