
const { Command } = require("../commands");

module.exports = {
  name: "cd",
  description: "Changes the current directory",
  execute: (args, terminal) => {
    terminal.cWrite(`Command not implemented yet. Try <cg>ls</cg>. Works the same way.`)
  }
}