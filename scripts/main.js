const menu = require(modName + "/menu");
Events.on(ClientLoadEvent, () => {
    const dialog = menu.setupDialog();
    menu.addSettings(dialog);
});