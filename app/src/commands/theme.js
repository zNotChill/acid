const fetch = require("node-fetch");
const { Command } = require("../commands");
const { loadDisplay } = require("../../lib/loadSettings");
const fs = require("fs");
const path = require("path");
const { assetsDir, cacheDataDir, cacheData } = require("../../lib/data");

module.exports = {
  name: "theme",
  description: "Changes the current theme",
  execute: (args, terminal, call) => {
    
    if(!args[0]) {
      terminal.cWrite("Please specify a theme");
      call(0);
      return;
    }

    const theme = args[0].toLowerCase();

    fetch(`https://acid-plugins.vercel.app/assets/themes/${theme}/config.json`).then(res => {
      if(res.status == 404) {
        terminal.cWrite("Theme not found");
        call(0);
        return;
      }

      if(res.status == 200) {
        terminal.cWrite("Installing theme");

        res.json().then(json => {
          loadDisplay(json["display"]);
          terminal.cWrite("Theme installed");

          fs.mkdirSync(assetsDir + "/themes/" + theme, { recursive: true });

          const data = cacheData();

          data.display.theme.selected = theme;
          if(!data.display.theme.installed.includes(theme)) {
            data.display.theme.installed.push(theme);
          }
          fs.writeFileSync(cacheDataDir + "/data.json", JSON.stringify(data, null, 2));
          fs.writeFileSync(assetsDir + "/themes/" + theme + "/config.json", JSON.stringify(json, null, 2));
          call(0);
          return;
        })
      }
    })

  },
};
