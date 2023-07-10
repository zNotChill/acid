const { Command } = require("../commands");
const math = require("mathjs");

module.exports = {
  name: "math",
  description: "Does math",
  execute: (args, terminal, call) => {
    try {
      if (!args.length || args.length < 1)
        return terminal.cWrite("Provide an expression");
      terminal.cWrite(math.evaluate(args.join(" ")));
      call(0);
    } catch (err) {
      terminal.cWrite("Invalid expression");
      call(0);
    }
  },
};
