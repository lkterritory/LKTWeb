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
              <Framework-table
                id="result"
                ref="form1"
                :headers="result.headers"
                :items="result.items"
                :selected="result.itemsSelected"
                :current-page="result.pagination.currentPage"
                :rows-per-page="20" />
              <!-- 버튼 영역 -->
              <v-col
                cols="12"
                class="pl-0 pr-0">
                <v-hover>
                  <template v-slot:default="{isHovering, props}">
                    <v-btn
                      class="print-btn ml-0"
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
                      @click="btnExcelDownload()">
                      <!-- 엑셀 다운로드 -->
                      {{ $t("wcs.common.excelDownload") }}
                    </v-btn>
                  </template>
                </v-hover>
              </v-col>
              <!-- 버튼 영역 -->
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <exec-euc-reg
      :isOpen="execEucRegObj.openPop"
      @close="execEucRegObj.openPop = false"
      @sendData="showData"
      :param="execEucRegObj.param"
      :loading="execEucRegObj.loading" />
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
            align: "left",
            width: "auto",
            sortable: true
          }
        ],
        items: []
      },
      result: {
        itemsSelected: [], // checkbox response data
        headers: [],
        items: [],
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
            width: "auto",
            sortable: true
          };
          headers.push(header);
        }
        // {
        //   const columnWidth = 160;
        //   const header = {
        //     text: "tmpt",
        //     value: "tmpv",
        //     align: "center",
        //     width: "auto",
        //     sortable: true
        //   };

        //   headers.push(header);
        // }
      }

      this.result.headers = headers;
      this.result.items = this.egInitRows(data) || [];

      //alert("dd");
    },
    getDynamicWidth(text) {
      var isKorean = /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(text);
      let returnWidth = 0;
      if (isKorean) {
        returnWidth = text.length * 30; // 한글
      } else {
        returnWidth = text.length * 20; // 영문
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
.left-table ::v-deep .vue3-easy-data-table__main {
  // 좌측 그리드 크기
  height: 100%;
}
#result {
  // 내보내기 버튼 제외한 우측 그리드 크기
  height: calc(100vh - var(--top-height) - 223px) !important;
}
.right-table ::v-deep .vue3-easy-data-table__main {
  // 페이지네이션 제외한 우측 그리드 크기
  height: calc(100% - 47px);
}
.print-btn {
  width: 100% !important;
}
</style>
