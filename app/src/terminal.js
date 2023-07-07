
const { Command } = require("./commands");

const terminal = {
  terminal: document.querySelector(".terminal"),
  terminalWrapper: document.querySelector(".terminal-wrapper"),
  terminalContent: document.querySelector(".terminal-content"),

  terminalVersion: "beta@1.0.0",
  terminalUser: "root",
  terminalDevice: "znci",
  terminalPrefix: "~",
  terminalDirPath: "/home/znci",
  terminalFullUser: "",
  currentLine: "",

  logs: [],

  commands: require("./commands").init(),

  generateSpaces: function (amount) {
    let spaces = "";
    for (let i = 0; i < amount; i++) {
      spaces += "&nbsp;";
    }
    return spaces;
  },

  init: function () {
    this.terminalFullUser =
      this.terminalUser +
      "@" +
      this.terminalDevice +
      " " +
      this.terminalPrefix;

    this.write(`znci Terminal [${this.terminalVersion}]`, true);
    this.write(`Type "help" to see all commands`, true);
    this.write(``, false);

    document.addEventListener("keydown", (e) => {
      if (e.key == "Backspace") {
        if (this.currentLineExists()) {
          this.backspaceCurrentLine();
        }
      } else {
        // I'm too bad at this to use regex or something else to check for letters so I'm just gonna use this
        if (e.key.length == 1) {
          if (this.currentLineExists()) {
            this.writeToCurrentLine(e.key);
          } else {
            this.write(e.key);
          }
        } else if (e.key == "Enter" || e.key == "NumpadEnter") {
          if (
            this.currentLineExists() &&
            this.currentLine.querySelector(".terminal-text").innerText != ""
          ) {
            let cmdFound = false;
            const text = this.currentLine
              .querySelector(".terminal-text")
              .innerText.split(" ");

            const cmd = text[0];
            const args = text.slice(1);

            this.commands.forEach((command) => {
              if (command.getName() == cmd) {
                console.log(command);
                if(command.config.requiresArgs && args.length < command.config.minimumArgs) {
                  this.write(`Command requires at least ${command.config.minimumArgs} argument(s)`, true);
                  this.write(`Usage: ${command.config.usage}`, true);
                  this.write(``, false);
                  cmdFound = true;
                  return;
                }
                
                try {
                  command.execute(args, terminal, command.config);
                } catch (error) {
                  this.write(`An error occured while executing the command ${command.getName()}`, true);
                }

                cmdFound = true;
                this.write(``, false);
              }
            });

            if (!cmdFound) {
              this.write(`Command not found: ${text}`, true);

              this.write(``, false);
            }
          } else {
            this.write(``, false);
          }
        }
      }
    });
  },

  currentLineExists: function () {
    return this.currentLine != "";
  },

  cWrite: function (text = "") {
    this.write(text, true);
  },

  write: function (text = "", noAuthor) {
    const element = document.createElement("div");
    element.classList.add("terminal-line");

    const fmt = text.replaceAll("<", "&lt;")
      .replaceAll("&lt;cg>", "<cg>")
      .replaceAll("&lt;/cg>", "</cg>")

      .replaceAll("&lt;cb>", "<cb>")
      .replaceAll("&lt;/cb>", "</cb>")

      .replaceAll("&lt;cr>", "<cr>")
      .replaceAll("&lt;/cr>", "</cr>")

      .replaceAll("&lt;cy>", "<cy>")
      .replaceAll("&lt;/cy>", "</cy>")

      .replaceAll("&lt;co>", "<co>")
      .replaceAll("&lt;/co>", "</co>")

      .replaceAll("&lt;cp>", "<cp>")
      .replaceAll("&lt;/cp>", "</cp>")

    element.innerHTML = `
            ${
              noAuthor
                ? ""
                : `
                <span class="terminal-user">
                    <span class="terminal-user-name">${this.terminalUser}@${this.terminalDevice}</span>
                    <span class="terminal-user-prefix">${this.terminalPrefix}</span>
                </span>
                <span class="terminal-dir">${this.terminalDirPath}</span>
            `
            }
            <span class="terminal-text">
              ${fmt}
            </span>
        `;
    this.logs.push(element);
    this.terminalContent.insertAdjacentElement("beforeend", element);
    this.terminalWrapper.scrollTop = this.terminalWrapper.scrollHeight;

    if (!noAuthor) {
      this.currentLine = element;
    }
  },

  clear: function () {
    this.terminalContent.innerHTML = "";
  },

  writeToCurrentLine: function (text = "") {
    this.currentLine.querySelector(".terminal-text").innerHTML += text;
  },

  rewriteCurrentLine: function (text = "") {
    this.currentLine.querySelector(".terminal-text").innerHTML = text;
  },

  backspaceCurrentLine: function () {
    const text = this.currentLine.querySelector(".terminal-text").innerHTML;
    this.currentLine.querySelector(".terminal-text").innerHTML = text.slice(
      0,
      -1,
    );
  },
};
