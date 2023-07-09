
const { Command } = require("../commands");

module.exports = {
  name: "help",
  description: "Shows all commands",
  execute: (args, terminal, call) => {
    terminal.cWrite(`Commands:`);
    terminal.commands.forEach((command) => {
      terminal.cWrite(`<cg>${command.getName()}</cg>${terminal.generateSpaces(25 - command.getName().length)} ${command.getDescription()}`);
    });
    call(0);
  }
}