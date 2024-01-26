let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = [
    "stick",
];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const text = document.querySelector("#text");
const weapons = [
    {
        name: "stick",
        power: 5,
    },
    {
        name: "dagger",
        power: 30,
    },
    {
        name: "claw hammer",
        power: 50,
    },
    {
        name: "sword",
        power: 100,
    },
];
const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15,
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60,
    },
    {
        name: "dragon",
        level: 20,
        health: 300,
    },
]

const locations = 
[
    {
        name: "town square",
        "button text": [
            "Go to store", 
            "Go to cave", 
            "Fight dragon",
        ],
        "button functions": [
            goStore,
            goCave,
            fightDragon,
        ],
        text: "You are in the town square. You see a sign that says \"Store\".",
    },
    {
        name: "store",
        "button text": [
            "Buy 10 health (10 gold)",
            "Buy weapon (30 gold)",
            "Go to town square",
        ],
        "button functions": [
            buyHealth,
            buyWeapon,
            goTown,
        ],
        text: "You enter the store.",
    },
    {
        name: "cave",
        "button text": [
            "Fight slime", 
            "Fight fanged beast", 
            "Go to town square",
        ],
        "button functions": [
            fightSlime,
            fightBeast,
            goTown,
        ],
        text: "You enter the cave. You see some monsters.",
    },
    {
        name: "fight",
        "button text": [
            "Attack",
            "Dodge",
            "Run"
        ],
        "button functions": [
            attack,
            dodge,
            goTown
        ],
        text: "You are fighting a monster.",
    },
    {
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, goTown],
        text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.',
    },
    {
        name: "lose",
        "button text": [
            "REPLAY?",
            "REPLAY?",
            "REPLAY?",
        ],
        "button functions": [
            restart,
            restart,
            restart,
        ],
        text: "You die. ☠️",
    },
    {
        name: "win",
        "button text": [
            "REPLAY?",
            "REPLAY?",
            "REPLAY?",
        ],
        "button functions": [
            restart,
            restart,
            restart,
        ],
        text: "You defeat the dragon! YOU WIN THE GAME! 🎉"
    },
];



//initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location)
{
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button1.onclick = location["button functions"][0];
    button2.innerText = location["button text"][1];
    button2.onclick = location["button functions"][1];
    button3.innerText = location["button text"][2];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
}

function goTown()
{   /* this was made together with the goStore contents before
       we saw the need to consolidate it in a function that
       will handle repetitive stuff.

    button1.innerText = "Go to store";
    button1.onclick = goStore();
    button2.innerText = "Go to cave";
    button2.onclick = goCave();
    button3.innerText = "Fight dragon";
    button3.onclick = fightDragon();
    text.innerText = "You are in the town square. You see a sign that says \"Store\".";
    */
   update(locations[0]);
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function goStore()
{   /*
    button1.innerText = "Buy 10 health (10 gold)";
    button1.onclick = buyHealth();
    button2.innerText = "Buy weapon (30 gold)";
    button2.onclick = buyWeapon();
    button3.innerText = "Go to town square";
    button3.onclick = goTown();
    text.innerText = "You enter the store."
    */
    update(locations[1]);
}

function buyHealth()
{
    if (gold >= 10)
    {
        gold -= 10;
        health += 10;  
        goldText.innerText = gold;   
        healthText.innerText = health;           
    }
    else
    {
        text.innerText = "You do not have enough gold to buy health.";
    }
}

function buyWeapon()
{
    if (currentWeapon < weapons.length - 1)
    {
        if (gold >= 30)
        {
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You now have a " + newWeapon + ".";
            inventory.push(" " + newWeapon);
            text.innerText += " In your inventory you have: " + inventory;
        }
        else
        {
            text.innerText = "You do not have enough gold to buy a weapon.";
        }
    }
    else
    {
        text.innerText = "You already have the most powerful weapon!";
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
}

function sellWeapon()
{
    if (inventory.length > 1)
    {
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You sold a " + currentWeapon + ".";
        text.innerText += " In your inventory you have: " + inventory;
    }
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function goCave()
{
    update(locations[2]);
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function goFight() //Go fight this(the one you chose to click(fightSlime/fightBeast/fightDragon)) monster. That's why this is called inside those functions.
{
    update(locations[3]); //refers to name: fight, functions: attack, dodge and goTown
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsters[fighting].health;
}

function attack()
{
    text.innerText = "The " + monsters[fighting].name + " attacks."
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
    //health -= monsters[fighting].level; //will be changed with getMonsterAttackValue
    health -= getMonsterAttackValue(monsters[fighting].level);
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
/*
    if (health <= 0) {
        lose();
    } 
    else if (monsterHealth <= 0) 
    {
        // if (fighting === 2) //we will just convert this into ternary
        // {
        //     winGame();
        // }
        // else
        // {
        //     defeatMonster();
        // }
        fighting === 2 ? winGame() : defeatMonster(); // ternary for the else-if block
    }
*/
   //ternary for the whole condition above
   (health <= 0) 
   ? lose() 
   : (monsterHealth <= 0 
            ? (fighting === 2 
                    ? winGame() 
                    : defeatMonster()) 
            : null);
}

function getMonsterAttackValue(level)
{
    const hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return (hit > 0) ? hit : 0;
}

function dodge()
{
    text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function fightSlime()
{
    fighting = 0;
    goFight();
}

function fightBeast()
{
    fighting = 1;
    goFight();
}

function fightDragon()
{
    fighting = 2;
    goFight();
}

function defeatMonster() //Runs when the monster is defeated
{
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]); // points to name: kill monster (could've been "killed monster")
}

function lose()
{
   update(locations[5]);
}

function winGame()
{
    update(locations[6]);
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function restart()
{
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    xpText.innerText = xp;
    healthText.innerText = health;
    goldText.innerText = gold;
    goTown();
}