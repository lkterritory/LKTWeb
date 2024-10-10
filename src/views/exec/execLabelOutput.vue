<!-----------------------------------------------------------------------------
 | title: 라벨출력
 | creator: JSW
 | date : 2023-02-01
 | description: execLabelOutput View
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
                <!-- 출고일자 -->
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
                <!-- 출고일자 -->
                <!-- 작업차수 -->
                <v-col cols="auto">
                  <div class="search-item rounded-lg">
                    <v-responsive width="390">
                      <v-select
                        :items="commonData.workBatch"
                        v-model="filterQuerySelect.workBatch"
                        item-title="text"
                        item-value="value"
                        variant="plain"
                        density="compact"
                        hide-details="false"
                        single-line>
                        <template v-slot:prepend>
                          <v-label class="search-item-divider">
                            작업차수
                          </v-label>
                        </template>
                      </v-select>
                    </v-responsive>
                  </div>
                </v-col>
                <!-- 작업차수 -->
                <!-- 설비코드 -->
                <v-col cols="auto">
                  <div class="search-item rounded-lg">
                    <v-responsive width="390">
                      <v-select
                        v-model="filterQuerySelect.eqp"
                        :items="commonData.eqp"
                        item-title="text"
                        item-value="value"
                        variant="plain"
                        density="compact"
                        hide-details="false"
                        :placeholder="
                          this.$t(
                            `wcs.exec.popup.execEqpCompAlloc.eqpPlaceholder`
                          )
                        "
                        single-line>
                        <template v-slot:prepend>
                          <v-label class="modal-item-divider labels">
                            설비종류
                          </v-label>
                        </template>
                      </v-select>
                    </v-responsive>
                  </div>
                </v-col>
                <!-- 설비코드 -->
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
                    @click="searchOrdList()">
                    <!-- 조회 -->
                    {{ "조회" }}
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
                    @click="outputSelect()">
                    <!-- 조회 -->
                    {{ "출력" }}
                  </v-btn>
                </template>
              </v-hover>
            </v-col>
            <!-- 버튼 -->
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row
      class="px-8"
      v-if="true">
      <v-checkbox-btn
        :color="isSelectedSome ? 'indigo-darken-4' : undefined"
        :indeterminate="isSelectedSome && !isSelectedAll"
        :model-value="isSelectedAll"
        @click="toggle"
        :label="$t(`common.selectedAll`)"></v-checkbox-btn>
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
            :headers="form0.headers"
            :items="form0.items"
            :current-page="form0.pagination.currentPage"
            :rows-per-page="100000"
            hide-footer
            @click-row="rowClick"
            :selected="form0.itemsSelected"
            hasC />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

import common from "@/utils/common";
import * as filters from "@/filters";
import * as execOrd from "@/api/exec/execOrd.js";
import * as execLabelOutput from "@/api/exec/execLabelOutput.js";
import dayjs from "dayjs";
import * as mastApi from "@/api/mast/mastApi";
import * as execChecker from "@/api/exec/execChecker.js";
import zebra from "@/utils/printer/zebra";
import editGrid from "@/mixins/editGrid";

