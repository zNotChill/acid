
const { Command } = require("../commands");

module.exports = {
  name: "clear",
  description: "Clears the terminal",
  execute: (args, terminal) => {
    terminal.clear();
  }
}
