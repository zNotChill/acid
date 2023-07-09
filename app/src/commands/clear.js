
const { Command } = require("../commands");

module.exports = {
  name: "clear",
  description: "Clears the terminal",
  execute: (args, terminal, call) => {
    terminal.clear();
    call(0);
  }
}
