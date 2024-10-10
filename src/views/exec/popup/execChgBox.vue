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
        <v-toolbar-title tag="span">
          <!-- 박스변경 -->
          {{ $t("wcs.exec.popup.execChgBox.title") }}
        </v-toolbar-title>
      </v-toolbar>
      <v-container>
        <v-form
          ref="form0"
          v-model="form0.valid"
          lazy-validation
          class="modal-form"
          @submit.prevent>
          <v-row class="d-flex justify-start align-center">
            <v-col cols="12">
              <div class="modal-item rounded-lg">
                <v-text-field
                  type="input"
                  v-model="form0.data.cellCode"
                  variant="plain"
                  hide-details="false"
                  placeholder="Cell"
                  required
                  clearable
                  solo
                  maxLength="10"
                  :disabled="true"
                  @keyup.enter="btnSave()">
                  <template v-slot:prepend>
                    <v-label class="modal-item-divider labels">Cell</v-label>
                  </template>
                </v-text-field>
              </div>
            </v-col>
          </v-row>
          <v-row class="d-flex justify-start align-center">
            <v-col cols="12">
              <div class="modal-item rounded-lg">
                <v-text-field
                  type="input"
                  v-model="form0.data.orderNumber"
                  variant="plain"
                  hide-details="false"
                  :placeholder="this.$t(`wcs.common.orderNumber`)"
                  required
                  clearable
                  solo
                  maxLength="10"
                  :disabled="true"
                  @keyup.enter="btnSave()">
                  <template v-slot:prepend>
                    <v-label class="modal-item-divider labels">
                      <!-- 주문번호 -->
                      {{ $t("wcs.common.orderNumber") }}
                    </v-label>
                  </template>
                </v-text-field>
              </div>
            </v-col>
          </v-row>
          <v-row class="d-flex justify-start align-center">
            <v-col cols="12">
              <div class="modal-item rounded-lg">
                <v-text-field
                  type="input"
                  ref="objectCode"
                  v-model="form0.data.objectCode"
                  variant="plain"
                  hide-details="false"
                  :placeholder="this.$t(`wcs.exec.popup.execChgBox.objectCode`)"
                  required
                  clearable
                  solo
                  maxLength="10"
                  autofocus
                  :rules="rules.objectCode"
                  @keyup.enter="btnSave()">
                  <template v-slot:prepend>
                    <v-label class="modal-item-divider labels"
                      ><!-- 토트박스 -->
                      {{ $t("wcs.exec.popup.execChgBox.objectCode") }}
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
          {{ $t("common.cancelButton") }}
        </v-btn>
        <v-btn
          class="v-col-6 btn-loader excute-btn"
          :loading="dataLoading"
          :disabled="dataLoading"
          @click="btnSave()">
          <!-- 저장 -->
          {{ $t("common.excute") }}
        </v-btn>
      </v-footer>
    </v-card>
  </v-dialog>
</template>
<script>
import {mapGetters} from "vuex";
import * as filters from "@/filters";
import common from "@/utils/common";
import * as execErrorSuit from "@/api/exec/execErrorSuit.js";

export default {
  name: "execChgBox",
  // 추가 components (별도의 모듈 추가)
  components: {},
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
        this.initData();
      }
    }
  },
  // 데이터(이 페이지에서 사용할 변수)
  data() {
    return {
      isDialog: false,
      dataLoading: false,

      form0: {
        valid: true,
        data: {
          objectCode: "", // 도트박스
          orderNumber: "", // 주문번호
          cellCode: "" // 셀코드
        }
      },
      rules: {
        objectCode: [
          (v) => !!v || this.$t("wcs.common.validate.required", ["토트박스"])
        ]
      }
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
      this.clearForm();
      this.$emit("close", dialog);
    },
    clearForm() {
      this.form0.data.objectCode = "";
      this.form0.data.orderNumber = "";
      this.form0.data.cellCode = "";
    },
    /**************************************************************************
     * 현재 팝업을 닫을 시 Parent로 전달하는 이벤트
     *
     * @param {Boolean} dialog Close status
     **************************************************************************/
    initData() {
      if (this.param) {
        // 데이터 바인딩
        this.form0.data.cellCode = this.param.cellCode;
        this.form0.data.orderNumber = this.param.orderNumber;
        this.form0.data.objectCode = "";
      }

      setTimeout(() => {
        this.$refs.objectCode.$el.querySelector("input").select();
      }, 200);
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
          title: this.$t("wcs.common.alertTitle.saveFail"),
          message: errorMessage
        });
      }

      return valid;
    },
    /**************************************************************************
     * Click Save button
     **************************************************************************/
    async btnSave() {
      const valid = await this.validate();
      if (valid) {
        // this.$confirm({
        //   title: "",
        //   message: this.$t("common.confirmMessage"), // 저장 하시겠습니까?
        //   show: true,
        //   type: "normal"
        // })
        //   .then(async () => {
        //     try {
        // 저장 API
        this.save();
        //   } catch (e) {
        //     console.log(e);
        //   }
        // })
        // .catch((err) => {});
      }
    },
    /**************************************************************************
     * Save Api
     **************************************************************************/
    async save() {
      try {
        const query = {
          lktHeader: {
            type: "REQUEST",
            call: "PAGE.TALLY.OBJBOX.PUT",
            status: 0,
            message: "",
            encryption: "",
            centerCode: this.userInfo.centerCode,
            clientCode: this.userInfo.clientCode,
            warehouseCode: this.userInfo.warehouseCode
          },
          lktBody: [
            {
              orderNumber: this.form0.data.orderNumber,
              objCode: this.form0.data.objectCode,
              barCode: this.form0.data.cellCode // ???
            }
          ]
        };

        this.dataLoading = true;
        this.$store.commit("app/SET_LOADING", {loading: true});

        const res = await execErrorSuit.modiBoxChange(query);

        if (res.lktHeader.status === "01") {
          this.$emit("save");
          this.closeDialog(this.isOpen);
        }
      } catch (e) {
        if (e.message) {
          e.message.title = this.$t("wcs.common.alertTitle.saveFail");
          this.$alert(e.message);
        } else {
          this.$alert({
            title: this.$t("wcs.common.alertTitle.saveFail"),
            message: this.$t("common.searchFailedDetail")
          });
        }
      } finally {
        this.dataLoading = false;
        this.$store.commit("app/SET_LOADING", {loading: false});
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-form {
  .labels {
    width: 100px;
  }
}
</style>
