/*--- Impoting funcitons / Main Process --- */

const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const ipc = ipcMain;
const { autoUpdater } = require("electron-updater");

/*--- Assigning app title --- */

const appTitle = "Up_sys";

/*--- Configuring window --- */

let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: 500,
    height: 500,
    frame: false,
    transparent: true,
    resizable: false,
    title: appTitle,
    icon: path.join("./asset/icon.ico"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadFile("src/index.html");
  win.webContents.send("app_title", { title: appTitle });
  win.webContents.send("app_version", { appVersion: app.getVersion() });
};

/*--- Create window when app is ready --- */

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

/*--- App quit Function --- */

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
  autoUpdater.quitAndInstall();
});

/*--- Close btn and Minimize btn Function --- */

ipc.on("close_the_app", () => {
  app.quit();
});
ipc.on("minimize_the_app", () => {
  win.minimize();
});

/*--- Update system Function --- */

ipc.on("check_for_update", () => {
  autoUpdater.checkForUpdates();
  autoUpdater.autoDownload = false;
});

autoUpdater.on("update-available", (info) => {
  win.webContents.send("update_available", {
    updateVersion: info.releaseName,
    releaseDate: info.releaseDate,
  });
});
autoUpdater.on("download-progress", (progressObj) => {
  win.webContents.send("download_progress", {
    percent: progressObj.percent,
    size: progressObj.total,
    speed: progressObj.bytesPerSecond,
  });
});
autoUpdater.on("update-downloaded", () => {
  win.webContents.send("update_downloaded");
});
autoUpdater.on("update-not-available", () => {
  win.webContents.send("no_update_available");
});

ipc.on("install_update", () => {
  autoUpdater.downloadUpdate();
});

ipc.on("restart_the_app", () => {
  autoUpdater.quitAndInstall();
});
