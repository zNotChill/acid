
const { Command } = require("../commands");

module.exports = {
  name: "user",
  description: "Changes the current user",
  
  execute: (args, terminal, call) => {
    terminal.terminalUser = args[0];
    terminal.cWrite(`User changed to ${args[0]}`);
    call(0);
  },
  flags: {
    requiresArgs: true,
    minimumArgs: 1,
    usage: "user <username>",
  }
}