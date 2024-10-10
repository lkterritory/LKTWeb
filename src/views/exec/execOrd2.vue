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
    <div
      class="execOrd"
      v-html="html"></div>
    <Calendar
      ref="Calendar"
      :startDate="new Date()"
      format="yyyy-MM-dd"
      :enable-time-picker="false"
      @changeDate="filterQuery.workDate = $event"></Calendar>
    <Framework-table
      ref="form0"
      :headers="form0.headers"
      :items="form0.items"
      :current-page="form0.pagination.currentPage"
      :rows-per-page="20"
      @click-row="rowClick"
      :selected="form0.itemsSelected"
      hasC />
    <MultiSelectBox
      ref="MultiSelectBox"
      :items="commonData.workBatch"
      icon="icon-order-number.png"
      :title="'&nbsp; ' + $t(`wcs.common.workBatch`)"
      @selected="this.filterQuery.workBatch = $event">
    </MultiSelectBox>
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

  <!-- <div class="v-row">
        <div class="v-col v-col-12">
          <div
            class="v-card v-theme--light v-card--density-default rounded-lg v-card--variant-outlined search-form bg-primary-form border-color justify-start align-center">
            <div class="v-card__loader">
              <div
                class="v-progress-linear v-theme--light"
                role="progressbar"
                aria-hidden="true"
                aria-valuemin="0"
                aria-valuemax="100"
                style="
                  top: 0px;
                  height: 0px;
                  --v-progress-linear-height: 2px;
                  left: 50%;
                  transform: translateX(-50%);
                ">
                <div
                  class="v-progress-linear__background"
                  style="width: 100%"></div>
                <div class="v-progress-linear__indeterminate">
                  <div class="v-progress-linear__indeterminate long"></div>
                  <div class="v-progress-linear__indeterminate short"></div>
                </div>
              </div>
            </div>
            <div class="v-row h-auto w-100 pa-0 ma-0">
              <div class="v-col">
                <div class="v-row d-flex justify-start align-center">
                  <div class="v-col v-col-auto">
                    <div class="search-item rounded-lg">
                      <div
                        class="v-responsive"
                        style="width: 390px">
                        <div class="v-responsive__sizer"></div>
                        <div class="v-responsive__content">
                          <div
                            class="v-input v-input--horizontal v-input--density-default v-input--dirty v-text-field v-text-field--flush-details">
                            <div class="v-input__prepend">
                              <label class="v-label search-item-divider">
                                <div class="v-responsive v-img">
                                  <div
                                    class="v-responsive__sizer"
                                    style="padding-bottom: 109.091%"></div>
                                  <img
                                    class="v-img__img v-img__img--contain"
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAYCAMAAADJYP15AAAANlBMVEUzMzMzMzMzMzMzMzMzMzMzMzMzMzNHcEwzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzP2mlrkAAAAEXRSTlPZH0/ih1abAA810AjwX8OhZrBdrFYAAACiSURBVCjPhZGNDsIgDITb4iwtP/Pe/2UtukzdWPwSCFyOoxTSoLrueB0zKZug2k6FGCsJJggR1vuBFU4JegIp3PmoZlDIEzeR43Yisvuskh7uJssP0sJ9kf2uZIxStkXe5NKrKROxWu1llzPQ1ADThtd2C7EWZxeJoId9QqavDJnDo8wxWf66MkGUAVZBKlOZyr+QyZUX3+DjxIHooPm5r25PXhgRfK8xSqAAAAAASUVORK5CYII="
                                    alt=""
                                    style="" />
                                </div>
                                &nbsp; 출고일자
                              </label>
                            </div>
                            <div class="v-input__control">
                              <div
                                class="v-field v-field--active v-field--dirty v-field--no-label v-field--variant-plain v-theme--light"
                                role="textbox">
                                <div class="v-field__overlay"></div>
                                <div class="v-field__loader">
                                  <div
                                    class="v-progress-linear v-theme--light"
                                    role="progressbar"
                                    aria-hidden="true"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                    style="
                                      top: 0px;
                                      height: 0px;
                                      --v-progress-linear-height: 2px;
                                      left: 50%;
                                      transform: translateX(-50%);
                                    ">
                                    <div
                                      class="v-progress-linear__background"
                                      style="width: 100%"></div>
                                    <div
                                      class="v-progress-linear__indeterminate">
                                      <div
                                        class="v-progress-linear__indeterminate long"></div>
                                      <div
                                        class="v-progress-linear__indeterminate short"></div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  class="v-field__field"
                                  data-no-activator="">
                                  <label
                                    class="v-label v-field-label"
                                    for="input-51">
                                  </label>
                                  <div
                                    class="v-field__input calendar-input"
                                    data-no-activator=""></div>
                                </div>
                                <div class="v-field__outline"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="v-col v-col-auto">
                    <div class="search-item rounded-lg">
                      <div
                        class="v-responsive"
                        style="width: 390px">
                        <div class="v-responsive__sizer"></div>
                        <div
                          class="v-responsive__content MultiSelectBox-input"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="v-col v-col-auto d-flex justify-end align-center">
                <button
                  type="button"
                  class="searchOrdList v-btn v-theme--light v-btn--density-default rounded-lg v-btn--size-default v-btn--variant-outlined bg-surface-btn text-surface-text btn-border-color font-weight-regular">
                  <span class="v-btn__overlay"></span
                  ><span class="v-btn__underlay"></span>
                  <span
                    class="v-btn__content"
                    data-no-activator="">
                    조회</span
                  ></button
                ><button
                  type="button"
                  class="planOrd v-btn v-theme--light v-btn--density-default rounded-lg v-btn--size-default v-btn--variant-outlined bg-surface-btn text-surface-text btn-border-color font-weight-regular">
                  <span class="v-btn__overlay"></span
                  ><span class="v-btn__underlay"></span>
                  <span
                    class="v-btn__content"
                    data-no-activator="">
                    작업계획</span
                  ></button
                ><button
                  type="button"
                  class="jobOrd v-btn v-theme--light v-btn--density-default rounded-lg v-btn--size-default v-btn--variant-outlined bg-surface-btn text-surface-text btn-border-color font-weight-regular">
                  <span class="v-btn__overlay"></span
                  ><span class="v-btn__underlay"></span>
                  <span
                    class="v-btn__content"
                    data-no-activator="">
                    작업지시</span
                  ></button
                ><button
                  type="button"
                  class="jobEnd v-btn v-theme--light v-btn--density-default rounded-lg v-btn--size-default v-btn--variant-outlined bg-surface-btn text-surface-text btn-border-color font-weight-regular">
                  <span class="v-btn__overlay"></span
                  ><span class="v-btn__underlay"></span>
                  <span
                    class="v-btn__content"
                    data-no-activator="">
                    작업완료</span
                  >
                </button>
              </div>
            </div>
            <span class="v-card__underlay"></span>
          </div>
        </div>
      </div>
      <div class="v-row inner-content mt-0">
        <div class="v-col v-col-12 h-100">
          <div class="grid0-input"></div>
        </div>
      </div> -->
