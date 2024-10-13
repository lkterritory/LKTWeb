<template>
  <v-dialog
    width="40%"
    v-model="actDialog"
    class="modal-popup"
    scrollable>
    <v-card>
      <v-toolbar
        class="top-tool-bar"
        density="compact">
        <v-toolbar-title tag="span">{{ popTitle }}</v-toolbar-title>
      </v-toolbar>
      <v-container>
        <v-form
          ref="form0"
          v-model="form0.valid"
          lazy-validation
          class="modal-form"
          @submit.prevent>
          <v-row class="d-flex justify-start align-center">
            <v-col cols="12">
              <div class="modal-item rounded-lg">
                <v-text-field
                  type="input"
                  v-model="form0.data.objectCode"
                  variant="plain"
                  hide-details="false"
                  :placeholder="
                    this.$t(`wcs.exec.popup.execCheckerMapping.objectCode`)
                  "
                  required
                  clearable
                  solo
                  maxLength="10"
                  :disabled="true">
                  <template v-slot:prepend>
                    <v-label class="modal-item-divider labels">
                      <!-- 토트박스 -->
                      {{ $t("wcs.exec.popup.execCheckerMapping.objectCode") }}
                    </v-label>
                  </template>
                </v-text-field>
              </div>
            </v-col>
          </v-row>
          <v-row class="d-flex justify-start align-center">
            <v-col cols="12">
              <div class="modal-item rounded-lg">
                <v-text-field
                  type="input"
                  v-model="form0.data.orderNumber"
                  variant="plain"
                  hide-details="false"
                  :placeholder="
                    this.$t(`wcs.exec.popup.execCheckerMapping.orderNumber`)
                  "
                  required
                  clearable
                  solo
                  maxLength="10"
                  :disabled="true">
                  <template v-slot:prepend>
                    <v-label class="modal-item-divider labels">
                      <!-- 주문번호 -->
                      {{ $t("wcs.exec.popup.execCheckerMapping.orderNumber") }}
                    </v-label>
                  </template>
                </v-text-field>
              </div>
            </v-col>
          </v-row>
          <v-row
            v-if="form0.data.isReprint"
            class="d-flex justify-start align-center">
            <v-col cols="12">
              <div class="modal-item rounded-lg">
                <v-select
                  v-model="form0.data.labelCodeSeleted"
                  :items="form0.data.labelCode"
                  item-title="printCode"
                  item-value="printCode"
                  variant="plain"
                  density="compact"
                  hide-details="false"
                  single-line>
                  <template v-slot:prepend>
                    <v-label class="modal-item-divider labels">
                      라벨코드
                    </v-label>
                  </template>
                </v-select>
              </div>
            </v-col>
          </v-row>

          <v-row class="d-flex justify-start align-center">
            <v-col cols="12">
              <div class="modal-item rounded-lg">
                <v-text-field
                  type="input"
                  ref="boxNum"
                  v-model="boxNum"
                  variant="plain"
                  :placeholder="
                    this.$t(`wcs.exec.popup.execCheckerMapping.boxNum`)
                  "
                  required
                  clearable
                  solo
                  maxLength="10"
                  autofocus
                  :rules="enterKeyValidation ? rules.boxNum : []"
                  @keyup.enter="btnSave()">
                  <template v-slot:prepend>
                    <v-label class="modal-item-divider labels">
                      <!-- 박스번호 -->
                      {{ $t("wcs.exec.popup.execCheckerMapping.boxNum") }}
                    </v-label>
                  </template>
                </v-text-field>
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
      <v-footer class="grp-btn">
        <!-- <v-spacer></v-spacer> -->
        <!-- <v-btn
          class="v-col-6 btn-loader cancel-btn"
          :loading="dataLoading"
          :disabled="dataLoading"
          @click="closeDialog(isOpen)">
          {{ $t("common.cancelButton") }}
        </v-btn> -->
        <v-btn
          class="v-col-12 btn-loader excute-btn"
          :loading="dataLoading"
          :disabled="dataLoading"
          @click="btnSave()">
          <!-- 저장 -->
          {{ $t("common.excute") }}
        </v-btn>
      </v-footer>
    </v-card>
  </v-dialog>
