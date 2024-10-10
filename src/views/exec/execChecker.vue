<!-----------------------------------------------------------------------------
 | title: 검수
 | creator: JSW
 | date : 2023-02-08
 | description: execChecker View
 | composition:
 |  <template />
 |  <script />
 |  <style />
 ----------------------------------------------------------------------------->
<template>
  <div>
    <!-- top -->
    <v-row>
      <v-col cols="12">
        <v-card
          class="search-form bg-primary-form border-color d-flex justify-start align-center"
          variant="outlined"
          rounded="lg">
          <v-row class="h-auto w-100 pa-0 ma-0">
            <v-col>
              <v-row>
                <!-- 검색조건 영역 -->
                <v-col>
                  <v-row justify="space-between">
                    <v-col
                      cols="3"
                      class="check-left-top-item item-margin">
                      <!-- 주문번호 -->
                      <div class="search-item small rounded-lg">
                        <v-responsive width="400">
                          <v-text-field
                            v-model="orderNumber"
                            type="input"
                            variant="plain"
                            hide-details="false"
                            solo
                            readonly>
                            <template v-slot:prepend>
                              <v-label class="search-item-divider">
                                <!-- 주문번호 -->
                                {{ $t(`wcs.common.orderNumber`) }}
                              </v-label>
                            </template>
                          </v-text-field>
                        </v-responsive>
                      </div>

                      <!-- 박스번호 -->
                      <div class="search-item small rounded-lg">
                        <v-responsive width="400">
                          <v-text-field
                            v-model="boxCode"
                            type="input"
                            variant="plain"
                            hide-details="false"
                            solo
                            readonly>
                            <template v-slot:prepend>
                              <v-label class="search-item-divider">
                                <!-- 박스번호 -->
                                {{ $t(`wcs.exec.execChecker.boxNumber`) }}
                              </v-label>
                            </template>
                          </v-text-field>
                        </v-responsive>
                      </div>
                      <!-- 박스번호 -->

                      <!-- 웨이브 -->
                      <div class="search-item small rounded-lg">
                        <v-responsive width="400">
                          <v-text-field
                            v-model="workBatch"
                            type="input"
                            variant="plain"
                            hide-details="false"
                            solo
                            readonly>
                            <template v-slot:prepend>
                              <v-label class="search-item-divider">
                                <!-- 웨이브 -->
                                {{ $t(`wcs.exec.execChecker.workBatch`) }}
                              </v-label>
                            </template>
                          </v-text-field>
                        </v-responsive>
                      </div>
                      <!-- 웨이브 -->

                      <!-- 화주사 -->
                      <div class="search-item small rounded-lg">
                        <v-responsive width="400">
                          <v-text-field
                            v-model="partnerCompanyName"
                            type="input"
                            density="compact"
                            variant="plain"
                            hide-details="false"
                            solo
                            readonly>
                            <template v-slot:prepend>
                              <v-label class="search-item-divider">
                                <!-- 화주사 -->
                                {{
                                  $t(`wcs.exec.execChecker.partnerCompanyName`)
                                }}
                              </v-label>
                            </template>
                          </v-text-field>
                        </v-responsive>
                      </div>
                      <!-- 화주사 -->
                    </v-col>
                    <!-- 검수진행상황판 -->
                    <v-col
                      cols="cols"
                      class="checker-wrap-items item-margin">
                      <v-col
                        class="checker-items-title"
                        cols="cols">
                        {{ $t(`wcs.exec.execChecker.typeCount`) }}
                      </v-col>
                      <v-col
                        cols="cols"
                        class="d-flex justify-center align-center checker-top-text font40">
                        <v-col
                          cols="auto"
                          class="yellow-text">
                          <!-- 택배유형 -->
                          {{ this.deliveryType }}</v-col
                        >/<v-col
                          cols="auto"
                          class="basic-text">
                          <!-- 포장유형 -->
                          {{ this.packageType }}</v-col
                        >
                      </v-col>
                    </v-col>
                    <v-col
                      cols="cols"
                      class="checker-wrap-items item-margin">
                      <v-col
                        class="checker-items-title"
                        cols="cols">
                        {{ $t(`wcs.exec.execChecker.skuQty`) }}
                      </v-col>
                      <v-col
                        cols="cols"
                        class="d-flex justify-center align-center checker-top-text font60">
                        <v-col
                          cols="auto"
                          class="yellow-text">
                          <!-- 검수 상품개수 -->
                          {{ this.confirmSkuCount }}</v-col
                        >/<v-col
                          cols="auto"
                          class="basic-text">
                          <!-- 총 상품개수 -->
                          {{ this.skuCount }}</v-col
                        >
                      </v-col>
                    </v-col>
                    <v-col
                      cols="cols"
                      class="checker-wrap-items item-margin">
                      <v-col
                        class="checker-items-title"
                        cols="cols">
                        {{ $t(`wcs.common.totalPcs`) }}
                      </v-col>
                      <v-col
                        cols="cols"
                        class="d-flex justify-center align-center checker-top-text font60">
                        <v-col
                          cols="auto"
                          class="yellow-text">
                          <!-- 검수 낱개수량 -->
                          {{ this.confirmPcsTotal }}</v-col
                        >/<v-col
                          cols="auto"
                          class="basic-text">
                          <!-- 총 낱개수량 -->
                          {{ this.pcsTotal }}</v-col
                        >
                      </v-col>
                    </v-col>
                    <v-col
                      cols="cols"
                      class="checker-wrap-items">
                      <v-col
                        class="checker-items-title"
                        cols="cols">
                        {{ $t(`wcs.exec.execChecker.check`) }}
                      </v-col>
                      <v-col
                        v-model="percent"
                        class="checker-items d-flex justify-center align-center yellow-text"
                        cols="cols">
                        <!-- 검수진행 -->
                        {{ percent }}%
                      </v-col>
                    </v-col>
                    <!-- 검수진행상황판 -->
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <!-- top -->
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
                    <!-- 바코드 -->
                    <v-form
                      v-on:submit.prevent
                      ref="form1"
                      lazy-validation
                      @submit.prevent>
                      <v-col cols="auto">
                        <div class="search-item rounded-lg">
                          <v-responsive width="390">
                            <v-text-field
                              ref="barcode"
                              type="input"
                              v-model="barcode"
                              @keyup.enter="barcodeInput"
                              :rules="rules.barcode"
                              autofocus
                              variant="plain"
                              hide-details="false"
                              :placeholder="
                                this.$t(`wcs.exec.execChecker.infoMessage`)
                              "
                              clearable
                              solo>
                              <template v-slot:prepend>
                                <v-label class="search-item-divider">
                                  <v-img
                                    :src="
                                      require(`@/assets/images/icon-barcode-reader.png`)
                                    "></v-img
                                  >&nbsp;
                                  <!-- 바코드 -->
                                  {{ $t(`wcs.exec.execChecker.barcode`) }}
                                </v-label>
                              </template>
                            </v-text-field>
                          </v-responsive>
                        </div>
                      </v-col>
                    </v-form>
                    <!-- 바코드 -->
                    <v-col
                      cols="auto"
                      class="sku-text">
                      <v-label>{{ barcodeSkuName }}</v-label>
                    </v-col>
                    <v-spacer></v-spacer>
                    <!-- 라디오버튼 -->
                    <v-col cols="auto">
                      <v-card-text>
                        <v-radio-group
                          hide-details
                          class="radio-group d-flex justify-end"
                          v-model="checkType"
                          @click="onClickCheck()"
                          inline>
                          <v-radio
                            class="radio-item"
                            :label="this.$t(`wcs.exec.execChecker.CheckOne`)"
                            value="one"></v-radio>
                          <v-radio
                            class="radio-item"
                            :label="this.$t(`wcs.exec.execChecker.CheckAll`)"
                            value="all"></v-radio>
                        </v-radio-group>
                      </v-card-text>
                    </v-col>
                    <!-- 라디오버튼 -->
                    <!-- 버튼영역 -->
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
                          @click="qtyBarcode(this.barcode)">
                          <!-- 검수 -->
                          {{ $t(`wcs.exec.execChecker.Check`) }}
                        </v-btn>
                      </template>
                    </v-hover>
                    <v-hover v-if="false">
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
                          @click="onBtnBoxDiv(this.barcode)">
                          <!-- 박스분할 -->
                          {{ $t(`wcs.exec.execChecker.onBtnBoxDiv`) }}
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
                          @click="rePrint()">
                          <!-- 재출력 -->
                          {{ $t(`wcs.exec.execChecker.rePrint`) }}
                        </v-btn>
                      </template>
                    </v-hover>
                    <!-- 버튼영역 --></v-row
                  >
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- middle -->
    <v-row class="inner-content">
      <!-----------------------------------------------------------------------
        | Main
        ----------------------------------------------------------------------->
      <v-col
        cols="12"
        class="h-100">
        <Framework-table
          ref="form0"
          :headers="form0.headers"
          :items="form0.items"
          :current-page="form0.pagination.currentPage"
          :rows-per-page="100000"
          hide-footer
          :selected="form0.itemsSelected"
          :bodyRowAddClassName="rowClass0"
          @click-row="rowClick">
        </Framework-table>
      </v-col>
    </v-row>

    <checker-mapping
      :popTitle="checkerMappingObj.popTitle"
      :isDivOk="checkerMappingObj.isDivOk"
      :isOpen="checkerMappingObj.openPop"
      @close="closePopup()"
      :param="checkerMappingObj.param"
      :param2="checkerMappingObj.param2"
      :labelCode="checkerMappingObj.labelCode"
      @boxDivProc="boxDivProc()"
      @save="savePop(this.boxCode)" />

    <Report
      v-if="isReport"
      ref="report"
      :isReport="isReport"
      :isShow="false"></Report>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import editGrid from "@/mixins/editGrid";
