const {app, BrowserWindow, ipcMain, Tray, Menu} = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

const iconPath = path.join(__dirname, 'tpl/img/favicon-16x16.png');
let appIcon = null;

function createWindow () {
  // Create the browser window.
	win = new BrowserWindow({width: 767, height: 472, show: false/*, resizable: false*/})
	appIcon = new Tray(iconPath);
	var contextMenu = Menu.buildFromTemplate([
	{
	   label: 'Restaurar',
	   click: function() {
		   win.show();
	   }
	},
	{
		label: '',
		type: 'separator'
	},
	{
		label: 'Sair',
		click: function() {
			win.close();
		}
	}
	]);
   
	appIcon.setContextMenu(contextMenu);
	appIcon.on('click', () => {
		win.isVisible() ? win.hide() : win.show()
	});
     
  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  
  win.setMenu(null);

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)


// app.getLocale('pt-br')

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
