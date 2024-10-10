<!-----------------------------------------------------------------------------
 | title: 작업지시
 | creator: JSW
 | date : 2023-02-01
 | description: execOrd View
 | composition:
 |  <template />
 |  <script />
 |  <style />
 ----------------------------------------------------------------------------->
<template>
  <div>
    <v-row>
      <!-----------------------------------------------------------------------
      | 검색조건 영역 시작
      ----------------------------------------------------------------------->
      <v-col cols="12">
        <v-card
          class="search-form bg-primary-form border-color justify-start align-center"
          variant="outlined"
          rounded="lg">
          <v-row class="h-auto w-100 pa-0 ma-0">
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
                            format="yyyy-MM-dd"
                            :startDate="new Date()"
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
                        :items="commonData.workBatch"
                        :isDeselect="isDeselect"
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
                    @click="onBtnSearch()">
                    <!-- 조회 -->
                    {{ $t("wcs.common.search") }}
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
                    @click="ordRecv(`WCS`)">
                    <!-- 주문수신 -->
                    {{ $t("wcs.exec.execOrd.ordRecv") }}
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
                    @click="planOrd()">
                    <!-- 작업계획 -->
                    {{ $t("wcs.exec.execOrd.planOrd") }}
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
                    @click="exceptPickChg()">
                    <!-- 메뉴얼 변경 -->
                    {{ $t("wcs.exec.execOrd.exceptPickChg") }}
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
                        : `bg-custom-first-btn text-custom-first-text`,
                      `btn-border-color`,
                      `font-weight-regular`
                    ]"
                    rounded="lg"
                    variant="outlined"
                    @click="jobOrd()">
                    <!-- 작업지시 -->
                    {{ $t("wcs.exec.execOrd.jobOrd") }}
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
                        : `bg-custom-second-btn text-custom-second-text`,
                      `btn-border-color`,
                      `font-weight-regular`
                    ]"
                    rounded="lg"
                    variant="outlined"
                    @click="jobEnd()">
                    <!-- 설비완료 -->
                    {{ $t("wcs.exec.execOrd.jobEnd") }}
                  </v-btn>
                </template>
              </v-hover>
              <v-hover v-if="true">
                <template v-slot:default="{isHovering, props}">
                  <v-btn
                    v-bind="props"
                    :class="[
                      isHovering
                        ? `bg-primary-btn`
                        : `bg-custom-second-btn text-custom-second-text`,
                      `btn-border-color`,
                      `font-weight-regular`
                    ]"
                    rounded="lg"
                    variant="outlined"
                    @click="tSorterEnd()">
                    <!-- T소터완료 -->
                    {{ $t("wcs.exec.execOrd.tSorterEnd") }}
                  </v-btn>
                </template>
              </v-hover>
            </v-col>
            <!-- 버튼 -->
          </v-row>
          <!-- 상세검색 버튼 -->
          <!-- <v-row class="h-auto w-100 pa-0 ma-0">
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
          </v-row> -->
          <!-- 상세검색 버튼 -->
        </v-card>
      </v-col>
    </v-row>
    <v-row class="inner-content mt-0">
      <!-----------------------------------------------------------------------
      | Main
      ----------------------------------------------------------------------->
      <v-col
        cols="12"
        class="h-100">
        <div>
          <Framework-table
            ref="form0"
            :headers="
              form0.headers.filter((d) => {
                return !d.hidden;
              })
            "
            :items="form0.items"
            :current-page="form0.pagination.currentPage"
            :rows-per-page="100000"
            hide-footer
            @click-row="rowClick"
            :selected="form0.itemsSelected"
            @edit-row="this.editRow" />
        </div>
      </v-col>
    </v-row>
    <exec-ord-reg
      :isOpen="execOrdRegObj.openPop"
      @close="execOrdRegObj.openPop = false"
      @sendData="showData"
      :loading="execOrdRegObj.loading" />
    <execEqpCompAlloc
      :isOpen="openEqpCompAlloc"
      :param="rowVal"
      @save="searchOrdList()"
      @close="openEqpCompAlloc = false" />
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import editGrid from "@/mixins/editGrid";
import common from "@/utils/common";
import * as filters from "@/filters";
import * as execOrd from "@/api/exec/execOrd.js";
import execOrdReg from "./popup/execOrdReg.vue";
import execEqpCompAlloc from "./popup/execEqpCompAlloc.vue";
import dayjs from "dayjs";
import * as mastApi from "@/api/mast/mastApi";

