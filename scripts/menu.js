const features = require(modName + "/features/features");
let toast = require(modName + "/libs/toast");

let loadf = (name) => require(modName + "/features/v4/" + name);
const menus = [
    loadf("worldoptions"),
    loadf("content"),
    loadf("transform"),
];

function setupDialog(){
    const dialog = new BaseDialog("Hackustry");
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
        add("cursed-mode", "cursed mode");
        add("hackusated-conveyor", "hackusated conveyor");
        add("hackusated-walls", "hackusated walls");
        add("launch-anywhere", "launch anywhere");
        add("unit-anywhere", "unit anywhere");
    }).growY().width(Core.graphics.getWidth());
    
    dialog.buttons.button("more", Icon.add, () => more()).size(210, 64);
    return dialog;
}

module.exports = {
    setupDialog: setupDialog,
    addSettings: addSettings
};
