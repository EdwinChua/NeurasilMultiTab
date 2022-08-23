const { app, BrowserWindow, session } = require('electron');
// const RenderTabs = require('./renderTabs');


const webPrefs = {
    nodeIntegration: true,
    contextIsolation: false,
    webviewTag: true
}
const browserOpts = {
    show: false, // start without showing, until stuff has loaded
    webPreferences: webPrefs,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#2f3241',
      symbolColor: '#74b1be'
    }
}

const createWindow = () => {
    const win = new BrowserWindow(browserOpts);
    win.fs = require('fs');
    win.removeMenu();
    win.maximize();
    win.loadURL('file://' + __dirname + '/index.html');

    win.show();
}

app.whenReady().then(() => {
    session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
      if (details.url.includes("whatsapp")){
        details.requestHeaders['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3641.0 Safari/537.36';
      }
        callback({ cancel: false, requestHeaders: details.requestHeaders });
      });
    createWindow();
    
})

app.on('window-all-closed', () => {
    session.defaultSession.clearStorageData(null, (error) => {
        // in our case we need to restart the application
        // app.relaunch();
        // app.exit();
      });
    if (process.platform !== 'darwin') app.quit()
})

