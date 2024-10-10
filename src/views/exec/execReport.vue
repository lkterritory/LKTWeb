<!-----------------------------------------------------------------------------
 | title: execEuc(ECU)
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
    <!-- 메인 -->
    <v-row>
      <v-col cols="12">
        <v-card
          class="top-form search-form border-color d-flex justify-start align-center"
          variant="outlined"
          rounded="lg">
          <v-row class="inner-content pl-0 pr-0 mt-0 mr-3 pt-0 v-col-4">
            <v-col
              cols="12"
              class="h-100 left-table">
              <Framework-table
                ref="form0"
                :headers="form0.headers"
                :items="form0.items"
                hide-footer
                :selected="form0.itemsSelected"
                @click-row="editRow" />
            </v-col>
          </v-row>
          <v-row
            class="inner-content pl-0 pr-0 mt-0 ml-3 pt-0 v-col-8 justify-end">
            <v-col
              cols="12"
              class="h-100 right-table">
              <v-card
                class="h-100"
                v-if="this.isReport === true">
                <Report
                  ref="report"
                  :isReport="isReport"></Report>
              </v-card>
              <Framework-table
                v-if="this.isReport === false"
                :headers="result.headers"
                :items="result.items"
                :selected="result.itemsSelected"
                hide-footer />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <exec-report-reg
      :isOpen="execReportRegObj.openPop"
      @close="execReportRegObj.openPop = false"
      @sendData="showData"
      :param="execReportRegObj.param" />
    <!-- 메인 -->
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import editGrid from "@/mixins/editGrid";
import * as filters from "@/filters";
import common from "@/utils/common";
import * as execReport from "@/api/exec/execReport.js";
import execReportReg from "./popup/execReportReg.vue";

export default {
  name: "execReport",
  // 추가 components (별도의 모듈 추가)
  components: {execReportReg},
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
      isReport: false,
      originHeader: [],
      execReportRegObj: {
        openPop: false,
        param: {}
      },
      filterQuery: {
        centerCd: ""
      },
      form0: {
        itemsSelected: [],
        headers: [
          {
            text: this.$t("common.report"),
            value: "macroName",
            align: "left",
            width: "auto"
          }
        ],
        items: []
      },
      result: {
        itemsSelected: [],
        headers: [
          {
            text: "MACRO_CODE",
            value: "MACRO_CODE",
            align: "left",
            width: 160
          },
          {
            text: "MACRO_NAME",
            value: "MACRO_NAME",
            align: "center",
            width: 120
          },
          {
            text: "PARAMETER_CODE",
            value: "PARAMETER_CODE",
            align: "center",
            width: 160
          },
          {
            text: "PARAMETER_DESC",
            value: "PARAMETER_DESC",
            align: "center",
            width: 160
          },
          {
            text: "PARAMETER_NAME",
            value: "PARAMETER_NAME",
            align: "center",
            width: 160
          },
          {
            text: "PARAMETER_PLACEHOLDER",
            value: "PARAMETER_PLACEHOLDER",
            align: "center",
            width: 160
          }
        ],
        items: []
      }
    };
  },
  created() {},
  mounted() {
    this.searchReportList();
  },
  methods: {
    async init() {
      await this.$nextTick();
      this.$refs.form0.clearFocus();
    },
    async showData(data) {
      // this.result.headers = this.originHeader;
      // this.result.items = this.egInitRows(data) || [];
      this.isReport = true;
      await this.$nextTick(); // isReport 이후 실행
      await this.$refs.report.loadReport(this.execReportRegObj.param.macroCode);
      await this.$refs.report.openReport(data);
    },
    /**************************************************************************
     * () 리스트를 조회한다.
     **************************************************************************/
    async searchReportList() {
      this.$store.commit("app/SET_LOADING", {loading: true});
      this.originHeader = this.result.headers;
      let emptyHeader = [];
      this.result.headers = emptyHeader;

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
            macroType: "REPORT"
          }
        ]
      };

      try {
        const res = await execReport.searchExecReportList({
          id: common.encodeBase64(query)
        });

        if (Object.keys(res.lktBody).length != 0) {
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
    /**************************************************************************
     * 로우 클릭 function
     *
     * @param {Object} row Grid Row Object
     **************************************************************************/
    async rowClick(row) {},
    /**************************************************************************
     * 그리드 로우를 수정한다.
     *
     * @param {Object} row Grid Row Object
     **************************************************************************/
    editRow(row) {
      this.execReportRegObj.param = row;
      this.execReportRegObj.openPop = true;
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
</style>
