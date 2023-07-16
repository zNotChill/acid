var data = require("./data.js");
var cache = data.cacheData();

const fs = require("fs");

var defaultSettings = {
  "display": {}
};
fetch("https://acid-plugins.vercel.app/assets/themes/default/config.json").then(res => res.json()).then(json => {
  defaultSettings['display'] = json['display'];
});

function loadDisplay(j) {
  var display = j;

  var color = display.colors;
  var typo = display.typography;

  document.documentElement.style = `
    --background: ${color.background ? color.background : defaultSettings.display.background};
    --shape: ${color.shape ? color.shape : defaultSettings.display.shape};
    --tag1: ${color["tag-cr"] ? color["tag-cr"] : defaultSettings.display["tag-cr"]};
    --tag2: ${color["tag-cp"] ? color["tag-cp"] : defaultSettings.display["tag-cp"]};
    --tag3: ${color["tag-cg"] ? color["tag-cg"] : defaultSettings.display["tag-cg"]};
    --tag4: ${color["tag-co"] ? color["tag-co"] : defaultSettings.display["tag-co"]};
    --tag5: ${color["tag-cb"] ? color["tag-cb"] : defaultSettings.display["tag-cb"]};
    --tag6: ${color["tag-cy"] ? color["tag-cy"] : defaultSettings.display["tag-cy"]};
    --text-body: ${color.text ? color.text : defaultSettings.display.text};

    --font-family: ${typo.font ? typo.font : defaultSettings.display.font};
    --font-size: ${typo.fontSize ? typo.fontSize : defaultSettings.display.fontSize};
    --font-weight: ${typo.fontWeight ? typo.fontWeight : defaultSettings.display.fontWeight};

    --caret-color: ${typo.caret ? typo.caret.color : defaultSettings.display.typography.caret.color};
    --caret-width: ${typo.caret ? typo.caret.width : defaultSettings.display.typography.caret.width};

  `;
}

exports.loadDisplay = loadDisplay;

window.onload = function () {
  const theme = cache.display.theme.selected;
  
  const directory = data.assetsDir + "/themes/" + theme;
  const config = directory + "/config.json";

  if (fs.existsSync(config)) {
    fs.readFile(config, "utf-8", (err, data) => {
      if (err) return console.log(err);
      loadDisplay(JSON.parse(data).display);
    });
  } else {
    loadDisplay(defaultSettings.display);
  }
}