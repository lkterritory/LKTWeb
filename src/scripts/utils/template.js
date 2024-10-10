export function getTempUserData() {
  const tempUserData = {
    theme: "classic",
    token: "token123456"
  };
  return tempUserData;
}

// {
//   lktHeader: {
//     type: "RESPONSE",
//     call: "PAGE.LOGIN",
//     status: "01",
//     message: "1",
//     certificate: "HYN",
//     centerCode: "HYN",
//     clientCode: "HY",
//     warehouseCode: "HYN"
//   },
//   lktBody: [
//     {
//       centerCode: "HYN",
//       clientCode: "HY",
//       userId: "HYN",
//       userName: "HYN",
//       authorityCode: "ADMIN",
//       menus: [
//         {
//           menuCode: "HEAD_LKT_MASTER",
//           menuDesc: "기준정보",
//           menuIcon: "icon-menu-mast.png",
//           menuName: "기준정보",
//           menuParent: null,
//           menuUrl: null,
//           child: [
//             {
//               menuCode: "MNU_LKT_MASTER_SKU",
//               menuDesc: "상품",
//               menuIcon: "icon-menu-mast-itemInfo.png",
//               menuName: "상품",
//               menuParent: "HEAD_LKT_MASTER",
//               menuUrl: "mast/mastItemInfo"
//             },
//             {
//               menuCode: "MNU_LKT_MASTER_LOCATION",
//               menuDesc: "로케이션",
//               menuIcon: "icon-menu-mast-locationInfo.png",
//               menuName: "로케이션",
//               menuParent: "HEAD_LKT_MASTER",
//               menuUrl: "mast/mastLocationInfo"
//             },
//             {
//               menuCode: "MNU_LKT_MASTER_USER",
//               menuDesc: "사용자",
//               menuIcon: "icon-menu-mast-userMng.png",
//               menuName: "사용자",
//               menuParent: "HEAD_LKT_MASTER",
//               menuUrl: "mast/mastUserMng"
//             },
//             {
//               menuCode: "MNU_LKT_MASTER_MENU",
//               menuDesc: "메뉴",
//               menuIcon: "icon-menu-mast-menuMng.png",
//               menuName: "메뉴",
//               menuParent: "HEAD_LKT_MASTER",
//               menuUrl: "mast/mastMenuMng"
//             },
//             {
//               menuCode: "MNU_LKT_MASTER_TSORTER",
//               menuDesc: "T-Sorter",
//               menuIcon: "icon-menu-mast-tsorter.png",
//               menuName: "T-Sorter",
//               menuParent: "HEAD_LKT_MASTER",
//               menuUrl: "mast/mastTsorter"
//             }
//           ]
//         },
//         {
//           menuCode: "HEAD_LKT_WORK",
//           menuDesc: "작업정보",
//           menuIcon: "icon-menu-exec.png",
//           menuName: "작업정보",
//           menuParent: null,
//           menuUrl: null,
//           child: [
//             {
//               menuCode: "MNU_LKT_WORK_ORDER",
//               menuDesc: "주문관리",
//               menuIcon: "icon-menu-exec-ord.png",
//               menuName: "주문관리",
//               menuParent: "HEAD_LKT_WORK",
//               menuUrl: "exec/execOrd"
//             },
//             {
//               menuCode: "MNU_LKT_WORK_ORDER_STATUS",
//               menuDesc: "출고정보(주문)",
//               menuIcon: "icon-menu-exec-ordStatus.png",
//               menuName: "출고정보(주문)",
//               menuParent: "HEAD_LKT_WORK",
//               menuUrl: "exec/execOrdStatus"
//             },
//             {
//               menuCode: "MNU_LKT_WORK_SKU_STATUS",
//               menuDesc: "출고정보(상품)",
//               menuIcon: "icon-menu-exec-itemStatus.png",
//               menuName: "출고정보(상품)",
//               menuParent: "HEAD_LKT_WORK",
//               menuUrl: "exec/execItemStatus"
//             },
//             {
//               menuCode: "MNU_LKT_WORK_FACILITIES_STATUS",
//               menuDesc: "출고정보(설비)",
//               menuIcon: "icon-menu-exec-machStatus.png",
//               menuName: "출고정보(설비)",
//               menuParent: "HEAD_LKT_WORK",
//               menuUrl: "exec/execMachStatus"
//             }
//           ]
//         },
//         {
//           menuCode: "HEAD_LKT_WORK_HISTORY",
//           menuDesc: "작업내역",
//           menuIcon: "icon-menu-hist.png",
//           menuName: "작업내역",
//           menuParent: null,
//           menuUrl: null,
//           child: [
//             {
//               menuCode: "MNU_LKT_WORK_HISTORY_ORDER",
//               menuDesc: "주문로그관리",
//               menuIcon: "icon-menu-hist-ordLog.png",
//               menuName: "주문로그관리",
//               menuParent: "HEAD_LKT_WORK_HISTORY",
//               menuUrl: "hist/histOrdLog"
//             },
//             {
//               menuCode: "MNU_LKT_WORK_HISTORY_FACILITIES",
//               menuDesc: "설비로그관리",
//               menuIcon: "icon-menu-hist-machLog.png",
//               menuName: "설비로그관리",
//               menuParent: "HEAD_LKT_WORK_HISTORY",
//               menuUrl: "hist/histMachLog"
//             }
//           ]
//         },
//         {
//           menuCode: "HEAD_LKT_WORK_ADD",
//           menuDesc: "추가정보",
//           menuIcon: "icon-menu-add.png",
//           menuName: "추가정보",
//           menuParent: null,
//           menuUrl: null,
//           child: [
//             {
//               menuCode: "MNU_LKT_WORK_ADD_REPORT",
//               menuDesc: "보고서",
//               menuIcon: "icon-menu-exec-report.png",
//               menuName: "보고서",
//               menuParent: "HEAD_LKT_WORK_ADD",
//               menuUrl: "exec/execReport"
//             },
//             {
//               menuCode: "MNU_LKT_WORK_ADD_EUC",
//               menuDesc: "EUC",
//               menuIcon: "icon-menu-exec-euc.png",
//               menuName: "EUC",
//               menuParent: "HEAD_LKT_WORK_ADD",
//               menuUrl: "exec/execEuc"
//             }
//           ]
//         },
//         {
//           menuCode: "HEAD_LKT_WORK_SPOT",
//           menuDesc: "작업운영",
//           menuIcon: "icon-menu-oper.png",
//           menuName: "작업운영",
//           menuParent: null,
//           menuUrl: null,
//           child: [
//             {
//               menuCode: "MNU_LKT_WORK_SPOT_TALLY",
//               menuDesc: "검수",
//               menuIcon: "icon-menu-exec-checker.png",
//               menuName: "검수",
//               menuParent: "HEAD_LKT_WORK_SPOT",
//               menuUrl: "exec/execChecker"
//             },
//             {
//               menuCode: "MNU_LKT_WORK_SPOT_MIDDLE_CATEGORY",
//               menuDesc: "중분류",
//               menuIcon: "icon-menu-oper-fieldMiddleCategory.png",
//               menuName: "중분류",
//               menuParent: "HEAD_LKT_WORK_SPOT",
//               menuUrl: "field/fieldMiddleCategory"
//             },
//             {
//               menuCode: "MNU_LKT_WORK_SPOT_BOX_MAPPING",
//               menuDesc: "박스연결",
//               menuIcon: "icon-menu-pda-boxMapping.png",
//               menuName: "박스연결",
//               menuParent: "HEAD_LKT_WORK_SPOT",
//               menuUrl: "pda/pdaBoxMapping"
//             }
//           ]
//         }
//       ]
//     }
//   ]
// };

