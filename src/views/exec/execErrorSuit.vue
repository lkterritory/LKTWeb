<!-----------------------------------------------------------------------------
 | title: 에러슈트 조회
 | creator: 조형근
 | date : 2023-08-14
 | description: execErrorSuit View
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
                <!-- 토트박스 -->
                <v-col cols="auto">
                  <div class="search-item rounded-lg">
                    <v-responsive width="390">
                      <v-text-field
                        autofocus
                        ref="objectCode"
                        v-model="filterQuery.objectCode"
                        type="input"
                        variant="plain"
                        hide-details="false"
                        :placeholder="this.$t(`wcs.common.pleaseInputData`)"
                        @keyup="keyupObjectCode"
                        clearable
                        solo>
                        <template v-slot:prepend>
                          <v-label class="search-item-divider">
                            &nbsp;
                            <v-img
                              :src="
                                require(`@/assets/images/icon-search.png`)
                              "></v-img
                            >&nbsp;
                            <!-- 토트박스 -->
                            {{ this.$t(`wcs.common.totBox`) }}
                          </v-label>
                        </template>
                      </v-text-field>
                    </v-responsive>
                  </div>
                </v-col>
                <!-- 토트박스 -->
                <!-- 상품 -->
                <v-col cols="auto">
                  <div class="search-item rounded-lg">
                    <v-responsive width="390">
                      <v-text-field
                        ref="skuCode"
                        v-model="filterQuery.skuCode"
                        type="input"
                        variant="plain"
                        hide-details="false"
                        :placeholder="this.$t(`wcs.common.pleaseInputData`)"
                        @keyup="keyupSkuCode"
                        clearable
                        solo>
                        <template v-slot:prepend>
                          <v-label class="search-item-divider">
                            &nbsp;
                            <v-img
                              :src="
                                require(`@/assets/images/icon-search.png`)
                              "></v-img
                            >&nbsp;
                            <!-- 상품 -->
                            {{ this.$t(`wcs.common.skuShortName`) }}
                          </v-label>
                        </template>
                      </v-text-field>
                    </v-responsive>
                  </div>
                </v-col>
                <!-- 상품 -->
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
                    @click="searchList()">
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

    <chg-box
      :isOpen="chgBoxObj.openPop"
      @close="closePopup()"
      :param="chgBoxObj.param"
      @save="savePop()" />
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import editGrid from "@/mixins/editGrid";
import dayjs from "dayjs";
import common from "@/utils/common";
import * as filters from "@/filters";
import * as execErrorSuit from "@/api/exec/execErrorSuit.js";
import chgBox from "./popup/execChgBox";

