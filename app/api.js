const express = require('express');
const server = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const appDataPath = process.env.APPDATA || (process.platform === 'darwin' ? process.env.HOME + 'Library/Preferences' : '/var/local');
const appDataDir = appDataPath + '/acid-terminal';

const cacheDataDir = appDataDir + '/cache';

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

const store = {
  settings: {
    theme: 'dark',
    fontSize: '12px',
    font: 'JetBrains Mono, monospace',

    colors: {
      "background": "#121212",
      "shape": "#ffffff",
      "text": "#ffffff",
      "tag-cr": "#e52e4d",
      "tag-cg": "#33cc95",
      "tag-cy": "#e5e52e",
      "tag-cb": "#6933ff",
      "tag-co": "#ff872c",
      "tag-cp": "#5429cc",
    }
  }
}

function checkRootDir() {
  if (!fs.existsSync(appDataDir)) {
    fs.mkdirSync(appDataDir);
  }
}
function rootDirExists() {
  return fs.existsSync(appDataDir);
}
function savedDataExists() {
  return fs.existsSync(cacheDataDir + '/data.json');
}
function saveData() {
  fs.writeFileSync(cacheDataDir + '/data.json', JSON.stringify(store));
}
function loadData() {
  const data = JSON.parse(fs.readFileSync(cacheDataDir + '/data.json').toString());
  store.player = Object.assign(new Player(), data.player);
  store.settings = Object.assign(new Settings(), data.settings);
}
function resetData() {
  store.player = new Player();
  store.settings = new Settings();
  saveData();
}

if(!rootDirExists()) {
  checkRootDir();
  fs.mkdirSync(cacheDataDir);
  saveData();
}

server.get("/api/cache/data", (req, res) => {
  const filePath = path.resolve(cacheDataDir, './data.json');
  const data = fs.readFileSync(filePath, 'utf-8');
  res.json(JSON.parse(data));
})

server.post("/api/cache/data", (req, res) => {
  const filePath = path.resolve(cacheDataDir, './data.json');
  const data = JSON.stringify(req.body);

  fs.writeFileSync(filePath, data, 'utf-8');

  res.json({
    success: true
  });
})

const PORT = 18936;

server.listen(PORT, () => {
  console.log('API is running at PORT ' + PORT);
})