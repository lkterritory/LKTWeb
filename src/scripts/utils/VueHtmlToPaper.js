function addStyles(win, styles) {
  styles.forEach((style) => {
    let link = win.document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", style);
    win.document.getElementsByTagName("head")[0].appendChild(link);
  });
}

const VueHtmlToPaper = {
  install(app, options = {}) {
    app.config.globalProperties.$htmlToPaper = (
      el,
      localOptions,
      cb = () => true
    ) => {
      let defaultName = "_blank",
        defaultSpecs = ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
        defaultReplace = true,
        defaultStyles = [
          "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
          "https://unpkg.com/kidlat-css/css/kidlat.css"
        ];
      let {
        name = defaultName,
        specs = defaultSpecs,
        replace = defaultReplace,
        styles = defaultStyles
      } = options;

      // If has localOptions
      // TODO: improve logic
      if (!!localOptions) {
        if (localOptions.name) name = localOptions.name;
        if (localOptions.specs) specs = localOptions.specs;
        if (localOptions.replace) replace = localOptions.replace;
        if (localOptions.styles) styles = localOptions.styles;
      }

      specs = !!specs.length ? specs.join(",") : "";

      const element = window.document.getElementById(el);
      // console.log(
      //   "   ###   ",
      //   element.children[0].children[0].children[0].children[0]
      // );

      // const tableItem = element.children[0].children[0].children[0].children[0];
      // console.log(tableItem);
      // tableItem.setAttribute("class", "tableItem");

      if (!element) {
        return;
      }

      const url = "";
      const win = window.open(url, name, specs, replace);

      win.document.write(`
          <html>
            <head>
              <title>${window.document.title}</title>
            </head>
            <body>
              ${element.innerHTML}
            </body>
          </html>
        `);

      addStyles(win, styles);

      setTimeout(() => {
        win.document.close();
        win.focus();
        win.print();
        win.close();
        cb();
      }, 1000);

      return true;
    };
  }
};

export default VueHtmlToPaper;
