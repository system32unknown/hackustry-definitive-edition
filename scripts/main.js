const menu = require("menu");
Events.on(ClientLoadEvent, () => {
    const dialog = menu.setupDialog();
    menu.addSettings(dialog);
});