export function getTempMenuData(layoutType, deviceType, centerCode) {
  const tempMenuDataWeb = [
    // {
    //   enCode: "example",
    //   vueName: "",
    //   type: 1,
    //   path: "",
    //   urlAddress: "",
    //   icon: "mdi-account-circle",
    //   fullName: "테스트",
    //   id: "99",
    //   hasChildren: true,
    //   children: [
    //     {
    //       enCode: "example1",
    //       vueName: "",
    //       type: 2,
    //       path: "",
    //       urlAddress: "example/example1",
    //       icon: "mdi-home",
    //       fullName: "테스트메뉴1",
    //       id: "9901",
    //       hasChildren: true,
    //       children: []
    //     },
    //     {
    //       enCode: "example2",
    //       vueName: "",
    //       type: 2,
    //       path: "",
    //       urlAddress: "example/example2",
    //       icon: "mdi-home",
    //       fullName: "테스트메뉴2",
    //       id: "9902",
    //       hasChildren: true,
    //       children: []
    //     },
    //     {
    //       enCode: "example3",
    //       vueName: "",
    //       type: 2,
    //       path: "",
    //       urlAddress: "example/example3",
    //       icon: "mdi-home",
    //       fullName: "테스트메뉴3",
    //       id: "9903",
    //       hasChildren: true,
    //       children: []
    //     },
    //     {
    //       enCode: "example4",
    //       vueName: "",
    //       type: 2,
    //       path: "",
    //       urlAddress: "example/example4",
    //       icon: "mdi-home",
    //       fullName: "테스트메뉴4",
    //       id: "9904",
    //       hasChildren: true,
    //       children: []
    //     },
    //     {
    //       enCode: "example5",
    //       vueName: "",
    //       type: 2,
    //       path: "",
    //       urlAddress: "example/example5",
    //       icon: "mdi-home",
    //       fullName: "테스트메뉴5",
    //       id: "9905",
    //       hasChildren: true,
    //       children: []
    //     },
    //     {
    //       enCode: "test",
    //       vueName: "",
    //       type: 2,
    //       path: "",
    //       urlAddress: "dashboard/test",
    //       icon: "mdi-home",
    //       fullName: "삭제예정",
    //       id: "9906",
    //       hasChildren: true,
    //       children: []
    //     }
    //   ]
    // },
    {
      enCode: "mast",
      vueName: "",
      type: 1,
      path: "",
      urlAddress: "",
      icon: "icon-menu-mast.png",
      fullName: "기준정보",
      id: "01",
      hasChildren: true,
      children: [
        {
          enCode: "mastItemInfo",
          vueName: "",
          type: 2,
          path: "",
          urlAddress: "mast/mastItemInfo",
          icon: "icon-menu-mast-itemInfo.png",
          fullName: "상품정보",
          id: "0101",
          hasChildren: true,
          children: []
        },
        {
          enCode: "mastLocationInfo",
          vueName: "",
          type: 2,
          path: "",
          urlAddress: "mast/mastLocationInfo",
          icon: "icon-menu-mast-locationInfo.png",
          fullName: "로케이션 정보",
          id: "0102",
          hasChildren: true,
          children: []
        },
        {
          enCode: "mastUserMng",
          vueName: "",
          type: 2,
          path: "",
          urlAddress: "mast/mastUserMng",
          icon: "icon-menu-mast-userMng.png",
          fullName: "사용자정보",
          id: "0103",
          hasChildren: true,
          children: []
        },
        {
          enCode: "mastMenuMng",
          vueName: "",
          type: 2,
          path: "",
          urlAddress: "mast/mastMenuMng",
          icon: "icon-menu-mast-menuMng.png",
          fullName: "메뉴정보",
          id: "0104",
          hasChildren: true,
          children: []
        },
        {
          enCode: "mastAuthMng",
          vueName: "",
          type: 2,
          path: "",
          urlAddress: "mast/mastAuthMng",
          icon: "icon-menu-mast-authMng.png",
          fullName: "권한정보",
          id: "0105",
          hasChildren: true,
          children: []
        },
        {
          enCode: "mastTsorter",
          vueName: "",
          type: 2,
          path: "",
          urlAddress: "mast/mastTsorter",
          icon: "icon-menu-mast-tsorter.png",
          fullName: "T-sorter맵핑",
          id: "0106",
          hasChildren: true,
          children: []
        }
      ]
    },
    {
      enCode: "exec",
      vueName: "",
      type: 1,
      path: "",
      urlAddress: "",
      icon: "icon-menu-exec.png",
      fullName: "작업정보",
      id: "02",
      hasChildren: true,
      children: [
        {
          enCode: "execOrd",
          vueName: "",
          type: 2,
          path: "",
          urlAddress: "exec/execOrd",
          icon: "icon-menu-exec-ord.png",
          fullName: "작업지시",
          id: "0201",
          hasChildren: true,
          children: []
        },
        {
          enCode: "execOrdStatus",
          vueName: "",
          type: 2,
          path: "",
          urlAddress: "exec/execOrdStatus",
          icon: "icon-menu-exec-ordStatus.png",
          fullName: "주문별 작업현황",
          id: "0202",
          hasChildren: true,
          children: []
        },
        {
          enCode: "execItemStatus",
          vueName: "",
          type: 2,
          path: "",
          urlAddress: "exec/execItemStatus",
          icon: "icon-menu-exec-itemStatus.png",
          fullName: "상품별 작업현황",
          id: "0203",
          hasChildren: true,
          children: []
        },
        {
          enCode: "execMachStatus",
          vueName: "",
          type: 2,
          path: "",
          urlAddress: "exec/execMachStatus",
          icon: "icon-menu-exec-machStatus.png",
          fullName: "설비별 작업현황",
          id: "0204",
          hasChildren: true,
          children: []
        }
      ]
    },
    {
      enCode: "hist",
      vueName: "",
      type: 1,
      path: "",
      urlAddress: "",
      icon: "icon-menu-hist.png",
      fullName: "처리내역",
      id: "03",
      hasChildren: true,
      children: [
        {
          enCode: "histOrdLog",
          vueName: "",
          type: 2,
          path: "",
          urlAddress: "hist/histOrdLog",
          icon: "icon-menu-hist-ordLog.png",
          fullName: "주문별 로그",
          id: "0301",
          hasChildren: true,
          children: []
        },
        {
          enCode: "histMachLog",
          vueName: "",
          type: 2,
          path: "",
          urlAddress: "hist/histMachLog",
          icon: "icon-menu-hist-machLog.png",
          fullName: "설비별 로그",
          id: "0302",
          hasChildren: true,
          children: []
        }
      ]
    },
    {
      enCode: "addInfo",
      vueName: "",
      type: 1,
      path: "",
      urlAddress: "",
      icon: "icon-menu-add.png",
      fullName: "추가정보",
      id: "04",
      hasChildren: true,
      children: [
        {
          enCode: "report",
          vueName: "",
          type: 2,
          path: "",
          urlAddress: "exec/execReport",
          icon: "icon-menu-exec-report.png",
          fullName: "보고서",
          id: "0401",
          hasChildren: true,
          children: []
        },
        {
          enCode: "euc",
          vueName: "",
          type: 2,
          path: "",
          urlAddress: "exec/execEuc",
          icon: "icon-menu-exec-euc.png",
          fullName: "EUC",
          id: "0402",
          hasChildren: true,
          children: []
        }
      ]
    },
    {
      enCode: "sceneOper",
      vueName: "",
      type: 1,
      path: "",
      urlAddress: "",
      icon: "icon-menu-oper.png",
      fullName: "현장운영",
      id: "05",
      hasChildren: true,
      children: [
        {
          enCode: "checker",
          vueName: "",
          type: 2,
          path: "",
          urlAddress: "exec/execChecker",
          icon: "icon-menu-exec-checker.png",
          fullName: "검수",
          id: "0501",
          hasChildren: true,
          children: []
        },
        {
          enCode: "fieldMiddleCategory",
          vueName: "",
          type: 2,
          path: "",
          urlAddress: "field/fieldMiddleCategory",
          icon: "icon-menu-oper-fieldMiddleCategory.png",
          fullName: "중분류",
          id: "0502",
          hasChildren: true,
          children: []
        }
        // {
        //   enCode: "kiosk",
        //   vueName: "",
        //   type: 2,
        //   path: "",
        //   urlAddress: "field/kiosk",
        //   icon: "icon-menu-exec-checker.png",
        //   fullName: "키오스크",
        //   id: "0503",
        //   hasChildren: true,
        //   children: []
        // }
      ]
    }
  ];

  const tempMenuDataWeb2 = [
    {
      enCode: "mast",
      vueName: "",
      type: 1,
      path: "",
      urlAddress: "",
      icon: "icon-menu-mast.png",
      fullName: "기준정보",
      id: "01",
      hasChildren: true,
      children: [
        {
          enCode: "mastUpcInfo",
          vueName: "",
          type: 2,
          path: "",
          urlAddress: "mast/mastUpcInfo",
          icon: "icon-menu-mast-upcInfo.png",
          fullName: "UPC정보",
          id: "0597",
          hasChildren: true,
          children: []
        }
      ]
    },
    {
      enCode: "sceneOper",
      vueName: "",
      type: 1,
      path: "",
      urlAddress: "",
      icon: "icon-menu-oper.png",
      fullName: "현장운영",
      id: "05",
      hasChildren: true,
      children: [
        {
          enCode: "mastRtnReg",
          vueName: "",
          type: 2,
          path: "",
          urlAddress: "mast/mastRtnReg",
          icon: "icon-menu-mast-rtnReg.png",
          fullName: "반품등록",
          id: "0599",
          hasChildren: true,
          children: []
        },
        {
          enCode: "mastPalletReg",
          vueName: "",
          type: 2,
          path: "",
          urlAddress: "mast/mastPalletReg",
          icon: "icon-menu-mast-palletReg.png",
          fullName: "파렛트등록",
          id: "0598",
          hasChildren: true,
          children: []
        },
        {
          enCode: "mastWmsReg",
          vueName: "",
          type: 2,
          path: "",
          urlAddress: "mast/mastWmsReg",
          icon: "icon-menu-mast-wmsReg.png",
          fullName: "WMS등록",
          id: "0597",
          hasChildren: true,
          children: []
        },
        {
          enCode: "report",
          vueName: "",
          type: 2,
          path: "",
          urlAddress: "exec/execReport",
          icon: "icon-menu-exec-report.png",
          fullName: "보고서",
          id: "0401",
          hasChildren: true,
          children: []
        },
        {
          enCode: "euc",
          vueName: "",
          type: 2,
          path: "",
          urlAddress: "exec/execEuc",
          icon: "icon-menu-exec-euc.png",
          fullName: "EUC",
          id: "0402",
          hasChildren: true,
          children: []
        }
      ]
    }
  ];

  // PAD용 temp page
  const tempMenuDataPad = [
    {
      enCode: "pad",
      vueName: "",
      type: 1,
      path: "",
      urlAddress: "",
      icon: "icon-menu-exec.png",
      fullName: "PAD",
      id: "77",
      hasChildren: true,
      children: [
        {
          enCode: "padIndexPage",
          vueName: "",
          type: 2,
          path: "",
          urlAddress: "pad/padIndexPage",
          icon: "icon-menu-pad-indexPage.png",
          fullName: "PAD",
          id: "7701",
          hasChildren: true,
          children: []
        }
      ]
    }
  ];

  // KIOSK용 temp page
  const tempMenuDataKiosk = [
    {
      enCode: "kiosk",
      vueName: "",
      type: 1,
      path: "",
      urlAddress: "",
      icon: "icon-menu-exec.png",
      fullName: "KIOSK",
      id: "66",
      hasChildren: true,
      children: [
        {
          enCode: "kioskIndexPage",
          vueName: "",
          type: 2,
          path: "",
          urlAddress: "kiosk/kioskIndexPage",
          icon: "icon-menu-kiosk-indexPage.png",
          fullName: "KIOSK",
          id: "6601",
          hasChildren: true,
          children: []
        }
      ]
    }
  ];

  // PDA용 temp page
  const tempMenuDataPda = [
    {
      enCode: "mobile",
      vueName: "",
      type: 1,
      path: "",
      urlAddress: "",
      icon: "icon-menu-exec.png",
      fullName: "PDA",
      id: "88",
      hasChildren: true,
      children: [
        // {
        //   enCode: "pdaBoxMapping",
        //   vueName: "",
        //   type: 2,
        //   path: "",
        //   urlAddress: "pda/pdaBoxMapping",
        //   icon: "icon-menu-pda-boxMapping.png",
        //   fullName: "박스맵핑",
        //   id: "8801",
        //   hasChildren: true,
        //   children: []
        // },
        {
          enCode: "pdaSkuPut",
          vueName: "",
          type: 2,
          path: "",
          urlAddress: "pda/pdaSkuPut",
          icon: "icon-menu-pda-skuPut.png",
          fullName: "상품적치",
          id: "8802",
          hasChildren: true,
          children: []
        },
        {
          enCode: "pdaSkuMove",
          vueName: "",
          type: 2,
          path: "",
          urlAddress: "pda/pdaSkuMove",
          icon: "icon-menu-pda-skuMove.png",
          fullName: "상품이동",
          id: "8803",
          hasChildren: true,
          children: []
        },
        {
          enCode: "pdaTotalPickingInq",
          vueName: "",
          type: 2,
          path: "",
          urlAddress: "pda/pdaTotalPickingInq",
          icon: "icon-menu-pda-totalPickingInq.png",
          fullName: "토탈피킹-조회",
          id: "8804",
          hasChildren: true,
          children: []
        },
        {
          enCode: "pdaInboundPut",
          vueName: "",
          type: 2,
          path: "",
          urlAddress: "pda/pdaInboundPut",
          icon: "icon-menu-pda-inboundPut.png",
          fullName: "입고적치",
          id: "8805",
          hasChildren: true,
          children: []
        },
        {
          enCode: "pdaInventoryMove",
          vueName: "",
          type: 2,
          path: "",
          urlAddress: "pda/pdaInventoryMove",
          icon: "icon-menu-pda-inventoryMove.png",
          fullName: "재고이동",
          id: "8806",
          hasChildren: true,
          children: []
        },
        {
          enCode: "pdaInventoryCheck",
          vueName: "",
          type: 2,
          path: "",
          urlAddress: "pda/pdaInventoryCheck",
          icon: "icon-menu-pda-inventoryCheck.png",
          fullName: "재고조사",
          id: "8807",
          hasChildren: true,
          children: []
        }
      ]
    }
  ];

  return JSON.parse(
    JSON.stringify(
      deviceType === "pad"
        ? tempMenuDataPad
        : // : deviceType === "kiosk"
        // ? tempMenuDataKiosk
        deviceType === "pda" || layoutType === "mobile"
        ? tempMenuDataPda
        : centerCode === "HYN"
        ? tempMenuDataWeb
        : tempMenuDataWeb2
    )
  );
}
