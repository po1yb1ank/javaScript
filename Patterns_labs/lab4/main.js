const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');


let img = new Image();  
img.src = "/img.jpg";   
let width = img.width;
let height = img.height;
let win;
function createWindow(){
    win = new BrowserWindow({width: width, height: height});
};

win.loadURL(url.format({
    pathname: path.join(__dirname, 'main.html'),
    protocol: 'file:',
    slashes: true
}));