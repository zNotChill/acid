const path = require("path");
const fs = require("fs");

const appDataPath =
  process.env.APPDATA ||
  (process.platform === "darwin"
    ? process.env.HOME + "/Library/Preferences"
    : process.env.HOME + "/acid-terminal");
const appDataDir = appDataPath + "/acid-terminal";

const cacheDataDir = appDataDir + "/cache";

const store = {
  "settings": {
    "theme": "dark",
    "fontSize": "12px",
    "font": "JetBrains Mono, monospace",

    "colors": {
      "background": "#121212",
      "shape": "#ffffff",
      "text": "#ffffff",
      "tag-cr": "#e52e4d",
      "tag-cg": "#33cc95",
      "tag-cy": "#e5e52e",
      "tag-cb": "#6933ff",
      "tag-co": "#ff872c",
      "tag-cp": "#5429cc",
    },

    "typography": {
      "font": "JetBrains Mono, monospace",
      "fontSize": "12px",
      "fontWeight": "400",
    },
  },
};

function checkRootDir() {
  if (!fs.existsSync(appDataDir)) {
    fs.mkdirSync(appDataDir);
  }
}
function rootDirExists() {
  return fs.existsSync(appDataDir);
}
function checkSavedData() {
  if (!fs.existsSync(cacheDataDir + "/data.json")) {
    fs.writeFileSync(cacheDataDir + "/data.json", JSON.stringify(store, null, 2));
  }
}
function savedDataExists() {
  return fs.existsSync(cacheDataDir + "/data.json");
}
function saveData() {
  fs.writeFileSync(cacheDataDir + "/data.json", JSON.stringify(store, null, 2));
}

function loadData() {
  const data = JSON.parse(
    fs.readFileSync(cacheDataDir + "/data.json").toString(),
  );
  store.player = Object.assign(new Player(), data.player);
  store.settings = Object.assign(new Settings(), data.settings);
}
exports.loadData = loadData;

function resetData() {
  store.player = new Player();
  store.settings = new Settings();
  saveData();
}
exports.resetData = resetData;

if (!rootDirExists()) {
  checkRootDir();
  fs.mkdirSync(cacheDataDir);
  saveData();
}

function cacheData() {
  const filePath = path.resolve(cacheDataDir, "./data.json");
  const data = fs.readFileSync(filePath, "utf-8");

  return JSON.parse(data);
}
exports.cacheData = cacheData;

function setCacheData(a) {
  const filePath = path.resolve(cacheDataDir, "./data.json");
  const data = JSON.stringify(a);

  fs.writeFileSync(filePath, data, "utf-8");

  return data;
}
exports.setCacheData = setCacheData;
