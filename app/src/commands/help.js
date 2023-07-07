
const { Command } = require("../commands");

module.exports = new Command(
  "help",
  "Shows all commands",
  (args, terminal) => {
    terminal.cWrite(`Commands:`);
    terminal.commands.forEach((command) => {
      terminal.cWrite(`<cg>${command.getName()}</cg>${terminal.generateSpaces(25 - command.getName().length)} ${command.getDescription()}`);
    });
  }
)