
const { Command } = require("../commands");

module.exports = new Command(
  "theme",
  "Changes the theme",
  (args, terminal) => {
    if(!args.length || args.length < 1) return terminal.cWrite("Provide a theme");
    
    const theme = args.join(" ");
    const themes = ["default", "dark", "light"];

    if(!themes.includes(theme)) return terminal.cWrite("Invalid theme");

    localStorage.setItem("theme", theme);
    terminal.cWrite(`Theme set to ${theme}`);

    document.querySelector("html").setAttribute("data-theme", theme);

    if(theme === "default") {
      document.querySelector("html").removeAttribute("data-theme");
    }
  }
)