
const { Command } = require("../commands");

module.exports = new Command(
  "curl",
  "Makes a request to a URL",
  (args, terminal) => {
    setTimeout(() => {
      terminal.cWrite("<cg>dsadsasasd</cg>")
    }, 2000);

    return 0;
  },
  {
    requireArgs: true,
    minimumArgs: 1,
    usage: "curl <url>"
  }
)