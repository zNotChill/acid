
const { Command } = require("../commands");

module.exports = new Command(
  "exit",
  "Exits the terminal",
  (args, terminal) => {
    window.close();
  }
)
