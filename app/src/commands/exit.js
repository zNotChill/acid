
const { Command } = require("../commands");

module.exports = {
  name: "exit",
  description: "Exits the terminal",
  execute: (args, terminal) => {
    window.close();
  }
}