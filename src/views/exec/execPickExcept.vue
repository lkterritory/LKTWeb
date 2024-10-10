<!-----------------------------------------------------------------------------
 | title: 예외피킹
 | creator: 조형근
 | date : 2023-08-14
 | description: execPickExcept View
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
          class="search-form bg-primary-form border-color d-flex justify-start align-center"
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
                        v-model="workDate"
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
                            @changeDate="workDate = $event"></Calendar>
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
                        :items="commonData.workBatch"
                        icon="icon-order-number.png"
                        :title="'&nbsp; ' + $t(`wcs.common.workBatch`)"
                        @selected="this.filterQuery.workBatch = $event">
                      </MultiSelectBox>
                    </v-responsive>
                  </div>
                </v-col>
                <!-- 작업차수 -->
              </v-row>
            </v-col>
            <!-----------------------------------------------------------------------
            | 검색조건 영역 끝
            ----------------------------------------------------------------------->
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
                    @click="searchList()">
                    <!-- 조회 -->
                    {{ $t("wcs.common.search") }}
                  </v-btn>
                </template>
              </v-hover>
            </v-col>
            <!-----------------------------------------------------------------------
            | 버튼 영역 끝
            ----------------------------------------------------------------------->
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <!-- middle -->
    <v-row>
      <v-col cols="12">
        <v-card
          class="search-form bg-primary-form border-color d-flex justify-start align-center"
          variant="outlined"
          rounded="lg">
          <v-row class="h-auto w-100 pa-0 ma-0">
            <v-col>
              <v-row>
                <v-col>
                  <v-row class="d-flex justify-start align-center">
                    <!-- 상품코드 -->
                    <v-col cols="auto">
                      <div class="search-item rounded-lg">
                        <v-responsive width="390">
                          <v-text-field
                            ref="barCode"
                            v-model="barCode"
                            type="input"
                            variant="plain"
                            hide-details="false"
                            :placeholder="this.$t(`wcs.common.pleaseInputData`)"
                            @keyup.enter="searchList"
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
                                <!-- 상품코드 -->
                                상품코드
                              </v-label>
                            </template>
                          </v-text-field>
                        </v-responsive>
                      </div>
                    </v-col>
                    <!-- 상품코드 -->
                    <!-- 라디오버튼 -->
                    <!-- <v-col cols="cols">
                      <v-card-text class="pa-0">
                        <v-radio-group
                          hide-details
                          class="radio-group"
                          v-model="filterQuery.checkType"
                          inline
                          @click="clearFilterQuery">
                           <v-radio
                        class="radio-item"
                        label="단수"
                        value="01"></v-radio>
                          <v-radio
                            class="radio-item"
                            label="합포"
                            value="02"></v-radio>
                          <v-radio
                            class="radio-item"
                            label="이형"
                            value="variant"></v-radio>
                        </v-radio-group>
                      </v-card-text>
                    </v-col> -->
                    <!-- 라디오버튼 -->
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="inner-content">
      <!-----------------------------------------------------------------------
      | Main
      ----------------------------------------------------------------------->
      <v-col
        cols="12"
        class="h-100 px-0 mx-0 grid">
        <Framework-table
          ref="form0"
          :headers="form0.headers"
          :items="form0.items"
          :current-page="form0.pagination.currentPage"
          :rows-per-page="20"
          :selected="form0.itemsSelected"
          @click-row="rowClick" />
      </v-col>
    </v-row>

    <v-dialog
      width="85%"
      height="885"
      v-model="checkerObj.openPop"
      class="classic translate-child"
      scrollable>
      <v-card>
        <v-toolbar
          class="top-tool-bar"
          density="compact">
          <v-toolbar-title tag="span">검수 팝업</v-toolbar-title>
        </v-toolbar>
        <checker
          :param="checkerObj.param"
          @closePopup="closeChecker" />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import editGrid from "@/mixins/editGrid";
import common from "@/utils/common";
import * as execPickExcept from "@/api/exec/execPickExcept";
import dayjs from "dayjs";
import * as filters from "@/filters";
import checker from "./execChecker";

