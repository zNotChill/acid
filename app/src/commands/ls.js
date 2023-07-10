const { Command } = require("../commands");

// TODO: Add multiple drive support
module.exports = {
  name: "ls",
  description: "Lists chosen data",
  execute: (args, terminal, call) => {
    const fs = require("fs");
    const path = require("path");

    const dir = path.join(terminal.terminalDirPath, args.join(" "));

    const files = fs.readdirSync(dir);

    terminal.setTerminalDirPath(dir);
    terminal.cWrite(`Listing files in <co>${dir}</co>`);

    const max = 80;

    if (files.length < 1) return terminal.cWrite("No files found");

    if (files.length > max) {
      terminal.cWrite(
        `Displaying more than <cg>${max}</cg> files may degrade performance.`,
      );
      terminal.cWrite(`Showing first <cg>${max}</cg> files...`);
      files.length = max;
    }

    files.forEach((file) => {
      var type;

      try {
        type = fs.lstatSync(path.join(dir, file)).isDirectory();
      } catch (error) {
        type = true;
      }
      terminal.cWrite(`${type ? "📁" : "📘"} ${file}`);
    });
    call(0);
  },
};
