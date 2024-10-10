<!-----------------------------------------------------------------------------
 | title: 주문별작업현황
 | creator: JSW
 | date : 2023-01-31
 | description: execOrdStatus View
 | composition:
 |  <template />
 |  <script />
 |  <style />
 ----------------------------------------------------------------------------->
<template>
  <div>
    <v-row>
      <!-----------------------------------------------------------------------
        | SearchBox
        ----------------------------------------------------------------------->
      <v-col cols="12">
        <v-card
          class="search-form bg-primary-form border-color justify-start align-center"
          variant="outlined"
          rounded="lg">
          <v-row class="h-auto w-100 pa-0 ma-0">
            <!-----------------------------------------------------------------------
            | 검색조건 영역 시작
            ----------------------------------------------------------------------->
            <v-col>
              <v-row class="d-flex justify-start align-center">
                <!-- 검색 -->
                <v-col cols="auto">
                  <div class="search-item rounded-lg">
                    <v-responsive width="390">
                      <v-text-field
                        v-model="filterQuery.workDate"
                        hide-details="true"
                        variant="plain">
                        <template v-slot:prepend>
                          <v-label class="search-item-divider">
                            <v-img
                              :src="
                                require(`@/assets/images/calendar-icon.png`)
                              "></v-img
                            >&nbsp;
                            {{ $t(`wcs.common.shipDate`) }}
                          </v-label>
                        </template>
                        <template v-slot:default>
                          <Calendar
                            :startDate="new Date()"
                            format="yyyy-MM-dd"
                            :enable-time-picker="false"
                            @changeDate="
                              filterQuery.workDate = $event
                            "></Calendar>
                        </template>
                      </v-text-field>
                    </v-responsive>
                  </div>
                </v-col>
                <!-- 작업차수 -->
                <v-col cols="auto">
                  <div class="search-item rounded-lg">
                    <v-responsive width="390">
                      <MultiSelectBox
                        v-model="filterQuery.workBatch"
                        :items="commonData.workBatch"
                        icon="icon-order-number.png"
                        :title="'&nbsp; ' + $t(`wcs.common.workBatch`)">
                      </MultiSelectBox>
                    </v-responsive>
                  </div>
                </v-col>
                <!-- 작업차수 -->
                <!-- 상세검색 버튼 -->
                <v-col
                  cols="auto"
                  class="pl-0">
                  <v-hover>
                    <template v-slot:default="{isHovering, props}">
                      <v-btn
                        class="detail-search"
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
                        size="x-small"
                        @click="searchDetailItemList()">
                        +
                      </v-btn>
                    </template>
                  </v-hover>
                </v-col>
                <!-- 상세검색 버튼 -->
                <!-- 주문번호 -->
                <!-- <v-col cols="auto">
                  <div class="search-item rounded-lg">
                    <v-responsive width="390">
                      <v-text-field
                        v-model="filterQuery.orderNumber"
                        type="input"
                        variant="plain"
                        hide-details="false"
                        :placeholder="this.$t(`wcs.common.pleaseInputData`)"
                        clearable
                        solo>
                        <template v-slot:prepend>
                          <v-label class="search-item-divider">
                            <v-img
                              :src="
                                require(`@/assets/images/icon-order-number.png`)
                              "></v-img
                            >&nbsp;
                            {{ $t("wcs.common.orderNumber") }}
                          </v-label>
                        </template>
                      </v-text-field>
                    </v-responsive>
                  </div>
                </v-col> -->
                <!-- 주문번호 -->
                <!-- 검색 -->
              </v-row>
            </v-col>
            <!-----------------------------------------------------------------------
                 | 버튼 영역 시작
                ----------------------------------------------------------------------->
            <v-col
              class="d-flex justify-end align-center"
              cols="auto">
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
                    @click="searchOrdList()">
                    <!-- 조회 -->
                    {{ $t("wcs.common.search") }}
                  </v-btn>
                </template>
              </v-hover>
            </v-col>
            <!-- 버튼 -->
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="inner-content mt-0">
      <!-----------------------------------------------------------------------
        | Main
        ----------------------------------------------------------------------->
      <v-col
        cols="12"
        class="h-100 grid">
        <v-card
          class="half mb-2"
          flat>
          <Framework-table
            ref="form0"
            :headers="form0.headers"
            :items="form0.items"
            :current-page="form0.pagination.currentPage"
            :rows-per-page="10"
            :selected="form0.itemsSelected"
            @click-row="rowClick" />
        </v-card>
        <v-card
          class="half mb-2"
          flat>
          <Framework-table
            ref="form1"
            :headers="form1.headers"
            :items="form1.items"
            :current-page="form1.pagination.currentPage"
            :selected="form1.itemsSelected"
            :rows-per-page="10" />
        </v-card>
      </v-col>
    </v-row>
    <exec-ord-status-reg
      :isOpen="execOrdStatusRegObj.openPop"
      @close="execOrdStatusRegObj.openPop = false"
      @sendData="showData"
      :loading="execOrdStatusRegObj.loading"
      :pWorkDate="this.filterQuery.workDate"
      :pWorkBatch="this.filterQuery.workBatch" />
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import editGrid from "@/mixins/editGrid";
import common from "@/utils/common";
import * as filters from "@/filters";
import * as execOrdStatus from "@/api/exec/execOrdStatus.js";
import dayjs from "dayjs";
import execOrdStatusReg from "./popup/execOrdStatusReg.vue";

