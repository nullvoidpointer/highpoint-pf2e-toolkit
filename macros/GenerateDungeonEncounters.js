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
    const encounterBudget80Allocations = [[2],[1,-2],[0,0],[0,-2,-2],[-1,-3,-3,-4],[-3,-3,-1,-2]];
    const encounterBudget120Allocations = [[3],[2,0],[2,-2,-2],[1,1],[1,0,-2],[1,-1,-1],[0,0,0],[0,-1,-1,-2]];
    const encounterBudget160Allocations = [[4,-2],[3,-2,-2],[2,2],[1,1,0],[0,0,0,0],[1,0,-1,-1]];

    //define the id of the roll tables to look up into get creatures. 
    const humanoidRolltables = ['HP Humanoid Level -01 - 00','HP Humanoid Level 01','HP Humanoid Level 02','HP Humanoid Level 03','HP Humanoid Level 04','HP Humanoid Level 05','HP Humanoid Level 06','HP Humanoid Level 07','HP Humanoid Level 08-09','HP Humanoid Level 08-09','HP Humanoid Level 10-12','HP Humanoid Level 10-12','HP Humanoid Level 10-12'];
    const aberrationRolltables = ['HP Aberration Or Fiend 00-02','HP Aberration Or Fiend 00-02','HP Aberration Or Fiend 00-02','HP Aberration Or Fiend 03-05','HP Aberration Or Fiend 03-05','HP Aberration Or Fiend 03-05','HP Aberration Or Fiend 06-08','HP Aberration Or Fiend 06-08','HP Aberration Or Fiend 06-08','HP Aberration Or Fiend 09-11','HP Aberration Or Fiend 09-11','HP Aberration Or Fiend 09-11','HP Aberration Or Fiend 09-11',]
    const animalRolltables = ['HP Animals Level -01-00','HP Animals Level 01','HP Animals Level 02','HP Animals Level 03','HP Animals Level 04','HP Animals Level 05','HP Animals Level 06-07','HP Animals Level 06-07','HP Animals Level 08-09','HP Animals Level 08-09','HP Animals Level 10-12','HP Animals Level 10-12','HP Animals Level 10-12'];
    const feyRolltables = ['HP Fey Level 00-02','HP Fey Level 00-02','HP Fey Level 00-02','HP Fey Level 03-05','HP Fey Level 03-05','HP Fey Level 03-05','HP Fey Level 06-08','HP Fey Level 06-08','HP Fey Level 06-08','HP Fey Level 09-11','HP Fey Level 09-11','HP Fey Level 09-11','HP Fey Level 09-11'];
    const plantRolltables = ['HP Plant Fungus Ooze Level -01-00','HP Plant Fungus Ooze Level 01-03','HP Plant Fungus Ooze Level 01-03','HP Plant Fungus Ooze Level 01-03','HP Plant Fungus Ooze Level 04-06','HP Plant Fungus Ooze Level 04-06','HP Plant Fungus Ooze Level 04-06','HP Plant Fungus Ooze Level 07-09','HP Plant Fungus Ooze Level 07-09','HP Plant Fungus Ooze Level 07-09','HP Plant Fungus Ooze Level 10-12','HP Plant Fungus Ooze Level 10-12','HP Plant Fungus Ooze Level 10-12'];
    const undeadRolltables = ['HP Undead Level 00', 'HP Undead Level 01-02','HP Undead Level 01-02','HP Undead Level 03-04','HP Undead Level 03-04','HP Undead Level 05-06','HP Undead Level 05-06','HP Undead Level 07-08','HP Undead Level 07-08','HP Undead Level 09-10','HP Undead Level 09-10','HP Undead Level 11-12','HP Undead Level 11-12'];


    var selectedCreatureRollTables = humanoidRolltables;
    var creaturesLevelsArray = [];
    var selectedEncounterBudgetAllocations;
    
    //randomly set the theme. 
    if(etheme == "any")
    {
        //randomly select a theme
        var randomselectedtheme = Math.floor(Math.random()*6);
        if(randomselectedtheme == 1){
            etheme = "aberration";
        }else if(randomselectedtheme == 2){
            etheme = "animals";
        }else if(randomselectedtheme ==3){
            etheme = "fey";
        }else if(randomselectedtheme == 4){
            etheme = "plant";
        }else if(randomselectedtheme == 5){
            etheme = "undead";
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
    
    
    
    //set the look up list for encounter make up.
    if (ebudget <=40)
    {
        selectedEncounterBudgetAllocations = encounterBudget40Allocations;
        console.log("Selected encounter level 40");
    }
    else if (ebudget<=60)
    {
        selectedEncounterBudgetAllocations = encounterBudget60Allocations;
        console.log("Selected encounter level 60");
    }
    else if(ebudget<=80)
    {
        selectedEncounterBudgetAllocations = encounterBudget80Allocations;
        console.log("Selected encounter level 80");
    }
    else if(ebudget<=120)
    {
        selectedEncounterBudgetAllocations = encounterBudget120Allocations;
        console.log("Selected encounter level 120");
    }
    else
    {
        selectedEncounterBudgetAllocations = encounterBudget160Allocations;
        console.log("Selected encounter level 160");
    }

    console.log(selectedEncounterBudgetAllocations);

    //get the random values to grab the creatures. 
    const encounterBudgetArrayIndex = Math.floor(Math.random()*selectedEncounterBudgetAllocations.length);
    const creatureBudgetArray = selectedEncounterBudgetAllocations[encounterBudgetArrayIndex];


    //print out that we are getting creatures for a room. 
    ChatMessage.create({
        content : "Creating encounter for room at level: "+pLevel+" with encounter budget of : "+ebudget+ " theme:  "+etheme
    });
    
    //get the creatures from the rolltable and display them based on the random budget allocation. 
    for(let i = 0; i<creatureBudgetArray.length;i++)
    {
        creatureLevel = creatureBudgetArray[i]+pLevel;
        if(creatureLevel<0){creatureLevel = 0;}
        if(creatureLevel>12){creatureLevel = 12;}

        console.log("Getting level "+creatureLevel+" creature from: "+selectedCreatureRollTables[creatureLevel]);

        creatureLVLID = creature_pack.index.find(t => t.name === selectedCreatureRollTables[creatureLevel])._id;
        creature_pack.getDocument(creatureLVLID).then(table => table.draw());
    }

}
    
    
    let d = new Dialog({
        title: "Test Dialog",
        content: `
        <p>Select Party Level and Number of Rooms.</p>
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
                    </select>
                </div>
                <div>
                    <label>Select Number of Rooms:</label> 
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
                    </select>
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