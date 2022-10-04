const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("preload", {
  setTitle: (title) => ipcRenderer.send("set-title", title),
  ping: () => ipcRenderer.invoke("ping"),
});
