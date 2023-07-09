
const { Command } = require("../commands");

module.exports = {
  name: "fsize",
  description: "Changes global font size",
  execute: (args, terminal, call) => {
    var size = args[0];

    if(!size.includes("px")) {
      size += "px";
    }

    document.body.style.fontSize = `${size}`;
    terminal.cWrite(`Changed global font size to <cg>${size}</cg>`)

    call(0);
  },
  flags: {
    requiresArgs: true,
    minimumArgs: 1,
    usage: "fsize <size>",
  }
}