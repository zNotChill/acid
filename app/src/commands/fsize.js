
const { Command } = require("../commands");

module.exports = {
  name: "fsize",
  description: "Changes global font size",
  execute: (args, terminal) => {
    var size = args[0];

    if(!size.includes("px")) {
      size += "px";
    }

    document.body.style.fontSize = `${size}`;
    terminal.cWrite(`Changed global font size to <cg>${size}</cg>`)

    return 0;
  },
  flags: {
    requiresArgs: true,
    minimumArgs: 1,
    usage: "fsize <size>",
  }
}