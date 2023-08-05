const path = require('path');

module.exports = {
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        setupIcon: path.join(__dirname, "src/icon/optic-tools.ico"),
        // iconUrl: path.join(__dirname, "src/icon/optic-tools.ico"),
      },
    },
  ],
};
