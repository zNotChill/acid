const { Command } = require("../commands");

module.exports = {
  name: "echo",
  description: "Prints text",
  execute: (args, terminal, curl) => {
    terminal.cWrite(args.join(" "));
    call(0);
  },
};
