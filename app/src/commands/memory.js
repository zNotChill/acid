
const { Command } = require("../commands");

function parseUsage(usage) {
  const units = ["B", "KB", "MB", "GB", "TB"];

  let i = 0;
  while(usage > 1024) {
    usage /= 1024;
    i++;
  }
  return `${usage.toFixed(2)} ${units[i]}`;
}

module.exports = {
  name: "memory",
  description: "Shows memory usage",
  execute: (args, terminal, call) => {
    terminal.cWrite(`Memory usage: ${parseUsage(process.memoryUsage().heapUsed)}`);
    call(0);
  }
}