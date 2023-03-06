/* 
    welcome to the start of my spaghetti code
    have fun trying to read it without dying
*/

if(!Vars.headless) {
    if(Core.app.isDesktop()){
        title();
    }
    
    const menu = require(modName + "/menu");
    Events.on(ClientLoadEvent, () => {
        const dialog = menu.setupDialog();
        menu.addSettings(dialog);
    });
}

// ignore the above comment this is worse
function title(){
    function getGameStatus(){
        if(Vars.state.isGame()){
            if(Vars.net.active()) return "Multiplayer";
            return "Singleplayer";
        }
        
        if(Vars.ui.editor.isShown()) return "In Editor";
        if(Vars.ui.planet.isShown()) return "In Launch Selection";
        return "In Menu";
    }
    
    function getGameInfo(){
        switch(getGameStatus()){
            case "In Menu": {
                try{
                    if(!Core.scene.dialog) return "Main Menu";
                    let title = Core.scene.dialog.title.getText();
                    return title === "" ? "Unknown" : title;
                }catch(c){
                    return "File Chooser";
                }
            }
            case "Singleplayer":
            case "Multiplayer": {
                let r = Vars.state.rules;
                if(r.attackMode) return "Attack";
                if(r.pvp) return "PvP";
                if(r.infiniteResources) return "Sandbox";
                return "Survival";
            }
            case "In Launch Selection": {
                let p = Vars.ui.planet;
                if(!p.selected) return "No Sector Selected";
                if(p.selected.preset) return p.selected.preset.localizedName;
                return p.selected.planet.localizedName + " Sector " + p.selected.id;
            }
            case "In Editor": {
                if(!Core.scene.dialog) return "Editing";
                let title = Core.scene.dialog.title.getText();
                if(title === "") return "Editing";
                return title;
            }
        }
    }
    
    let modcount = Vars.mods.list().copy().filter(e => e.enabled()).size;
    let statics = [
        "Mindustry v" + Version.buildString(),
        modcount + (modcount === 1 ? " Mod Enabled" : " Mods Enabled"),
    ].join(" | ");
    
    Events.run(Trigger.update, () => {
        let dynamics = [
            getGameStatus(),
            getGameInfo(),
        ].join(" | ");
        
        Core.graphics.setTitle(statics + " | " + dynamics);
    });
}
