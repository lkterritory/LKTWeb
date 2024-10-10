<!-----------------------------------------------------------------------------
 | title: T-sorter print
 | creator: 조형근
 | date : 2023-07-30
 | description: execEuc View
 | composition:
 |  <template />
 |  <script />
 |  <style />
 ----------------------------------------------------------------------------->
<template>
  <!-- 메인 -->
  <v-row class="h-100 classic pt-3">
    <!-- 버튼영역 -->
    <v-col
      cols="12"
      class="search-form pb-0 d-flex justify-end">
      <v-hover>
        <template v-slot:default="{isHovering, props}">
          <v-btn
            v-bind="props"
            :class="[
              isHovering
                ? `bg-primary-btn`
                : `bg-surface-btn text-surface-text`,
              `btn-border-color`,
              `font-weight-regular`,
              `mx-2`
            ]"
            rounded="lg"
            variant="outlined"
            @click="onBtnLabelCompletion()">
            <!-- 일괄처리 -->
            {{ $t("wcs.common.procAll") }}
          </v-btn>
        </template>
      </v-hover>
    </v-col>
    <v-col
      cols="12"
      class="py-0">
      <!-- <v-hover>
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
            
            {{ $t("wcs.common.search") }}
          </v-btn>
        </template>
      </v-hover> -->

      <v-card
        class="top-form search-form border-color d-flex justify-start align-center"
        variant="outlined"
        rounded="lg">
        <v-row class="inner-content pl-0 pr-0 ma-0 pt-0">
          <v-col
            cols="12"
            class="h-100">
            <Framework-table
              ref="form0"
              :headers="form0.headers"
              :items="form0.items"
              :selected="form0.itemsSelected" />
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
  <Report
    v-if="isReport"
    ref="report"
    :isReport="isReport"
    :isShow="false"></Report>
</template>

<script>
import {mapGetters} from "vuex";
import editGrid from "@/mixins/editGrid";
import * as filters from "@/filters";
import common from "@/utils/common";
import * as execTsorterPrint from "@/api/exec/execTsorterPrint.js";
import zebra from "@/utils/printer/zebra";

