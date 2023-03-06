/* 
    welcome to the start of my spaghetti code
    have fun trying to read it without dying
*/
if(Core.app.isDesktop()) {
    title();
}

const menu = require(modName + "/menu");
Events.on(ClientLoadEvent, () => {
    const dialog = menu.setupDialog();
    menu.addSettings(dialog);
});