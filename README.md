# Up_Sys 🎆

> Info 🧾

Up_Sys is a electron updating system app
made to test and push updates throw github

# Setup the project 📥

> Npm packages 📦

1. electron-builder

```bash
npm i --save-dev electron-builder
```

See more [electron-builder](https://www.electron.build/ "electron-builder")

2. electron-updater

```bash
npm i --save electron-updater
```

See more [electron-updater](https://www.electron.build/auto-update "electron-updater")

> To start the app 📲

First install electron js

By typing this commend :

```bash
npm i --save-dev electron-js
```

And add starting script to package.json

```json
    "start": "electron ."
```

Then to start the app type :

```bash
npm run start
```

# Adding updating function to main process 📎

1. First import auto-updater in main.js

```js
const { autoUpdater } = require("electron-updater");
```

2. Then set check for updates in start of the app

```js
app.whenReady().then(() => {
  autoUpdater.checkForUpdates();
});
```

- Or when the user press a update button

```js
ipc.on("check_for_update", () => {
  autoUpdater.checkForUpdates();
});
```

3. You can disable auto download update

```js
autoUpdater.autoDownload = false;
```

- Download update when user click download

```js
ipc.on("install_update", () => {
  autoUpdater.downloadUpdate();
});
```

## Update States 📊

1. Update found

```js
autoUpdater.on("update-available", (info) => {
  win.webContents.send("update_available", {
    updateVersion: info.releaseName,
    releaseDate: info.releaseDate,
  });
});
```

- you can display in renderer process release name as update version and release date

2. Update not found (display as the app updated)

```js
autoUpdater.on("update-not-available", () => {
  win.webContents.send("no_update_available");
});
```

3. Update download progress

```js
autoUpdater.on("download-progress", (progressObj) => {
  win.webContents.send("download_progress", {
    percent: progressObj.percent,
    size: progressObj.total,
    speed: progressObj.bytesPerSecond,
  });
});
```

- You can display download speed , percent , size

4. Update downloaded

```js
autoUpdater.on("update-downloaded", () => {
  win.webContents.send("update_downloaded");
});
```

- Adding update install when app is closed

```js
autoUpdater.quitAndInstall();
```

- Or by user press restart button

```js
ipc.on("restart_the_app", () => {
  autoUpdater.quitAndInstall();
});
```

## Final setups 🚩

1. Adding github repo to package.json

```json
  "repository": {
    "type": "git",
    "url": "https://github.com/ADAMSKI-DZ/yourRepo.git"
  },
```

2. Adding (build , deploy) scripts

```json
    "build": "electron-builder build --win --publish never",
    "deploy": "electron-builder build --win --publish always"
```

3. Setting build configs

```json
  "build": {
    "win": {
      "target": "NSIS",
      "icon": "asset/icon.ico"
    },
    "nsis": {
      "allowToChangeInstallationDirectory": true,
      "oneClick": false
    }
  }
```

4. Setting a github private key

- Create a file "electron-builder.yml" in the app folder

```yml
appId: com.your-app-id.com
publish:
  provider: github
  token: <Your github private key>
```

5. Then to deploy a version of the app type commend :

```bash
npm run deploy
```

- Don't forget to set a new version of the app avery time you deploy a update (package.json)

```json
    "version": "1.0.0"
```

6. Final go to github releases then edit release (draft that created when you deploy) then press publish then all users get that update

# Say thank you if this is helpful 🌟🌟

## Contact me 📭

[Facebook](https://www.facebook.com/abdelmalek.tammal "Facebook")

[Instagram](https://www.instagram.com/malick_tammal/ "Instagram")

[Codepen](https://codepen.io/your-work/ "Codepen")
