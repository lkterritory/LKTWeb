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
        <v-toolbar-title tag="span">{{
          $t("common.detailSearch")
        }}</v-toolbar-title>
      </v-toolbar>
      <v-container>
        <v-form
          ref="form0"
          v-model="form0.valid"
          lazy-validation
          class="modal-form"
          @submit.prevent>
          <v-row class="d-flex justify-start align-center">
            <!-- ttt -->
            <v-col cols="12">
              <div class="modal-item rounded-lg">
                <v-text-field
                  type="input"
                  v-model="workDate"
                  variant="plain"
                  hide-details="false"
                  clearable
                  solo
                  maxLength="12">
                  <template v-slot:prepend>
                    <v-label class="modal-item-divider labels"> 조건1 </v-label>
                  </template>
                </v-text-field>
              </div>
            </v-col>
            <v-col cols="12">
              <div class="modal-item rounded-lg">
                <v-text-field
                  type="input"
                  v-model="workBatch"
                  variant="plain"
                  hide-details="false"
                  clearable
                  solo
                  maxLength="12">
                  <template v-slot:prepend>
                    <v-label class="modal-item-divider labels"> 조건2 </v-label>
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
import * as execOrd from "@/api/exec/execOrd.js";

export default {
  name: "execOrdReg",
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
      isDialog: false,
      dataLoading: false,
      form0: {
        valid: true
      },
      workDate: "",
      workBatch: ""
      // rules: {
      //   req: [
      //     (v) =>
      //       !!v ||
      //       this.$t("wcs.common.validate.required", [this.$t("wcs.euc.req")])
      //     // (v) =>
      //     //   (v && v.length < 10) ||
      //     //   this.$t("wcs.common.validate.maxLength", [
      //     //     this.$t("wcs.euc.req"),
      //     //     10
      //     //   ])
      //   ]
      // }
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
      this.dataLoading = !this.dataLoading;
    },
    /**************************************************************************
     * Form Validation Chechk
     **************************************************************************/
    // async validate() {
    //   const {valid} = await this.$refs.form0.validate();

    //   return valid;
    // },
    async save() {
      try {
        this.$store.commit("app/SET_LOADING", {loading: true});
        // const valid = common.validation(this.form0, this.form0.rules);
        const query = {
          lktHeader: {
            type: "REQUEST",
            call: "PAGE.WORK.GET",
            status: 0,
            message: "",
            encryption: "",
            centerCode: this.userInfo.centerCode,
            clientCode: this.userInfo.clientCode,
            warehouseCode: this.userInfo.warehouseCode
          },
          lktBody: [
            {
              workDate: this.workDate,
              workBatch: this.workBatch
            }
          ]
        };
        try {
          const res = await execOrd.searchExecOrdList({
            id: common.encodeBase64(query)
          });
          if (res.lktBody) {
            this.$emit("sendData", res.lktBody);
            this.closeDialog(this.isOpen);
          }
        } catch (e) {
          if (e.message)
            e.message.title = this.$t("wcs.common.alertTitle.saveFail");
          this.$alert(e.message);
        } finally {
          this.$store.commit("app/SET_LOADING", {loading: false});
          this.closeDialog(this.isOpen);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
  // }
};
</script>

<style lang="scss" scoped></style>
