
const { Command } = require("../commands");

module.exports = new Command(
  "fsize",
  "Changes global font size",
  (args, terminal) => {
    var size = args[0];

    if(!size.includes("px")) {
      size += "px";
    }

    document.body.style.fontSize = `${size}`;
    terminal.cWrite(`Changed global font size to <cg>${size}</cg>`)

    return 0;
  },
  {
    requiresArgs: true,
    minimumArgs: 1,
    usage: "fsize <size>",
  }
)