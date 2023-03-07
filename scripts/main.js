Events.on(ClientLoadEvent, () => {
    const menu = require(modName + "/menu");
    const dialog = menu.setupDialog();
    menu.addSettings(dialog);
});