const features = require(modName + "/features/features");

let loadf = (name) => require(modName + "/features/v4/" + name);
const menus = [
    loadf("worldoptions"),
    loadf("content"),
    loadf("transform"),
];

function setupDialog() {
    const dialog = new BaseDialog("Hackustry Definitive Edition");
    dialog.addCloseButton();
    
    // this is P A I N
    dialog.cont.center().pane(p => {
        p.defaults().height(36);
        
        p.table(cons(t => {
            menus[0](t);
            menus[1](t);
        })).height(48);
        p.row();
        p.table(cons(t => {
            menus[2](t);
        })).height(48);
        p.row();
        
        function add(name, displayName){
            if(!name || typeof name !== "string") return;
            if(!displayName || typeof displayName !== "string") displayName = name;
            
            p.check(displayName, features.get(name), () => {
                features.runf(name);
            }).left();
            p.row();
        }
        
        add("reconstructors", "make reconstructors cost nothing and instant");
        add("power-sources", "fix vanilla power sources");
        add("launch-anywhere", "launch anywhere");
        add("unit-anywhere", "unit anywhere");
        add("hackusated-conveyor", "hackusated conveyor");
        add("hackusated-walls", "hackusated walls");
        add("hackusated-mender", "hackusated mender");
        add("hackusated-overdrive", "hackusated overdrive");
    }).growY().width(Core.graphics.getWidth());
    return dialog;
}

function addSettings(dialog) { 
    Vars.ui.settings.shown(() => {
        Vars.ui.settings.children.get(1).children.get(0).children.get(0).row();
        Vars.ui.settings.children.get(1).children.get(0).children.get(0).button("Hackustry-DE", Styles.cleart, () => {
            dialog.show();
            Vars.ui.settings.hide();
        }); 
    });
}

module.exports = {
    setupDialog: setupDialog,
    addSettings: addSettings
};