export default {
  name: "execErrorSuit",
  // 추가 components (별도의 모듈 추가)
  components: {
    chgBox
  },
  // 추가 mixins (별도의 기능 추가)
  mixins: [editGrid],
  // 반복적으로 연산되는 데이터 처리(state, complex data 등)
  computed: {
    ...mapGetters(["userInfo"])
  },
  // 반복적인 렌더링이 들어가는 데이터 처리
  watch: {},
  // 데이터(이 페이지에서 사용할 변수)
  data() {
    return {
      chgBoxObj: {
        openPop: false,
        mode: "",
        param: {}
      },
      filterQuery: {
        workDate: dayjs().format("YYYY-MM-DD"),
        skuCode: "",
        objectCode: ""
      },
      form0: {
        itemsSelected: [], // checkbox response data
        headers: [
          {
            // 주문번호
            text: this.$t("wcs.common.orderNumber"),
            value: "orderNumber",
            align: "left",
            width: "auto",
            sortable: true
          },
          {
            // Cell
            text: this.$t("wcs.exec.execErrorSuit.cell"),
            value: "cellCode",
            align: "left",
            width: "auto",
            sortable: true
          },
          {
            // 품목수
            text: this.$t("wcs.exec.execErrorSuit.totalSku"),
            value: "totalSku",
            align: "right",
            width: "auto",
            sortable: true,
            filter: true,
            formatter: (value) => {
              return filters.toThousandFilter(value);
            }
          },
          {
            // 낱개수
            text: this.$t("wcs.exec.execErrorSuit.totalPcs"),
            value: "totalPcs",
            align: "right",
            width: "auto",
            sortable: true,
            filter: true,
            formatter: (value) => {
              return filters.toThousandFilter(value);
            }
          }
          // {
          //   text: "",
          //   value: "buttonColumn",
          //   width: 0,
          //   align: "center",
          //   sortable: false,
          //   hidden: true,
          //   editItem: {
          //     type: "button",
          //     text: "토트박스",
          //     click: (value, row) => {
          //       this.gridBtnCllick(value, row);
          //     },
          //     useable: (value, row) => {
          //       return true;
          //     }
          //   }
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
            // 주문번호
            text: this.$t("wcs.common.orderNumber"),
            value: "orderNumber",
            align: "left",
            width: 230,
            sortable: true,
            filter: true
          },
          {
            // 상품코드
            text: this.$t("wcs.common.skuCode"),
            value: "skuCode",
            align: "left",
            width: 200,
            sortable: true,
            filter: true
          },
          {
            // 상품명
            text: this.$t("wcs.common.skuName"),
            value: "skuName",
            align: "left",
            width: "auto",
            sortable: true,
            filter: true
          },
          {
            // 예정수량
            text: this.$t("wcs.common.planQty"),
            value: "planQty",
            align: "right",
            width: 250,
            sortable: true,
            filter: true
          },
          {
            // 피킹수량
            text: this.$t("wcs.common.pickQty"),
            value: "pickQty",
            align: "right",
            width: 250,
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
  created() {},
  mounted() {
    // this.searchList();
  },
  beforeUnmount() {},
  methods: {
    savePop() {
      this.init();
    },
    async closePopup() {
      this.chgBoxObj.openPop = false;

      await this.$nextTick();
      this.focusSearchItem();
    },
    async init() {
      await this.$nextTick();
      this.$refs.form0.clearFocus();
      this.$refs.form1.clearFocus();
      this.form1.items = [];
    },
    keyupObjectCode(event) {
      this.filterQuery.skuCode = "";
      if (event.key === "Enter") this.searchList();
    },
    keyupSkuCode(event) {
      this.filterQuery.objectCode = "";
      if (event.key === "Enter") this.searchList();
    },
    /**************************************************************************
     * () 리스트를 조회한다.
     **************************************************************************/
    searchList() {
      if (!this.filterQuery.workDate) {
        this.$alert({
          title: this.$t("common.searchFailed"),
          message: this.$t("wcs.common.pleaseSelectDate")
        });

        return false;
      } else {
        this.getExecErrorSuit();
      }
    },
    gridBtnCllick(value, row) {
      /// 박스교체팝업 출력
      this.chgBoxObj.param = row;
      this.chgBoxObj.openPop = true;
    },
    async getExecErrorSuit() {
      let lktBody = [];
      let format = "YYYY-MM-DD";

      const workDate =
        this.filterQuery.workDate.length != 10
          ? ""
          : dayjs(this.filterQuery.workDate).format(format);
      const barCode = this.filterQuery.objectCode || this.filterQuery.skuCode;

      lktBody.push({
        workDate: workDate,
        barCode: barCode
      });

      const query = {
        lktHeader: {
          type: "REQUEST",
          call: "PAGE.ERROR.CHUTE.GET",
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
        const res = await execErrorSuit.searchList({
          id: common.encodeBase64(query)
        });

        this.form0.items = this.egInitRows(res.lktBody) || [];
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

        this.focusSearchItem();
      }
    },
    focusSearchItem() {
      if (this.filterQuery.objectCode) {
        const focusEl = this.$refs.objectCode.$el.querySelector("input");
        focusEl.select();
      } else if (this.filterQuery.skuCode) {
        const focusEl = this.$refs.skuCode.$el.querySelector("input");
        focusEl.select();
      }
    },
    // 상단 테이블 row 클릭 시
    searchListDetail(row) {
      this.getExecErrorSuitDetail(row);
    },
    async getExecErrorSuitDetail(row) {
      const query = {
        lktHeader: {
          type: "REQUEST",
          call: "PAGE.ERROR.CHUTE.DETAIL.GET",
          status: 0,
          message: "",
          encryption: "",
          centerCode: this.userInfo.centerCode,
          clientCode: this.userInfo.clientCode,
          warehouseCode: this.userInfo.warehouseCode
        },
        lktBody: [
          {
            orderNumber: row.orderNumber
          }
        ]
      };

      try {
        this.$store.commit("app/SET_LOADING", {loading: true});

        const res = await execErrorSuit.searchListDetail({
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
      // 임시
      this.searchListDetail(row);
    }
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
