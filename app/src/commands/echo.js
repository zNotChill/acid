
const { Command } = require("../commands");

module.exports = new Command(
  "echo",
  "Prints text",
  (args, terminal) => {
    terminal.cWrite(args.join(" "));
  }
)