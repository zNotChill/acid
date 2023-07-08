class Command {
  constructor(name, description, callback, config = {}) {
    this.name = name;
    this.description = description;
    this.callback = callback;

    this.config = {
      requiresArgs: config.requiresArgs || false,
      minimumArgs: config.minimumArgs || 0,
      usage: config.usage || "",
    };

  }

  async execute(args = [], terminal) {
    return new Promise((resolve, reject) => {
      if(this.config.requiresArgs && args.length < this.config.minimumArgs) {
        terminal.write(`<cr>Usage: ${this.config.usage}</cr>`, true);
        resolve(false);
        return;
      }

      const request = this.callback(args, terminal);

      // todo figure out how this shit works because i tweaked some stuff and it kinda works
      request.then((res) => {
        resolve(true);
      });
d    });
  }

  getName() {
    return this.name;
  }
  getDescription() {
    return this.description;
  }
  getCallback() {
    return this.callback;
  }

  setName(name) {
    this.name = name;
  }
  setDescription(description) {
    this.description = description;
  }
  setCallback(callback) {
    this.callback = callback;
  }
}
exports.Command = Command;

function createCommand(name, description, callback) {
  return new Command(name, description, callback);
}
exports.createCommand = createCommand;

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