export default {
  name: "execLabelOuput",
  // 추가 components (별도의 모듈 추가)
  components: {},
  // 추가 mixins (별도의 기능 추가)
  mixins: [editGrid],
  // 반복적으로 연산되는 데이터 처리(state, complex data 등)
  computed: {
    ...mapGetters(["userInfo"]),

    isSelectedSome() {
      return this.form0.itemsSelected.length > 0;
    },
    isSelectedAll() {
      if (this.form0.items.length == 0) return false;

      return this.form0.items.length === this.form0.itemsSelected.length;
    }
  },
  // 반복적인 렌더링이 들어가는 데이터 처리
  watch: {
    filterQuery: {
      handler(val) {
        if (!val.workDate) return;
        // 작업차수 조회
        this.getExecBatch();
        // 그리드 조회
        this.searchOrdList();
      },
      deep: true
    },
    commonData: {
      handler(val) {
        if (!val.eqp) return;
      },
      deep: true
    }
  },

  // 데이터(이 페이지에서 사용할 변수)
  data() {
    return {
      rowVal: undefined,
      commonData: {
        workBatch: [],
        eqp: []
      },
      filterQuerySelect: {
        workBatch: "",
        eqp: "",
        heterogeneous: ""
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
            text: "주문번호",
            value: "orderNumber",
            align: "center",
            width: "auto",
            sortable: true,
            filter: true
          },
          {
            text: "프린트코드",
            value: "printCode",
            align: "left",
            width: "auto",
            sortable: true,
            filter: true
          },
          {
            text: "셀",
            value: "cellSorter",
            align: "left",
            width: 200,
            sortable: true,
            filter: true
          },
          {
            text: "셀번호",
            value: "cellSorternumber",
            align: "left",
            width: 200,
            sortable: true,
            filter: true
          },

          {
            text: "품목수", // 품목수
            value: "totalPlanSkuCount",
            align: "right",
            width: 150,
            sortable: true,
            formatter: (value) => {
              if (!isNaN(value)) {
                return filters.toThousandFilter(value);
              } else {
                return value;
              }
            }
          },
          {
            text: "낱개수", // 낱개수
            value: "totalPlanQuantity",
            align: "right",
            width: 150,
            sortable: true,
            formatter: (value) => {
              if (!isNaN(value)) {
                return filters.toThousandFilter(value);
              } else {
                return value;
              }
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
    toggle(event) {
      if (this.isSelectedAll) {
        this.form0.itemsSelected = [];
      } else {
        this.form0.itemsSelected = common.deepCopyObject(this.form0.items);
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
     * () 차수를 조회한다.
     **************************************************************************/
    async getExecBatch() {
      // test
      // for (let i = 0; i < 5; i++) {
      //   this.commonData.workBatch.push({
      //     text: i + "kkk",
      //     value: i + "kkk"
      //   });
      // }
      // return;

      // test end

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
    searchOrdList() {
      zebra.setup();

      // test
      // let tmpData = [];
      // this.$nextTick(); // 이후 실행
      // for (let i = 0; i < 100; i++) {
      //   tmpData.push({
      //     orderNumber: "2442001" + i,
      //     printCode: "DA1NAG244200101" + i,
      //     cellSorter: null,
      //     cellSorternumber: null,
      //     totalPlanSkuCount: 6,
      //     totalPlanQuantity: 96
      //   });
      // }
      // this.form0.items = this.egInitRows(tmpData) || [];
      // return;

      // test end

      if (!this.filterQuery.workDate) {
        this.$alert({
          title: this.$t("common.searchFailed"),
          message: this.$t("wcs.common.pleaseSelectDate")
        });
        return false;
      } else {
        if (
          this.filterQuerySelect.eqp != "" &&
          this.filterQuerySelect.workBatch != "" > 0
        ) {
          this.getExecOrd();
        }
      }
    },
    async outputSelect() {
      //this.form0.itemsSelected = [];

      await this.outputPrintSelected();
    },
    outputAll() {
      //this.form0.itemsSelected = [];

      // let printInfos = common.deepCopyObject(this.resData.lktItems);
      // printInfos = printInfos.filter(
      //   (value, index, self) =>
      //     index === self.findIndex((item) => item.printCode === value.printCode)
      // );

      this.outputPrintSelected();
    },
    async outputPrintSelected() {
      for (const prt of this.form0.itemsSelected) {
        try {
          this.$store.commit("app/SET_LOADING", {loading: true});
          const query = {
            lktHeader: {
              type: "REQUEST",
              call: "PAGE.TALLY.LABEL.GET",
              status: 0,
              message: "",
              encryption: "",
              centerCode: this.userInfo.centerCode,
              clientCode: this.userInfo.clientCode,
              warehouseCode: this.userInfo.warehouseCode
            },
            lktBody: [
              {
                orderNumber: prt.orderNumber,
                toteBox: "",
                printCode: prt.printCode,
                userId: this.userInfo.userId
              }
            ]
          };

          const res = await execChecker.labelExecChecker({
            id: common.encodeBase64(query)
          });

          if (Object.keys(res.lktBody).length <= 0) {
            this.$alert({
              title: this.$t("common.searchFailed"),
              message: this.$t("wcs.exec.execChecker.emptyLabelMessage")
            });

            return false;
          }

          if (res.lktHeader.status === "01") {
            this.isReport = true;

            this.$nextTick(); // 이후 실행

            // if (this.resData.printType === "FM") {
            //   this.outputZPrintFm("usb", res);
            //   // await this.$refs.report.directPrint("HNW_HY_FM_Lable", res);
            // } else if (this.resData.printType === "INVOICE") {
            //   this.outputZPrintInvoice("usb", res);
            //   // await this.$refs.report.directPrint(
            //   //   "HNW_HY_WaybillNumber_Label",
            //   //   res
            //   // );
            // } else {
            this.outputZPrintMeal("usb", res);

            // }
          }
        } catch (e) {
          if (JSON.stringify(e) == "{}") {
            this.$alert({
              title: "알림",
              message: "프린트 연결 실패"
            });
          } else if (e.message) {
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
      }

      //this.form0.itemsSelected.forEach(async (prt) => {
      // try {
      //   this.$store.commit("app/SET_LOADING", {loading: true});
      //   const query = {
      //     lktHeader: {
      //       type: "REQUEST",
      //       call: "PAGE.TALLY.LABEL.GET",
      //       status: 0,
      //       message: "",
      //       encryption: "",
      //       centerCode: this.userInfo.centerCode,
      //       clientCode: this.userInfo.clientCode,
      //       warehouseCode: this.userInfo.warehouseCode
      //     },
      //     lktBody: [
      //       {
      //         orderNumber: prt.orderNumber,
      //         toteBox: "",
      //         printCode: prt.printCode,
      //         userId: this.userInfo.userId
      //       }
      //     ]
      //   };
      //   const res = await execChecker.labelExecChecker({
      //     id: common.encodeBase64(query)
      //   });
      //   if (Object.keys(res.lktBody).length <= 0) {
      //     this.$alert({
      //       title: this.$t("common.searchFailed"),
      //       message: this.$t("wcs.exec.execChecker.emptyLabelMessage")
      //     });
      //     return false;
      //   }
      //   if (res.lktHeader.status === "01") {
      //     this.isReport = true;
      //     this.$nextTick(); // 이후 실행
      //     // if (this.resData.printType === "FM") {
      //     //   this.outputZPrintFm("usb", res);
      //     //   // await this.$refs.report.directPrint("HNW_HY_FM_Lable", res);
      //     // } else if (this.resData.printType === "INVOICE") {
      //     //   this.outputZPrintInvoice("usb", res);
      //     //   // await this.$refs.report.directPrint(
      //     //   //   "HNW_HY_WaybillNumber_Label",
      //     //   //   res
      //     //   // );
      //     // } else {
      //     this.outputZPrintMeal("usb", res);
      //     // }
      //   }
      // } catch (e) {
      //   if (JSON.stringify(e) == "{}") {
      //     this.$alert({
      //       title: "알림",
      //       message: "프린트 연결 실패"
      //     });
      //   } else if (e.message) {
      //     this.$alert(e.message);
      //   } else {
      //     this.$alert({
      //       title: this.$t("common.searchFailed"),
      //       message: this.$t("common.searchFailedDetail")
      //     });
      //   }
      // } finally {
      //   this.$store.commit("app/SET_LOADING", {loading: false});
      // }
      //});
    },

    async getExecOrd() {
      let lktBody = [];
      let format = "YYYY-MM-DD";
      this.form0.itemsSelected = []; // 선택 행 초기화

      const workDate =
        this.filterQuery.workDate.length != 10
          ? ""
          : dayjs(this.filterQuery.workDate).format(format);

      lktBody.push({
        workDate: workDate,
        workBatch: this.filterQuerySelect.workBatch,
        facilitiesType: this.filterQuerySelect.eqp
      });

      const query = {
        lktHeader: {
          type: "REQUEST",
          call: "FACILITIES.AWOO.AUTOLABEL.GET",
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

        const res = await execLabelOutput.searchExecOrdList({
          id: common.encodeBase64(query)
        });

        // res.lktBody[0].facilitiesName = "";

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
      }
    },
    outputZPrintMeal(printCode, printData) {
      // printData = {
      //   lktHeader: {
      //     type: "RESPONSE",
      //     call: "PAGE.TALLY.GET",
      //     status: "01",
      //     message: null,
      //     certificate: "",
      //     centerCode: "HYCBT",
      //     clientCode: "HY_CBT",
      //     warehouseCode: "HY_NONSAN_CBT"
      //   },
      //   lktBody: [
      //     {
      //       centerCode: "HYCBT",
      //       clientCode: "HY_CBT",
      //       warehouseCode: "HY_NONSAN_CBT",
      //       workBatch: "20230719",
      //       workDate: "906",
      //       orderNumber: "24907",
      //       vehicleDockNumber: "00",
      //       toWarehouseCode: "HY_GWANGJU_CBT",
      //       toWarehouseName: "hy 광주물류센터",
      //       shipToCode: "25161",
      //       shipToName: "정읍점_고창스톡",
      //       deliveryType: "FM",
      //       receiveName: "유상현",
      //       receiveAddress: "서울시도봉구XXXXXX",
      //       receiveAddressShortHand: "서울시도봉구",
      //       receivePhoneNumber: "010-1234-5672",
      //       receivePostCode: "031193",
      //       sendName: "조형",
      //       sendAddress: "서울시중랑구XXXXXX",
      //       sendPhoneNumber: "서울시중랑구",
      //       deliveryMessage: "-",
      //       deliveryMan: "20",
      //       facilitiesType: "3D-SORTER",
      //       facilitiesCode: "3D-SORTER#1",
      //       facilitiesLocation: "A120-20",
      //       printType: "FM",
      //       printCode: "3D1N7V612000001",
      //       etcCode: "-",
      //       boxCount: "1/-",
      //       skuCode_1: "33869",
      //       skuName_1: "-",
      //       tallyQty_1: 1
      //     }
      //   ]
      // };

      let arrBody = printData.lktBody;
      if (arrBody.length <= 0) return;

      let body = arrBody[0];

      let arrKeys = Object.keys(body);
      arrKeys.forEach((key) => {
        if (body[key] === null || body[key] === "null") {
          body[key] = "";
        }
      });

      try {
        let zplData =
          "^XA\n\n" +
          "" +
          "^SEE:UHANGUL.DAT^FS\n" +
          "^CW1,E:KFONT3.FNT^CI26^FS\n" +
          "^CI28\n\n" +
          "" +
          "^PW900\n" +
          "^LH40,40\n" +
          "^FWB\n\n\n" +
          "" +
          "" +
          "^FO10,0^A1,30,30^FB700,1,0,R^FD / " +
          body.deliveryMan +
          "   ^FS\n" +
          "^FO60,0^A1,30,30^FB700,1,0,R^FD" +
          body.boxCount +
          "     ^FS\n\n" +
          // "^FT35,650^A1,40,40^FD" +
          // body.shipToCode +
          // "^FS\n" +
          "^FT100,700^A1,50,50^FD" +
          body.toWarehouseName +
          "^FS\n" +
          "" +
          "^FT160,910^A1,25,25^FD" +
          (body.skuName_1 ? body.skuName_1 + " / " : "") +
          (body.tallyQty_1 ? body.tallyQty_1 : "") +
          "^FS\n" +
          "^FT220,910^A1,25,25^FD" +
          (body.skuName_2 ? body.skuName_2 + " / " : "") +
          (body.tallyQty_2 ? body.tallyQty_2 : "") +
          "^FS\n" +
          "^FT280,910^A1,25,25^FD" +
          (body.skuName_3 ? body.skuName_3 + " / " : "") +
          (body.tallyQty_3 ? body.tallyQty_3 : "") +
          "^FS\n" +
          "^FT340,910^A1,25,25^FD" +
          (body.skuName_4 ? body.skuName_4 + " / " : "") +
          (body.tallyQty_4 ? body.tallyQty_4 : "") +
          "^FS\n" +
          "^FT400,910^A1,25,25^FD" +
          (body.skuName_5 ? body.skuName_5 + " / " : "") +
          (body.tallyQty_5 ? body.tallyQty_5 : "") +
          "^FS\n" +
          "^FT460,910^A1,25,25^FD" +
          (body.skuName_6 ? body.skuName_6 + " / " : "") +
          (body.tallyQty_6 ? body.tallyQty_6 : "") +
          "^FS\n" +
          "^FT520,910^A1,25,25^FD" +
          (body.skuName_7 ? body.skuName_7 + " / " : "") +
          (body.tallyQty_7 ? body.tallyQty_7 : "") +
          "^FS\n" +
          "" +
          "^FO625,0^A1,30,30^FB700,1,0,R^FD" +
          body.shipToCode +
          "^FS\n" +
          "^FO665,0^A1,30,30^FB700,1,0,R^FD" +
          body.workBatch +
          "^FS\n" +
          "^FO715,0^A1,25,25^FB700,1,0,R^FD" +
          body.facilitiesLocation +
          "^FS\n\n\n" +
          "" +
          "" +
          "^FT715,910^BY3\n" +
          "^BC,130,Y,N,N^FD" +
          body.printCode +
          "^FS\n\n\n" +
          "" +
          "" +
          "^XZ";

        console.log("zplData Meal:\r\n" + zplData);

        zebra.writeToSelectedPrinter(printCode, zplData);
      } catch (e) {
        console.warn(e.message);
      }
    },

    /**************************************************************************
     * 로우 클릭 function
     *
     * @param {Object} row Grid Row Object
     **************************************************************************/
    rowClick(row) {
      //this.rowVal = row;
      //row.selected = !row.selected;
      //this.form0.itemsSelected = [row];
      //alert(JSON.stringify(this.form0.itemsSelected));
      // 행을 클릭할 때마다 선택 상태를 토글
      // const index = this.form0.itemsSelected.findIndex(
      //   (item) =>
      //     item.orderNumber === row.orderNumber &&
      //     item.printCode === row.printCode
      // );
      // if (row.selected) {
      //   this.form0.itemsSelected.push(row);
      // } else {
      //   const index = this.form0.itemsSelected.findIndex(
      //     (item) => item.id === row.id
      //   );
      //   if (index !== -1) {
      //     this.form0.itemsSelected.splice(index, 1);
      //   }
      // }
      //this.form0.itemsSelected.push(row);
      // if (index === -1) {
      //   this.form0.itemsSelected.push(row);
      // } else {
      //   // this.form0.itemsSelected.splice(index, 1);
      // }
      // alert(JSON.stringify(this.form0.itemsSelected));
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .vue3-easy-data-table__main {
  height: calc(
    100vh - var(--top-height) - 280px - var(--grid-footer-height)
  ) !important;
}

button.v-btn.v-theme--light.v-btn--density-default.rounded-lg.v-btn--size-default.v-btn--variant-outlined.bg-surface-btn.text-surface-text.btn-border-color.font-weight-regular {
  width: 140px;
}
</style>
