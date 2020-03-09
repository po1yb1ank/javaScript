const path = require('path');
const url = require('url');
const {app, BrowserWindow, nativeImage, globalShortcut} = require('electron');

let win;

function createWindow() {
    let img = nativeImage.createFromPath("img1.jpg");
    let size = img.getSize();
    console.log(size);
	win = new BrowserWindow({
		width: size.width,
		height: size.height//,
		//icon: __dirname + "/img/icon.png"
	});

	win.loadURL(url.format({
		pathname: path.join(__dirname, 'main.html'),
		protocol: 'file:',
		slashes: true
	}));

	//win.webContents.();

	win.on('closed', () => {
		win = null;
	});
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    app.quit();
});