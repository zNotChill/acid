const fetch = require("node-fetch");
const { Command } = require("../commands");

module.exports = {
  name: "theme",
  description: "Changes the current theme",
  execute: (args, terminal, call) => {
    
    if(!args[0]) {
      terminal.cWrite("Please specify a theme");
      call(0);
      return;
    }

    const theme = args[0];

    fetch(`https://acid-plugins.vercel.app/assets/themes/${theme}/config.json`).then(res => {
      if(res.status == 404) {
        terminal.cWrite("Theme not found");
        call(0);
        return;
      }

      if(res.status == 200) {
        terminal.cWrite("Theme found");
        res.json().then(json => {
          terminal.cWrite("Applying theme...");
          document.body.style.backgroundColor = json.backgroundColor;
          document.body.style.color = json.color;
          terminal.cWrite("Theme applied");
          call(0);
        })
      }
    })

  },
};
