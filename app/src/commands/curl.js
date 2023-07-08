
const { Command } = require("../commands");

module.exports = new Command(
  "curl",
  "Makes a request to a URL",
  async (args, terminal) => {
    setTimeout(() => {
    }, 2000);

    return 0;
  },
  {
    requireArgs: true,
    minimumArgs: 1,
    usage: "curl <url>"
  }
)