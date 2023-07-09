
const { Command } = require("../commands");
const math = require("mathjs");

module.exports = {
  name: "math",
  description: "Does math",
  execute: (args, terminal) => {
    try {
      if(!args.length || args.length < 1) return terminal.cWrite("Provide an expression");
      terminal.cWrite(math.evaluate(args.join(" ")));
    } catch(err) {
      terminal.cWrite("Invalid expression");
    }
  }
}