export default {
  name: "execTsorterPrint",
  // 추가 components (별도의 모듈 추가)
  components: {},
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
      isPrinting: false, // 프린트중 구분
      isReport: false,
      roofEvent: null,
      filterQuery: {},
      form0: {
        itemsSelected: [], // checkbox response data
        headers: [
          {
            text: "프린트",
            value: "printCode",
            align: "center",
            width: "auto",
            sortable: true
          }
          //,
          // {
          //   text: "주문번호",
          //   value: "orderNumber",
          //   align: "left",
          //   width: "auto",
          //   sortable: true
          // },
          // {
          //   text: "출력시간",
          //   value: "outputDate",
          //   align: "left",
          //   width: "auto",
          //   sortable: true
          // }
        ],
        items: []
      }
    };
  },
  activated() {
    this.eventSet();
  },
  deactivated() {
    // this.eventStop();
  },
  created() {
    zebra.setup();
    this.eventSet();
  },
  unmounted() {
    this.eventStop();
  },
  mounted() {
    this.init();
    this.searchList();
  },
  methods: {
    /**************************************************************************
     * () 리스트를 조회한다.
     **************************************************************************/
    async printTest() {
      // this.searchList();
      // return;

      try {
        let resDetail = {
          lktHeader: {
            type: "RESPONSE",
            call: "PAGE.LIBIAO.LBO001.HY.DIVISION.PRINT.DETAIL.GET",
            status: "01",
            message: null,
            certificate: "",
            centerCode: "hyscm",
            clientCode: "hy",
            warehouseCode: "HY_NONSAN"
          },
          lktBody: [
            {
              workDate: "20230810",
              shipToCode: "98000",
              // shipToName: "병점점 본점",
              shipToName: "택배배송(논산)_본점",
              toWarehouseCode: "ddd cdcd",
              toWarehouseName: "hy 논산물류센터",
              tsortLabel: "TS1N8G980000001",
              tsortLocationCode: "8R40",
              vehicleDockNumber: "00",
              // vehicleNumber: "(팬15)T 가나다라1 사아자차",
              vehicleNumber: "택배배송(미배차)",
              boxCount: "1/-",
              transportCode_1: "1 ▶ 01지구\t1개",
              transportCode_2: "1 ▶ 01지구\t1개",
              transportCode_3: "1 ▶ 01지구\t1개",
              transportCode_4: "1 ▶ 01지구\t1개",
              transportCode_5: "1 ▶ 01지구\t1개",
              transportCode_6: "1 ▶ 01지구\t1개",
              transportCode_7: "1 ▶ 01지구\t1개",
              transportCode_8: "1 ▶ 01지구\t1개"
            }
          ]
        };

        //await this.$refs.report.directPrint("HNW_HY_TSorter_Label", resDetail);
        await this.$nextTick(); // 이후 실행
        //this.outputZPrint("usb", resDetail);
        this.outputZPrint("10.169.42.147", resDetail);

        // resDetails.push({
        //   printCode: d.PRINT_CODE,
        //   orderNumber: resDetail.lktBody[0].ORDER_NUMBER,
        //   outputDate: dtNow
        // });
      } catch (e) {
        // alert("dfdf");
        // if(e == {})
        // alert(e.message);

        if (e.message) {
          this.$alert(e.message);
        } else {
          this.$alert({
            title: this.$t("common.searchFailed"),
            message: this.$t("common.searchFailedDetail")
          });
        }
      }
    },

    eventSet() {
      // return;
      if (this.roofEvent) return false;

      this.roofEvent = setInterval(() => {
        this.searchList();
      }, 4000);
      this.$store.commit("settings/CHANGE_SETTING", {
        key: "viewEvent",
        value: this.roofEvent
      });
    },
    eventStop() {
      clearInterval(this.roofEvent);
      this.roofEvent = null;
    },
    async init() {
      await this.$nextTick();
      this.$refs.form0.clearFocus();
    },
    /**************************************************************************
     * () 리스트를 조회한다.
     **************************************************************************/
    async searchList() {
      // test
      // let tmpText = "(팬11T)경북82아 1111효";

      // // 탑 6자리
      // let vehicleNumberTop = tmpText.substring(0, 6);
      // // 미들 은 탑뺀거
      // let vehicleNumberMiddle = tmpText.replace(vehicleNumberTop, "");
      // let vehicleNumberBottom = "";

      // if (vehicleNumberMiddle.length > 6) {
      //   // 미들이 6자리 넘으면 6자리만 넣ㄱ시
      //   vehicleNumberMiddle = vehicleNumberMiddle.substring(0, 6);
      //   // 버틈에 실제 넘버에서 탑과 미들을 뺀 텍스트는 버틈
      //   vehicleNumberBottom = tmpText
      //     .replace(vehicleNumberTop, "")
      //     .replace(vehicleNumberMiddle, "");
      // }
      // end test

      if (this.isPrinting) {
        return;
      }
      try {
        zebra.setup();
      } catch (e) {}

      this.$store.commit("app/SET_LOADING", {loading: true});

      //this.form0.items = [{printCode: "123"}];

      this.form0.items = [];
      let resDetails = [];

      // resDetails.push({
      //   printCode: "dd"
      // });

      const query = {
        lktHeader: {
          type: "REQUEST",
          call: "PAGE.LIBIAO.LBO001.HY.REISSUE_LABEL_PRINT.GET",
          status: 0,
          message: "",
          encryption: "",
          centerCode: "hyscm",
          clientCode: "hy",
          warehouseCode: "HY_NONSAN"
        },
        lktBody: []
      };

      try {
        const dtNow = this.getCurrentDateTimeString();

        //console.log(dtNow);

        const res = await execTsorterPrint.searchList({
          id: common.encodeBase64(query)
        });

        let nCntPrint = res.lktBody.length;
        let nIdxPrint = 0;
        res.lktBody.forEach(async (d) => {
          this.isPrinting = true;
          try {
            const query = {
              lktHeader: {
                type: "REQUEST",
                call: "PAGE.LIBIAO.LBO001.HY.REISSUE_LABEL_PRINT.GET",
                status: 0,
                message: "",
                encryption: "",
                centerCode: "hyscm",
                clientCode: "hy",
                warehouseCode: "HY_NONSAN"
              },
              lktBody: [
                {
                  printCode: d.printCode
                }
              ]
            };

            const resDetail = await execTsorterPrint.searchDetail({
              id: common.encodeBase64(query)
            });

            await this.$nextTick(); // 이후 실행

            setTimeout(() => {
              this.outputZPrint(d.printIp, resDetail);
            }, 200);

            resDetails.push({
              printCode: d.printCode
            });
          } catch (e) {
            if (e.message) {
              console.warn(e.message);
            } else {
              console.warn(JSON.stringify(e));
            }
          } finally {
            this.form0.items = resDetails;

            nIdxPrint++;
            if (nIdxPrint == nCntPrint) {
              this.isPrinting = false;
            }
          }
        });

        await this.$nextTick(); // 이후 실행
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

        this.form0.items = resDetails;
      }
    },

    outputZPrint(printCode, printData) {
      let arrBody = printData.lktBody;
      if (arrBody.length <= 0) return;

      let body = arrBody[0];

      try {
        let nLen = body.shipToName.length;
        let nSpace = 0;

        if (nLen >= 20) {
          nSpace = 0;
        } else {
          nSpace = (20 - nLen) / 2;
        }

        for (let i = 0; i < nSpace; i++) {
          body.shipToName = " " + body.shipToName;
        }

        // 탑 6자리
        let vehicleNumberTop = body.vehicleNumber.substring(0, 6); // body.vehicleNumber
        // 미들 은 탑뺀거
        let vehicleNumberMiddle = body.vehicleNumber.replace(
          vehicleNumberTop,
          ""
        );
        let vehicleNumberBottom = "";

        if (vehicleNumberMiddle.length > 6) {
          // 미들이 6자리 넘으면 6자리만 넣ㄱ시
          vehicleNumberMiddle = vehicleNumberMiddle.substring(0, 6);
          // 버틈에 실제 넘버에서 탑과 미들을 뺀 텍스트는 버틈
          vehicleNumberBottom = body.vehicleNumber
            .replace(vehicleNumberTop, "")
            .replace(vehicleNumberMiddle, "");
        }

        // "^FO321,905^A1,40,40^FB800,1,0,R^FD(팬11T)^FS\n" +
        //             "^FO371,905^A1,40,40^FB800,1,0,R^FD경북82아5^FS\n" +
        //             "^FO421,905^A1,40,40^FB800,1,0,R^FD495호^FS\n" +

        // let toWarehouseNameTop = body.toWarehouseName.substring(0, 3); //
        // let toWarehouseNameBottom = body.toWarehouseName.replace(
        //   toWarehouseNameTop,
        //   ""
        // );

        let toWarehouseNameTop = body.toWarehouseName;
        let toWarehouseNameBottom = "";

        let zplData =
          "^XA\n" +
          "^SEE:UHANGUL.DAT^FS\n" +
          "^CW1,E:KFONT3.FNT^CI26^FS\n\n" +
          "^CI28\n\n" +
          "" +
          "^PW900\n" +
          "^LH40,40\n" +
          "^FWB\n\n" +
          "" +
          "^FO0,0^GB720,1100,4^FS\n\n" +
          "" +
          "^FO70,0^GB0,200,3^FS\n" +
          "^FO70,800^GB0,300,3^FS\n" +
          "^FO140,0^GB0,1100,3^FS\n" +
          "^FO228,0^GB0,800,3^FS\n" +
          "^FO316,0^GB0,800,3^FS\n" +
          "^FO404,0^GB0,800,3^FS\n" +
          "^FO492,0^GB0,800,3^FS\n" +
          "^FO140,400^GB440,0,3^FS\n" +
          "^FO580,0^GB0,1100,3^FS\n\n" +
          "" +
          "^FO0,200^GB140,0,3^FS\n" +
          "^FO0,800^GB720,0,3^FS\n\n" +
          "" +
          "^FT50,175^A1,30,30^FD박스 " +
          body.boxCount +
          "^FS\n" +
          "^FT120,140^A1,30,30^FD" +
          body.shipToCode +
          "^FS\n" +
          //"^FT85,740^A1,40,35^FD" +
          "^FO40,0^A1,65,65^FB970,1,0,C^FD" +
          body.shipToName +
          "^FS\n" +
          "^FT199,790^A1,40,40^FD" +
          (body.transportCode_1 ? body.transportCode_1 : "") +
          "^FS\n" +
          "^FT289,790^A1,40,40^FD" +
          (body.transportCode_2 ? body.transportCode_2 : "") +
          "^FS\n" +
          "^FT379,790^A1,40,40^FD" +
          (body.transportCode_3 ? body.transportCode_3 : "") +
          "^FS\n" +
          "^FT469,790^A1,40,40^FD" +
          (body.transportCode_4 ? body.transportCode_4 : "") +
          "^FS\n" +
          "^FT559,790^A1,40,40^FD" +
          (body.transportCode_5 ? body.transportCode_5 : "") +
          "^FS\n" +
          //---- h
          "^FT199,390^A1,40,40^FD" +
          (body.transportCode_6 ? body.transportCode_6 : "") +
          "^FS\n" +
          "^FT289,390^A1,40,40^FD" +
          (body.transportCode_7 ? body.transportCode_7 : "") +
          "^FS\n" +
          "^FT379,390^A1,40,40^FD" +
          (body.transportCode_8 ? body.transportCode_8 : "") +
          "^FS\n" +
          "^FT469,390^A1,40,40^FD" +
          (body.transportCode_9 ? body.transportCode_9 : "") +
          "^FS\n" +
          "^FT559,390^A1,40,40^FD" +
          (body.transportCode_10 ? body.transportCode_10 : "") +
          "^FS\n" +
          //----e

          "^FT710,80^A1,30,30^FD" +
          (body.tsortLocationCode ? body.tsortLocationCode : "") +
          "^FS\n\n" +
          "" +
          // "^FT350,1090^A1,43,43^FD대구80아^FS\n" +
          //           "^FT400,1090^A1,41,41^FD  6886호^FS\n\n" +

          // "^FO321,905^A1,40,40^FB800,1,0,R^FD(팬11T)^FS\n" +
          //             "^FO371,905^A1,40,40^FB800,1,0,R^FD경북82아5^FS\n" +
          //             "^FO421,905^A1,40,40^FB800,1,0,R^FD495호^FS\n" +

          "^FO301,805^A1,55,55^FB800,1,0,R^FD" +
          vehicleNumberTop + // 87
          "^FS\n" +
          "^FO351,805^A1,55,55^FB800,1,0,R^FD" +
          vehicleNumberMiddle + // 87
          "^FS\n" +
          "^FO401,805^A1,55,55^FB800,1,0,R^FD" +
          vehicleNumberBottom +
          "^FS\n\n" +
          "" +
          "^FT50,1040^A1,30,30^FD" +
          body.workDate +
          "^FS\n" +
          "^FT120,1085^A1,50,50^FD" +
          toWarehouseNameTop + // 12345 좌 상단 두번째 칸1
          "^FS\n" +
          "^FT130,1085^A1,25,25^FD" +
          toWarehouseNameBottom + // 12345 좌 상단 두번째 칸2
          "^FS\n\n" +
          "" +
          "^FT670,1060^A1,65,65^FD" +
          "도크:" +
          body.vehicleDockNumber +
          "^FS\n\n" +
          "" +
          "^FT680,750^BY3\n" +
          "^BC,90,Y,N,N^FD" +
          body.tsortLabel + // TS1N7S300800001 // 바코드
          "^FS\n\n" +
          "" +
          "^XZ";

        console.log("zplData:" + zplData);

        //console.log("zplData:" + zplData);

        zebra.writeToSelectedPrinter(printCode, zplData);
      } catch (e) {
        if (e.message) {
          console.warn(e.message);
        } else {
          console.warn(JSON.stringify(e));
        }
      }
    },
    /**************************************************************************
     * () 일괄출력 버튼
     **************************************************************************/
    async onBtnLabelCompletion() {
      let lktBody = [];

      const query = {
        lktHeader: {
          type: "REQUEST",
          call: "PAGE.LIBIAO.LBO001.HY.REISSUE.LABEL.PRINT.COMPLETION.PUT",
          status: 0,
          message: "",
          encryption: "",
          centerCode: "hyscm",
          clientCode: "hy",
          warehouseCode: "HY_NONSAN"
        },
        lktBody: lktBody
      };

      try {
        this.$store.commit("app/SET_LOADING", {loading: true});

        const res = await execTsorterPrint.labelCompletion(query);
        if (res.lktHeader.status === "01") {
          this.searchList();

          this.$alert({
            title: "일괄출력 완료",
            message: null
          }).then(async () => {
            setTimeout(() => {}, 500);
          });
        } else {
          this.$alert({
            title: "일괄출력 실패",
            message: res.lktHeader.message
          });
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
    getCurrentDateTimeString() {
      const now = new Date();

      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");

      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    /**************************************************************************
     * 로우 클릭 function
     *
     * @param {Object} row Grid Row Object
     **************************************************************************/
    rowClick(row) {}
  },
  sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }
};

String.prototype.format = function () {
  var formatted = this;
  for (var arg in arguments) {
    formatted = formatted.replace("{" + arg + "}", arguments[arg]);
  }
  return formatted;
};
</script>

<style lang="scss" scoped>
.inner-content {
  height: 100%;
}
.top-form {
  border: none;
  padding: 0;
}
.inner-content ::v-deep .vue3-easy-data-table__main {
  // height: calc(100vh - var(--top-height) - 223px);
  height: 88vh;
}
::v-deep.inner-content {
  .vue3-easy-data-table__footer {
    display: none;
  }
}
</style>
