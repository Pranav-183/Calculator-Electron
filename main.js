const { Menu } = require('electron')
const electron = require('electron')

const { app, BrowserWindow } = electron

let mainWindow

app.on('ready', () => {
   mainWindow = new BrowserWindow({
      title: 'Calculator',
      webPreferences: {
         nodeIntegration: true,
         enableRemoteModules: true,
         contextIsolation: false
      }
   })
   mainWindow.loadFile('index.html')
   Menu.setApplicationMenu(Menu.buildFromTemplate([]))
})