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
            <!-- 상품명 -->
            <v-col cols="12">
              <div class="modal-item rounded-lg">
                <v-text-field
                  type="input"
                  v-model="this.filterQuery.orderNumber"
                  variant="plain"
                  hide-details="false"
                  autofocus
                  @keypress.enter="save()"
                  @keypress.enter.prevent
                  clearable
                  solo
                  :placeholder="this.$t('wcs.exec.execOrdStatus.searchItem')">
                  <template v-slot:prepend>
                    <v-label class="modal-item-divider labels">
                      {{ $t("wcs.common.orderNumber") }}
                    </v-label>
                  </template>
                </v-text-field>
              </div>
            </v-col>
            <!-- 상품명 -->
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
import dayjs from "dayjs";
import common from "@/utils/common";
import * as execOrdStatus from "@/api/exec/execOrdStatus.js";

export default {
  name: "execOrdStatusReg",
  // 추가 components (별도의 모듈 추가)
  components: {},
  mixins: [editGrid],
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    pWorkDate: {
      type: [Date, String],
      required: false
    },
    pWorkBatch: {
      type: Array,
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
      commonData: {},
      filterQuery: {
        workDate: dayjs().format("YYYY-MM-DD"),
        orderNumber: ""
      },
      isDialog: false,
      dataLoading: false,
      form0: {
        valid: true
      },
      itemNm: ""
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
      this.filterQuery.orderNumber = "";
    },
    /**************************************************************************
     * Form Validation Chechk
     **************************************************************************/
    // async validate() {
    //   const {valid} = await this.$refs.form0.validate();

    //   return valid;
    // },
    async save() {
      this.filterQuery.workDate = this.pWorkDate;

      let lktBody = [];
      let format = "YYYY-MM-DD";

      lktBody.push({
        workDate: dayjs(this.filterQuery.workDate).format(format),
        orderNumber: this.filterQuery.orderNumber
      });

      const query = {
        lktHeader: {
          type: "REQUEST",
          call: "PAGE.PSO.GET",
          status: 0,
          message: "",
          encryption: "",
          centerCode: this.userInfo.centerCode,
          clientCode: this.userInfo.clientCode,
          warehouseCode: this.userInfo.warehouseCode
        },
        lktBody: lktBody
      };

      try {
        this.$store.commit("app/SET_LOADING", {loading: true});

        const res = await execOrdStatus.searchExecOrd({
          id: common.encodeBase64(query)
        });

        if (res.lktBody) {
          this.$emit("sendData", this.getForm0Data(res.lktBody));
          this.closeDialog(this.isOpen);
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
      }
    },
    getForm0Data(lktBody) {
      // 선택한 작업차수가 없다면 전체 데이터 조회
      if (this.pWorkBatch.length <= 0) {
        return lktBody;
      }

      // 선택한 작업차수의 데이터만 조회
      if (lktBody.length > 0) {
        return lktBody.filter((d) => {
          return this.pWorkBatch.includes(d.workBatch);
        });
      }

      return [];
    }
  }
  // }
};
</script>

<style lang="scss" scoped>
.modal-form {
  .labels {
    width: 130px;
  }
}
.detail-search-item-divider
  > ::v-deep
  .v-input__prepend
  > .search-item-divider {
  width: 130px !important;
}
::v-deep .v-img {
  display: none !important;
}
</style>
