const { exec } = require("child_process");

const terminal = {
  terminal: document.querySelector(".terminal"),
  terminalWrapper: document.querySelector(".terminal-wrapper"),
  terminalContent: document.querySelector(".terminal-content"),

  terminalVersion: "beta@1.0.0",
  terminalUser: "root",
  terminalDevice: "znci",
  terminalPrefix: "~",
  terminalDirPath: "C:\\",
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
      this.terminalUser + "@" + this.terminalDevice + " " + this.terminalPrefix;

    this.write(`znci Terminal [${this.terminalVersion}]`, true);
    this.write(`Type "help" to see all commands`, true);
    this.write(``, false);

    document.addEventListener("keydown", async (e) => {
      let text = e.key.toString();

      if (e.ctrlKey && e.key == "v") {
        console.log("Pasting");
        text = await navigator.clipboard.readText();
      } else if (e.ctrlKey) {
        return;
      }
      switch (e.key) {
        case "Enter":
          const split =
            this.currentLine.querySelector(".terminal-text").innerText;
          const args = split.split(" ");
          const command = args.shift();

          if (!this.commands.map((cmd) => cmd.name).includes(command)) {
            // Try to forward this command to the system
            exec(split, (err, stdout, stderr) => {
              if (stderr) {
                this.write(`<cr>${stderr}</cr>`, true);
                this.write(``, false);
                return;
              }

              this.write(stdout, true);
              this.write(``, false);
            });
          }

          this.commands.map((cmd) => {
            if (cmd.name == command) {
              if (
                cmd.flags &&
                cmd.flags.requiresArgs &&
                args.length < cmd.flags.minimumArgs
              ) {
                this.write(`Usage: <cg>${cmd.flags.usage}</cg>`, true);
                this.write(``, false);
                return;
              }
              const run = cmd.execute(args, this, (res) => {
                if (res == 0) {
                  this.write(``, false);
                }
              });
            }
          });
          break;
        case "Backspace":
          this.backspaceCurrentLine();
          break;
        default:
          if (e.ctrlKey) return;
          if (e.key.length > 1) return;
          this.writeToCurrentLine(text);
          break;
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

    const fmt = text
      .replaceAll("<", "&lt;")
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
      .replaceAll("&lt;/cp>", "</cp>");

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

  setTerminalDirPath: function (path = "") {
    this.terminalDirPath = path;
  },
};
