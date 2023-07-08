
const { Command } = require("../commands");

module.exports = new Command(
  "edit",
  "Edits a file",
  (args, terminal) => {
    const fs = require("fs");
    const path = require("path");

    if(!args.length || args.length < 1) return terminal.cWrite("Provide a file name");

    const filePath = path.join(terminal.terminalDirPath, args[0]);

    if(!fs.existsSync(filePath)) return terminal.cWrite("File does not exist");

    const editor = require("editor");

    editor(filePath, (code, sig) => {
      terminal.cWrite(`File saved with code ${code} and signal ${sig}`);
    });
  },
  {
    requiresArgs: true,
    minimumArgs: 1,
    usage: "edit <file>",
  }
)