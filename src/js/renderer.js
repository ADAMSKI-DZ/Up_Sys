/*--- Impoting funcitons / Renderer Process --- */

const { ipcRenderer } = require("electron");
const ipc = ipcRenderer;

/*--- Getting title from main process --- */

const titleName = document.querySelector(".title-name");
const titlePage = document.querySelector(".title-page");
ipc.on("app_title", (event, data) => {
  ipc.removeAllListeners("app_title");
  titleName.innerText = data.title;
  titlePage.innerText = data.title;
});

/*--- Creating close and minimize functions / communicating main process --- */
const closeBtn = document.querySelector(".close-btn");
const minimizeBtn = document.querySelector(".minimize-btn");

closeBtn.addEventListener("click", () => {
  ipc.send("close_the_app");
});
minimizeBtn.addEventListener("click", () => {
  ipc.send("minimize_the_app");
});

/*--- Getting app version / communicating main process --- */
const updateFoundCurrentVersion = document.querySelector(
  ".update-found-current-version"
);
const noUpdateAppVersion = document.querySelector(".no-update-app-version");
const noUpdateDesc = document.querySelector(".no-update-desc");
const appVersion = document.querySelector(".app-version");
ipc.on("app_version", (event, data) => {
  ipc.removeAllListeners("app_version");
  appVersion.innerText = `Current Version : V${data.appVersion}`;
  updateFoundCurrentVersion.innerText = `Current Version : V${data.appVersion}`;
  noUpdateAppVersion.innerText = `App Version : V${data.appVersion}`;
  noUpdateDesc.innerHTML = `Version V${data.appVersion} is latest version available <br> And you have it`;
});

/*--- Setting update functions  / communicating main process --- */

const checkUpdateBtn = document.querySelector(".check-update-btn");
const updateLoading = document.querySelector(".update-loading");
checkUpdateBtn.addEventListener("click", () => {
  ipc.send("check_for_update");
  updateLoading.classList.remove("hide");
  console.log("checking for an update");
});

const updateAvailable = document.querySelector(".update-available");
const updateVersionText = document.querySelector(".update-version");
const updateReleaseDate = document.querySelector(".update-release-date");
ipc.on("update_available", (event, data) => {
  updateLoading.classList.add("hide");
  updateAvailable.classList.remove("hide");
  updateVersionText.innerText = `Update Version : V${data.updateVersion}`;
  updateReleaseDate.innerText = `Update release date : ${data.releaseDate}`;
  console.log("yes there is an update");
});
const updateAppBtn = document.querySelector(".update-app-btn");
updateAppBtn.addEventListener("click", () => {
  updateAvailable.classList.add("hide");
  ipc.send("install_update");
  console.log("installing update");
});

const backBtn = document.querySelector(".back-btn");
const noUpdateFound = document.querySelector(".no-update-found");
const noUpdateBackBtn = document.querySelector(".no-update-back-btn");
backBtn.addEventListener("click", () => {
  updateAvailable.classList.add("hide");
});
noUpdateBackBtn.addEventListener("click", () => {
  noUpdateFound.classList.add("hide");
});

ipc.on("no_update_available", () => {
  noUpdateFound.classList.remove("hide");
});
