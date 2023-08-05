const { app, BrowserWindow } = require('electron');
const path = require('path');

if (require('electron-squirrel-startup')) {
  app.quit();
};

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 601,
    height: 420,
    useContentSize: true,
    resizable: false,
    center: true,
    icon: './icons/eye-100.ico',
  });

  mainWindow.removeMenu();
  mainWindow.loadFile(path.join(__dirname, '/pages/main.html'));
  // mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  };
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  };
});

