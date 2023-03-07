Events.on(ClientLoadEvent, () => {
    const menu = require("menu");
    const dialog = menu.setupDialog();
    menu.addSettings(dialog);
});