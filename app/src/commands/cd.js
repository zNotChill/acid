
const { Command } = require("../commands");

module.exports = new Command(
  "cd",
  "Changes the current directory",
  (args, terminal) => {
    terminal.cWrite(`Command not implemented yet. Try <cg>ls</cg>. Works the same way.`)
  }
)