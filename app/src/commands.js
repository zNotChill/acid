
function init() {
  const config = {
    dir: __dirname + "/commands",
    ext: ".js",
  }

  const commands = [];

  const fs = require("fs");

  fs.readdirSync(config.dir).forEach((file) => {
    if(!file.endsWith(config.ext)) return;

    const command = require(config.dir + "/" + file);
    commands.push(command);
  });

  return commands;
}
exports.init = init;