var data = require("./data.js")
var cache = data.cacheData();

document.documentElement.style = `
  --background: ${cache.settings.colors.background};
  --shape: ${cache.settings.colors.shape};
  --tag1: ${cache.settings.colors['tag-cr']};
  --tag2: ${cache.settings.colors['tag-cp']};
  --tag3: ${cache.settings.colors['tag-cg']};
  --tag4: ${cache.settings.colors['tag-co']};
  --tag5: ${cache.settings.colors['tag-cb']};
  --tag6: ${cache.settings.colors['tag-cy']};
  --text-body: ${cache.settings.colors.text};

  --font-family: ${cache.settings.font};
  --font-size: ${cache.settings.fontSize};

  --caret-color: ${cache.settings.colors.text};
  --caret-width: 2px;

`;