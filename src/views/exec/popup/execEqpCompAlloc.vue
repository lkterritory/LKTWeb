<!-----------------------------------------------------------------------------
 | title: 설비 강제할당
 | creator: jhg
 | date : 2023-04-04
 | description: execEqpCompAlloc Popup
 | composition:
 |  <template />
 |  <script />
 |  <style />
 ----------------------------------------------------------------------------->
<template>
  <v-dialog
    width="70%"
    v-model="actDialog"
    class="modal-popup"
    scrollable>
    <v-card class="modal-content">
      <v-toolbar
        class="top-tool-bar"
        density="compact">
        <v-toolbar-title tag="span">{{
          $t("wcs.exec.popup.execEqpCompAlloc.title")
        }}</v-toolbar-title>
      </v-toolbar>

      <v-row
        class="px-5"
        style="visibility: hidden">
        <!-----------------------------------------------------------------------
        | SearchBox
        ----------------------------------------------------------------------->
        <v-col cols="12">
          <v-card
            class="modal-form bg-primary-form border-color d-flex justify-start align-center"
            variant="outlined"
            rounded="lg">
            <v-row class="h-auto w-100 pa-0 ma-0">
              <!-----------------------------------------------------------------------
              | 검색조건 영역 시작
              ----------------------------------------------------------------------->
              <v-col>
                <v-row class="d-flex justify-start align-center">
                  <v-col cols="4">
                    <div class="modal-item rounded-lg">
                      <!-- 설비 -->
                      <v-select
                        :class="[
                          `selector`,
                          filterQuerySelect.eqp ? `selected-item` : ``
                        ]"
                        v-model="filterQuerySelect.eqp"
                        :items="commonData.eqp"
                        item-title="text"
                        item-value="value"
                        variant="plain"
                        hide-details="false"
                        required
                        clearable
                        :placeholder="
                          this.$t(
                            `wcs.exec.popup.execEqpCompAlloc.eqpPlaceholder`
                          )
                        "
                        @update:modelValue="changeValues()">
                      </v-select>
                    </div>
                  </v-col>
                  <v-col cols="3">
                    <div class="modal-item rounded-lg">
                      <!-- 상품 유형 -->
                      <v-select
                        :class="[
                          `selector`,
                          filterQuerySelect.heterogeneous ? `selected-item` : ``
                        ]"
                        v-model="filterQuerySelect.heterogeneous"
                        :items="commonData.heterogeneous"
                        item-title="text"
                        item-value="value"
                        variant="plain"
                        hide-details="false"
                        required
                        clearable
                        :placeholder="
                          this.$t(
                            `wcs.exec.popup.execEqpCompAlloc.heterogeneousPlaceholder`
                          )
                        "
                        @update:modelValue="changeValues()">
                      </v-select>
                    </div>
                  </v-col>
                  <v-col cols="auto">
                    <div class="modal-item rounded-lg">
                      <v-responsive width="220">
                        <v-text-field
                          v-model="filterQuery.skuCode"
                          type="input"
                          variant="plain"
                          hide-details="false"
                          :placeholder="
                            this.$t(
                              `wcs.exec.popup.execEqpCompAlloc.skuPlaceholder`
                            )
                          "
                          clearable
                          solo
                          maxLength="12"
                          @keyup.enter="changeValues()">
                        </v-text-field>
                      </v-responsive>
                    </div>
                  </v-col>

                  <v-col cols="auto">
                    <div class="modal-item rounded-lg">
                      <v-responsive width="180">
                        <!-- PCS수량 -->
                        <v-text-field
                          v-model="filterQuery.quantity"
                          type="number"
                          variant="plain"
                          hide-details="false"
                          :placeholder="
                            this.$t(
                              `wcs.exec.popup.execEqpCompAlloc.pcsPlaceholder`
                            )
                          "
                          clearable
                          solo
                          maxLength="12"
                          @keyup.enter="changeValues()">
                        </v-text-field>
                      </v-responsive>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
              <!-----------------------------------------------------------------------
              | 검색조건 영역 끝
              ----------------------------------------------------------------------->
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row
        class="px-8"
        v-if="false">
        <v-checkbox-btn
          :color="isSelectedSome ? 'indigo-darken-4' : undefined"
          :indeterminate="isSelectedSome && !isSelectedAll"
          :model-value="isSelectedAll"
          @click="toggle"
          :label="$t(`common.selectedAll`)"></v-checkbox-btn>
      </v-row>
      <v-row class="inner-content mt-0 px-5">
        <!-----------------------------------------------------------------------
      | Main
      ----------------------------------------------------------------------->
        <v-col
          cols="7"
          class="grid h-100">
          <Framework-table
            ref="form0"
            :headers="form0.headers"
            :items="form0.items"
            :current-page="form0.pagination.currentPage"
            :rows-per-page="20"
            :selected="form0.itemsSelected"
            @click-row="rowClick0"
            hasC />
        </v-col>
        <v-col
          cols="5"
          class="grid h-100">
          <Framework-table
            ref="form1"
            :headers="form1.headers"
            :items="form1.items"
            :current-page="form1.pagination.currentPage"
            :rows-per-page="20"
            :selected="form1.itemsSelected"
            :loading="!isAllocSttus"
            @click-row="rowClick1" />
        </v-col>
      </v-row>
      <v-row class="modal-form px-5 pb-5">
        <!-----------------------------------------------------------------------
        | 버튼 영역 시작
        ----------------------------------------------------------------------->
        <v-col
          class="d-flex justify-end align-center"
          cols="12">
          <v-hover>
            <template v-slot:default="{isHovering, props}">
              <v-btn
                v-bind="props"
                :class="[
                  isHovering
                    ? `bg-primary-btn`
                    : `bg-surface-btn text-surface-text`,
                  `btn-border-color`,
                  `font-weight-regular`
                ]"
                rounded="lg"
                variant="outlined"
                @click="btnAlloc"
                :disabled="
                  !this.form0.itemsSelected.length ||
                  !this.form1.itemsSelected.length
                ">
                <!-- 할당 -->
                {{ this.$t("wcs.exec.popup.execEqpCompAlloc.alloc") }}
              </v-btn>
            </template>
          </v-hover>
          <v-hover>
            <template v-slot:default="{isHovering, props}">
              <v-btn
                v-bind="props"
                :class="[
                  isHovering
                    ? `bg-primary-btn`
                    : `bg-surface-btn text-surface-text`,
                  `btn-border-color`,
                  `font-weight-regular`
                ]"
                rounded="lg"
                variant="outlined"
                @click="closeDialog(isOpen)">
                <!-- 닫기 -->
                {{ this.$t("common.close") }}
              </v-btn>
            </template>
          </v-hover>
        </v-col>
        <!-----------------------------------------------------------------------
        | 버튼 영역 끝
        ----------------------------------------------------------------------->
      </v-row>
    </v-card>
  </v-dialog>
