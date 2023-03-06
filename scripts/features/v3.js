module.exports = (add) => {
    
    // reconstructors take no items and instant
    add("reconstructors", false, () => {
        Vars.content.blocks().each(e => {
            if(!(e instanceof Reconstructor)) return;
            e.constructTime = 0;
        });
    });
    
    // fixes the built in power source to give infinite power
    add("power-sources", true, t => {
        Blocks.powerSource.powerProduction = t ? Infinity : 1000000 / 60;
    });
};