import common from "@/utils/common";
import * as filters from "@/filters";
// import bixolon from "@/utils/printer/bixolon"; // 빅솔론 프린터 유틸
import zebra from "@/utils/printer/zebra"; // 지브라 프린터 유틸 ( 차후 호출 안하는 쪽으로 변경 )
import * as execChecker from "@/api/exec/execChecker.js";
import checkerMapping from "./popup/execCheckerMapping";
import * as sounds from "@/assets/sounds";
// import VueBarcode from "@chenfengyuan/vue-barcode";

export default {
  name: "execChecker",
  // 추가 components (별도의 모듈 추가)
  // 추가 components (별도의 모듈 추가)
  components: {
    checkerMapping
  },
  // 추가 mixins (별도의 기능 추가)
  mixins: [editGrid],
  // 반복적으로 연산되는 데이터 처리(state, complex data 등)
  computed: {
    ...mapGetters(["userInfo"])
  },
  props: {
    // 예외피킹 메뉴에서 호출하는 팝업 용도
    param: {
      type: Object,
      default: null
    }
  },
  // 반복적인 렌더링이 들어가는 데이터 처리
  watch: {
    barcode(n, o) {
      if (n) {
        const value = this.$inko.ko2en(n); // 한 -> 영 변환
        const noEngRule = /^[a-zA-Z0-9\-]*$/; // 영문 (소,대), 숫자, 하이픈
        if (!noEngRule.test(value)) {
          this.barcode = o.toUpperCase();
        } else {
          this.barcode = value.toUpperCase();
        }
      }
    },
    commandKeyDown(v) {
      if (v) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          this.$nextTick(() => {
            this.commandKeyDown = "";
            this.timer = null;
          });
        }, 1000);
      }
    },
    // 예외피킹 메뉴에서 호출하는 팝업 용도
    param: {
      immediate: true,
      handler(val) {
        if (!val) return;

        // 주문번호로 검수 조회
        this.barcode = val.orderNumber;
        this.$nextTick(() => {
          // 주문번호로 검수 조회 할 예정
          this.boxBarcode(val.orderNumber);
          // this.barcodeInput();
        });
      },
      deep: false
    }
  },
  // 데이터(이 페이지에서 사용할 변수)
  data() {
    return {
      timer: null,
      commandKeyDown: "",
      isCheckEvent: false,
      checkerMappingObj: {
        popTitle: "박스맵핑",
        isDivOk: false,
        openPop: false,
        mode: "",
        param: {}, // 검수조회 응답값
        param2: {}, // 박스분할 응답값
        labelCode: [] // 라벨코드(재발행일때만 사용)
      },
      resData: {},
      resDataSplit: {},
      isReport: false,
      ordNo: "",
      rowVal: "",
      boxCode: "",
      barcode: "",
      orderNumber: "",
      workBatch: "",
      partnerCompanyName: "",
      checkType: "one",
      confirmQty: 0,
      percent: 0,
      skuCount: 0,
      pcsTotal: 0,
      deliveryType: "",
      packageType: "",
      confirmSkuCount: 0,
      confirmPcsTotal: 0,
      // 임시 주석
      // 상품 마스터에서 조회 -> 그리드에서 가져오기로 변경
      // mastSkuArr: [],
      barcodeSkuName: "",
      isReprint: false, // -> 재발행으로 출력하는지 구분
      form0: {
        itemsSelected: [], // checkbox response data
        headers: [
          {
            text: this.$t("wcs.common.skuCode"), // 상품코드
            value: "skuCode",
            align: "left",
            width: "150",
            sortable: true,
            filter: true
          },
          // {
          //   text: "바코드",
          //   value: "skuBarcode",
          //   align: "left",
          //   width: "auto",
          //   sortable: true,
          //   filter: true,
          //   editItem: {
          //     type: "barcode"
          //   }
          // },
          {
            // 온도대
            text: this.$t("wcs.exec.execChecker.skuTemperature"),
            value: "skuTemperature",
            align: "left",
            width: "150",
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
            text: this.$t("wcs.exec.execChecker.orderQty"), // 예정수량
            value: "orderQty",
            align: "right",
            width: "150",
            sortable: true,
            formatter: (value) => {
              return filters.toThousandFilter(value);
            },
            filter: true
          },
          {
            text: this.$t("wcs.exec.execChecker.pickQty"), // 피킹수량
            value: "pickQty",
            align: "right",
            width: "150",
            sortable: true,
            formatter: (value) => {
              return filters.toThousandFilter(value);
            },
            filter: true
          },
          {
            text: this.$t("wcs.exec.execChecker.confirmQty"), // 검수수량
            value: "confirmQty",
            align: "right",
            width: "150",
            sortable: true,
            formatter: (value) => {
              return filters.toThousandFilter(value);
            },
            filter: true
          },
          {
            text: this.$t("wcs.common.statusName"), // 상태명
            value: "statusName",
            align: "left",
            width: "130",
            sortable: true,
            filter: true
          },
          {
            text: "라벨코드",
            value: "printCode",
            align: "left",
            width: "auto",
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
      rules: {
        barcode: [
          (v) =>
            !!v ||
            this.$t("wcs.common.validate.required", [
              this.$t("wcs.exec.execChecker.barcode")
            ])
        ]
      }
    };
  },
  created() {
    // this.init();
    // this.searchSkuList();

    //8001442, 8001441, 8001398, 8001399, 8001400, 8001443
    // let tmpp = {skuCode: "8001441"};
    // alert(this.isSkuVar(tmpp));

    zebra.setup();
  },
  mounted() {
    /***************************************************************************
     * 화면 내 키 입력 이벤트
     **************************************************************************/
    //if (!this.isCheckEvent)
    window.removeEventListener("keydown", this.inputKeyDown);
    window.addEventListener("keydown", this.inputKeyDown);
    this.isCheckEvent = true;

    // this.barcodeSkuName =
    //   "해당 상품은 검수 대상이 아닙니다.해당 상품은 검수 대상이 아닙니다.해당 상품은 검수 대상이 아닙니다.";

    // this.checkerMappingObj.popTitle = "테스트";
    // this.checkerMappingObj.labelCode = [
    //   // {
    //   //   printCode: "3N112233445566"
    //   // },
    //   // {
    //   //   printCode: "3N999999999999"
    //   // }
    // ];
    // this.checkerMappingObj.openPop = true;
    // this.checkerMappingObj.isDivOk = false;

    // setTimeout(() => {
    //   this.$alert({
    //     type: "error",
    //     title: "테스트",
    //     message: "테스트메시지"
    //   });
    // }, 5000);

    //

    // this.checkerMappingObj.isDivOk = false;

    // setTimeout(() => {
    //   this.checkerMappingObj.openPop = true;
    //   this.checkerMappingObj.isDivOk = true;
    //   setTimeout(() => {
    //     this.checkerMappingObj.openPop = true;
    //     this.checkerMappingObj.isDivOk = true;
    //   }, 3000);
    // }, 3000);
  },
  activated() {
    /***************************************************************************
     * 화면 내 키 입력 이벤트
     **************************************************************************/
    window.removeEventListener("keydown", this.inputKeyDown);
    window.addEventListener("keydown", this.inputKeyDown);
    this.isCheckEvent = true;
  },
  deactivated() {
    /***************************************************************************
     * 화면 내 키 입력 이벤트 삭제 처리
     * ( 미 삭제 시 이벤트 중복 및 타 컴포넌트에서 동작할 수도 있으니 삭제 필수 )
     **************************************************************************/
    // if (this.isCheckEvent)
    window.removeEventListener("keydown", this.inputKeyDown);
    this.isCheckEvent = false;
  },
  beforeUnmount() {
    /***************************************************************************
     * 화면 내 키 입력 이벤트 삭제 처리
     * ( 미 삭제 시 이벤트 중복 및 타 컴포넌트에서 동작할 수도 있으니 삭제 필수 )
     **************************************************************************/
    // if (this.isCheckEvent)
    window.removeEventListener("keydown", this.inputKeyDown);
    this.isCheckEvent = false;
  },
  methods: {
    /***************************************************************************
     * 화면 내 키 입력 이벤트 처리
     **************************************************************************/
    inputKeyDown(e) {
      this.$nextTick(() => {
        const regTypeEngNum = /^[A-Za-z0-9\-]{1,1}$/;
        if (
          regTypeEngNum.test(e.key) &&
          document.activeElement.tagName !== "INPUT"
        ) {
          this.commandKeyDown += e.key;
        } else if (e.code === "Enter") {
          this.chkKeyDownEvent(this.commandKeyDown.toUpperCase());
          this.commandKeyDown = "";
        }
      });
    },
    chkKeyDownEvent(commandKey) {
      let isComman = false;
      switch (commandKey) {
        case "INSPALL":
          // 일괄작업
          this.startInspall();
          isComman = true;
          break;
        // case "INSPPCS":
        //   // 일괄작업해제
        //   this.startInsppcs();
        //   isComman = true;
        //   break;
        case "SPLIT":
          // 분리포장
          this.startSplit();
          isComman = true;
          break;
        default:
      }
      return isComman;
    },
    // 일괄작업
    startInspall() {
      if (this.checkerMappingObj.openPop) return;

      // this.checkType = "all";
      // 일괄 검수 시의 로직
      for (let i = 0; i < this.form0.items.length; i++) {
        this.form0.items[i].confirmQty = this.form0.items[i].orderQty;
      }
      this.confirmSkuCount = this.skuCount;
      this.confirmPcsTotal = this.pcsTotal;
      this.percent = this.getInspRate(this.confirmPcsTotal, this.pcsTotal);

      this.onBtnBoxDiv();
      //this.boxDiv(null);
    },
    // 일괄작업해제
    startInsppcs() {
      // this.checkType = "one";
    },
    // 분리포장
    startSplit() {
      if (this.checkerMappingObj.openPop) return;
      this.onBtnBoxDiv();
      //this.boxDiv(null);
    },
    onClickCheck() {
      const barcodeBoxEl = this.$refs.barcode.$el.querySelector("input");
      barcodeBoxEl.select();
    },
    async init() {
      await this.$nextTick();
      this.$refs.form0.clearFocus();
      this.ordNo = "";
      this.rowVal = "";
      this.boxCode = "";
      this.orderNumber = "";
      this.workBatch = "";
      this.partnerCompanyName = "";
      this.barcode = "";
      this.checkType = "one";
      this.form0.items = [];
      this.confirmQty = 0;
      this.barcodeSkuName = "";
    },
    /**************************************************************************
     * Form Validation Chechk
     **************************************************************************/
    async validate() {
      const {valid, errors} = await this.$refs.form1.validate();
      if (!valid) {
        let errorMessage = "";
        try {
          errorMessage = errors[0].errorMessages[0];
        } catch (e) {
          errorMessage = this.$t("common.contactAdmin"); // 관리자에게 문의해주세요.
        }

        this.$alert({
          type: "error",
          title: this.$t("wcs.common.alertTitle.searchFail"),
          message: errorMessage
        });
      }

      return valid;
    },
    async closePopup() {
      this.checkerMappingObj.openPop = false;
      this.checkerMappingObj.isDivOk = false;
      this.checkerMappingObj.param2 = {};
      this.checkerMappingObj.labelCode = [];

      // 팝업 종료시 바코드 input에 셀렉트가도록
      setTimeout(() => {
        const barcodeBoxEl = this.$refs.barcode.$el.querySelector("input");
        barcodeBoxEl.select();
      }, 200);
    },
    /**************************************************************************
     * () 리스트를 조회한다. (바코드 입력)
     **************************************************************************/
    async barcodeInput() {
      console.log("barcodeInput");

      if (this.checkerMappingObj.openPop) {
        // 예외 추가
        return;
      }

      this.barcodeSkuName = "";
      if (this.chkKeyDownEvent(this.barcode)) {
        this.barcode = "";
        return false;
      }

      if (this.isBoxBarcode()) {
        // 박스바코드
        //this.boxCode = this.barcode;
        this.boxBarcode(this.barcode);
      } else {
        // 상품바코드
        if (this.barcode) {
          this.qtyBarcode(this.barcode);
        }
      }
    },

    isSkuVar(itm) {
      // 이형조건 변경.
      let variList = [
        "8001442",
        "8001441",
        "8001398",
        "8001399",
        "8001400",
        "8001443"
      ];

      return variList.includes(itm.skuCode);
    },

    async savePop(data) {
      if (this.isComplete()) {
        await this.checkAll();

        this.orderNumber = "";
        this.workBatch = "";
        this.partnerCompanyName = "";
        this.boxCode = "";
        this.form0.items = [];
        this.deliveryType = "";
        this.packageType = "";
        this.confirmSkuCount = 0;
        this.confirmPcsTotal = 0;
        this.percent = 0;
        this.skuCount = 0;
        this.pcsTotal = 0;

        this.ordNo = "";
        this.rowVal = "";
        this.boxCode = "";
        this.orderNumber = "";
        this.barcode = "";
        this.form0.items = [];
        this.confirmQty = 0;
        this.barcodeSkuName = "";

        this.resData = {};

        const barcodeBoxEl = this.$refs.barcode.$el.querySelector("input");
        barcodeBoxEl.select();

        this.$emit("closePopup"); // 팝업 상태일 경우 사용
      }

      // this.orderNumber = "";
      // this.workBatch = "";
      // this.partnerCompanyName = "";
      // this.boxCode = "";
      // this.form0.items = [];
      // this.deliveryType = "";
      // this.packageType = "";
      // this.confirmSkuCount = 0;
      // this.confirmPcsTotal = 0;
      // this.percent = 0;
      // this.skuCount = 0;
      // this.pcsTotal = 0;

      // this.ordNo = "";
      // this.rowVal = "";
      // this.boxCode = "";
      // this.orderNumber = "";
      // this.barcode = "";
      // this.form0.items = [];
      // this.confirmQty = 0;
      // this.barcodeSkuName = "";
      // const barcodeBoxEl = this.$refs.barcode.$el.querySelector("input");
      // barcodeBoxEl.select();
    },
    /**************************************************************************
     * () 리스트를 조회한다. (박스 바코드)
     **************************************************************************/
    async boxBarcode(data) {
      let isFind = this.isPrintFind();

      // this.boxCode = data;
      const barcodeBoxEl = this.$refs.barcode.$el.querySelector("input");

      try {
        this.$store.commit("app/SET_LOADING", {loading: true});
        const query = {
          lktHeader: {
            type: "REQUEST",
            call: "PAGE.TALLY.GET",
            status: 0,
            message: "",
            encryption: "",
            centerCode: this.userInfo.centerCode,
            clientCode: this.userInfo.clientCode,
            warehouseCode: this.userInfo.warehouseCode
          },
          lktBody: [
            {
              objectValue: data,
              userId: this.userInfo.userId
            }
          ]
        };

        const res = await execChecker.searchExecChecker({
          id: common.encodeBase64(query)
        });

        const barcodeBoxEl = await this.$refs.barcode.$el.querySelector(
          "input"
        );
        if (Object.keys(res.lktBody).length <= 0) {
          this.$alert({
            title: this.$t("common.searchFailed"),
            message: this.$t("wcs.exec.execChecker.emptyConfirmMessage")
          }).then(async () => {
            setTimeout(() => {
              // this.$nextTick(() => {
              // alert("dddd");
              barcodeBoxEl.select();
              // });
            }, 200);
          });

          this.orderNumber = "";
          this.workBatch = "";
          this.partnerCompanyName = "";
          this.boxCode = "";
          this.form0.items = [];
          this.deliveryType = "";
          this.packageType = "";
          this.confirmSkuCount = 0;
          this.confirmPcsTotal = 0;
          this.percent = 0;
          this.skuCount = 0;
          this.pcsTotal = 0;

          this.orderNumber = "";
          this.boxCode = "";
          this.form0.items = [];
          this.deliveryType = "";
          this.packageType = "";
          this.confirmSkuCount = 0;
          this.confirmPcsTotal = 0;
          this.percent = 0;
          this.skuCount = 0;
          this.pcsTotal = 0;
          this.barcodeSkuName = "";

          return false;
        }

        // for (let tt = 0; tt < 1000; tt++) {// test
        //   res.lktBody.lktItems.push(res.lktBody.lktItems[0]);
        // }

        let isFindVar = false;
        for (let i = 0; i < res.lktBody.lktItems.length; i++) {
          res.lktBody.lktItems[i].confirmQty = res.lktBody.lktItems[i].inspQty;

          //if (res.lktBody.lktItems[i].skuVariant === "N") {
          if (this.isSkuVar(res.lktBody.lktItems[i])) {
            isFindVar = true;
          }
        }

        this.resData = common.deepCopyObject(res.lktBody);

        if (res.lktHeader.status === "01") {
          barcodeBoxEl.select(); // 바코드 input text 전체선택
          this.orderNumber = res.lktBody.orderNumber;
          this.boxCode = res.lktBody.objectCode;
          this.workBatch = res.lktBody.workBatch;
          this.partnerCompanyName = res.lktBody.partnerCompanyName;
          this.form0.items = this.egInitRows(res.lktBody.lktItems) || [];

          this.deliveryType = res.lktBody.deliveryType || "";
          this.packageType = res.lktBody.packageType || "";
          this.confirmSkuCount = 0;
          this.confirmPcsTotal = 0;
          for (let i = 0; i < res.lktBody.lktItems.length; i++) {
            if (res.lktBody.lktItems[i].statusCode === "200") {
              this.confirmSkuCount = this.confirmSkuCount + 1; // 검수 상품 갯수
              this.confirmPcsTotal =
                res.lktBody.lktItems[i].orderQty + this.confirmPcsTotal; // 검수 PCS 갯수
              res.lktBody.lktItems[i].confirmQty =
                res.lktBody.lktItems[i].orderQty; // 서버로부터 검수 수량을 카운트 안받아서 상태만 보고 직접 넣음
            }
          }
        }
        this.skuCount = res.lktBody.skuCount || 0; // 총 상품 갯수
        this.pcsTotal = res.lktBody.pcsTotal || 0; // 총 PCS 갯수
        this.confirmSkuCount = this.confirmSkuCount || 0;
        this.confirmPcsTotal = this.confirmPcsTotal || 0;

        this.percent = this.getInspRate(this.confirmPcsTotal, this.pcsTotal);

        // 일괄검수 라디오 클릭 후 박스 스캔(조회)시 검수처리됨
        if (this.checkType === "all" && !this.isComplete()) {
          this.qtyBarcode(this.barcode);
        }

        let indexOfObjectToRemove = this.form0.headers.findIndex(
          (obj) => obj.value === "skuBarcode"
        );

        if (!isFindVar) {
          // 이형이 없으면 바코드 숨김
          if (indexOfObjectToRemove >= 0) {
            this.form0.headers.splice(indexOfObjectToRemove, 1);
          }
        } else {
          // 이형이 있으면 바코드 표축ㄹ
          if (indexOfObjectToRemove < 0) {
            this.form0.headers.splice(1, 0, {
              text: "바코드",
              value: "skuBarcode",
              align: "left",
              width: "auto",
              sortable: true,
              filter: true,
              editItem: {
                type: "barcode"
              }
            });
          }
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
    // 검수진행 계산
    getInspRate(completeLength, totalRowLength) {
      try {
        return Math.round((completeLength / totalRowLength) * 100);
      } catch (e) {
        return 0;
      }
    },
    // 임시 주석
    // 상품 마스터에서 조회 -> 그리드에서 가져오기로 변경
    /**************************************************************************
     * 상품 리스트를 조회한다.
     **************************************************************************/
    // async searchSkuList() {
    //   const query = {
    //     lktHeader: {
    //       type: "REQUEST",
    //       call: "PAGE.SKU.GET",
    //       status: 0,
    //       message: "",
    //       encryption: "",
    //       centerCode: this.userInfo.centerCode,
    //       clientCode: this.userInfo.clientCode,
    //       warehouseCode: this.userInfo.warehouseCode
    //     },
    //     lktBody: [
    //       {
    //         value: ""
    //       }
    //     ]
    //   };

    //   try {
    //     this.$store.commit("app/SET_LOADING", {loading: true});
    //     const res = await execChecker.searchMastSkuList({
    //       id: common.encodeBase64(query)
    //     });
    //     if (res.lktBody) {
    //       this.mastSkuArr = res.lktBody || [];
    //     }
    //   } catch (e) {
    //     if (e.message)
    //       e.message.title = this.$t("wcs.common.alertTitle.searchFail");
    //     this.$alert(e.message);
    //   } finally {
    //     this.$store.commit("app/SET_LOADING", {loading: false});
    //   }
    // },

    async testM() {
      for (let i = 0; i < 3; i++) {
        let rstTmp = await this.checkAll();
        console.log("rstrst", rstTmp);
        if (rstTmp == true) {
          break;
        }
      }

      console.log("eeend");
    },
    /**************************************************************************
     * () 리스트를 조회한다. (상품 바코드)
     **************************************************************************/
    async qtyBarcode(data) {
      // test

      //this.testM();

      // test end

      const barcodeBoxEl = this.$refs.barcode.$el.querySelector("input");
      barcodeBoxEl.select();

      // 임시 주석
      // 상품 마스터에서 조회 -> 그리드에서 가져오기로 변경
      // for (let i = 0; i < this.mastSkuArr.length; i++) {
      //   // 바코드 스캔한 상품명 바인딩
      //   if (this.mastSkuArr[i].skuCode === this.barcode) {
      //     this.barcodeSkuName = this.mastSkuArr[i].skuName;
      //     break;
      //   }
      // }
      for (let i = 0; i < this.form0.items.length; i++) {
        if (
          data === this.form0.items[i].skuCode ||
          data === this.form0.items[i].skuBarcode
        ) {
          // 바코드 스캔한 상품명 바인딩
          this.barcodeSkuName = this.form0.items[i].skuName;
        }
      }

      if (this.isBoxBarcode() && this.checkType !== "all") {
        // 박스바코드이고 일괄검수가 아니면리턴
        return;
      }
      if (this.isComplete()) {
        // 이미 검수 완료일 경우 검수api 타지 않음
        return;
      }

      if (this.form0.items.length) {
        if (this.checkType === "all") {
          // 일괄 검수 진행 시 검수 수량 전부 채워줌
          for (let i = 0; i < this.form0.items.length; i++) {
            this.form0.items[i].confirmQty = this.form0.items[i].orderQty;
          }

          //// 0810 조형근
          // 상단 현황 프론트 자체 계산 갱신
          this.confirmSkuCount = this.skuCount;
          this.confirmPcsTotal = this.pcsTotal;
          this.percent = this.getInspRate(this.confirmPcsTotal, this.pcsTotal);
        } else if (this.checkType === "one") {
          let isFind = false;
          let isModi = false;

          for (let i = 0; i < this.form0.items.length; i++) {
            if (
              data === this.form0.items[i].skuCode ||
              data === this.form0.items[i].skuBarcode
            ) {
              isFind = true; // 바코드 상품이 그리드에 존재
              if (
                this.form0.items[i].orderQty >=
                this.form0.items[i].confirmQty + 1
              ) {
                this.form0.items[i].confirmQty =
                  this.form0.items[i].confirmQty + 1;

                isModi = true; // 해당 상품의 검수수량 변경

                //// 0810 조형근
                // 상단 현황 프론트 자체 계산 갱신
                this.confirmPcsTotal++;
                this.percent = this.getInspRate(
                  this.confirmPcsTotal,
                  this.pcsTotal
                );

                if (
                  this.form0.items[i].orderQty ===
                  this.form0.items[i].confirmQty
                ) {
                  //// 0810 조형근
                  // 상단 현황 프론트 자체 계산 갱신
                  this.confirmSkuCount++;
                }
              }
            }
          }

          if (!isFind || !isModi) {
            var audio = new Audio(sounds["fail"]);
            audio.play();

            if (!isFind) {
              // 해당 상품은 검수 대상이 아닙니다.
              this.barcodeSkuName = this.$t(
                "wcs.exec.execChecker.notTargetInspMessage"
              );

              this.$alert({
                title: "알림",
                message: this.$t("wcs.exec.execChecker.notTargetInspMessage")
              }).then(async () => {
                setTimeout(() => {
                  barcodeBoxEl.select();
                }, 200);
              });

              return; // 예외추가
            } else if (!isModi) {
              // 검수 수량이 초과되었습니다.
              this.barcodeSkuName = this.$t(
                "wcs.exec.execChecker.overInspQtyMessage"
              );

              this.$alert({
                title: "알림",
                message: this.$t("wcs.exec.execChecker.overInspQtyMessage")
              }).then(async () => {
                setTimeout(() => {
                  barcodeBoxEl.select();
                }, 200);
              });

              return; // 예외추가
            }
          }
        }

        let arrTmp = [];
        // 검수 안된 행들 최상단 노출
        for (let i = 0; i < this.form0.items.length; i++) {
          if (this.form0.items[i].orderQty != this.form0.items[i].confirmQty) {
            arrTmp.push(this.form0.items[i]);
          }
        }

        // 검수 안된 행들 하단 노출
        for (let i = 0; i < this.form0.items.length; i++) {
          if (this.form0.items[i].orderQty === this.form0.items[i].confirmQty) {
            arrTmp.push(this.form0.items[i]);
          }
        }

        this.form0.items = arrTmp;

        if (this.isComplete()) {
          // 검수 완료시

          this.boxDiv(null);

          // this.checkAll(); // 검수완료 호출
        }
      }

      barcodeBoxEl.select();
    },
    isBoxBarcode() {
      // let rst = isNaN(this.barcode.charAt(0));
      let rst = false;

      if (this.form0.items.length <= 0) {
        rst = true;
      } else if (this.isComplete()) {
        rst = true;
      }

      return rst;
    },
    isPrintFind() {
      let isFind = false;
      try {
        let devices = zebra.setup();
        for (var i = 0; i < devices.length; i++) {
          if (
            devices[i].connection === "USB" &&
            devices[i].connection === "usb"
          ) {
            isFind = true;
          }
        }
      } catch (e) {}

      return isFind;
    },
    isPrintOrder() {
      let rst = false;

      if (
        this.resData.usePrint === "Y"
        //|| this.resData.facilitiesType === "EXCEPTION"
      ) {
        rst = true;
      }

      return rst;
    },
    isComplete() {
      let bRst = true;

      if (this.form0.items.length <= 0) bRst = false;

      for (let i = 0; i < this.form0.items.length; i++) {
        if (this.form0.items[i].confirmQty != this.form0.items[i].orderQty) {
          bRst = false;
        }
      }
      return bRst;
    },
    isCompleteReal() {
      let bRst = true;

      if (!this.isComplete()) {
        // alert("Com");
        bRst = false;
      } else if (!this.resData) {
        bRst = false;
      } else if (!this.resData.lktItems) {
        // alert("itm");
        bRst = false;
      } else if (this.resData.lktItems.length <= 0) {
        // alert("len");
        bRst = false;
      } else {
        for (let i = 0; i < this.resData.lktItems.length; i++) {
          if (
            this.resData.lktItems[i].inspQty !=
            this.resData.lktItems[i].orderQty
          ) {
            bRst = false;
          }
        }
      }

      return bRst;
    },

    /**************************************************************************
     * () 박스분할 버튼
     **************************************************************************/
    async onBtnBoxDiv(data) {
      console.log("onBtnBoxDiv");
      // 박스분할 바코드로 스캔시 문제 생김
      // const barcodeBoxEl = this.$refs.barcode.$el.querySelector("input");
      // barcodeBoxEl.select();

      //alert("dd");

      let bodyItms = [];

      this.resDataSplit = {};

      if (this.resData.lktItems) {
        // 받은 데이터
        this.resData.lktItems.forEach((data) => {
          this.form0.items.forEach((dataGrid) => {
            if (
              data.skuCode === dataGrid.skuCode ||
              data.skuBarcode === dataGrid.skuBarcode
            ) {
              data.confirmQty = data.confirmQty ? data.confirmQty : 0; // 예외처리

              if (data.confirmQty < dataGrid.confirmQty) {
                bodyItms.push({
                  skuCode: data.skuCode,
                  skuName: data.skuName,
                  orderQty: data.orderQty,
                  confirmQty: dataGrid.confirmQty - data.confirmQty
                });
              }
            }
          });
        });
      }

      if (bodyItms.length <= 0) {
        // 버튼이나, 스캔으로 박스분할 시 분할할께 없으면 바로 리턴
        return;
      }

      await this.boxDiv(null);
    },

    async boxDivProc() {
      let bodyItms = [];

      this.resDataSplit = {};

      // 받은 데이터
      if (this.resData.lktItems) {
        this.resData.lktItems.forEach((data) => {
          this.form0.items.forEach((dataGrid) => {
            if (
              data.skuCode === dataGrid.skuCode ||
              data.skuBarcode === dataGrid.skuBarcode
            ) {
              data.confirmQty = data.confirmQty ? data.confirmQty : 0; // 예외처리

              if (data.confirmQty < dataGrid.confirmQty) {
                bodyItms.push({
                  skuCode: data.skuCode,
                  skuName: data.skuName,
                  orderQty: data.orderQty,
                  confirmQty: dataGrid.confirmQty - data.confirmQty
                });
              }
            }
          });
        });
      }

      if (bodyItms.length > 0) {
        // 박스 분할 API
        try {
          this.$store.commit("app/SET_LOADING", {loading: true});
          const query = {
            lktHeader: {
              type: "REQUEST",
              call: "PAGE.TALLY.SPLIT.PUT",
              status: 0,
              message: "",
              encryption: "",
              centerCode: this.userInfo.centerCode,
              clientCode: this.userInfo.clientCode,
              warehouseCode: this.userInfo.warehouseCode
            },
            lktBody: [
              {
                orderNumber: this.orderNumber,
                labelType: this.resData.printType,
                barCode: this.boxCode,
                lktItems: bodyItms,
                userId: this.userInfo.userId
              }
            ]
          };

          const res = await execChecker.splitExecChecker(query);
          if (res.lktHeader.status === "01") {
            this.resData.lktItems.forEach((data) => {
              this.form0.items.forEach((dataGrid) => {
                if (
                  data.skuCode === dataGrid.skuCode ||
                  data.skuBarcode === dataGrid.skuBarcode
                ) {
                  data.confirmQty = data.confirmQty ? data.confirmQty : 0; // 예외처리
                  if (data.confirmQty < dataGrid.confirmQty) {
                    data.confirmQty = dataGrid.confirmQty; // resData에 복사 - 여기서 처리함 정상처리 됬을때 처리함
                  }
                }
              });
            });

            this.resDataSplit = res;

            if (this.isPrintOrder()) {
              /// 프린트일때 포커스
              const barcodeBoxEl =
                this.$refs.barcode.$el.querySelector("input");
              barcodeBoxEl.select();
            } else {
              // 맵핑일때 데이터 전달

              this.checkerMappingObj.param2 = common.deepCopyObject(
                this.resDataSplit.lktBody[0]
              ); // deep copy로 변경
              this.checkerMappingObj.labelCode = [];

              if (this.checkerMappingObj.openPop) {
                setTimeout(() => {
                  this.checkerMappingObj.isDivOk = true; // 분할 성공하여서 팝업에서 박스맵핑 시작
                }, 200);
              }
            }
          } else {
            var audio = new Audio(sounds["fail"]);
            audio.play();

            this.$alert({
              // 검수(분할)실패
              //title: this.$t("wcs.exec.execChecker.failBoxDiv"),
              title: "검수실패",
              message: res.lktHeader.message
            });

            //this.boxBarcode(this.boxCode);
          }
        } catch (e) {
          if (e.message) {
            if (e.message.message) {
              this.$alert({
                // 분할실패
                title: this.$t("wcs.exec.execChecker.failBoxDiv"),
                message: e.message.message
              });
            } else {
              this.$alert({
                // 분할실패
                title: this.$t("wcs.exec.execChecker.failBoxDiv"),
                message: e.message
              });
            }
          } else {
            this.$alert({
              // 분할실패
              title: this.$t("wcs.exec.execChecker.failBoxDiv"),
              message: JSON.stringify(e)
            });
          }

          // this.boxBarcode(this.boxCode);
        } finally {
          this.$store.commit("app/SET_LOADING", {loading: false});
        }
      } else {
        // 분할할것 없고 프린트오더가아니면 바로 박스맵핑
        // 재발행이 아닌 이상 현재는 분할과 맵핑을 동시에 함으로 여기서 맵핑하지 않는다
        //if (!this.isPrintOrder()) {
        //this.checkerMappingObj.isDivOk = true;
        //}
      }
    },

    /**************************************************************************
     * () 박스분할 로직
     **************************************************************************/
    async boxDiv(data) {
      //resData

      if (this.isPrintOrder()) {
        // 프린트이면 바로 박스분할 api

        await this.boxDivProc();
        this.print(this.resDataSplit);

        if (this.isComplete()) {
          // 모두 완료 상태이면 검수 실행 //
          for (let i = 0; i < 3; i++) {
            let rstTmp = await this.checkAll();
            console.log("rstrst", rstTmp);
            if (rstTmp == true) {
              break;
            }
          }
          console.log("eeend");
        }
      } else {
        if (this.checkerMappingObj.openPop) return;

        // 아니면 맵핑팝업
        this.checkerMappingObj.param = this.resData;
        // this.checkerMappingObj.param2 = this.resDataSplit; // 이건 팝업띄운 후에 넣어준다.
        if (this.isComplete()) this.checkerMappingObj.popTitle = "검수완료";
        else this.checkerMappingObj.popTitle = "박스분할";

        this.checkerMappingObj.openPop = true;
        try {
          const query = {
            lktHeader: {
              type: "REQUEST",
              call: "PAGE.TALLY.POPUP.POST",
              status: 0,
              message: "",
              encryption: "",
              centerCode: this.userInfo.centerCode,
              clientCode: this.userInfo.clientCode,
              warehouseCode: this.userInfo.warehouseCode
            },
            lktBody: [
              {
                orderNumber: this.resData.orderNumber,
                toteBox: this.resData.objectCode,
                objectBox: "",
                statusName: this.isComplete() ? "검수완료" : "분할",
                userId: this.userInfo.userId
              }
            ]
          };

          const res = await execChecker.logPopup(query);
          if (res.lktHeader.status === "01") {
          } else {
          }
        } catch (e) {
        } finally {
        }
      }
    },

    /**************************************************************************
     * () 일괄검수
     **************************************************************************/
    async checkAll() {
      console.log("chch");
      let bRst = true;

      // 검수 수량 수정 API
      try {
        const barcodeBoxEl = this.$refs.barcode.$el.querySelector("input");
        const lktBody = [];
        // TODO 임시
        for (let i = 0; i < this.form0.items.length; i++) {
          lktBody.push({
            skuCode: this.form0.items[i].skuCode,
            skuName: this.form0.items[i].skuName,
            orderQty: this.form0.items[i].orderQty,
            confirmQty: this.form0.items[i].confirmQty
          });
        }

        this.$store.commit("app/SET_LOADING", {loading: true});
        const query = {
          lktHeader: {
            type: "REQUEST",
            call: "PAGE.TALLY.PUT",
            status: 0,
            message: "",
            encryption: "",
            centerCode: this.userInfo.centerCode,
            clientCode: this.userInfo.clientCode,
            warehouseCode: this.userInfo.warehouseCode
          },
          lktBody: [
            {
              orderNumber: this.orderNumber,
              lktItems: lktBody,
              userId: this.userInfo.userId
            }
          ]
        };

        const res = await execChecker.modiExecChecker(query);
        if (res.lktHeader.status === "01") {
          barcodeBoxEl.select(); // 바코드 input text 전체선택

          if (true) {
            //this.boxBarcode(this.boxCode);
            this.orderNumber = "";
            this.workBatch = "";
            this.partnerCompanyName = "";
            this.boxCode = "";
            this.form0.items = [];
            this.deliveryType = "";
            this.packageType = "";
            this.confirmSkuCount = 0;
            this.confirmPcsTotal = 0;
            this.percent = 0;
            this.skuCount = 0;
            this.pcsTotal = 0;

            this.ordNo = "";
            this.rowVal = "";
            this.boxCode = "";
            this.orderNumber = "";
            this.barcode = "";
            this.form0.items = [];
            this.confirmQty = 0;
            this.barcodeSkuName = "";

            this.resData = {};

            const barcodeBoxEl = this.$refs.barcode.$el.querySelector("input");
            barcodeBoxEl.select();

            this.$emit("closePopup"); // 팝업 상태일 경우 사용
          } else {
            /// 맵핑팝업 출력
            // 08.14 by elf
            // 박스맵핑 수정 완료 후 초기화
          }
        } else {
          var audio = new Audio(sounds["fail"]);
          audio.play();

          this.$alert({
            title: "검수 실패",
            message: res.lktHeader.message
          });

          bRst = false;
        }
      } catch (e) {
        bRst = false;
        var audio = new Audio(sounds["fail"]);
        audio.play();

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

      return bRst;
    },
    /**************************************************************************
     * 로우 클릭 function
     *
     * @param {Object} row Grid Row Object
     **************************************************************************/
    rowClick(row) {
      this.rowVal = row;

      this.barcode = this.rowVal.skuCode;
    },
    async rePrint() {
      const barcodeBoxEl = this.$refs.barcode.$el.querySelector("input");
      barcodeBoxEl.select();

      ////////////////////////////
      //// test start

      // this.isReport = true;
      // await this.$nextTick(); // 이후 실행
      // await this.$refs.report.directPrint("HNW_HY_FM_Lable");
      // await this.$refs.report.directPrint("HNW_HY_WaybillNumber_Label");
      //await this.$refs.report.directPrint("HNW_HY_MealKit_Label");

      // this.isReport = true;
      // await this.$nextTick(); // 이후 실행
      // //this.outputZPrintFm("usb", {});
      // this.outputZPrintInvoice("usb", {});
      // //this.outputZPrintMeal("usb", {});
      // return;

      //// test end
      ////////////////////////
      try {
        if (!this.isCompleteReal()) {
          // 검수 완료인지 체크 진짜 검수완료인지 체크
          return;
        }

        if (!this.isPrintOrder()) {
          // 박스맵핑일 경우

          if (this.checkerMappingObj.openPop) return;

          this.checkerMappingObj.param = this.resData;
          this.checkerMappingObj.param2 = {}; // 분할일때는 이거 사용(프린터정보가 들어간다.)
          this.checkerMappingObj.labelCode = common.deepCopyObject(
            this.resData.lktItems
          ); // 재발행일때만 이거 사용(fltmxm)
          this.checkerMappingObj.popTitle = "재맵핑";
          this.checkerMappingObj.openPop = true;

          try {
            const query = {
              lktHeader: {
                type: "REQUEST",
                call: "PAGE.TALLY.POPUP.POST",
                status: 0,
                message: "",
                encryption: "",
                centerCode: this.userInfo.centerCode,
                clientCode: this.userInfo.clientCode,
                warehouseCode: this.userInfo.warehouseCode
              },
              lktBody: [
                {
                  orderNumber: this.resData.orderNumber,
                  toteBox: this.resData.objectCode,
                  objectBox: "",
                  statusName: "재발행",
                  userId: this.userInfo.userId
                }
              ]
            };

            const res = await execChecker.logPopup(query);
            if (res.lktHeader.status === "01") {
            } else {
            }
          } catch (e) {
          } finally {
          }

          //this.isReprint = true;

          return;
        }
        // 아래는 useprint Y일때 - 송장출력일때

        let printInfos = common.deepCopyObject(this.resData.lktItems);
        printInfos = printInfos.filter(
          (value, index, self) =>
            index ===
            self.findIndex((item) => item.printCode === value.printCode)
        );

        printInfos.forEach(async (prt) => {
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
                  orderNumber: this.orderNumber,
                  toteBox: this.boxCode,
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

              if (this.resData.printType === "FM") {
                this.outputZPrintFm("usb", res);
                // await this.$refs.report.directPrint("HNW_HY_FM_Lable", res);
              } else if (this.resData.printType === "INVOICE") {
                this.outputZPrintInvoice("usb", res);
                // await this.$refs.report.directPrint(
                //   "HNW_HY_WaybillNumber_Label",
                //   res
                // );
              } else {
                this.outputZPrintMeal("usb", res);
                // await this.$refs.report.directPrint("HNW_HY_MealKit_Label", res);
              }
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
        });
      } catch (e) {
        console.log(e);
      }
    },

    async print(res) {
      try {
        this.isReport = true;
        await this.$nextTick(); // 이후 실행

        if (this.resData.printType === "FM") {
          this.outputZPrintFm("usb", res);
          // await this.$refs.report.directPrint("HNW_HY_FM_Lable", res);
        } else if (this.resData.printType === "INVOICE") {
          this.outputZPrintInvoice("usb", res);
          // await this.$refs.report.directPrint(
          //   "HNW_HY_WaybillNumber_Label",
          //   res
          // );
        } else {
          this.outputZPrintMeal("usb", res);
          // await this.$refs.report.directPrint("HNW_HY_MealKit_Label", res);
        }
      } catch (e) {
        if (e.message) {
          this.$alert({
            // 송장출력실패
            title: this.$t("wcs.exec.execChecker.failPrint"),
            message: e.message
          });
        } else {
          this.$alert({
            // 송장출력실패
            title: this.$t("wcs.exec.execChecker.failPrint"),
            message: JSON.stringify(e)
          });
        }
      } finally {
      }
    },

    outputZPrintFm(printCode, printData) {
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
      //       workDate: "20230731",
      //       workBatch: "1139",
      //       orderNumber: "92060",
      //       vehicleDockNumber: "00",
      //       toWarehouseCode: "HY_YANGSAN_CBT",
      //       toWarehouseName: "hy 양산물류센터",
      //       shipToCode: "28660",
      //       shipToName: "율하점_본점",
      //       deliveryType: "FM",
      //       receiveName: "남*우",
      //       receiveAddress:
      //         "경상남도 김해시 율하2로 57 (율하동) 율상마을푸르지오3단지아파트 308동1702호",
      //       receiveAddressShortHand: "FM14",
      //       receivePhoneNumber: "-",
      //       receivePostCode: "-",
      //       sendName: "와이즐리컴퍼니",
      //       sendAddress: "서울시 강남구 영동대로96길 20",
      //       sendPhoneNumber: "1833-9133",
      //       sendOrderNumber: null,
      //       deliveryMessage: "-",
      //       deliveryMan: "FM14",
      //       facilitiesType: "3D-SORTER",
      //       facilitiesCode: "3D-SORTER#1",
      //       facilitiesLocation: "A015-15",
      //       printType: "FM",
      //       printCode: "3D1N82601400002",
      //       etcCode: "-",
      //       boxCount: "3 / -",
      //       destination: "-",
      //       destinationCode: "-",
      //       destinationValue: "-",
      //       subDestination: "-",
      //       district: "-",
      //       p2pCode: "-",
      //       totalPcs: 3,
      //       skuCode_1: "8000585",
      //       skuName_1: "혈행·눈 건강·기억력 오메가3",
      //       tallyQty_1: 1,
      //       skuCode_2: "8000587",
      //       skuName_2: "뼈·신경·근육엔 칼슘마그네슘",
      //       tallyQty_2: 1,
      //       skuCode_3: "8000706",
      //       skuName_3: "[WC] 멀티브랜드 박스 3종",
      //       tallyQty_3: 1,
      //       skuCode_4: "8000706",
      //       skuName_4: "[WC] 멀티브랜드 박스 3종",
      //       tallyQty_4: 1,
      //       skuCode_5: "8000585",
      //       skuName_5: " 혈행·눈 건강·기억력 오메가3",
      //       tallyQty_5: 1,
      //       skuCode_6: "8000587",
      //       skuName_6: " 뼈·신경·근육엔 칼슘마그네슘",
      //       tallyQty_6: 1,
      //       skuCode_7: "8000706",
      //       skuName_7: "[WC] 멀티브랜드 박스 3종",
      //       tallyQty_7: 1,
      //       skuCode_8: "8000706",
      //       skuName_8: "[WC] 멀티브랜드 박스 3종",
      //       tallyQty_8: 1
      //     }
      //   ]
      // };

      // keys로 루프돌려서 null이면 ""으로 변경

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
        let sendAddressTop = body.sendAddress;
        let sendAddressBottom = ""; //body.sendAddress.replace(sendAddressTop, "");
        if (body.sendAddress.length > 24) {
          sendAddressTop = body.sendAddress.substring(0, 24);
          sendAddressBottom = body.sendAddress.replace(sendAddressTop, "");
        }

        let receiveAddressTop = body.receiveAddress; //body.sendAddress.substring(0, 18);
        let receiveAddressBottom = ""; //body.sendAddress.replace(sendAddressTop, "");
        if (body.receiveAddress.length > 24) {
          receiveAddressTop = body.receiveAddress.substring(0, 24);
          receiveAddressBottom = body.receiveAddress.replace(
            receiveAddressTop,
            ""
          );
        }

        let zplData =
          "^XA\n\n^SEE:UHANGUL.DAT^FS\n^CW1,E:KFONT3.FNT^CI26^FS\n^CI28\n\n\n^PW900\n^LH40,40\n^FWB\n\n^FO0,0^GB632,880,4^FS\n\n^FO79,0^GB0,880,3^FS\n^FO158,0^GB0,880,3^FS\n^FO237,0^GB0,430,3^FS\n^FO316,0^GB0,430,3^FS\n^FO395,0^GB0,880,3^FS\n^FO474,0^GB0,430,3^FS\n^FO553,0^GB0,880,3^FS\n\n^FO79,160^GB79,0,3^FS\n^FO0,160^GB79,0,3^FS\n^FO553,230^GB79,0,3^FS\n^FO79,310^GB79,0,3^FS\n\n^FO158,430^GB395,0,3^FS\n^FO158,470^GB474,0,3^FS\n\n^FO197.5,470^GB0,410,3^FS\n^FO237,470^GB0,410,3^FS\n^FO276.5,470^GB0,410,3^FS\n^FO316,470^GB0,410,3^FS\n^FO355.5,470^GB0,410,3^FS\n^FO434.5,470^GB0,410,3^FS\n^FO474,470^GB0,410,3^FS\n^FO513.5,470^GB0,410,3^FS\n\n^FO158,520^GB395,0,3^FS\n\n^FO0,570^GB553,0,3^FS" +
          "" +
          "^FO31,0^A1,30,30^FB150,1,0,C^FD도크:" +
          body.vehicleDockNumber +
          " ^FS\n" +
          // "^FT53,560^A1,40,40^FD     " +
          "^FO31,0^A1,30,30^FB750,0,0,C^FD" +
          body.workBatch +
          "^FS\n" +
          "^FT50,870^A1,30,30^FD     " +
          body.workDate +
          " ^FS\n\n" +
          "" +
          "^^FO110,0^A1,25,25^FB150,1,0,C^FD포장:" +
          body.boxCount +
          "^FS\n" +
          "^FO110,0^A1,25,25^FB470,1,0,C^FD" +
          body.deliveryMan +
          "^FS\n" +
          "^FO110,0^A1,25,25^FB880,1,0,C^FD" +
          body.shipToName +
          "^FS\n" +
          "^FO110,0^A1,25,25^FB1430,1,0,C^FD" +
          body.toWarehouseName +
          " ^FS\n\n" +
          "^FO189,0^A1,25,25^FB450,1,0,C^FD" +
          body.sendName +
          "^FS\n\n" +
          "^FT272,425^A1,22,22^FD" +
          sendAddressTop +
          "^FS\n" +
          "^FT302,425^A1,22,22^FD" +
          sendAddressBottom +
          "^FS\n\n" +
          "" +
          "^FO347,0^A1,25,25^FB450,1,0,C^FD" +
          body.sendPhoneNumber +
          "^FS\n" +
          "^FO426,0^A1,25,25^FB450,1,0,C^FD" +
          body.receiveName +
          "^FS\n\n" +
          "" +
          "^FT509,425^A1,22,22^FD" +
          receiveAddressTop +
          "^FS\n" +
          "^FT539,425^A1,22,22^FD" +
          receiveAddressBottom +
          "^FS\n\n" +
          "" +
          "^FT603,220^A1,30,30^FD   " +
          body.facilitiesLocation +
          "^FS\n" +
          // "^FT603,465^A1,30,30^FD    " +
          "^FO585,0^A1,30,30^FB650,0,0,C^FD" +
          body.orderNumber +
          "^FS\n\n" +
          "" +
          "^FT603,870^A1,25,25^FD" +
          body.deliveryMessage +
          "^FS\n\n\n" +
          "" +
          "^FT715,750^BY3\n" +
          "^BC,70,Y,N,N^FD" +
          body.printCode +
          "^FS\n\n\n\n" +
          "" +
          "^FT190,875^A1,22,22^FD" +
          (body.skuName_1 ? this.getStringAtLength(body.skuName_1, 14) : "") +
          "^FS\n" +
          "^FT187,560^A1,20,20^FD" +
          (body.skuName_1 ? "X" : "") +
          "^FS\n" +
          "^FT187,510^A1,20,20^FD" +
          (body.tallyQty_1 ? body.tallyQty_1 : "") +
          "^FS\n\n" +
          "" +
          "^FT229.5,875^A1,22,22^FD" +
          (body.skuName_2 ? this.getStringAtLength(body.skuName_2, 14) : "") +
          "^FS\n" +
          "^FT226.5,560^A1,20,20^FD" +
          (body.skuName_2 ? "X" : "") +
          "^FS\n" +
          "^FT226.5,510^A1,20,20^FD" +
          (body.tallyQty_2 ? body.tallyQty_2 : "") +
          "^FS\n\n" +
          "" +
          "^FT269,875^A1,22,22^FD" +
          (body.skuName_3 ? this.getStringAtLength(body.skuName_3, 14) : "") +
          "^FS\n" +
          "^FT266,560^A1,20,20^FD" +
          (body.skuName_3 ? "X" : "") +
          "^FS\n" +
          "^FT266,510^A1,20,20^FD" +
          (body.tallyQty_3 ? body.tallyQty_3 : "") +
          "^FS\n\n" +
          "" +
          "^FT308.5,875^A1,22,22^FD" +
          (body.skuName_4 ? this.getStringAtLength(body.skuName_4, 14) : "") +
          "^FS\n" +
          "^FT305.5,560^A1,20,20^FD" +
          (body.skuName_4 ? "X" : "") +
          "^FS\n" +
          "^FT305.5,510^A1,20,20^FD" +
          (body.tallyQty_4 ? body.tallyQty_4 : "") +
          "^FS\n\n" +
          "" +
          "^FT348,875^A1,22,22^FD" +
          (body.skuName_5 ? this.getStringAtLength(body.skuName_5, 14) : "") +
          "^FS\n" +
          "^FT345,560^A1,20,20^FD" +
          (body.skuName_5 ? "X" : "") +
          "^FS\n" +
          "^FT345,510^A1,20,20^FD" +
          (body.tallyQty_5 ? body.tallyQty_5 : "") +
          "^FS\n\n" +
          "" +
          "^FT387.5,875^A1,22,22^FD" +
          (body.skuName_6 ? this.getStringAtLength(body.skuName_6, 14) : "") +
          "^FS\n" +
          "^FT384.5,560^A1,20,20^FD" +
          (body.skuName_6 ? "X" : "") +
          "^FS\n" +
          "^FT384.5,510^A1,20,20^FD" +
          (body.tallyQty_6 ? body.tallyQty_6 : "") +
          "^FS\n\n" +
          "" +
          "^FT427,875^A1,22,22^FD" +
          (body.skuName_7 ? this.getStringAtLength(body.skuName_7, 14) : "") +
          "^FS\n" +
          "^FT424,560^A1,20,20^FD" +
          (body.skuName_7 ? "X" : "") +
          "^FS\n" +
          "^FT424,510^A1,20,20^FD" +
          (body.tallyQty_7 ? body.tallyQty_7 : "") +
          "^FS\n\n" +
          "" +
          "^FT466.5,875^A1,22,22^FD" +
          (body.skuName_8 ? this.getStringAtLength(body.skuName_8, 14) : "") +
          "^FS\n" +
          "^FT463.5,560^A1,20,20^FD" +
          (body.skuName_8 ? "X" : "") +
          "^FS\n" +
          "^FT463.5,510^A1,20,20^FD" +
          (body.tallyQty_8 ? body.tallyQty_8 : "") +
          "^FS\n\n" +
          "" +
          "^FT506,875^A1,22,22^FD" +
          (body.skuName_9 ? this.getStringAtLength(body.skuName_9, 14) : "") +
          "^FS\n" +
          "^FT503,560^A1,20,20^FD" +
          (body.skuName_9 ? "X" : "") +
          "^FS\n" +
          "^FT503,510^A1,20,20^FD" +
          (body.tallyQty_9 ? body.tallyQty_9 : "") +
          "^FS\n\n" +
          "" +
          "^FT545.5,875^A1,22,22^FD" +
          (body.skuName_10 ? this.getStringAtLength(body.skuName_10, 14) : "") +
          "^FS\n" +
          "^FT542.5,560^A1,20,20^FD" +
          (body.skuName_10 ? "X" : "") +
          "^FS\n" +
          "^FT542.5,510^A1,20,20^FD" +
          (body.tallyQty_10 ? body.tallyQty_10 : "") +
          "^FS\n\n" +
          "" +
          "^FT240,465^A1,25,25^FD보^FS\n" +
          "^FT270,465^A1,25,25^FD내^FS\n" +
          "^FT300,465^A1,25,25^FD는^FS\n" +
          "^FT330,465^A1,25,25^FD분^FS\n\n" +
          "^FT450,465^A1,25,25^FD받^FS\n" +
          "^FT480,465^A1,25,25^FD는^FS\n" +
          "^FT510,465^A1,25,25^FD분^FS\n\n^XZ";

        console.log("zplData FM:\r\n" + zplData);

        zebra.writeToSelectedPrinter(printCode, zplData);
      } catch (e) {
        console.warn(e.message);
      }
    },
    outputZPrintInvoice(printCode, printData) {
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
      //       workDate: "20230804",
      //       workBatch: "1178",
      //       orderNumber: "94096",
      //       vehicleDockNumber: "00",
      //       toWarehouseCode: null,
      //       toWarehouseName: null,
      //       shipToCode: "98000",
      //       shipToName: null,
      //       deliveryType: "택배",
      //       receiveName: "이대석",
      //       receiveAddress:
      //         "제주특별자치도 서귀포시 대정읍 하모항구로 30 모슬포수협 사업과 (연쇄점) ",
      //       receiveAddressShortHand: "하모 770-28",
      //       receivePhoneNumber: "010-5617-9825",
      //       receivePostCode: "63506",
      //       sendName: "와이즐리컴퍼니",
      //       sendAddress: "서울시 강남구 영동대로96길 20",
      //       sendPhoneNumber: "1833-9133",
      //       deliveryMessage: "-",
      //       deliveryMan: "제주산방-##-",
      //       facilitiesType: "3D-SORTER",
      //       facilitiesCode: "3D-SORTER#1",
      //       facilitiesLocation: "A236-99",
      //       printType: "INVOICE",
      //       printCode: "650026860161",
      //       etcCode: "-",
      //       boxCount: "1 / -",
      //       // destination: "7F05",
      //       destination: "",
      //       // destinationCode: "7",
      //       destinationCode: "주소정제 실패",
      //       //destinationValue: "F05",
      //       destinationValue: "",
      //       // subDestination: "1j",
      //       subDestination: "",
      //       district: "01",
      //       p2pCode: null,
      //       totalPcs: 1,
      //       sendOrderNumber: null,
      //       skuCode_1: "8000706",
      //       skuName_1: "[WC] 멀티브랜드 박스 3종",
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

      // 코스 없을경우 처리 임시주석
      if (
        !body.subDestination ||
        body.subDestination.length <= 0 ||
        body.subDestination === ""
      ) {
        body.destinationCode = "주소정제 실패";
      }

      try {
        let zplData = "";

        zplData =
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
          "^FO0,0^GB0,900,3^FS\n" +
          "^FO40,0^GB0,900,3^FS\n" +
          "^FO0,0^GB40,0,3^FS\n" +
          "^FO0,897^GB40,0,3^FS\n" +
          "\n\n" +
          "^FO40,0^GB35,120,35^FS\n" +
          "^FT70,85^A1,25,25^FR^FD코스^FS\n" +
          "^FO75,0^GB80,120,3^FS\n\n" +
          "" +
          "" +
          "^FO10,10^A1,20,20^FB700,1,0,R^FD" +
          body.workDate +
          "^FS\n" +
          "^FT25,650^A1,25,25^FD" +
          body.printCode.replace(/(.{4})(?!$)/g, "$1-") +
          "^FS\n" +
          "^FT25,890^A1,20,20^FD운송장번호^FS\n\n" +
          "" +
          "^FT135,100^A1,80,80^FD" +
          body.subDestination +
          "^FS\n" +
          "^FT130,190^A1,80,80^FD-^FS\n" +
          "^FT130,430^A1,120,120^FD" +
          body.destinationValue +
          "^FS\n" +
          // 코스 없을경우 처리 임시주석
          (!body.subDestination ||
          body.subDestination.length <= 0 ||
          body.subDestination === ""
            ? "^FT130,820^A1,100,100^FD"
            : "^FT130,520^A1,100,100^FD") +
          body.destinationCode +
          "^FS\n\n" +
          "" +
          "^FT150,890^BY2\n" +
          "^BC,90,N,N,N^FD" +
          body.destination +
          "^FS\n\n" +
          "" +
          "^FT210,340^BY2\n" +
          "^BC,50,N,N,N^FD" +
          body.printCode +
          "^FS\n\n\n" +
          "" +
          "" +
          "^FT220,820^A1,20,20^FD" +
          body.receiveName +
          "^FS\n" +
          "^FT220,650^A1,20,20^FD" +
          body.receivePhoneNumber +
          "^FS\n" +
          "^FT255,820^A1,20,20^FD" +
          body.receiveAddress +
          "^FS\n" +
          "^FT295,820^A1,30,30^FD" +
          body.receiveAddressShortHand +
          "^FS\n\n" +
          "" +
          "^FT360,820^A1,20,20^FD" +
          body.sendName +
          "^FS\n" +
          "^FT360,650^A1,20,20^FD" +
          body.sendPhoneNumber +
          "^FS\n" +
          "^FT390,820^A1,20,20^FD" +
          body.sendAddress +
          "^FS\n\n" +
          "" +
          "^FO330,0^A1,20,20^FB700,1,0,R^FD수량 1 운임 0 정상  신용^FS\n\n" +
          "" +
          "^FT460,885^A1,20,20^FD" +
          (body.skuName_1 ? body.skuName_1 : "") +
          "^FS\n" +
          "^FO450,0^A1,20,20^FB700,1,0,R^FD" +
          (body.tallyQty_1 ? body.tallyQty_1 : "") +
          "^FS\n\n" +
          "" +
          "^FT490,885^A1,20,20^FD" +
          (body.skuName_2 ? body.skuName_2 : "") +
          "^FS\n" +
          "^FO480,0^A1,20,20^FB700,1,0,R^FD" +
          (body.tallyQty_2 ? body.tallyQty_2 : "") +
          "^FS\n\n" +
          "" +
          "^FT520,885^A1,20,20^FD" +
          (body.skuName_3 ? body.skuName_3 : "") +
          "^FS\n" +
          "^FO510,0^A1,20,20^FB700,1,0,R^FD" +
          (body.tallyQty_3 ? body.tallyQty_3 : "") +
          "^FS\n\n" +
          "" +
          "^FT550,885^A1,20,20^FD" +
          (body.skuName_4 ? body.skuName_4 : "") +
          "^FS\n" +
          "^FO540,0^A1,20,20^FB700,1,0,R^FD" +
          (body.tallyQty_4 ? body.tallyQty_4 : "") +
          "^FS\n" +
          "^FT580,885^A1,20,20^FD" +
          (body.skuName_5 ? body.skuName_5 : "") +
          "^FS\n" +
          "^FO570,0^A1,20,20^FB700,1,0,R^FD" +
          (body.tallyQty_5 ? body.tallyQty_5 : "") +
          "^FS\n" +
          "" +
          "^FT610,885^A1,20,20^FD" +
          (body.skuName_6 ? body.skuName_6 : "") +
          "^FS\n" +
          "^FO600,0^A1,20,20^FB700,1,0,R^FD" +
          (body.tallyQty_6 ? body.tallyQty_6 : "") +
          "^FS\n" +
          "" +
          "^FT640,885^A1,20,20^FD" +
          (body.skuName_7 ? body.skuName_7 : "") +
          "^FS\n" +
          "^FO630,0^A1,20,20^FB700,1,0,R^FD" +
          (body.tallyQty_7 ? body.tallyQty_7 : "") +
          "^FS\n" +
          "" +
          "" +
          "" +
          "^FO640,0^A1,25,25^FB700,1,0,R^FD총 수량 : " +
          body.totalPcs +
          "^FS\n" +
          "^FT750,340^BY2\n" +
          "^BC,70,N,N,N^FD" +
          body.printCode +
          "^FS\n\n" +
          "" +
          "^FO720,400^A1,20,20^FB700,1,0,R^FD운임 0  정상  신용^FS\n\n" +
          "" +
          "^FT650,890^A1,22,22^FD" +
          body.orderNumber +
          "^FS\n" +
          "^FT680,890^A1,22,22^FD" +
          body.etcCode +
          "^FS\n" +
          "^FT710,890^A1,22,22^FD" +
          body.deliveryMessage +
          "^FS\n" +
          "^FT740,890^A1,22,22^FD" +
          body.deliveryMan +
          "^FS\n\n\n" +
          "" +
          "" +
          "^FT230,890^A1,25,25^FD받^FS\n" +
          "^FT260,890^A1,25,25^FD는^FS\n" +
          "^FT290,890^A1,25,25^FD분^FS\n\n\n" +
          "" +
          "" +
          "^FO200,842^GB100,65,65^FS\n" +
          "^FT230,890^A1,25,25^FR^FD받^FS\n" +
          "^FT260,890^A1,25,25^FR^FD는^FS\n" +
          "^FT290,890^A1,25,25^FR^FD분^FS\n" +
          "^FO330,842^GB80,65,65^FS\n" +
          "^FT360,895^A1,20,20^FR^FD보내^FS\n" +
          "^FT390,895^A1,20,20^FR^FD는분^FS\n" +
          "" +
          "" +
          "^XZ";

        console.log("zplData Invoice:\r\n" + zplData);

        zebra.writeToSelectedPrinter(printCode, zplData);
      } catch (e) {
        console.warn(e.message);
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
    getStringAtLength(strTarget, len) {
      if (strTarget.length <= len) return strTarget;

      return strTarget.substring(0, len);
    },
    rowClass0(item, rownum) {
      if (item.orderQty === item.confirmQty) {
        // 로우 검수완료 상태 여부 자체 갱신
        this.form0.items[rownum - 1].statusName = this.$t(
          `wcs.exec.execChecker.CheckEnd`
        ); // 검수완료

        // if (item.skuVariant === "N") {
        if (this.isSkuVar(item)) {
          // 이형 완료
          return "complete-color-var";
        } else {
          // 일반 완료
          return "complete-color";
        }
      }

      if (item.orderQty > item.confirmQty && item.confirmQty > 0) {
        // if (item.skuVariant === "N") {
        if (this.isSkuVar(item)) {
          // 이형 진행중
          return "play-color-var"; // 진행중
        } else {
          // 일반 진행중
          return "play-color"; // 진행중
        }
      }

      // if (item.skuVariant === "N") {
      if (this.isSkuVar(item)) {
        // 이형 대기
        return "skuvariant-color";
      }

      // 일반 대기
      return "non-complete-color";
    }
  }
};
</script>

<style lang="scss" scoped>
.inner-content {
  height: calc(100vh - var(--top-height) - 497px);
}
::v-deep .vue3-easy-data-table__main {
  height: calc(100vh - var(--top-height) - 569px);
}
.checker-wrap-items {
  height: 185px;
  padding: 0 0 22px;
  border-radius: 15px;
}
.checker-items {
  font-size: 60px;
  height: 118px;
  line-height: 1.1;
  border-bottom-left-radius: 15px !important;
  border-bottom-right-radius: 15px !important;
  text-align: center;
}
.checker-items-title {
  font-size: 23px;
  height: 65px;
  border-top-left-radius: 15px !important;
  border-top-right-radius: 15px !important;
  border-bottom: none;
  padding-top: 21px;
  text-align: center;
}
.check-left-top-item {
  border-radius: 15px;
  height: 185px;
}
.item-margin {
  margin-right: 1%;
}
.radio-group {
  font-size: 20px;
}
::v-deep .v-selection-control--inline .v-label {
  font-size: 20px !important;
}
::v-deep .sku-text .v-label {
  font-size: 20px !important;
  max-width: 400px;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
@media (min-width: 1920px) {
  ::v-deep .sku-text .v-label {
    max-width: 350px;
  }
}
.btn-check {
  max-width: 535px !important;
}

::v-deep .barcode-container > canvas {
  display: none;
}

::v-deep .vue3-easy-data-table__body > .complete-color > td {
  background-color: #ff3333;
}

::v-deep .vue3-easy-data-table__body > .complete-color-var > td {
  background-color: #ff3333;
}

::v-deep
  .vue3-easy-data-table__body
  > .complete-color-var
  > td
  > div
  > div
  > canvas {
  display: block;
}

::v-deep .vue3-easy-data-table__body > .skuvariant-color > td {
  background-color: #f19614;
}

::v-deep
  .vue3-easy-data-table__body
  > .skuvariant-color
  > td
  > div
  > div
  > canvas {
  display: block;
}

::v-deep .vue3-easy-data-table__body > .play-color > td {
  background-color: #ff3399;
}

::v-deep .vue3-easy-data-table__body > .play-color-var > td {
  background-color: #ff3399;
}

::v-deep
  .vue3-easy-data-table__body
  > .play-color-var
  > td
  > div
  > div
  > canvas {
  display: block;
}

.classic .search-form .search-item.small {
  height: 40px !important;
  ::v-deep .v-input__control {
    height: 40px !important;
  }

  ::v-deep .v-field__input {
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    min-height: 0px !important;
    height: 40px !important;
  }

  ::v-deep .v-field__field {
    height: 40px !important;
    --v-input-padding-top: 1px !important;
    --v-field-padding-bottom: 1px !important;
  }

  ::v-deep .v-label.search-item-divider {
    width: 99px;
    // 화주사, 웨이브 align 주고 싶을때 아래 2개 주석 해제
    // text-align: center;
    // display: grid;
  }

  label {
    font-size: 22px !important;
  }
}
</style>
