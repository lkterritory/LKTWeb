<!-----------------------------------------------------------------------------
 | title: 상품별작업현황
 | creator: JSW
 | date : 2023-01-31
 | description: execItemStatus View
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
                <!-- 날짜 -->
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
                <!-- 날짜 -->
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
              </v-row>
            </v-col>
            <!-- 버튼 -->
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
                    @click="searchItemList()">
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
            :filter-options="filterOptions"
            :selected="form0.itemsSelected"
            @click-row="rowClick">
          </Framework-table>
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
    <exec-item-status-reg
      :isOpen="execItemStatusRegObj.openPop"
      @close="execItemStatusRegObj.openPop = false"
      @sendData="showData"
      :loading="execItemStatusRegObj.loading"
      :pWorkDate="this.filterQuery.workDate"
      :pWorkBatch="this.filterQuery.workBatch" />
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import editGrid from "@/mixins/editGrid";
import dayjs from "dayjs";
import common from "@/utils/common";
import * as filters from "@/filters";
import * as execItemStatus from "@/api/exec/execItemStatus.js";
import execItemStatusReg from "./popup/execItemStatusReg.vue";

export default {
  name: "execItemStatus",
  // 추가 components (별도의 모듈 추가)
  components: {execItemStatusReg},
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
      execItemStatusRegObj: {
        openPop: false,
        loading: false
      },
      showFilterOptions: false,
      filterOptions: [],
      filterItems: [],
      filterName: "",
      getItemList: [],
      itemNm: undefined,
      commonData: {
        workBatch: []
      },
      filterQuery: {
        workDate: dayjs().format("YYYY-MM-DD"),
        skuCode: "",
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
            text: this.$t("wcs.common.workBatch"), // 작업차수
            value: "workBatch",
            align: "left",
            width: 150,
            sortable: true
          },
          {
            text: this.$t("wcs.common.skuCode"), // 상품코드
            value: "skuCode",
            align: "left",
            width: 230,
            sortable: true,
            filter: true
          },
          {
            text: this.$t("wcs.common.skuName"), // 상품명
            value: "skuName",
            align: "left",
            width: 400,
            sortable: true,
            filter: true
          },
          {
            text: this.$t("wcs.common.totalPlanOrderCount"), // 주문건수
            value: "totalPlanOrderCount",
            align: "right",
            width: 150,
            sortable: true,
            formatter: (value) => {
              return filters.toThousandFilter(value);
            },
            filter: true
          },
          {
            text: this.$t("wcs.common.totalPcs"), // 낱개수량
            value: "totalPlanQuantity",
            align: "right",
            width: 150,
            sortable: true,
            formatter: (value) => {
              return filters.toThousandFilter(value);
            },
            filter: true
          },
          {
            text: this.$t("wcs.exec.execItemStatus.splitWorkOrderCount"), // 분류주문건수
            value: "totalWorkOrderCount",
            align: "right",
            width: 200,
            sortable: true,
            formatter: (value) => {
              return filters.toThousandFilter(value);
            },
            filter: true
          },
          {
            text: this.$t("wcs.exec.execItemStatus.splitWorkQuantityt"), // 분류낱개수량
            value: "totalWorkQuantity",
            align: "right",
            width: 200,
            sortable: true,
            formatter: (value) => {
              return filters.toThousandFilter(value);
            },
            filter: true
          },
          {
            text: this.$t("wcs.common.statusName"),
            value: "statusName",
            align: "left",
            width: 160,
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
      },
      form1: {
        itemsSelected: [], // checkbox response data
        headers: [
          {
            text: this.$t("wcs.common.facilitiesCode"), // 설비코드
            value: "facilitiesCode",
            align: "left",
            width: 160,
            sortable: true,
            filter: true
          },
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
            width: 230,
            sortable: true,
            filter: true
          },
          {
            text: this.$t("wcs.common.planQty"), // 예정수량
            // value: "totalPlanOrderCount",
            //  TODO 임시
            value: "planQty",
            align: "right",
            width: 150,
            sortable: true,
            formatter: (value) => {
              return filters.toThousandFilter(value);
            },
            filter: true
          },
          {
            text: this.$t("wcs.common.pickQty"), // 피킹수량
            // value: "totalPcs",
            //  TODO 임시
            value: "pickQty",
            align: "right",
            width: 150,
            sortable: true,
            formatter: (value) => {
              return filters.toThousandFilter(value);
            },
            filter: true
          },
          {
            text: this.$t("wcs.common.tallyQty"), // 검수수량
            // value: "totalWorkOrderCount",
            //  TODO 임시
            value: "tallyQty",
            align: "right",
            width: 170,
            sortable: true,
            formatter: (value) => {
              return filters.toThousandFilter(value);
            },
            filter: true
          },
          // {
          //   text: this.$t("wcs.exec.execItemStatus.splitWorkQuantityt"), // 분류낱개수량
          //   // value: "totalWorkOrderCount",
          //   //  TODO 임시
          //   value: "logSequnce",
          //   align: "right",
          //   width: 170,
          //   sortable: true,
          //   formatter: (value) => {
          //     return filters.toThousandFilter(value);
          //   }
          // },
          {
            text: this.$t("wcs.common.statusName"),
            value: "statusName",
            align: "left",
            width: 230,
            sortable: true,
            filter: true
          },
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
    this.searchItemList();
  },
  beforeUnmount() {},
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
      this.execItemStatusRegObj.openPop = true;
      this.execItemStatusRegObj.loading = true;
      this.execItemStatusRegObj.workDate = this.filterQuery.workDate;
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

        const res = await execItemStatus.searchExecWorkBatch({
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
    searchItemList() {
      if (!this.filterQuery.workDate) {
        // this.$notify({
        //   type: "warn",
        //   title: this.$t("common.info"), // 알림
        //   text: this.$t("wcs.common.pleaseSelectDate"),
        //   duration: 2000
        // });
        this.$alert({
          title: this.$t("common.searchFailed"),
          message: this.$t("wcs.common.pleaseSelectDate")
        });

        return false;
      } else {
        this.getExecItemStatus();
      }
    },
    async getExecItemStatus() {
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
            orderskuCode: this.filterQuery.skuCode,
            workBatch: d
          });
        });
      } else {
        lktBody.push({
          workDate: workDate,
          skuCode: this.filterQuery.skuCode,
          workBatch: ""
        });
      }

      const query = {
        lktHeader: {
          type: "REQUEST",
          call: "PAGE.PSS.GET",
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
        const res = await execItemStatus.searchExecItem({
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
    searchExecItemDetail(row) {
      this.getExecItemStatusDetail(row);
    },
    async getExecItemStatusDetail(row) {
      const query = {
        lktHeader: {
          type: "REQUEST",
          call: "PAGE.PSS.GET",
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
            skuCode: row.skuCode,
            workBatch: row.workBatch
          }
        ]
      };

      try {
        this.$store.commit("app/SET_LOADING", {loading: true});

        const res = await execItemStatus.searchExecItemDetail({
          id: common.encodeBase64(query)
        });
        if (res.lktBody) {
          this.form1.items = this.egInitRows(res.lktBody) || [];
          // this.form0.pagination = res.data.pagination || pagination;
          // if (res.lktheader.status === 200) {
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
      }
    },
    /**************************************************************************
     * 로우 클릭 function
     *
     * @param {Object} row Grid Row Object
     **************************************************************************/
    rowClick(row) {
      this.searchExecItemDetail(row);
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