export default {
  name: "execPickExcept",
  // 추가 components (별도의 모듈 추가)
  components: {
    checker
  },
  // 추가 mixins (별도의 기능 추가)
  mixins: [editGrid],
  // 반복적으로 연산되는 데이터 처리(state, complex data 등)
  computed: {
    ...mapGetters(["userInfo"])
  },
  // 반복적인 렌더링이 들어가는 데이터 처리
  watch: {
    workDate(val) {
      if (!val) return;
      // 작업차수 조회
      this.getExecBatch();
      //this.searchList();
    },
    barCode(n, o) {
      if (n) {
        const value = this.$inko.ko2en(n); // 한 -> 영 변환
        const noEngRule = /^[a-zA-Z0-9\-]*$/; // 영문 (소,대), 숫자, 하이픈
        if (!noEngRule.test(value)) {
          this.barCode = o.toUpperCase();
        } else {
          this.barCode = value.toUpperCase();
        }
      }
    }
  },
  // 데이터(이 페이지에서 사용할 변수)
  data() {
    return {
      checkerObj: {
        openPop: false,
        param: null
      },
      workDate: dayjs().format("YYYY-MM-DD"),
      barCode: "",
      filterQuery: {
        workBatch: [],
        checkType: ""
      },
      commonData: {
        workBatch: []
      },
      form0: {
        itemsSelected: [],
        headers: [
          {
            text: "주문번호",
            value: "orderNumber",
            align: "left",
            width: "auto",
            sortable: true
          },
          {
            text: "품목수",
            value: "totalSku",
            align: "right",
            width: "auto",
            sortable: true,
            formatter: (value) => {
              return filters.toThousandFilter(value);
            }
          },
          {
            text: "낱개수",
            value: "totalPcs",
            align: "right",
            width: "auto",
            sortable: true,
            formatter: (value) => {
              return filters.toThousandFilter(value);
            }
          },
          {
            text: "상태명",
            value: "statusName",
            align: "left",
            width: 300,
            sortable: true
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
    this.init();
  },
  mounted() {
    // this.searchList();
    // 테스트
    // this.checkerObj.param = {orderNumber: "12345"};
    // this.checkerObj.openPop = true;
  },
  methods: {
    closeChecker() {
      this.checkerObj.openPop = false;
      this.searchList();
    },
    async init() {
      await this.$nextTick();
      this.$refs.form0.clearFocus();
    },
    clearFilterQuery() {
      this.filterQuery.workBatch = [];
      this.barCode = "";
    },
    /**************************************************************************
     * () 차수를 조회한다.
     **************************************************************************/
    async getExecBatch() {
      let lktBody = [];
      let format = "YYYY-MM-DD";

      if (this.workDate.length != 10) return false;

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
            workDate: dayjs(this.workDate).format(format)
          }
        ]
      };

      try {
        this.$store.commit("app/SET_LOADING", {loading: true});

        const res = await execPickExcept.searchExecWorkBatch({
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
    searchList() {
      if (!this.workDate) {
        this.$alert({
          title: this.$t("common.searchFailed"),
          message: this.$t("wcs.common.pleaseSelectDate")
        });
        return false;
      } else {
        this.getPickExcept();
      }
    },
    async getPickExcept() {
      let format = "YYYY-MM-DD";
      let lktBody = [];

      const workDate =
        this.workDate.length != 10 ? "" : dayjs(this.workDate).format(format);

      if (this.filterQuery.workBatch.length > 0) {
        this.filterQuery.workBatch.forEach((d) => {
          lktBody.push({
            workDate: workDate,
            barCode: this.barCode,
            workBatch: d,
            userId: this.userInfo.userId
          });
        });
      } else {
        lktBody.push({
          workDate: workDate,
          barCode: this.barCode,
          workBatch: "",
          userId: this.userInfo.userId
        });
      }

      const query = {
        lktHeader: {
          type: "REQUEST",
          call: "PAGE.EXCEPTION.PICKING.GET",
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

        const res = await execPickExcept.searchList({
          id: common.encodeBase64(query)
        });

        if (res.lktBody) {
          this.form0.items = this.egInitRows(res.lktBody) || [];
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
        this.init();
      }
    },
    /**************************************************************************
     * 로우 클릭 function
     *
     * @param {Object} row Grid Row Object
     **************************************************************************/
    rowClick(row) {
      /// 맵핑팝업 출력
      this.checkerObj.param = row;
      this.checkerObj.openPop = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.inner-content {
  height: calc(100vh - var(--top-height) - 374px);
}
.grid {
  ::v-deep .vue3-easy-data-table__main {
    height: calc(100vh - var(--top-height) - 401px - var(--grid-footer-height));
  }
}
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
.radio-group {
  font-size: 20px;
}
::v-deep .v-selection-control--inline .v-label {
  font-size: 20px !important;
}
.top-tool-bar {
  padding-top: 17px;
  padding-left: 50px;
  padding-bottom: 12px;
  background-color: rgba(var(--v-theme-popup-bg), 1) !important;

  span {
    font-size: 35px;
    font-weight: bold;
    line-height: 1;
    letter-spacing: 1.75px;
    text-align: left;
    color: rgba(var(--v-theme-popup-title), 1);
  }
}
</style>