</template>
<script>
import {mapGetters} from "vuex";
import * as filters from "@/filters";
import common from "@/utils/common";
import * as execChecker from "@/api/exec/execChecker.js";
import * as sounds from "@/assets/sounds";

export default {
  name: "checkerMapping",
  // 추가 components (별도의 모듈 추가)
  components: {},
  props: {
    isDivOk: {
      type: Boolean,
      default: false
    },
    isOpen: {
      type: Boolean,
      default: false
    },
    param: {
      type: Object,
      required: false
    },
    param2: {
      type: Object,
      required: false
    },
    labelCode: {
      type: Object,
      required: false
    },
    popTitle: {
      type: Object,
      required: false
    }
    // barcodeInput: {
    //   type: Object,
    //   required: true
    // }
  },
  // 반복적으로 연산되는 데이터 처리(state, complex data 등)
  computed: {
    ...mapGetters(["userInfo"]),
    // 다이얼로그 Close
    actDialog() {
      return this.isOpen;
    }
  },
  // 데이터(이 페이지에서 사용할 변수)
  data() {
    return {
      enterKeyValidation: false,
      isDialog: false,
      dataLoading: false,

      inputErrMsg: "",
      boxNum: "",
      form0: {
        valid: true,
        data: {
          objectCode: "", // 토트박스
          orderNumber: "", // 주문번호
          labelCode: [], // 라벨코드(프린트코드)
          labelCodeSeleted: {},
          // boxNum: "", // 박스번호
          isReprint: false
        }
      },
      rules: {
        boxNum: [
          (v) =>
            !!v ||
            this.$t("wcs.common.validate.required", [
              // 박스번호
              this.$t("wcs.exec.popup.execCheckerMapping.boxNum")
            ]),
          (v) =>
            //!(v.charAt(0) !== "A" || v.length <= 6) ||
            !(!isNaN(v.charAt(0)) || v.length != 7) || // 첫자리가 문자가 아니거나 6자리 이하면 잘못된 박스번호
            // 올바른 박스번호가 아닙니다.
            this.$t("wcs.exec.popup.execCheckerMapping.validBoxMessage")
        ]
      }
    };
  },
  watch: {
    boxNum(n, o) {
      if (n) {
        const value = this.$inko.ko2en(n); // 한 -> 영 변환
        const noEngRule = /^[a-zA-Z0-9\-]*$/; // 영문 (소,대), 숫자, 하이픈
        if (!noEngRule.test(value)) {
          this.boxNum = o.toUpperCase();
        } else {
          this.boxNum = value.toUpperCase();
        }
      }
    },
    isOpen(value) {
      if (value) {
        this.initData();
      }
    },
    isDivOk(value) {
      if (value == true) {
        this.testcall("tt");
        this.dataLoading = false;
        this.save();
      } else {
        this.testcall("ff");
      }
    }
  },

  created() {},
  mounted() {},
  methods: {
    testcall(val) {
      console.log(val);
    },
    /**************************************************************************
     * 현재 팝업을 닫을 시 Parent로 전달하는 이벤트
     *
     * @param {Boolean} dialog Close status
     **************************************************************************/
    closeDialog(dialog) {
      this.clearForm();
      this.$emit("close", dialog);
    },
    clearForm() {
      // this.form0.data.objectCode = "";
      // this.form0.data.orderNumber = "";
      // this.form0.data.boxNum = "";
      // this.form0.data.isReprint = false;

      this.form0.data.objectCode = ""; // 토트박스
      this.form0.data.orderNumber = ""; // 주문번호
      this.form0.data.labelCode = []; // 라벨코드(프린트코드)
      this.form0.data.labelCodeSeleted = {};
      this.boxNum = ""; // 박스번호
      this.form0.data.isReprint = false;
    },
    /**************************************************************************
     * 현재 팝업을 닫을 시 Parent로 전달하는 이벤트
     *
     * @param {Boolean} dialog Close status
     **************************************************************************/
    initData() {
      this.dataLoading = false;

      if (this.param) {
        // 데이터 바인딩
        this.form0.data.objectCode = this.param.objectCode;
        this.form0.data.orderNumber = this.param.orderNumber;
        this.boxNum = "";

        if (this.labelCode.length > 0) {
          this.form0.data.isReprint = true;
        }

        if (this.form0.data.isReprint) {
          // 중복제거 sum 수정중

          //alert(JSON.stringify(this.labelCode));
          // const distinctOptions = this.labelCode.filter(
          //   (value, index, self) =>
          //     index ===
          //     self.findIndex((item) => item.printCode === value.printCode)
          // );

          const distinctOptions = this.labelCode.filter(
            (value, index, self) => {
              const firstIndex = self.findIndex(
                (item) => item.printCode === value.printCode
              );
              if (index === firstIndex) {
                // 중복이 아닌 경우
                // inspQty 값을 합치기
                value.inspQty = self
                  .filter((item) => item.printCode === value.printCode)
                  .reduce((acc, item) => acc + item.inspQty, 0);
                return true;
              }
              return false;
            }
          );

          this.form0.data.labelCode = common.deepCopyObject(distinctOptions);

          this.form0.data.labelCode.forEach((element) => {
            element.printCode = element.printCode + "(" + element.inspQty + ")";
          });

          this.form0.data.labelCodeSeleted = "";
          if (this.form0.data.labelCode.length == 1) {
            // 하나면 자동 적용
            this.form0.data.labelCodeSeleted =
              this.form0.data.labelCode[0].printCode;
          }
        }

        this.inputErrMsg = "";
      }

      setTimeout(() => {
        this.$refs.boxNum.$el.querySelector("input").select();
      }, 200);
    },
    /**************************************************************************
     * Form Validation Chechk
     **************************************************************************/
    async validate() {
      const barcodeBoxEl = await this.$refs.boxNum.$el.querySelector("input");

      const {valid, errors} = await this.$refs.form0.validate();
      if (!valid) {
        let errorMessage = "";
        try {
          errorMessage = errors[0].errorMessages[0];
        } catch (e) {
          errorMessage = this.$t("common.contactAdmin"); // 관리자에게 문의해주세요.
        }

        var audio = new Audio(sounds["fail"]);
        audio.play();

        this.inputErrMsg = errorMessage;

        // this.$alert({
        //   type: "error",
        //   title: this.$t("wcs.common.alertTitle.saveFail"),
        //   message: errorMessage
        // }).then(async () => {
        //   setTimeout(() => {
        //     barcodeBoxEl.select();
        //   }, 500);
        // });
      } else {
        this.inputErrMsg = "";
      }

      return valid;
    },
    /**************************************************************************
     * Click Save button
     **************************************************************************/
    async btnSave() {
      this.enterKeyValidation = true;

      const valid = await this.$refs.form0.validate();

      if (valid.valid) {
        // this.$store.commit("app/SET_LOADING", {loading: true});
        if (!this.form0.data.isReprint) {
          // 재발행아닐때만 분할로직 탄다

          this.dataLoading = true;
          this.$emit("boxDivProc"); // 박스분할 -> 분할로직끝나고 메인에서 save를 호출한다.
        } else {
          // 재발행이면 바로 맵핑
          this.save();
        }
      } else {
        const barcodeBoxEl = await this.$refs.boxNum.$el.querySelector("input");
        barcodeBoxEl.select();

        var audio = new Audio(sounds["fail"]);
        audio.play();
        this.dataLoading = false;
      }
    },
    // async btnSave2() {
    //   this.enterKeyValidation = true;

    //   const valid = await this.$refs.form0.validate();
    //   // alert(JSON.stringify(valid));
    //   // alert(valid.valid);
    //   // return;

    //   // alert(valid.valid);
    //   // this.$emit("close");
    //   // return;
    //   if (valid.valid) {
    //     // 여기다 분할로직 넣어야 함... // 팝업에서 메인화면 함수 호출하고 리턴함수 받아서 맵핑api호출
    //     // this.$confirm({
    //     //   title: "",
    //     //   message: this.$t("common.confirmMessage"), // 저장 하시겠습니까?
    //     //   show: true,
    //     //   type: "normal"
    //     // })
    //     //   .then(async () => {
    //     //     try {
    //     // 저장 API

    //     // this.$emit("boxDivProc");

    //     // this.timer = setTimeout(() => {
    //     this.save();
    //     // }, 200);

    //     //   } catch (e) {
    //     //     console.log(e);
    //     //   }
    //     // })
    //     // .catch((err) => {});
    //   } else {
    //     const barcodeBoxEl = await this.$refs.boxNum.$el.querySelector("input");
    //     barcodeBoxEl.select();

    //     var audio = new Audio(sounds["fail"]);
    //     audio.play();
    //   }

    //   this.enterKeyValidation = false;
    // },
    /**************************************************************************
     * Save Api
     **************************************************************************/
    async save() {
      let printCode = ""; // 일반분할일때
      if (this.param2 && Object.keys(this.param2).length > 0) {
        printCode = this.param2.printCode;
      } else {
        // 재밉핑일때
        if (this.form0.data.labelCodeSeleted.length <= 0) {
          this.$alert({
            title: "알림",
            message: "라벨코드를 선택하세요."
          });

          return;
        }

        printCode = this.form0.data.labelCodeSeleted;
      }

      if (printCode == "") {
        this.$alert({
          title: "알림",
          message: "프린트코드가 없습니다."
        });
        return;
      }

      if (printCode.indexOf("(") >= 0) {
        printCode = printCode.substring(0, printCode.indexOf("("));
      }

      try {
        const query = {
          lktHeader: {
            type: "REQUEST",
            call: "PAGE.TALLY.OBJBOX.PUT",
            status: 0,
            message: "",
            encryption: "",
            centerCode: this.userInfo.centerCode,
            clientCode: this.userInfo.clientCode,
            warehouseCode: this.userInfo.warehouseCode
          },
          lktBody: [
            {
              orderNumber: this.form0.data.orderNumber,
              objectBox: this.boxNum,
              printCode: printCode,
              userId: this.userInfo.userId
              // inputType: this.param.inputType ? this.param.inputType : ""
            }
          ]
        };

        // 테스트
        // alert(printCode);
        // return;

        if (
          query.lktBody[0].objectBox == "" ||
          query.lktBody[0].objectBox == null
        ) {
          this.$alert({
            title: "알림",
            message: "박스번호가 없습니다."
          });

          this.dataLoading = false;
          this.enterKeyValidation = false;
          return;
        }

        this.dataLoading = true;
        this.$store.commit("app/SET_LOADING", {loading: true});

        const res = await execChecker.modiBoxMapping(query);

        if (res.lktHeader.status === "01") {
          // this.$alert({
          //   type: "success",
          //   title: this.$t("common.info"), // 알림
          //   message: this.$t("common.successMessage")
          // });

          // if (!this.isReprint) this.$emit("save");

          this.$emit("save");

          this.closeDialog(this.isOpen);
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
        this.dataLoading = false;
        this.enterKeyValidation = false;
        this.$store.commit("app/SET_LOADING", {loading: false});
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-form {
  .labels {
    width: 100px;
  }
}

.v-messages__message {
  font-size: 1.5em;
}
</style>
