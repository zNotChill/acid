
const { Command } = require("../commands");
const math = require("mathjs");

module.exports = new Command(
  "math",
  "Does math",
  (args, terminal) => {
    try {
      if(!args.length || args.length < 1) return terminal.cWrite("Provide an expression");
      terminal.cWrite(math.evaluate(args.join(" ")));
    } catch(err) {
      terminal.cWrite("Invalid expression");
    }
  }
)