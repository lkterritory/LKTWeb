export function getSubMenuData(layoutType, deviceType, centerCode) {
  const subMenuDataWeb = [];

  // PAD
  const subMenuDataPad = [];

  // KIOSK
  const subMenuDataKiosk = [];

  // PDA
  const subMenuDataPda = [
    {
      enCode: "excludeMenu",
      vueName: "",
      type: 1,
      path: "",
      urlAddress: "",
      icon: "icon-menu-exec.png",
      fullName: "subMenu",
      id: "140",
      hasChildren: true,
      children: [
        {
          enCode: "pdaTotalPickingScan",
          vueName: "",
          type: 2,
          path: "",
          urlAddress: "pda/pdaTotalPickingScan",
          icon: "icon-menu-pda-totalPickingScan.png",
          fullName: "토탈피킹-",
          id: "14001",
          hasChildren: true,
          children: []
        }
      ]
    }
  ];

  return JSON.parse(
    JSON.stringify(
      deviceType === "pad"
        ? subMenuDataPad
        : // : deviceType === "kiosk"
        // ? subMenuDataKiosk
        deviceType === "pda" || layoutType === "mobile"
        ? subMenuDataPda
        : subMenuDataWeb
    )
  );
}
