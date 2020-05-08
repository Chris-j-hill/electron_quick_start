
// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

let height_d = 600
let width_d = 800
let devs_enabled = false



function print(content){
  console.log(content)
}


// read config file for window parameters
function read_config() {
  let fs = require('fs')
  let filename = 'config.txt'

  let content = fs.readFileSync(filename, 'utf8', (err) => {console.log("read err")});

  content = content.split("\n")

  for (let i = 0; i < content.length; i++){
    if (content[i].indexOf("#") !== 0) {
      line = content[i].split(":")
      if (line[0] === "window_size_x") {
        line = line[1].split("\"")
        line = line[1]
        width_d = parseInt(line,10)
      }
      else if (line[0] === "window_size_y") {
        line = line[1].split("\"")
        line = line[1]
        height_d = parseInt(line,10)
      }
      else if (line[0] === "enable_dev_options") {
        line = line[1].split("\"")
        line = line[1]
        if (line.toLowerCase() === "true"){
          devs_enabled = true
        }
      }

    }
  }
}


function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({

    width: width_d,
    height: height_d,
    webPreferences: {
      //preload: path.join(__dirname, 'preload.js')
      nodeIntegration: true
    }
  })
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  if (devs_enabled === true){
   mainWindow.webContents.openDevTools()
 }
}

  read_config()


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
