
const { Command } = require("../commands");

module.exports = new Command(
  "user",
  "Changes the current user",
  
  (args, terminal) => {
    terminal.terminalUser = args[0];
    terminal.cWrite(`User changed to ${args[0]}`);
  },
  {
    requiresArgs: true,
    minimumArgs: 1,
    usage: "user <username>",
  }
)
