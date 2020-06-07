const path = require('path');
const url = require('url');
const { app, BrowserWindow, nativeImage, globalShortcut } = require('electron');

//let win;

class AppUI {
    constructor() { };

    drawWindow(pic) {
        function createWindow() {
            this.img = nativeImage.createFromPath(pic);
            let size = this.img.getSize();
	    //здесь мы оборачиваем вызов метода, реализуя паттерн proxy
            this.win = new BrowserWindow({
                width: size.width,
                height: size.height
            });

            this.win.loadURL(url.format({
                pathname: path.join(__dirname, 'main.html'),
                protocol: 'file:',
                slashes: true
            }));

            this.win.on('closed', () => {
                this.win = null;
            });
        }

        app.on('ready', createWindow);

        app.on('window-all-closed', () => {
            app.quit();
        }
        )
    }
    changeBGImage(img){
        document.addEventListener('mousedown', function(event) {
            if (event.button == 2) {
            document.body.style.backgroundImage = "url(" + img + ")";
    }});
    }
    changeBGImage1 = (img) => {
        document.addEventListener('mousedown', function(event) {
            if (event.button == 2) {
            document.body.style.backgroundImage = "url(" + img + ")";
    }});
    }
}
exports.ui=new AppUI();
let ui1=new AppUI()
ui1.drawWindow("img.jpg");