</template>
<script>
import {mapGetters} from "vuex";
import * as filters from "@/filters";
import * as execOrd from "@/api/exec/execOrd";
import * as mastApi from "@/api/mast/mastApi";
import editGrid from "@/mixins/editGrid";
import common from "@/utils/common";
import dayjs from "dayjs";

export default {
  name: "execEqpCompAlloc",
  // 추가 components (별도의 모듈 추가)
  mixins: [editGrid],
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
    },
    isSelectedSome() {
      return this.form0.itemsSelected.length > 0;
    },
    isSelectedAll() {
      return this.form0.items.length === this.form0.itemsSelected.length;
    }
  },
  watch: {
    isOpen(value) {
      if (value) {
        this.initData();
      }
    },
    form0: {
      handler(val) {
        this.isAllocSttus =
          val.itemsSelected && val.itemsSelected.length ? true : false;
        if (!this.isAllocSttus) {
          // 선택한 설비 없을 시 form1 selected clear
          this.form1.itemsSelected = [];
        }
      },
      deep: true
    }
  },
  // 데이터(이 페이지에서 사용할 변수)
  data() {
    return {
      isAllocSttus: false,
      commonData: {
        eqp: [],
        heterogeneous: []
      },
      filterQuerySelect: {
        eqp: "",
        heterogeneous: ""
      },
      filterQuery: {
        skuCode: "", // 상품코드 인풋
        quantity: 0 // PCS 수량
      },
      form0: {
        valid: true,
        itemsSelected: [], // checkbox response data
        loading: true,
        headers: [
          {
            text: this.$t("wcs.exec.popup.execEqpCompAlloc.facilitiesType"), // 설비종류
            value: "facilitiesType",
            align: "left",
            width: 150,
            sortable: true,
            editOptions: {
              type: "input",
              formatter: () => {}
            },
            filter: true
          },
          {
            text: this.$t("wcs.common.skuCode"), // 상품코드
            value: "skuCode",
            align: "left",
            width: 160,
            sortable: true,
            filter: true
          },
          {
            text: this.$t("wcs.common.skuName"), // 상품명
            value: "skuName",
            align: "left",
            width: "auto",
            sortable: true,
            filter: true
          },
          {
            text: this.$t(
              "wcs.exec.popup.execEqpCompAlloc.totalPlanOrderCount"
            ), // 예정주문
            value: "totalPlanOrderCount",
            align: "right",
            width: 110,
            sortable: true,
            formatter: (value) => {
              return filters.toThousandFilter(value);
            },
            filter: true
          },
          {
            text: this.$t("wcs.exec.popup.execEqpCompAlloc.totalPlanQuantity"), // 예정 PCS
            value: "totalPlanQuantity",
            align: "right",
            width: 110,
            sortable: true,
            formatter: (value) => {
              return filters.toThousandFilter(value);
            },
            filter: true
          }
        ],
        items: [],
        // pagination template
        pagination: {
          total: 15,
          currentPage: 1,
          pageSize: 50
        }
      },
      form1: {
        valid: true,
        itemsSelected: [], // checkbox response data
        loading: true,
        headers: [
          {
            text: this.$t("wcs.exec.popup.execEqpCompAlloc.facilitiesType"), // 설비종류
            value: "facilitiesType",
            align: "left",
            width: "auto",
            sortable: true
          },
          {
            text: this.$t(
              "wcs.exec.popup.execEqpCompAlloc.totalPlanOrderCount"
            ), // 예정주문
            value: "totalPlanOrderCount",
            align: "right",
            width: 150,
            sortable: true,
            formatter: (value) => {
              return filters.toThousandFilter(value);
            }
          },
          {
            text: this.$t("wcs.exec.popup.execEqpCompAlloc.totalPlanQuantity"), // 예정 PCS
            value: "totalPlanQuantity",
            align: "right",
            width: 150,
            sortable: true,
            formatter: (value) => {
              return filters.toThousandFilter(value);
            }
          }
        ],
        items: [],
        // pagination template
        pagination: {
          total: 15,
          currentPage: 1,
          pageSize: 50
        }
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    /**************************************************************************
     * 전체 선택 체크박스 클릭 이벤트
     *
     * @param
     **************************************************************************/
    toggle(event) {
      if (this.isSelectedAll) {
        this.form0.itemsSelected = [];
      } else {
        this.form0.itemsSelected = common.deepCopyObject(this.form0.items);
      }
    },
    async initGrid() {
      await this.$nextTick();
      this.$refs.form0.clearFocus();
      this.$refs.form1.clearFocus();
    },
    initSearchFilter() {
      this.filterQuerySelect.eqp = "";
      this.filterQuerySelect.heterogeneous = "";
      this.filterQuery.skuCode = "";
      this.filterQuery.quantity = "";
    },
    /**************************************************************************
     * 설비 목록 조회
     *
     * @param
     **************************************************************************/
    async selectFacilitiesCode() {
      const query = {
        lktHeader: {
          type: "REQUEST",
          call: "PAGE.MASTER.CODE.VALUE.GET",
          status: 0,
          message: "",
          encryption: "",
          centerCode: this.userInfo.centerCode,
          clientCode: this.userInfo.clientCode,
          warehouseCode: this.userInfo.warehouseCode
        },
        lktBody: [
          {
            value: "FACILITIES_CODE"
          }
        ]
      };

      try {
        this.$store.commit("app/SET_LOADING", {loading: true});

        const res = await mastApi.selectMastValue({
          id: common.encodeBase64(query)
        });

        if (res.lktBody) {
          this.commonData.eqp = res.lktBody.map((d) => {
            return {text: d.masterNameValue, value: d.masterCodeValue};
          });
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
    /**************************************************************************
     * 상품 유형 조회
     *
     * @param
     **************************************************************************/
    async selectSkuType() {
      const query = {
        lktHeader: {
          type: "REQUEST",
          call: "PAGE.MASTER.CODE.VALUE.GET",
          status: 0,
          message: "",
          encryption: "",
          centerCode: this.userInfo.centerCode,
          clientCode: this.userInfo.clientCode,
          warehouseCode: this.userInfo.warehouseCode
        },
        lktBody: [
          {
            value: "SKU_TYPE"
          }
        ]
      };

      try {
        this.$store.commit("app/SET_LOADING", {loading: true});

        const res = await mastApi.selectMastValue({
          id: common.encodeBase64(query)
        });
        if (res.lktBody) {
          this.commonData.heterogeneous = res.lktBody.map((d) => {
            return {text: d.masterNameValue, value: d.masterCodeValue};
          });
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
    /**************************************************************************
     * 현재 팝업을 닫을 시 Parent로 전달하는 이벤트
     *
     * @param {Boolean} dialog Close status
     **************************************************************************/
    closeDialog(dialog) {
      this.initGrid();
      this.initSearchFilter();
      this.$emit("close", dialog);
    },
    /**************************************************************************
     * 팝업 Open시 이벤트
     *
     * @param {Boolean} dialog Close status
     **************************************************************************/
    initData() {
      this.initGrid();
      this.initSearchFilter();
      this.isAllocSttus = false;
      // 설비 목록 조회
      this.selectFacilitiesCode();
      // 상품 유형 조회
      this.selectSkuType();
      // 작업자 강제 할당 조회
      this.selectWorkAlloc();
    },
    changeValues() {
      this.initGrid();
      this.isAllocSttus = false;

      this.selectWorkAlloc();
    },
    /**************************************************************************
     * 로우 클릭 0 function
     *
     * @param {Object} row Grid Row Object
     **************************************************************************/
    rowClick0(row) {},
    /**************************************************************************
     * 작업지시 리스트 조회
     *
     * @param
     **************************************************************************/
    async selectWorkAlloc() {
      const query = {
        lktHeader: {
          type: "REQUEST",
          call: "PAGE.WORK.ORDERS.MANAGER.GET",
          status: 0,
          message: "",
          encryption: "",
          centerCode: this.userInfo.centerCode,
          clientCode: this.userInfo.clientCode,
          warehouseCode: this.userInfo.warehouseCode,
          userId: this.userInfo.userId
        },
        lktBody: [
          {
            workDate: this.param.workDate,
            workBatch: this.param.workBatch,
            facilitiesType: this.filterQuerySelect.eqp || "",
            skuCode: this.filterQuery.skuCode || "",
            skuType: this.filterQuerySelect.heterogeneous || "",
            quantity: this.filterQuery.quantity || 0
          }
        ]
      };

      try {
        this.$store.commit("app/SET_LOADING", {loading: true});

        const res = await execOrd.selectWorkAlloc({
          id: common.encodeBase64(query)
        });
        if (res.lktBody) {
          if (res.lktBody.sksus)
            this.form0.items = this.egInitRows(res.lktBody.sksus) || [];
          if (res.lktBody.facilities)
            this.form1.items = this.egInitRows(res.lktBody.facilities) || [];
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
    /**************************************************************************
     * 로우 클릭 1 function
     *
     * @param {Object} row Grid Row Object
     **************************************************************************/
    rowClick1(row) {},
    /**************************************************************************
     * Click "할당" button
     **************************************************************************/
    async btnAlloc() {
      if (
        !this.form0.itemsSelected.length ||
        !this.form1.itemsSelected.length
      ) {
        this.$alert({
          type: "error",
          title: this.$t("wcs.common.alertTitle.saveFail"),
          message: this.$t("wcs.exec.popup.execEqpCompAlloc.allocRequired") // 할당 행을 선택해 주세요.
        });
        return false;
      }

      this.$confirm({
        title: "",
        message: this.$t("wcs.exec.popup.execEqpCompAlloc.allocQuestion"), // 할당 하시겠습니까?
        show: true,
        type: "normal"
      })
        .then(async () => {
          try {
            // 저장 API
            this.save();
          } catch (e) {
            console.log(e);
          }
        })
        .catch((err) => {});
    },
    /**************************************************************************
     * Save Api
     **************************************************************************/
    async save() {
      let lktBody = this.form0.itemsSelected.map((d) => {
        return {
          workDate: this.param.workDate,
          workBatch: this.param.workBatch,
          skuCode: d.skuCode,
          facilitiesType: this.form1.itemsSelected[0].facilitiesType
        };
      });

      const query = {
        lktHeader: {
          type: "REQUEST",
          call: "PAGE.WORK.ORDERS.MANAGER.GET",
          status: 0,
          message: "",
          encryption: "",
          centerCode: this.userInfo.centerCode,
          clientCode: this.userInfo.clientCode,
          warehouseCode: this.userInfo.warehouseCode,
          userId: this.userInfo.userId
        },
        lktBody: lktBody
      };

      try {
        this.$store.commit("app/SET_LOADING", {loading: true});

        const res = await execOrd.updWorkAlloc(query);
        if (res.lktHeader.status === "01") {
          this.$emit("save");
          this.closeDialog(this.isOpen);
        } else {
          this.$alert({
            title: this.$t(
              "wcs.exec.popup.execEqpCompAlloc.updWorkAllocFailTitle"
            ), // 설비 강제 할당 실패
            message: res.lktHeader.message
          });
        }
      } catch (e) {
        if (e.message) {
          e.message.title = this.$t("wcs.common.alertTitle.saveFail");
          this.$alert(e.message);
        }
      } finally {
        this.$store.commit("app/SET_LOADING", {loading: false});
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-content {
  overflow: hidden !important;
}
// 화면 내에서 별도로 그리드 height 를 지정해야 할때 사용
.grid::v-deep .vue3-easy-data-table__main {
  height: calc(100vh - 500px) !important;
}

::v-deep.selector:not(.selected-item) {
  input {
    opacity: 1 !important;
    height: 75%;
  }
}
::v-deep.selector.selected-item > input {
  opacity: 0 !important;
}
</style>
