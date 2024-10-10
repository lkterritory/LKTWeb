<!-----------------------------------------------------------------------------
 | title: ECU
 | creator: JSW
 | date : 2023-02-01
 | description: execEuc View
 | composition:
 |  <template />
 |  <script />
 |  <style />
 ----------------------------------------------------------------------------->
<template>
  <div>
    <div
      v-html="html"
      class="execEuc"></div>

    <exec-euc-reg
      :isOpen="execEucRegObj.openPop"
      @close="execEucRegObj.openPop = false"
      @sendData="showData"
      :param="execEucRegObj.param"
      :loading="execEucRegObj.loading" />

    <Framework-table
      ref="form0"
      :headers="form0.headers"
      :items="form0.items"
      hide-footer
      :selected="form0.itemsSelected"
      @click-row="editRow" />

    <Framework-table
      id="result"
      ref="form1"
      :headers="result.headers"
      :items="result.items"
      :selected="result.itemsSelected"
      hide-footer />
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import editGrid from "@/mixins/editGrid";
import * as filters from "@/filters";
import common from "@/utils/common";
import * as execEuc from "@/api/exec/execEuc.js";
import execEucReg from "./popup/execEucReg.vue";

export default {
  name: "execEuc",
  // 추가 components (별도의 모듈 추가)
  components: {execEucReg},
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
      execEucRegObj: {
        openPop: false,
        param: {},
        loading: false
      },
      filterQuery: {
        centerCd: ""
      },
      form0: {
        itemsSelected: [], // checkbox response data
        headers: [
          {
            text: this.$t("wcs.euc.title"),
            value: "macroName",
            align: "center",
            width: 160,
            sortable: true
          }
        ],
        items: []
      },
      result: {
        itemsSelected: [], // checkbox response data
        headers: [],
        items: []
      }
    };
  },
  created() {},
  mounted() {
    const html =
      '<div class="v-row"><div class="v-col v-col-12"><div class="v-card v-theme--light v-card--density-default rounded-lg v-card--variant-outlined top-form search-form border-color d-flex justify-start align-center"><div class="v-card__loader"><div class="v-progress-linear v-theme--light"role="progressbar"aria-hidden="true"aria-valuemin="0"aria-valuemax="100"style="top: 0px;height: 0px;--v-progress-linear-height: 2px;left: 50%;transform: translateX(-50%);"><div class="v-progress-linear__background"style="width: 100%"></div><div class="v-progress-linear__indeterminate"><div class="v-progress-linear__indeterminate long"></div><div class="v-progress-linear__indeterminate short"></div></div></div></div><div class="v-row inner-content pl-0 pr-0 mt-0 mr-3 pt-0 v-col-4"><div class="v-col v-col-12 h-100 left-table grid0-input"></div></div><div class="v-row inner-content pl-0 pr-0 mt-0 ml-3 pt-0 v-col-8 justify-end"><div class="v-col v-col-12 h-100 right-table"><div class="grid1-input"></div><div class="v-col v-col-12 pl-0 pr-0"><button type="button"class="btnExcelDownload v-btn v-theme--light v-btn--density-default rounded-lg v-btn--size-default v-btn--variant-outlined print-btn ml-0 bg-surface-btn text-surface-text btn-border-color font-weight-regular"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span><span class="v-btn__content">내보내기</span></button></div></div></div><span class="v-card__underlay"></span></div></div></div>';

    this.html = html;

    this.$nextTick(() => {
      const displayElement = document.querySelector(".execEuc");

      // 엑셀 내리기 버튼
      const excelBtn = displayElement.querySelector(".btnExcelDownload");
      excelBtn.addEventListener("click", (e) => this.btnExcelDownload());

      // 그리드 0 컴포넌트 렌더링
      const grid0Input = displayElement.querySelector(".grid0-input");
      grid0Input.appendChild(this.$refs.form0.$el);

      // 그리드 1 컴포넌트 렌더링
      const grid1Input = displayElement.querySelector(".grid1-input");
      grid1Input.appendChild(this.$refs.form1.$el);
    });

    this.searchEucList();
  },
  methods: {
    async init() {
      await this.$nextTick();
      this.$refs.form0.clearFocus();
    },
    showData(data) {
      let headers = [];
      if (data.length) {
        for (const key in data[0]) {
          const columnWidth = this.getDynamicWidth(key);
          const header = {
            text: key,
            value: key,
            align: "center",
            width: columnWidth,
            sortable: true
          };
          headers.push(header);
        }
      }
      this.result.headers = headers;
      this.result.items = this.egInitRows(data) || [];
    },
    getDynamicWidth(text) {
      var isKorean = /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(text);
      let returnWidth = 0;
      if (isKorean) {
        returnWidth = text.length * 30; // 한글
      } else {
        returnWidth = text.length * 17; // 영문
      }
      return returnWidth < 160 ? 160 : returnWidth;
    },
    /**************************************************************************
     * () 리스트를 조회한다.
     **************************************************************************/
    async searchEucList() {
      this.$store.commit("app/SET_LOADING", {loading: true});
      this.result.headers = [];

      const query = {
        lktHeader: {
          type: "REQUEST",
          call: "PAGE.MACRO.GET",
          status: 0,
          message: "",
          encryption: "",
          centerCode: this.userInfo.centerCode,
          clientCode: this.userInfo.clientCode,
          warehouseCode: this.userInfo.warehouseCode
        },
        lktBody: [
          {
            macroType: "PROCEDURE"
          }
        ]
      };

      try {
        const res = await execEuc.searchExecEucList({
          id: common.encodeBase64(query)
        });

        if (Object.keys(res.lktBody).length !== 0) {
          this.form0.items = this.egInitRows(res.lktBody) || [];
        } else {
          this.form0.items = [];
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
    // setGridElement() {
    //   const displayElement = document.querySelector(".execEuc");
    //   const tbody = displayElement.querySelector(
    //     ".vue3-easy-data-table__body.form0"
    //   );
    //   while (tbody.firstChild) {
    //     tbody.removeChild(tbody.firstChild);
    //   }

    //   this.form0.items.forEach((d, i) => {
    //     const rownumClass = "rownum_" + (i + 1);
    //     let text =
    //       '<td class="direction-center direction-left" data-v-30ede217=""><p class="grid-item macroName">' +
    //       d.macroName +
    //       "</p></td>";
    //     var gridRowElement = document.createElement("tr");
    //     gridRowElement.className = rownumClass;
    //     gridRowElement.innerHTML = text;
    //     tbody.appendChild(gridRowElement);
    //     gridRowElement.addEventListener("click", (e) => this.editRow(d));
    //   });
    // },
    /**************************************************************************
     * 로우 클릭 function
     *
     * @param {Object} row Grid Row Object
     **************************************************************************/
    rowClick(row) {},
    /**************************************************************************
     * 그리드 로우를 수정한다.
     *
     * @param {Object} row Grid Row Object
     **************************************************************************/
    editRow(row) {
      this.execEucRegObj.param = row;
      this.execEucRegObj.openPop = true;
      this.execEucRegObj.loading = true;
    },
    btnExcelDownload() {
      const headers = this.result.headers.map((d) => {
        return d.text;
      });

      if (!this.result.items.length) {
        // this.$notify({
        //   type: "warn",
        //   title: this.$t("common.info"), // 알림
        //   text: this.$t("wcs.common.notExistData"), // 작업할 데이터가 존재하지 않습니다.
        //   duration: 3000
        // });
        this.$alert({
          title: this.$t("common.searchFailed"),
          message: this.$t("wcs.common.notExistData")
        });

        return false;
      }
      const title = this.$t("wcs.euc.title");
      let aoa = [[title]];
      aoa.push(headers);

      this.result.items.forEach((d) => {
        let excelData = [];
        headers.forEach((h) => {
          excelData.push(d[h]);
        });
        aoa.push(excelData);
      });

      let cols = [{wch: 10}];
      this.$common.exportExcel(aoa, `${title}`, cols);
    }
  }
};
</script>

<style lang="scss" scoped>
.inner-content {
  height: calc(100vh - var(--top-height) - 132px);
}
.top-form {
  border: none;
  padding: 0;
}
.left-table,
.right-table {
  padding-top: 0;
}
::v-deep .vue3-easy-data-table__main {
  height: 100%;
}
#result {
  height: calc(100vh - var(--top-height) - 223px) !important;
}
.print-btn {
  width: 100% !important;
}
</style>
