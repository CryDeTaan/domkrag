const { app, BrowserWindow, session, ipcMain } = require("electron");
const { Menu, dialog } = require("electron");
const path = require("path");

let win;
const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    win.loadFile("./dist/index.html");
  }
};

// Add a menu item
const createMenu = () => {
  const menu = Menu.buildFromTemplate([
    { role: "appMenu" },
    { role: "fileMenu" },
    { role: "editMenu" },
    { role: "viewMenu" },
    { role: "windowMenu" },
    {
      label: "Main",
      submenu: [
        {
          label: "Read Filename",
          accelerator: "Alt+CommandOrControl+f",
          click: selectFile,
        },
      ],
    },
  ]);

  Menu.setApplicationMenu(menu);
};

// Main to Renderer
// Send selected filename to renderer
const selectFile = () => {
  const selectedFilesArray = dialog.showOpenDialogSync({
    title: "Select a file",
    properties: ["openFile"],
  });

  if (typeof selectedFilesArray === "undefined") return;

  const selectedFilePath = selectedFilesArray.pop();
  const selectedFile = selectedFilePath.match(/([^/]+)$/g)[0];

  win.webContents.send("send-filename", selectedFile);
};

// Renderer to Main (one-way)
// Set the window title from the renderer
const setTitle = (event, title) => {
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  win.setTitle(title);
};

// Renderer to Main (two-way)
// Main responds to ping
const pong = () => {
  return "Pong from Main.";
};

app.whenReady().then(() => {
  // Renderer to Main (one-way)
  ipcMain.on("set-title", setTitle);

  // Renderer to Main (two-way)
  ipcMain.handle("ping", pong);

  // Optional callback response received from Main to Renderer pattern
  ipcMain.on("file-displayed", (_event, value) => {
    console.log(value); // will print value to Node console
  });

  createWindow();
  createMenu();

  // Open a window if none are open (macOS)
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": ["script-src 'self'"],
      },
    });
  });
});

// Quit the app when all windows are closed (Windows & Linux)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