export default {
  name: "execOrd",
  // 추가 components (별도의 모듈 추가)
  components: {execOrdReg, execEqpCompAlloc},
  // 추가 mixins (별도의 기능 추가)
  mixins: [editGrid],
  // 반복적으로 연산되는 데이터 처리(state, complex data 등)
  computed: {
    ...mapGetters(["userInfo"])
  },
  // 반복적인 렌더링이 들어가는 데이터 처리
  watch: {
    // filterQuery: {
    //   handler(val) {
    //     if (!val.workDate) return;
    //     // 작업차수 조회

    //     this.getExecBatch();
    //     // 그리드 조회
    //     this.searchOrdList();
    //   },
    //   deep: true
    // },
    "filterQuery.workDate": {
      handler(val) {
        if (!val) return;
        // 작업차수 조회

        this.isDeselect = !this.isDeselect;

        setTimeout(async () => {
          this.getExecBatch();
          // 그리드 조회
          this.searchOrdList();
        }, 100);
      },
      deep: false
    },
    "filterQuery.workBatch": {
      handler(val) {
        if (!val) return;

        this.searchOrdList();
      }
    },

    commonData: {
      handler(val) {
        if (!val.eqp) return;

        this.form0.headers.forEach((d) => {
          if (d.value === "facilitiesName") {
            d.editItem = {
              type: "select",
              items: this.commonData.eqp,
              useable: (value, row) => {
                return row.facilitiesType.indexOf("3D") > -1;
              }
            };
          }
        });
      },
      deep: true
    }
  },

  // 데이터(이 페이지에서 사용할 변수)
  data() {
    return {
      isDeselect: false,
      openEqpCompAlloc: false,
      rowVal: undefined,
      commonData: {
        workBatch: [],
        eqp: []
      },
      filterQuery: {
        // workDate: new Date(),
        // TODO 임시
        workDate: dayjs(new Date()).format("YYYY-MM-DD"),
        workBatch: []
      },
      execOrdRegObj: {
        openPop: false,
        loading: false
      },
      form0: {
        itemsSelected: [], // checkbox response data
        headers: [
          {
            text: this.$t("wcs.common.workDate"), // 작업일자
            value: "workDate",
            align: "center",
            width: 150,
            sortable: false,
            mergeRow: true
          },
          {
            text: this.$t("wcs.common.workBatch"), // 차수
            value: "workBatch",
            align: "left",
            width: 200,
            sortable: false,
            mergeRow: true
          },
          {
            text: this.$t("wcs.common.facilitiesCode"), // 설비코드
            value: "facilitiesCode",
            align: "left",
            width: 180,
            sortable: false,
            hidden: true
          },
          {
            text: this.$t("wcs.exec.execOrd.fromZoneCode"), // 설명
            value: "fromZoneCode",
            align: "left",
            width: 700,
            sortable: false
          },
          {
            text: this.$t("wcs.exec.execOrd.facilitiesType"), // 설비종류
            value: "facilitiesType",
            align: "left",
            width: 180,
            sortable: false,
            filter: true
          },
          {
            text: this.$t("wcs.common.facilitiesName"), // 설비명
            value: "facilitiesName",
            align: "left",
            width: 230,
            sortable: false
            // watch 에서 editItem 추가
          },
          {
            text: this.$t("wcs.common.totalOrder"), // 주문건수
            value: "totalPlanOrderCount",
            align: "right",
            width: 150,
            sortable: false,
            formatter: (value) => {
              if (!isNaN(value)) {
                return filters.toThousandFilter(value);
              } else {
                return value;
              }
            }
          },
          {
            text: this.$t("wcs.common.totalSku"), // 상품건수
            value: "totalPlanSkuCount",
            align: "right",
            width: 150,
            sortable: false,
            formatter: (value) => {
              if (!isNaN(value)) {
                return filters.toThousandFilter(value);
              } else {
                return value;
              }
            }
          },
          {
            text: this.$t("wcs.common.totalPcs"), // 낱개수량
            value: "totalPlanQuantity",
            align: "right",
            width: 150,
            sortable: false,
            formatter: (value) => {
              if (!isNaN(value)) {
                return filters.toThousandFilter(value);
              } else {
                return value;
              }
            }
          },
          {
            text: this.$t("wcs.common.totalWorkOrderCount"), // 작업주문건수
            value: "totalWorkOrderCount",
            align: "right",
            width: 180,
            sortable: false,
            formatter: (value) => {
              if (!isNaN(value)) {
                return filters.toThousandFilter(value);
              } else {
                return value;
              }
            }
          },
          {
            text: this.$t("wcs.common.totalWorkQuantity"), // 작업낱개수량
            value: "totalWorkQuantity",
            align: "right",
            width: 180,
            sortable: false,
            formatter: (value) => {
              if (!isNaN(value)) {
                return filters.toThousandFilter(value);
              } else {
                return value;
              }
            }
          },
          {
            text: this.$t("wcs.common.totalWorkSkuCount"), // 작업품목수량
            value: "totalWorkSkuCount",
            align: "right",
            width: 180,
            sortable: false,
            formatter: (value) => {
              if (!isNaN(value)) {
                return filters.toThousandFilter(value);
              } else {
                return value;
              }
            }
          },
          {
            text: this.$t("wcs.common.persent"), // 진행율
            value: "totalPersnet",
            align: "center",
            width: 130,
            sortable: false,
            formatter: (value) => {
              return value + "%";
            }
          },
          {
            text: "택배건수", // 택배건수
            value: "printCount",
            align: "right",
            width: 180,
            sortable: false,
            formatter: (value) => {
              if (!isNaN(value)) {
                return filters.toThousandFilter(value);
              } else {
                return value;
              }
            }
          },
          {
            text: this.$t("wcs.common.statusName"), // 상태명
            value: "statusName",
            align: "left",
            width: 220,
            sortable: false,
            filter: true
          },
          {
            text: this.$t("wcs.exec.execOrd.addDttm"), // 지시일자
            value: "addDtm",
            align: "center",
            width: 240,
            sortable: false,
            formatter: (value) => {
              return common.dateToStr(value);
            }
          },
          {
            text: this.$t("wcs.exec.execOrd.addWho"), // 지시자
            value: "addWho",
            align: "left",
            width: 120,
            sortable: false
          },
          {
            text: this.$t("wcs.exec.execOrd.completeDttm"), // 완료일시
            value: "modDtm",
            align: "center",
            width: 240,
            sortable: false,
            formatter: (value) => {
              return common.dateToStr(value);
            }
          },
          {
            text: this.$t("wcs.exec.execOrd.completeWho"), // 완료자
            value: "modWho",
            align: "left",
            width: 120,
            sortable: false
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
    this.selectFacilitiesCode();
    this.init();
  },

  mounted() {
    this.searchOrdList();
  },
  methods: {
    async init() {
      await this.$nextTick();
      this.$refs.form0.clearFocus();
    },

    async onBtnSearch() {
      this.getExecBatch();
      this.searchOrdList();
    },

    showData(data) {
      this.form0.items = this.egInitRows(data) || [];
    },
    /**************************************************************************
     * () 차수를 조회한다.
     **************************************************************************/
    async getExecBatch() {
      // test
      // console.log("test batch");
      // this.commonData.workBatch = [];
      // for (let i = 0; i < 5; i++) {
      //   this.commonData.workBatch.push({
      //     text: i + "kkk",
      //     value: i + "kkk"
      //   });
      // }
      // return;
      // tes end

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

        const res = await execOrd.searchExecWorkBatch({
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
    async searchOrdList() {
      if (!this.filterQuery.workDate) {
        this.$alert({
          title: this.$t("common.searchFailed"),
          message: this.$t("wcs.common.pleaseSelectDate")
        });
        return false;
      } else {
        await this.getExecOrd();
      }
    },
    /**************************************************************************
     * 주문 수신
     *
     * @param
     **************************************************************************/
    async ordRecv(jobCode) {
      let isOk = false;

      await this.searchOrdList(); // 주문 수신 전 조회

      let lktBody = [];
      let format = "YYYY-MM-DD";

      const workDate =
        this.filterQuery.workDate.length != 10
          ? ""
          : dayjs(this.filterQuery.workDate).format(format);

      // 선택 여부와 상관없이 조회된 차수 전부 보냄
      if (this.commonData.workBatch.length > 0) {
        this.commonData.workBatch.forEach((d) => {
          lktBody.push({
            workDate: workDate,
            workType: jobCode,
            workBatch: d.value
          });
        });
      } else {
        lktBody.push({
          workDate: workDate,
          workType: jobCode,
          workBatch: ""
        });
      }

      const query = {
        lktHeader: {
          type: "REQUEST",
          call: "PAGE.WMS001.KAKAO.HY.ORDER.INBOUND.POST",
          status: "00",
          message: "",
          certificate: "",
          centerCode: this.userInfo.centerCode,
          clientCode: this.userInfo.clientCode,
          warehouseCode: this.userInfo.warehouseCode
        },
        lktBody: lktBody
      };

      try {
        this.$store.commit("app/SET_LOADING", {loading: true});

        const res = await execOrd.ordRecv(query);
        if (res.lktHeader.status === "01") {
          isOk = true;
        }

        // if (jobCode === "DPS") {

        //   this.$alert({
        //     title: this.$t("wcs.exec.execOrd.ordRecv"),
        //     message: this.$t("common.successMessage")
        //   });

        // }
      } catch (e) {
        if (e.message) {
          e.message.title = "주문수신 실패";
          this.$alert(e.message);
        } else {
          this.$alert({
            title: this.$t("주문수신 실패"),
            message: this.$t("common.searchFailedDetail")
          });
        }
      } finally {
        if (jobCode === "WCS") {
          this.$store.commit("app/SET_LOADING", {loading: false});
          this.ordRecv("DPS");
        } else {
          if (isOk) {
            setTimeout(async () => {
              this.$store.commit("app/SET_LOADING", {loading: false});
              await this.searchOrdList();

              this.$alert({
                title: this.$t("wcs.exec.execOrd.ordRecv"),
                message: this.$t("common.successMessage")
              });
            }, 3 * 60 * 1000);
          } else {
            this.$store.commit("app/SET_LOADING", {loading: false});
            //this.searchOrdList();
          }
        }
      }
    },
    async getExecOrd() {
      let lktBody = [];
      let format = "YYYY-MM-DD";
      this.form0.itemsSelected = []; // 선택 행 초기화

      const workDate =
        this.filterQuery.workDate.length != 10
          ? ""
          : dayjs(this.filterQuery.workDate).format(format);

      if (this.filterQuery.workBatch.length > 0) {
        this.filterQuery.workBatch.forEach((d) => {
          lktBody.push({
            workDate: workDate,
            workBatch: d
          });
        });
      } else {
        lktBody.push({
          workDate: workDate,
          workBatch: ""
        });
      }

      const query = {
        lktHeader: {
          type: "REQUEST",
          call: "PAGE.WORK.ORDERS.GET",
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

        const res = await execOrd.searchExecOrdList({
          id: common.encodeBase64(query)
        });

        // res.lktBody[0].facilitiesName = "";

        if (res.lktBody) {
          this.form0.items = this.egInitRows(res.lktBody) || [];

          // 로우 셀 병합
          // this.$refs.form0.mergeRow();
          // 특정 셀 더블 클릭 이벤트 주입
          this.addRowCellDbClickEvent("workDate");
          this.addRowCellDbClickEvent("workBatch");
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
      this.rowVal = row;
    },
    /**************************************************************************
     * 특정 셀 더블 클릭 이벤트 주입
     *
     * @param String headers value
     **************************************************************************/
    addRowCellDbClickEvent(fieldCode) {
      setTimeout(() => {
        this.$nextTick(() => {
          const elementArr = this.$refs.form0.$el.querySelectorAll(
            ".grid-item." + fieldCode
          );

          elementArr.forEach((d) => {
            d.addEventListener("dblclick", this.dbClickTargetedCell);
          });
        });
      }, 100);
    },
    /**************************************************************************
     * 특정 셀 더블 클릭 function
     *
     * @param $event
     **************************************************************************/
    dbClickTargetedCell() {
      setTimeout(() => {
        this.$nextTick(() => {
          if (
            this.rowVal &&
            // (this.rowVal.statusCode == 1 || this.rowVal.statusCode == "01") // 형변환 되야 함으로 == 사용
            (this.rowVal.statusCode == 0 ||
              this.rowVal.statusCode == "00" ||
              this.rowVal.statusCode == "0") // 형변환 되야 함으로 == 사용
          ) {
            // statusCode < 1 (작업지시 부터는 팝업을 띄우지 않음)
            this.openEqpCompAlloc = true;
          }
        });
      }, 100);
    },
    /**************************************************************************
     * 작업 계획
     *
     * @param
     **************************************************************************/
    async planOrd() {
      const selectedData = this.form0.itemsSelected;
      let sendData = [];
      if (selectedData && selectedData.length) {
        const planTargeted = selectedData.filter((d) => {
          // 기존코드 - statusCode 가 "01" 이 아닌 것만 작업계획 시키고 있어서 같은 기능으로 적용함
          return d.statusCode !== "10";
        });

        if (!planTargeted || !planTargeted.length) {
          this.$alert({
            title: this.$t("wcs.exec.execOrd.failPlanOrd"),
            message: this.$t("wcs.exec.execOrd.ExistPlanOrd")
          });
          return false;
        }

        // 인자 추가로 인해 중복 제거 기능 뺌 20230727
        sendData = selectedData;

        // sendData = this.removeDuplicatesByFields(
        //   planTargeted,
        //   "workDate",
        //   "workBatch"
        // );
      } else {
        this.$alert({
          type: "warn",
          title: this.$t("common.info"), // 알림
          message: this.$t("wcs.common.notExistData")
        });
        return false;
      }

      let lktBody = sendData.map((d) => {
        return {
          workDate: d.workDate,
          workBatch: d.workBatch,
          facilitiesType: d.facilitiesType,
          workSubBatch: d.workSubBatch
        };
      });

      const query = {
        lktHeader: {
          type: "REQUEST",
          call: "PAGE.WORK.ORDERS.PUT",
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

        const res = await execOrd.execOrdPlan(query);
        if (res.lktHeader.status === "01") {
          this.searchOrdList();

          this.$alert({
            title: this.$t("wcs.exec.execOrd.planOrd"), // 작업계획
            message: this.$t("common.successMessage") // 정상처리 되었습니다.
          });
        } else {
          this.$alert({
            title: this.$t("wcs.exec.execOrd.failPlanOrd"), // 작업계획 실패
            message: res.lktHeader.message
          });
        }
      } catch (e) {
        if (e.message) {
          e.message.title = this.$t("wcs.exec.execOrd.failPlanOrd"); // 작업계획 실패
          this.$alert(e.message);
        } else {
          this.$alert({
            title: this.$t("wcs.exec.execOrd.failPlanOrd"), // 작업계획 실패
            message: this.$t("common.searchFailedDetail")
          });
        }
      } finally {
        this.$store.commit("app/SET_LOADING", {loading: false});
      }
    },
    /**************************************************************************
     * 연속 field value 중복 제거 function
     *
     * @param {Array} array 중복 제거할 배열
     * @param {String} field1 중복 체크 대상 key1
     * @param {String} field2 중복 체크 대상 key2
     **************************************************************************/
    removeDuplicatesByFields(array, field1, field2) {
      const set = new Set();
      return array.reduce((result, obj) => {
        const key = obj[field1] + "-" + obj[field2];
        if (!set.has(key)) {
          set.add(key);
          result.push(obj);
        }
        return result;
      }, []);
    },
    /**************************************************************************
     * 작업 지시
     *
     * @param
     **************************************************************************/
    async jobOrd() {
      const selectedData = this.form0.itemsSelected;
      let sendData = [];

      if (selectedData && selectedData.length) {
        // 인자 추가로 인해 중복 제거 기능 뺌 20230727
        sendData = selectedData;

        // alert(sendData[0].facilitiesCode);
        // alert(sendData[0].facilitiesName);

        let isValid = true;
        for (var i = 0; i < sendData.length; i++) {
          if (
            !sendData[i].facilitiesName ||
            sendData[i].facilitiesName.length == 0 ||
            !sendData[i].facilitiesCode ||
            sendData[i].facilitiesCode.length == 0
          ) {
            isValid = false;
            break;
          }
        }
        if (!isValid) {
          this.$alert({
            type: "error",
            title: "작업지시 실패",
            message: "설비가 선택되지 않았습니다."
          });
          return false;
        }

        // alert("ddd");
        // return;

        //   sendData = this.removeDuplicatesByFields(
        //     selectedData,
        //     "workDate",
        //     "workBatch"
        //   );
        // } else {
        //   this.$alert({
        //     type: "warn",
        //     title: this.$t("common.info"), // 알림
        //     message: this.$t("wcs.common.notExistData")
        //   });
        //   return false;

        let lktBody = sendData.map((d) => {
          return {
            workDate: d.workDate,
            workBatch: d.workBatch,
            facilitiesCode: d.facilitiesCode,
            facilitiesType: d.facilitiesType,
            workSubBatch: d.workSubBatch
          };
        });

        const query = {
          lktHeader: {
            type: "REQUEST",
            call: "PAGE.WORK.ORDERS.PUT",
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

          const res = await execOrd.jobOrd(query);
          if (res.lktHeader.status === "01") {
            this.searchOrdList();

            this.$alert({
              title: this.$t("wcs.exec.execOrd.jobOrd"), // 작업지시
              message: this.$t("common.successMessage") // 정상처리 되었습니다.
            });
          }
        } catch (e) {
          if (e.message) {
            e.message.title = "작업지시 실패";
            this.$alert(e.message);
          } else {
            this.$alert({
              title: "작업지시 실패",
              message: this.$t("common.searchFailedDetail")
            });
          }
        } finally {
          this.$store.commit("app/SET_LOADING", {loading: false});
        }
      } else {
        this.$alert({
          type: "warn",
          title: this.$t("common.info"), // 알림
          message: this.$t("wcs.common.notExistData")
        });
        return false;
      }
    },
    /**************************************************************************
     * 설비완료
     *
     * @param
     **************************************************************************/
    async jobEnd() {
      const selectedData = this.form0.itemsSelected;
      let sendData = [];
      if (selectedData && selectedData.length) {
        sendData = this.removeDuplicatesByFields(
          selectedData,
          "workDate",
          "workBatch"
        );
      } else {
        this.$alert({
          type: "warn",
          title: this.$t("common.info"), // 알림
          message: this.$t("wcs.common.notExistData")
        });
        return false;
      }

      let lktBody = sendData.map((d) => {
        return {
          workDate: d.workDate,
          workBatch: d.workBatch,
          workSubBatch: d.workSubBatch
        };
      });

      const query = {
        lktHeader: {
          type: "REQUEST",
          call: "PAGE.WORK.COMPLETION.PUT",
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

        const res = await execOrd.jobEnd(query);
        if (res.lktHeader.status === "01") {
          this.searchOrdList();

          this.$alert({
            title: this.$t("wcs.exec.execOrd.jobEnd"), // 설비완료
            message: this.$t("common.successMessage") // 정상처리 되었습니다.
          });
        }
      } catch (e) {
        if (e.message) {
          e.message.title = "설비완료 실패";
          this.$alert(e.message);
        } else {
          this.$alert({
            title: "설비완료 실패",
            message: this.$t("common.searchFailedDetail")
          });
        }
      } finally {
        this.$store.commit("app/SET_LOADING", {loading: false});
      }
    },
    /**************************************************************************
     * T소터완료// 일마감
     *
     * @param
     **************************************************************************/
    async tSorterEnd() {
      this.$confirm({
        title: "",
        message: "일마감을 진행합니다.", // 저장 하시겠습니까?
        show: true,
        type: "normal"
      })
        .then(async () => {
          try {
            const selectedData = this.form0.itemsSelected;
            let sendData = [];
            if (selectedData && selectedData.length) {
              sendData = this.removeDuplicatesByFields(
                selectedData,
                "workDate",
                "workBatch"
              );
            } else {
              this.$alert({
                type: "warn",
                title: this.$t("common.info"), // 알림
                message: this.$t("wcs.common.notExistData")
              });
              return false;
            }

            let lktBody = sendData.map((d) => {
              return {
                workDate: d.workDate
              };
            });

            const query = {
              lktHeader: {
                type: "REQUEST",
                call: "PAGE.WORK.COMPLETION.PUT",
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

              const res = await execOrd.tSorterEnd(query);
              if (res.lktHeader.status === "01") {
                this.searchOrdList();

                this.$alert({
                  title: this.$t("wcs.exec.execOrd.tSorterEnd"), // T소터완료
                  message: this.$t("common.successMessage") // 정상처리 되었습니다.
                });
              }
            } catch (e) {
              if (e.message) {
                e.message.title = "일마감 실패";
                this.$alert(e.message);
              } else {
                this.$alert({
                  title: "일마감 실패",
                  message: this.$t("common.searchFailedDetail")
                });
              }
            } finally {
              this.$store.commit("app/SET_LOADING", {loading: false});
            }
          } catch (e) {
            console.log(e);
          }
        })
        .catch((err) => {});
    },
    /**************************************************************************
     * 예외 피킹 변경
     *
     * @param
     **************************************************************************/
    async exceptPickChg() {
      const selectedData = this.form0.itemsSelected;
      let sendData = [];
      if (selectedData && selectedData.length) {
        sendData = this.removeDuplicatesByFields(
          selectedData,
          "workDate",
          "workBatch"
        );
      } else {
        this.$alert({
          type: "warn",
          title: this.$t("common.info"), // 알림
          message: this.$t("wcs.common.notExistData")
        });
        return false;
      }

      let isValid = true;
      for (var i = 0; i < sendData.length; i++) {
        if (["DPS"].includes(sendData[i].facilitiesType.toUpperCase())) {
          isValid = false;
          break;
        }
      }
      if (!isValid) {
        this.$alert({
          type: "error",
          title: "예외 피킹 변경 실패",
          message: "변경 할수 없는 설비 종류 입니다."
        });
        return false;
      }

      let lktBody = sendData.map((d) => {
        return {
          workDate: d.workDate,
          workBatch: d.workBatch,
          workSubBatch: d.workSubBatch,
          facilitiesType: d.facilitiesType
        };
      });

      const query = {
        lktHeader: {
          type: "REQUEST",
          call: "PAGE.WORK.ORDERS.PLAN.PUT",
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

        const res = await execOrd.exceptPickChg(query);
        if (res.lktHeader.status === "01") {
          this.searchOrdList();

          this.$alert({
            title: "예외 피킹 변경",
            message: this.$t("common.successMessage") // 정상처리 되었습니다.
          });
        }
      } catch (e) {
        if (e.message) {
          e.message.title = "예외 피킹 변경 실패";
          this.$alert(e.message);
        } else {
          this.$alert({
            title: "예외 피킹 변경 실패",
            message: this.$t("common.searchFailedDetail")
          });
        }
      } finally {
        this.$store.commit("app/SET_LOADING", {loading: false});
      }
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
          const data = res.lktBody.map((d) => {
            // return {text: d.masterNameValue, value: d.masterCodeValue};
            return d.masterCodeValue;
          });
          this.commonData.eqp = data.filter((d) => {
            return d.indexOf("3D") > -1;
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
    editRow(editRow) {
      // 여기서 수정한 로우의 추가적인 작업 가능
      // console.log("editRow", editRow);

      editRow.facilitiesCode = editRow.facilitiesName;
      for (let i = 0; i < this.form0.itemsSelected.length; i++) {
        if (this.form0.itemsSelected[i].rownum === editRow.rownum) {
          this.form0.itemsSelected[i] = editRow;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .vue3-easy-data-table__main {
  height: calc(
    100vh - var(--top-height) - 350px - var(--grid-footer-height)
  ) !important;
}

button.v-btn.v-theme--light.v-btn--density-default.rounded-lg.v-btn--size-default.v-btn--variant-outlined.bg-surface-btn.text-surface-text.btn-border-color.font-weight-regular {
  width: 140px;
}
</style>