</template>

<script>
import editGrid from "@/mixins/editGrid";
import common from "@/utils/common";
import * as filters from "@/filters";
import * as execOrd from "@/api/exec/execOrd.js";
import execOrdReg from "./popup/execOrdReg.vue";
import execEqpCompAlloc from "./popup/execEqpCompAlloc.vue";
import dayjs from "dayjs";
import {mapGetters, mapState} from "vuex";

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
  watch: {},

  // 데이터(이 페이지에서 사용할 변수)
  data() {
    return {
      html: "",
      openEqpCompAlloc: false,
      rowVal: undefined,
      commonData: {
        workBatch: []
      },
      filterQuery: {
        // workDate: new Date(),
        // TODO 임시
        workDate: dayjs("2023-03-28").format("YYYY-MM-DD"),
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
            align: "center",
            width: 120,
            sortable: false,
            mergeRow: true
          },
          {
            text: this.$t("wcs.common.facilitiesCode"), // 설비코드
            value: "facilitiesCode",
            align: "center",
            width: 180,
            sortable: false
          },
          {
            text: this.$t("wcs.common.facilitiesName"), // 설비명
            value: "facilitiesName",
            align: "center",
            width: 200,
            sortable: false
          },
          {
            text: this.$t("wcs.common.totalOrder"), // 주문건수
            value: "totalPlanOrderCount",
            align: "center",
            width: 150,
            sortable: false,
            formatter: (value) => {
              return filters.toThousandFilter(value);
            }
          },
          {
            text: this.$t("wcs.common.totalSku"), // 상품건수
            value: "totalPlanSkuCount",
            align: "center",
            width: 150,
            sortable: false,
            formatter: (value) => {
              return filters.toThousandFilter(value);
            }
          },
          {
            text: this.$t("wcs.common.totalPcs"), // 낱개수량
            value: "totalPlanQuantity",
            align: "center",
            width: 150,
            sortable: false,
            formatter: (value) => {
              return filters.toThousandFilter(value);
            }
          },
          {
            text: this.$t("wcs.common.totalWorkOrderCount"), // 작업주문건수
            value: "totalWorkOrderCount",
            align: "center",
            width: 180,
            sortable: false,
            formatter: (value) => {
              return filters.toThousandFilter(value);
            }
          },
          {
            text: this.$t("wcs.common.totalWorkQuantity"), // 작업낱개수량
            value: "totalWorkQuantity",
            align: "center",
            width: 180,
            sortable: false,
            formatter: (value) => {
              return filters.toThousandFilter(value);
            }
          },
          {
            text: this.$t("wcs.common.totalWorkSkuCount"), // 작업품목수량
            value: "totalWorkSkuCount",
            align: "center",
            width: 180,
            sortable: false,
            formatter: (value) => {
              return filters.toThousandFilter(value);
            }
          },
          {
            text: this.$t("wcs.common.persent"), // 진행율
            value: "persent",
            align: "center",
            width: 130,
            sortable: false
          },
          {
            text: this.$t("wcs.common.statusName"), // 상태명
            value: "statusName",
            align: "center",
            width: 150,
            sortable: false
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
            align: "center",
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
            align: "center",
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
    // TODO 공통코드
    const workBatch = [
      {text: "1회차", value: "1"},
      {text: "2회차", value: "2"},
      {text: "3회차", value: "3"},
      {text: "4회차", value: "4"},
      {text: "5회차", value: "5"},
      {text: "6회차", value: "6"},
      {text: "7회차", value: "7"},
      {text: "8회차", value: "8"}
    ];
    this.commonData.workBatch = workBatch;
    this.init();
  },

  mounted() {
    this.html =
      '<div class="v-row"><div class="v-col v-col-12"><div class="v-card v-theme--light v-card--density-default rounded-lg v-card--variant-outlined search-form bg-primary-form border-color justify-start align-center"><div class="v-card__loader"><div class="v-progress-linear v-theme--light"role="progressbar"aria-hidden="true"aria-valuemin="0"aria-valuemax="100"style="top: 0px;height: 0px;--v-progress-linear-height: 2px;left: 50%;transform: translateX(-50%);"><div class="v-progress-linear__background"style="width: 100%"></div><div class="v-progress-linear__indeterminate"><div class="v-progress-linear__indeterminate long"></div><div class="v-progress-linear__indeterminate short"></div></div></div></div><div class="v-row h-auto w-100 pa-0 ma-0"><div class="v-col"><div class="v-row d-flex justify-start align-center"><div class="v-col v-col-auto"><div class="search-item rounded-lg"><div class="v-responsive"style="width: 390px"><div class="v-responsive__sizer"></div><div class="v-responsive__content"><div class="v-input v-input--horizontal v-input--density-default v-input--dirty v-text-field v-text-field--flush-details"><div class="v-input__prepend"><label class="v-label search-item-divider"><div class="v-responsive v-img"><div class="v-responsive__sizer"style="padding-bottom: 109.091%"></div><img class="v-img__img v-img__img--contain"src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAYCAMAAADJYP15AAAANlBMVEUzMzMzMzMzMzMzMzMzMzMzMzMzMzNHcEwzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzP2mlrkAAAAEXRSTlPZH0/ih1abAA810AjwX8OhZrBdrFYAAACiSURBVCjPhZGNDsIgDITb4iwtP/Pe/2UtukzdWPwSCFyOoxTSoLrueB0zKZug2k6FGCsJJggR1vuBFU4JegIp3PmoZlDIEzeR43Yisvuskh7uJssP0sJ9kf2uZIxStkXe5NKrKROxWu1llzPQ1ADThtd2C7EWZxeJoId9QqavDJnDo8wxWf66MkGUAVZBKlOZyr+QyZUX3+DjxIHooPm5r25PXhgRfK8xSqAAAAAASUVORK5CYII="alt=""style=""/></div>&nbsp;출고일자</label></div><div class="v-input__control"><div class="v-field v-field--active v-field--dirty v-field--no-label v-field--variant-plain v-theme--light"role="textbox"><div class="v-field__overlay"></div><div class="v-field__loader"><div class="v-progress-linear v-theme--light"role="progressbar"aria-hidden="true"aria-valuemin="0"aria-valuemax="100"style="top: 0px;height: 0px;--v-progress-linear-height: 2px;left: 50%;transform: translateX(-50%);"><div class="v-progress-linear__background"style="width: 100%"></div><div class="v-progress-linear__indeterminate"><div class="v-progress-linear__indeterminate long"></div><div class="v-progress-linear__indeterminate short"></div></div></div></div><div class="v-field__field"data-no-activator=""><label class="v-label v-field-label"for="input-51"></label><div class="v-field__input calendar-input"data-no-activator=""></div></div><div class="v-field__outline"></div></div></div></div></div></div></div></div><div class="v-col v-col-auto"><div class="search-item rounded-lg"><div class="v-responsive"style="width: 390px"><div class="v-responsive__sizer"></div><div class="v-responsive__content MultiSelectBox-input"></div></div></div></div></div></div><div class="v-col v-col-auto d-flex justify-end align-center"><button type="button"class="searchOrdList v-btn v-theme--light v-btn--density-default rounded-lg v-btn--size-default v-btn--variant-outlined bg-surface-btn text-surface-text btn-border-color font-weight-regular"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span><span class="v-btn__content"data-no-activator="">조회</span></button><button type="button"class="planOrd v-btn v-theme--light v-btn--density-default rounded-lg v-btn--size-default v-btn--variant-outlined bg-surface-btn text-surface-text btn-border-color font-weight-regular"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span><span class="v-btn__content"data-no-activator="">작업계획</span></button><button type="button"class="jobOrd v-btn v-theme--light v-btn--density-default rounded-lg v-btn--size-default v-btn--variant-outlined bg-surface-btn text-surface-text btn-border-color font-weight-regular"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span><span class="v-btn__content"data-no-activator="">작업지시</span></button><button type="button"class="jobEnd v-btn v-theme--light v-btn--density-default rounded-lg v-btn--size-default v-btn--variant-outlined bg-surface-btn text-surface-text btn-border-color font-weight-regular"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span><span class="v-btn__content"data-no-activator="">작업완료</span></button></div></div><span class="v-card__underlay"></span></div></div></div><div class="v-row inner-content mt-0"><div class="v-col v-col-12 h-100"><div class="grid0-input"></div></div></div>';
    this.searchOrdList();

    this.$nextTick(() => {
      const displayElement = document.querySelector(".execOrd");
      // 조회 버튼
      const selectBtn = displayElement.querySelector(".searchOrdList");
      selectBtn.addEventListener("click", (e) => this.searchOrdList());
      // 작업계획 버튼
      const planOrdBtn = displayElement.querySelector(".planOrd");
      planOrdBtn.addEventListener("click", (e) => this.planOrd());
      // 작업지시 버튼
      const jobOrdBtn = displayElement.querySelector(".jobOrd");
      jobOrdBtn.addEventListener("click", (e) => this.jobOrd());
      // 작업완료 버튼
      const jobEndBtn = displayElement.querySelector(".jobEnd");
      jobEndBtn.addEventListener("click", (e) => this.jobEnd());

      // 캘린더 컴포넌트 렌더링
      const calendarInput = displayElement.querySelector(".calendar-input");
      calendarInput.appendChild(this.$refs.Calendar.$el);

      // 멀티셀렉트 컴포넌트 렌더링
      const MultiSelectBoxInput = displayElement.querySelector(
        ".MultiSelectBox-input"
      );
      MultiSelectBoxInput.appendChild(this.$refs.MultiSelectBox.$el);

      // 그리드 0 컴포넌트 렌더링
      const grid0Input = displayElement.querySelector(".grid0-input");
      grid0Input.appendChild(this.$refs.form0.$el);
    });
  },
  methods: {
    async init() {
      await this.$nextTick();
      this.$refs.form0.clearFocus();
    },
    showData(data) {
      this.form0.items = this.egInitRows(data) || [];
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
        this.getExecOrd();
      }
    },
    async getExecOrd() {
      let lktBody = [];
      let format = "YYYY-MM-DD";

      if (this.filterQuery.workBatch.length > 0) {
        this.filterQuery.workBatch.forEach((d) => {
          lktBody.push({
            workDate: dayjs(this.filterQuery.workDate).format(format),
            workBatch: d
          });
        });
      } else {
        lktBody.push({
          workDate: dayjs(this.filterQuery.workDate).format(format),
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

        if (res.lktBody) {
          this.form0.items = this.egInitRows(res.lktBody) || [];

          // 로우 셀 병합
          this.$refs.form0.mergeRow();
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
          if (this.rowVal) {
            this.openEqpCompAlloc = true;
          }
        });
      }, 100);
    },
    async planOrd() {
      const selectedData = this.form0.itemsSelected;
      let sendData = [];
      if (selectedData && selectedData.length) {
        const planTargeted = selectedData.filter((d) => {
          // 기존코드 - statusCode 가 "01" 이 아닌 것만 작업계획 시키고 있어서 같은 기능으로 적용함
          return d.statusCode !== "01";
        });

        if (!planTargeted || !planTargeted.length) {
          this.$alert({
            title: this.$t("wcs.exec.execOrd.failPlanOrd"),
            message: this.$t("wcs.exec.execOrd.ExistPlanOrd")
          });
          return false;
        }

        sendData = this.removeDuplicatesByFields(
          planTargeted,
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
        return {workDate: d.workDate, workBatch: d.workBatch};
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
        }
      } catch (e) {
        if (e.message) {
          e.message.title = this.$t("wcs.common.alertTitle.saveFail");
          this.$alert(e.message);
        } else {
          this.$alert({
            title: this.$t("wcs.common.alertTitle.saveFail"),
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
        return {workDate: d.workDate, workBatch: d.workBatch};
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
        }
      } catch (e) {
        if (e.message) {
          e.message.title = this.$t("wcs.common.alertTitle.saveFail");
          this.$alert(e.message);
        } else {
          this.$alert({
            title: this.$t("wcs.common.alertTitle.saveFail"),
            message: this.$t("common.searchFailedDetail")
          });
        }
      } finally {
        this.$store.commit("app/SET_LOADING", {loading: false});
      }
    },
    /**************************************************************************
     * 작업 완료
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
        return {workDate: d.workDate, workBatch: d.workBatch};
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
        }
      } catch (e) {
        if (e.message) {
          e.message.title = this.$t("wcs.common.alertTitle.saveFail");
          this.$alert(e.message);
        } else {
          this.$alert({
            title: this.$t("wcs.common.alertTitle.saveFail"),
            message: this.$t("common.searchFailedDetail")
          });
        }
      } finally {
        this.$store.commit("app/SET_LOADING", {loading: false});
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
