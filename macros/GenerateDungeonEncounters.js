async function GenerateDungeon($html){

    console.log("Generate Dungeon Encounter")
    //get inputs from form
    const pLevel = parseInt($html.find('[name="partylevel"]')[0].value);
    const ebudget = parseInt($html.find('[name="encounterbudget"]')[0].value);
    var etheme = $html.find('[name="creaturetheme"]')[0].value;

    console.log("party level: "+pLevel+ " encounter budget: "+ebudget+" theme "+etheme);
    
    //game.packs.forEach(e => console.log(e));
    //load the compendium and make sure it is indexed for reference.(loads into memory)
    const creature_pack = game.packs.get("highpoint.highpoint-random-creatures-tables");
    //console.log(creature_pack);
    creature_pack.getIndex();
    //humanoidsLVL1ID = creature_pack.index.find(t => t.name === 'HP Humanoid Level 01')._id;
    //creature_pack.getDocument(humanoidsLVL1ID).then(table => table.draw());

    //define the level adjustments per XP allocation. 
    const encounterBudget40Allocations = [[0],[-1,-4],[-2,-2],[-2,-3,-4]];
    const encounterBudget60Allocations = [[0,-2],[1],[-1,-1],[-2,-2,-2]];
    const encounterBudget80Allocations = [[2],[1,-2],[0,0],[0,-2,-2],[-1,-3,-3,-4],[-1,-2,-3,-3,]];
    const encounterBudget120Allocations = [[3],[2,0],[2,-2,-2],[1,1],[1,0,-2],[1,-1,-1],[0,0,0],[0,-1,-1,-2]];
    const encounterBudget160Allocations = [[4,-2],[3,-2,-2],[2,2],[1,1,0],[0,0,0,0],[1,0,-1,-1]];

    //define the id of the roll tables to look up into get creatures. 
    const humanoidRolltables = ['HP Humanoid Lvl -01','HP Humanoid Lvl 00','HP Humanoid Lvl 01','HP Humanoid Lvl 02','HP Humanoid Lvl 03','HP Humanoid Lvl 04','HP Humanoid Lvl 05','HP Humanoid Lvl 06','HP Humanoid Lvl 07','HP Humanoid Lvl 08','HP Humanoid Lvl 09','HP Humanoid Lvl 10','HP Humanoid Lvl 11','HP Humanoid Lvl 12','HP Humanoid Lvl 13','HP Humanoid Lvl 14','HP Humanoid Lvl 15'];
    const aberrationRolltables = ['HP Aberration Fiends Lvl -01','HP Aberration Fiends Lvl 00','HP Aberration Fiends Lvl 01','HP Aberration Fiends Lvl 02','HP Aberration Fiends Lvl 03','HP Aberration Fiends Lvl 04','HP Aberration Fiends Lvl 05','HP Aberration Fiends Lvl 06','HP Aberration Fiends Lvl 07','HP Aberration Fiends Lvl 08','HP Aberration Fiends Lvl 09','HP Aberration Fiends Lvl 10','HP Aberration Fiends Lvl 11','HP Aberration Fiends Lvl 12','HP Aberration Fiends Lvl 13','HP Aberration Fiends Lvl 14','HP Aberration Fiends Lvl 15']
    const animalRolltables = ['HP Animals Lvl -01','HP Animals Lvl 00','HP Animals Lvl 01','HP Animals Lvl 02','HP Animals Lvl 03','HP Animals Lvl 04','HP Animals Lvl 05','HP Animals Lvl 06','HP Animals Lvl 07','HP Animals Lvl 08','HP Animals Lvl 09','HP Animals Lvl 10','HP Animals Lvl 11','HP Animals Lvl 12','HP Animals Lvl 13','HP Animals Lvl 14','HP Animals Lvl 15'];
    const undeadRolltables = ['HP Undead Lvl -01', 'HP Undead Lvl 00','HP Undead Lvl 01','HP Undead Lvl 02','HP Undead Lvl 03','HP Undead Lvl 04','HP Undead Lvl 05','HP Undead Lvl 06','HP Undead Lvl 07','HP Undead Lvl 08','HP Undead Lvl 09','HP Undead Lvl 10','HP Undead Lvl 11','HP Undead Lvl 12','HP Undead Lvl 13','HP Undead Lvl 14','HP Undead Lvl 15']; 
    const feyRolltables = ['HP Fey Lvl -01','HP Fey Lvl 00','HP Fey Lvl 01','HP Fey Lvl 02','HP Fey Lvl 03','HP Fey Lvl 04','HP Fey Lvl 05','HP Fey Lvl 06','HP Fey Lvl 07','HP Fey Lvl 08','HP Fey Lvl 09','HP Fey Lvl 10','HP Fey Lvl 11','HP Fey Lvl 12','HP Fey Lvl 13','HP Fey Lvl 14','HP Fey Lvl 15'];
    const plantRolltables = ['HP Plant Lvl -01','HP Plant Lvl 00','HP Plant Lvl 01','HP Plant Lvl 02','HP Plant Lvl 03','HP Plant Lvl 04','HP Plant Lvl 05','HP Plant Lvl 06','HP Plant Lvl 07','HP Plant Lvl 08','HP Plant Lvl 09','HP Plant Lvl 10','HP Plant Lvl 11','HP Plant Lvl 12','HP Plant Lvl 13','HP Plant Lvl 14','HP Plant Lvl 15'];
    const constructRolltables = ['HP Construct Lvl -01', 'HP Construct Lvl 00','HP Construct Lvl 01', 'HP Construct Lvl 02', 'HP Construct Lvl 03', 'HP Construct Lvl 04', 'HP Construct Lvl 05', 'HP Construct Lvl 06', 'HP Construct Lvl 07', 'HP Construct Lvl 08', 'HP Construct Lvl 09', 'HP Construct Lvl 10', 'HP Construct Lvl 11', 'HP Construct Lvl 12', 'HP Construct Lvl 13', 'HP Construct Lvl 14', 'HP Construct Lvl 15'];
    const elementalRolltables = ['HP Elementals Lvl -01', 'HP Elementals Lvl 00', 'HP Elementals Lvl 01', 'HP Elementals Lvl 02', 'HP Elementals Lvl 03', 'HP Elementals Lvl 04', 'HP Elementals Lvl 05', 'HP Elementals Lvl 06', 'HP Elementals Lvl 07', 'HP Elementals Lvl 08', 'HP Elementals Lvl 09', 'HP Elementals Lvl 10', 'HP Elementals Lvl 11', 'HP Elementals Lvl 12', 'HP Elementals Lvl 13', 'HP Elementals Lvl 14', 'HP Elementals Lvl 15'];
    const aquaticRolltables = ['HP Aquatic Lvl -01', 'HP Aquatic Lvl 00', 'HP Aquatic Lvl 01', 'HP Aquatic Lvl 02', 'HP Aquatic Lvl 03', 'HP Aquatic Lvl 04', 'HP Aquatic Lvl 05', 'HP Aquatic Lvl 06', 'HP Aquatic Lvl 07', 'HP Aquatic Lvl 08', 'HP Aquatic Lvl 09',  'HP Aquatic Lvl 10',  'HP Aquatic Lvl 11',  'HP Aquatic Lvl 12',  'HP Aquatic Lvl 13',  'HP Aquatic Lvl 14',  'HP Aquatic Lvl 15'];

    var selectedCreatureRollTables = humanoidRolltables;
    var selectedEncounterBudgetAllocations;
    
    //randomly set the theme. 
    if(etheme == "any")
    {
        //randomly select a theme
        var randomselectedtheme = Math.floor(Math.random()*150);
        if(randomselectedtheme <25){
            etheme = "aberration";
        }else if(randomselectedtheme < 40){
            etheme = "animals";
        }else if(randomselectedtheme <50){
            etheme = "fey";
        }else if(randomselectedtheme < 60){
            etheme = "plant";
        }else if(randomselectedtheme < 80){
            etheme = "undead";
        }else if(randomselectedtheme < 90){
            etheme = "construct";
        }else if(randomselectedtheme <100 ){
            etheme = "elemental";
        }else{
            etheme = "humanoid";
        }
    }
    
    //now set the rolltable look up based on the theme
    if(etheme == "humanoid")    
    {
        selectedCreatureRollTables = humanoidRolltables;
    }
    else if(etheme =="aberration")
    {
        selectedCreatureRollTables = aberrationRolltables;
    }
    else if(etheme == "animals")
    {
        selectedCreatureRollTables = animalRolltables;
    }
    else if(etheme == "fey")
    {
        selectedCreatureRollTables = feyRolltables;
    }
    else if(etheme == "plant")
    {
        selectedCreatureRollTables = plantRolltables;
    }
    else if(etheme == "undead")
    {
        selectedCreatureRollTables = undeadRolltables;
    }
    else if( etheme == "construct")
    {
        selectedCreatureRollTables = constructRolltables;
    }
    else if(etheme == "elemental")
    {
        selectedCreatureRollTables = elementalRolltables;
    }
    else if(etheme == "aquatic")
    {
        selectedCreatureRollTables = aquaticRolltables;
    }
    
    
    
    //set the look up list for encounter make up.
    if (ebudget <=40)
    {
        selectedEncounterBudgetAllocations = encounterBudget40Allocations;
    }
    else if (ebudget<=60)
    {
        selectedEncounterBudgetAllocations = encounterBudget60Allocations;
    }
    else if(ebudget<=80)
    {
        selectedEncounterBudgetAllocations = encounterBudget80Allocations;
    }
    else if(ebudget<=120)
    {
        selectedEncounterBudgetAllocations = encounterBudget120Allocations;
    }
    else
    {
        selectedEncounterBudgetAllocations = encounterBudget160Allocations;
    }

    console.log(selectedEncounterBudgetAllocations);

    //get the random values to grab the creatures. 
    const encounterBudgetArrayIndex = Math.floor(Math.random()*selectedEncounterBudgetAllocations.length);
    const creatureBudgetArray = selectedEncounterBudgetAllocations[encounterBudgetArrayIndex];
    
    var creatureLevelDescription = "Getting creatures with levels ";
    for(let i = 0; i<creatureBudgetArray.length;i++)
    {
        creatureLevel = creatureBudgetArray[i]+pLevel;
        if(creatureLevel<-1){creatureLevel = -1;}
        if(creatureLevel>15){creatureLevel = 15;}
        if(i==0)
        {
            creatureLevelDescription = creatureLevelDescription+creatureLevel;
        }
        else
        {
            creatureLevelDescription = creatureLevelDescription +", "+creatureLevel;
        }
    }

    //print out that we are getting creatures for a room. 
    ChatMessage.create({
        content : "Creating encounter for room at level: "+pLevel+" with encounter budget of : "+ebudget+ " theme:  "+etheme+" Level Breakout: "+creatureLevelDescription
    });
    
    //get the creatures from the rolltable and display them based on the random budget allocation. 
    for(let i = 0; i<creatureBudgetArray.length;i++)
    {
        creatureLevelIndex = creatureBudgetArray[i]+pLevel+1;
        if(creatureLevelIndex<0){creatureLevelIndex = 0;}
        if(creatureLevelIndex>16){creatureLevelIndex = 16;}
        creatureLevel = creatureLevelIndex-1;
        creatureLVLID = creature_pack.index.find(t => t.name === selectedCreatureRollTables[creatureLevelIndex])._id;
        creature_pack.getDocument(creatureLVLID).then(table => table.draw());
    }

    console.log("Dungeon Encounter Generation Completed");

}
    
    
    let d = new Dialog({
        title: "Generate Encounter",
        content: `
        <p>Select Party Level, XP Budget and Theme for Creatures.</p>
            <form>
                <div>
                    <label>Select Party Level:</label> 
                    <select id="partylevel" name="partylevel">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                        <option>13</option>
                    </select>
                </div>
                <div>
                    <label>Select XP for Room:</label> 
                    <select id="encounterbudget" name="encounterbudget">
                        <option>80</option>
                        <option>40</option>
                        <option>60</option>                        
                        <option>120</option>
                        <option>160</option>
                    </select>
                </div>
                <div>
                    <label>Theme:</label> 
                    <select id="creaturetheme" name="creaturetheme">
                        <option>any</option>
                        <option>humanoid</option>
                        <option>aberration</option>                        
                        <option>animals</option>
                        <option>fey</option>
                        <option>plant</option>
                        <option>undead</option>
                        <option>construct</option>
                        <option>elemental</option>
                        <option>aquatic</option>
                    </select>
                    <i> Aquatic not included in "any" option.</i>
                </div>                
            </form>
        `
        ,
        buttons: {
         one: {
          icon: '<i class="fas fa-check"></i>',
          label: "Generate",
          callback: GenerateDungeon
         }         
        },
        default: "one",
        render: html => console.log("Register interactivity in the rendered dialog"),
        close: html => console.log("This always is logged no matter which option is chosen")
       });
       d.render(true);