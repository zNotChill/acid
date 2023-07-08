
const { Command } = require("../commands");

module.exports = new Command(
  "curl",
  "Makes a request to a URL",
  async (args, terminal) => {
    setTimeout(async () => {
      if(!args.length || args.length < 1) return terminal.cWrite("Provide a URL");
      const url = args[0];
      const res = await fetch(url);
      const text = await res.text();
    }, 2000);
  }
)