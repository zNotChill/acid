
const { Command } = require("../commands");

module.exports = new Command(
  "help",
  "Shows all commands",
  (args, terminal) => {
    terminal.cWrite(`Commands:`);
    terminal.commands.forEach((command) => {
      terminal.cWrite(`${command.getName()} - ${command.getDescription()}`);
    });
  }
)