export default {
  name: "execOrdStatus",
  // 추가 components (별도의 모듈 추가)
  components: {execOrdStatusReg},
  // 추가 mixins (별도의 기능 추가)
  mixins: [editGrid],
  // 반복적으로 연산되는 데이터 처리(state, complex data 등)
  computed: {
    ...mapGetters(["userInfo"])
  },
  // 반복적인 렌더링이 들어가는 데이터 처리
  watch: {
    filterQuery: {
      handler(val) {
        if (!val.workDate) return;
        // 작업차수 조회
        this.getExecBatch();
      },
      deep: true
    }
  },
  // 데이터(이 페이지에서 사용할 변수)
  data() {
    return {
      execOrdStatusRegObj: {
        openPop: false,
        loading: false,
        workDate: dayjs().format("YYYY-MM-DD")
      },
      ordStatus: [],
      commonData: {
        workBatch: []
      },
      filterQuery: {
        workDate: dayjs().format("YYYY-MM-DD"),
        orderNumber: "",
        workBatch: []
      },
      form0: {
        itemsSelected: [], // checkbox response data
        headers: [
          {
            text: this.$t("wcs.common.workDate"), // 작업일자
            value: "workDate",
            align: "center",
            width: 160,
            sortable: true
          },
          {
            text: this.$t("wcs.common.workBatch"), // 차수
            value: "workBatch",
            align: "left",
            width: 150,
            sortable: true
          },
          // {
          //   text: this.$t("wcs.common.facilitiesCode"), // 설비코드
          //   value: "facilitiesCode",
          //   align: "left",
          //   width: 160,
          //   sortable: true,
          //   filter: true
          // },
          {
            text: this.$t("wcs.common.facilitiesName"), // 설비명
            value: "facilitiesName",
            align: "left",
            width: 200,
            sortable: true,
            filter: true
          },
          {
            text: this.$t("wcs.common.orderNumber"), // 주문번호
            value: "orderNumber",
            align: "left",
            width: 180,
            sortable: true,
            filter: true
          },
          {
            text: "토트박스", // 토트박스
            value: "toteBox",
            align: "left",
            width: 160,
            sortable: true,
            filter: true
          },
          {
            text: "박스번호", // 박스번호
            value: "objeBox",
            align: "left",
            width: 160,
            sortable: true,
            filter: true
          },
          {
            text: "프린트코드", // 프린트코드
            value: "printCode",
            align: "left",
            width: 260,
            sortable: true,
            filter: true
          },
          {
            text: "라벨코드", // 라벨코드
            value: "sorterLabelCode",
            align: "left",
            width: 240,
            sortable: true,
            filter: true
          },
          {
            text: "T-Sorter셀코드", // 셀코드
            value: "sorterCellCode",
            align: "left",
            width: 230,
            sortable: true,
            filter: true
          },
          {
            text: "영업점코드", // 영업점코드
            value: "shipToCode",
            align: "left",
            width: 180,
            sortable: true,
            filter: true
          },
          {
            text: "영업점명", // 영업점명
            value: "shipToName",
            align: "left",
            width: 200,
            sortable: true,
            filter: true
          },
          {
            text: "지구코드", // 운송코드
            value: "transportCode",
            align: "left",
            width: 160,
            sortable: true,
            filter: true
          },

          // {
          //   text: this.$t("wcs.exec.execOrdStatus.splitOrderNumber"), // 분할주문번호
          //   value: "splitOrderNumber",
          //   align: "left",
          //   width: 320,
          //   sortable: true
          // },
          {
            text: this.$t("wcs.common.totalPlanSkuCount"), // 품목수량
            value: "totalPlanSkuCount",
            align: "right",
            width: 160,
            sortable: true,
            formatter: (value) => {
              return filters.toThousandFilter(value);
            },
            filter: true
          },
          {
            text: this.$t("wcs.common.totalPlanQuantity"), // 낱개수량
            value: "totalPlanQuantity",
            align: "right",
            width: 160,
            sortable: true,
            formatter: (value) => {
              return filters.toThousandFilter(value);
            },
            filter: true
          },
          // {
          //   text: this.$t("wcs.exec.execOrdStatus.splitWorkOrderCount"), // 분류주문건수
          //   value: "totalWorkOrderCount",
          //   align: "right",
          //   width: 180,
          //   sortable: true,
          //   formatter: (value) => {
          //     return filters.toThousandFilter(value);
          //   }
          // },
          // {
          //   text: this.$t("wcs.exec.execOrdStatus.splitWorkQuantityt"), // 분류낱개건수
          //   value: "totalWorkOrderCount",
          //   align: "right",
          //   width: 180,
          //   sortable: true,
          //   formatter: (value) => {
          //     return filters.toThousandFilter(value);
          //   }
          // },
          {
            text: this.$t("wcs.common.statusName"), // 상태명
            value: "statusName",
            align: "left",
            width: 220,
            sortable: true,
            filter: true
          }
          // {
          //   text: "등록일",
          //   value: "addDtm",
          //   align: "left",
          //   width: 250,
          //   sortable: true,
          //   formatter: (value) => {
          //     return common.dateToStr(value);
          //   }
          // },
          // {
          //   text: "수정일",
          //   value: "modDtm",
          //   align: "left",
          //   width: 250,
          //   sortable: true,
          //   formatter: (value) => {
          //     return common.dateToStr(value);
          //   }
          // }
          // {
          //   text: this.$t("wcs.exec.execOrdStatus.checkDttm"),
          //   value: "checkDttm",
          //   align: "left",
          //   width: 160,
          //   sortable: true,
          //   formatter: (value) => {
          //     return common.dateToStr(value);
          //   }
          // },
          // {
          //   text: this.$t("wcs.exec.execOrdStatus.checkWho"),
          //   value: "checkWho",
          //   align: "left",
          //   width: 160,
          //   sortable: true
          // },
          // {
          //   text: this.$t("wcs.exec.execOrdStatus.rsltSendDttm"),
          //   value: "rsltSendDttm",
          //   align: "left",
          //   width: 180,
          //   sortable: true,
          //   formatter: (value) => {
          //     return common.dateToStr(value);
          //   }
          // },
          // {
          //   text: this.$t("wcs.exec.execOrdStatus.rsltSendWho"),
          //   value: "rsltSendWho",
          //   align: "left",
          //   width: 160,
          //   sortable: true
          // }
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
        itemsSelected: [], // checkbox response data
        headers: [
          {
            text: this.$t("wcs.common.orderNumber"), // 주문번호
            // value: "orderNumber",
            //  TODO 임시
            value: "orderNumber",
            align: "left",
            width: 230,
            sortable: true,
            filter: true
          },
          {
            text: this.$t("wcs.common.skuCode"), // 상품코드
            // value: "skuCode",
            //  TODO 임시
            value: "skuCode",
            align: "left",
            width: 180,
            sortable: true,
            filter: true
          },
          {
            text: this.$t("wcs.common.skuName"), // 상품명
            // value: "skuName",
            //  TODO 임시
            value: "skuName",
            align: "left",
            width: 400,
            sortable: true,
            filter: true
          },
          {
            text: this.$t("wcs.common.planQty"), // 예정수량
            // value: "totalPlanQuantity",
            //  TODO 임시
            value: "planQty",
            align: "right",
            width: 160,
            sortable: true,
            formatter: (value) => {
              return filters.toThousandFilter(value);
            },
            filter: true
          },
          {
            text: this.$t("wcs.common.pickQty"), // 피킹수량
            // value: "totalPlanQuantity",
            //  TODO 임시
            value: "pickQty",
            align: "right",
            width: 160,
            sortable: true,
            formatter: (value) => {
              return filters.toThousandFilter(value);
            },
            filter: true
          },
          {
            text: this.$t("wcs.common.tallyQty"), // 검수수량
            // value: "totalPlanQuantity",
            //  TODO 임시
            value: "tallyQty",
            align: "right",
            width: 160,
            sortable: true,
            formatter: (value) => {
              return filters.toThousandFilter(value);
            },
            filter: true
          },
          {
            text: this.$t("wcs.common.statusName"), // 상태명
            // value: "statusName",
            //  TODO 임시
            value: "statusName",
            align: "left",
            width: 150,
            sortable: true,
            filter: true
          },
          // {
          //   text: this.$t("wcs.exec.execOrdStatus.splitDttm"),
          //   // value: "splitDttm",
          //   //  TODO 임시
          //   value: "addDtm",
          //   align: "left",
          //   width: 220,
          //   sortable: true,
          //   formatter: (value) => {
          //     return common.dateToStr(value);
          //   }
          // },
          // {
          //   text: "등록일",
          //   // value: "checkDttm",
          //   //  TODO 임시
          //   value: "addDtm",
          //   align: "left",
          //   width: 250,
          //   sortable: true,
          //   formatter: (value) => {
          //     return common.dateToStr(value);
          //   }
          // },
          // {
          //   text: "수정일",
          //   // value: "checkWho",
          //   //  TODO 임시
          //   value: "modDtm",
          //   align: "left",
          //   width: 250,
          //   sortable: true
          // }
          {
            text: this.$t("wcs.common.addDateTime"), // 등록일
            value: "addDtm",
            align: "left",
            width: 320,
            sortable: true,
            filter: true
          },
          {
            text: this.$t("wcs.common.modDateTime"), // 수정일
            value: "modDtm",
            align: "left",
            width: 320,
            sortable: true,
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
      }
    };
  },
  created() {
    // 작업차수 조회
    this.getExecBatch();
  },
  mounted() {
    this.searchOrdList();
  },
  methods: {
    async init() {
      await this.$nextTick();
      this.$refs.form0.clearFocus();
      this.$refs.form1.clearFocus();
      this.form1.items = [];
    },
    showData(data) {
      this.init();
      this.form0.items = this.egInitRows(data) || [];
    },
    searchDetailItemList() {
      this.execOrdStatusRegObj.openPop = true;
      this.execOrdStatusRegObj.loading = true;
      this.execOrdStatusRegObj.workDate = this.filterQuery.workDate;
    },
    /**************************************************************************
     * () 차수를 조회한다.
     **************************************************************************/
    async getExecBatch() {
      let lktBody = [];
      let format = "YYYY-MM-DD";

      if (this.filterQuery.workDate.length != 10) return false;

      const query = {
        lktHeader: {
          type: "REQUEST",
          call: "PAGE.WCS.PUBLIC.WORK.BATCH",
          status: 0,
          message: "",
          encryption: "",
          centerCode: this.userInfo.centerCode,
          clientCode: this.userInfo.clientCode,
          warehouseCode: this.userInfo.warehouseCode
        },
        lktBody: [
          {
            boundType: "IN",
            workDate: dayjs(this.filterQuery.workDate).format(format)
          }
        ]
      };

      try {
        this.$store.commit("app/SET_LOADING", {loading: true});

        const res = await execOrdStatus.searchExecWorkBatch({
          id: common.encodeBase64(query)
        });

        if (res.lktBody) {
          this.commonData.workBatch = [];

          res.lktBody.forEach((d) => {
            this.commonData.workBatch.push({
              text: d.workBatch,
              value: d.workBatch
            });
          });
        }
      } catch (e) {
        console.log(e);
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
     * () 리스트를 조회한다.
     **************************************************************************/
    searchOrdList() {
      if (!this.filterQuery.workDate) {
        this.$alert({
          title: this.$t("common.searchFailed"),
          message: this.$t("wcs.common.pleaseSelectDate")
        });
        return false;
      } else {
        this.getExecOrdStatus();
      }
    },
    async getExecOrdStatus() {
      let lktBody = [];
      let format = "YYYY-MM-DD";

      const workDate =
        this.filterQuery.workDate.length != 10
          ? ""
          : dayjs(this.filterQuery.workDate).format(format);

      if (this.filterQuery.workBatch.length > 0) {
        this.filterQuery.workBatch.forEach((d) => {
          lktBody.push({
            workDate: workDate,
            orderNumber: this.filterQuery.orderNumber,
            workBatch: d
          });
        });
      } else {
        lktBody.push({
          workDate: workDate,
          orderNumber: this.filterQuery.orderNumber,
          workBatch: ""
        });
      }

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

        const data = this.getForm0Data(res.lktBody);
        this.form0.items = this.egInitRows(data) || [];
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
        this.init();
      }
    },
    getForm0Data(lktBody) {
      // 선택한 작업차수가 없다면 전체 데이터 조회
      if (this.filterQuery.workBatch.length <= 0) {
        return lktBody;
      }

      // 선택한 작업차수의 데이터만 조회
      if (lktBody.length > 0) {
        return lktBody.filter((d) => {
          return this.filterQuery.workBatch.includes(d.workBatch);
        });
      }

      return [];
    },
    // 상단 테이블 row 클릭 시
    searchExecOrdDetail(row) {
      this.getExecOrdStatusDetail(row);
    },
    async getExecOrdStatusDetail(row) {
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
        lktBody: [
          {
            workDate: row.workDate,
            orderNumber: row.orderNumber,
            workBatch: row.workBatch
          }
        ]
      };

      try {
        this.$store.commit("app/SET_LOADING", {loading: true});

        const res = await execOrdStatus.searchExecOrdDetail({
          id: common.encodeBase64(query)
        });
        if (res.lktBody) {
          this.form1.items = this.egInitRows(res.lktBody) || [];
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
     * 로우 클릭 function
     *
     * @param {Object} row Grid Row Object
     **************************************************************************/
    rowClick(row) {
      this.searchExecOrdDetail(row);
    }
    /**************************************************************************
     * 그리드 로우를 수정한다.
     *
     * @param {Object} row Grid Row Object
     **************************************************************************/
    //  editRow(row) {
    //   this.execEucRegObj.param = row;
    //   this.execEucRegObj.openPop = true;
    // },
  }
};
</script>

<style lang="scss" scoped>
.detail-search {
  width: 41px !important;
  height: 41px !important;
  margin: 0 !important;
  padding: 9px 8px 8px 9px !important;
  border-radius: 21px !important;
}
.detail-search > ::v-deep .v-btn__content {
  font-size: 38px !important;
}
</style>
