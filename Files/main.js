
// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

let win_heigth = 1080
let win_width = 1920

let win_pos_x = 0
let win_pos_y = 0
let win_pos_centered = false

let win_resizable = true
let win_min_height = 0
let win_max_height = 1080*8
let win_min_width = 0
let win_max_width = 1920*8

let win_moveable = true
let win_minimizable = true
let win_maximisable = true
let win_closable = true
let win_focusable = true


let win_title = "Default title"
let win_icon = ""
let win_background_colour = "#FFF"
let window_opacity = 1.0




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
        win_width = parseInt(line,10)
      }
      else if (line[0] === "window_size_y") {
        line = line[1].split("\"")
        line = line[1]
        win_heigth = parseInt(line,10)
      }
      else if (line[0] === "window_position_x") {
        line = line[1].split("\"")
        line = line[1]
        win_pos_x = parseInt(line,10)
      }
      else if (line[0] === "window_position_y") {
        line = line[1].split("\"")
        line = line[1]
        win_pos_y = parseInt(line,10)
      }
      else if (line[0] === "window_centerd") {
        line = line[1].split("\"")
        line = line[1]
        if (line.toLowerCase() === "true"){
          win_pos_centered = true
        }
        else if (line.toLowerCase() === "false"){
          win_pos_centered = false
        }
      }
      else if (line[0] === "window_resizable") {
        line = line[1].split("\"")
        line = line[1]
        if (line.toLowerCase() === "true"){
          win_resizable = true
          }
        else if (line.toLowerCase() === "false"){
          win_resizable = false
          }
        }
      else if (line[0] === "window_min_height") {
        line = line[1].split("\"")
        line = line[1]
        win_min_height = parseInt(line,10)
      }
      else if (line[0] === "window_max_height") {
        line = line[1].split("\"")
        line = line[1]
        win_max_height = parseInt(line,10)
      }
      else if (line[0] === "window_min_width") {
        line = line[1].split("\"")
        line = line[1]
        win_min_width = parseInt(line,10)
      }
      else if (line[0] === "window_max_width") {
        line = line[1].split("\"")
        line = line[1]
        win_max_width = parseInt(line,10)
      }

      else if (line[0] === "window_moveable") {
        line = line[1].split("\"")
        line = line[1]
        if (line.toLowerCase() === "true"){
          win_moveable = true
          }
        else if (line.toLowerCase() === "false"){
          win_moveable = false
          }
        }
      else if (line[0] === "window_minimizable") {
        line = line[1].split("\"")
        line = line[1]
        if (line.toLowerCase() === "true"){
          win_minimizable = true
          }
        else if (line.toLowerCase() === "false"){
          win_minimizable = false
          }
        }

      else if (line[0] === "window_maximizable") {
        line = line[1].split("\"")
        line = line[1]
        if (line.toLowerCase() === "true"){
          win_maximisable = true
          }
        else if (line.toLowerCase() === "false"){
          win_maximisable = false
          }
        }
      else if (line[0] === "window_closable") {
        line = line[1].split("\"")
        line = line[1]
        if (line.toLowerCase() === "true"){
          win_closable = true
          }
        else if (line.toLowerCase() === "false"){
          win_closable = false
          }
        }

      else if (line[0] === "window_title") {
        line = line[1].split("\"")
        win_title = line[1]
        }
      else if (line[0] === "window_icon") {
        line = line[1].split("\"")
        win_icon = line[1]
        }
      else if (line[0] === "window_backgroundColor") {
        line = line[1].split("\"")
        win_background_colour = line[1]
        }
      else if (line[0] === "window_opacity") {
        line = line[1].split("\"")
        line = line[1]
        window_opacity = parseFloat(line,10)

        }

      else if (line[0] === "enable_dev_options") {
        line = line[1].split("\"")
        line = line[1]
        if (line.toLowerCase() === "true"){
          devs_enabled = true
        }
        else if (line.toLowerCase() === "false"){
          devs_enabled = false
        }
      }
      else if (line[0] === "window_hide_menu") {
        line = line[1].split("\"")
        line = line[1]
        if (line.toLowerCase() === "true"){
          win_hide_menu = true
        }
        else if (line.toLowerCase() === "false"){
          win_hide_menu = false
        }
      }
      else if (line[0] === "window_frame") {
        line = line[1].split("\"")
        line = line[1]
        if (line.toLowerCase() === "true"){
          win_frame = true
        }
        else if (line.toLowerCase() === "false"){
          win_frame = false
        }
      }
      else if (line[0] === "window_hide_taskbar") {
        line = line[1].split("\"")
        line = line[1]
        if (line.toLowerCase() === "true"){
          win_hide_taskbar = true
        }
        else if (line.toLowerCase() === "false"){
          win_hide_taskbar = false
        }
      }


    }
  }
}

function createWindow () {
  // Create the browser window.
    const mainWindow = new BrowserWindow({

      width: win_width,
      height: win_heigth,
      resizable: win_resizable,
      minWidth: win_min_width,
      minHeight: win_min_height,
      maxWidth: win_max_width,
      maxHeight: win_max_height,
      movable: win_moveable,
      minimizable: win_minimizable,
      maximizable: win_maximisable,
      closable: win_closable,
      focusable: win_focusable,
      title: win_title,
      icon: win_icon,
      backgroundColor: win_background_colour,
      opacity: window_opacity,
      autoHideMenuBar: win_hide_menu,
      frame: win_frame,
      skipTaskbar: win_hide_taskbar,

      webPreferences: {
        //preload: path.join(__dirname, 'preload.js')
        nodeIntegration: true
      }
    })


    // setting scenter and position elements is contradictory if done in initialisation, set here instead
    if (win_pos_centered === true){
      mainWindow.center()
    }
    else {
      mainWindow.setPosition(win_pos_x, win_pos_y)
    }


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
