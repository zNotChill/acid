
const { Command } = require("../commands");

module.exports = new Command(
  "clear",
  "Clears the terminal",
  (args, terminal) => {
    terminal.clear();
  }
)
