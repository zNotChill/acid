
const { Command } = require("../commands");

module.exports = new Command(
  "ls",
  "Lists chosen data",
  (args, terminal, config) => {
    const fs = require("fs");
    const path = require("path");

    const dir = args[0] || "C:\\Users\\Public";
    const files = fs.readdirSync(dir);

    terminal.cWrite(`Listing files in ${dir}`);
    files.forEach((file) => {
      const stats = fs.statSync(path.join(dir, file));
      terminal.cWrite(`${file} - ${stats.size} bytes`);
    });
  }
)
