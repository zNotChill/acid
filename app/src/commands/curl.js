
const { Command } = require("../commands");

module.exports = {
  name: "curl",
  description: "Makes a request to a URL",
  execute: (args, terminal, call) => {
    const url = args[0] || "";
    
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      terminal.cWrite("Invalid URL");
      call(0);
      return;
    }

    fetch(url)
      .then(res => res.text())
      .then(body => {
        terminal.cWrite(body);
        call(0);
      })
      .catch(err => {
        terminal.cWrite("An error occurred");
        call(0);
      });
  },
  flags: {
    requiresArgs: true,
    minimumArgs: 1,
    usage: "curl <url>"
  }
}