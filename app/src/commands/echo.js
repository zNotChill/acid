
const { Command } = require("../commands");

module.exports = {
  name: "echo",
  description: "Prints text",
  execute: (args, terminal) => {
    terminal.cWrite(args.join(" "));
  }
}