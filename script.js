// document = reference to html file - object
// gets first element that matches the id
const log = document.getElementById('log')
const moveBtn = document.getElementById('moveBtn')
const attackBtn = document.getElementById('attackBtn')
const healBtn = document.getElementById('healBtn')
const runBtn = document.getElementById('runBtn')

// class / constructor function
// object template
class Character{
    constructor(name, hp, atkPwr, inventory, potionCount){
        this.name = name
        this.hp = hp
        this.atkPwr = atkPwr
        this.inventory = inventory
        this.potionCount = potionCount
    }

    attack(combatant){
        let damage = this.atkPwr

        const chance = Math.random()
        if(chance > .9){
            damage = damage * 1.5
            createLog('Critical Hit')
        }
        combatant.hp = combatant.hp - damage
        createLog(`${this.name} does ${damage} to ${combatant.name}`)
    }
}

const player = new Character("John", 100, 20, ["Sword"], 3)
const orc = new Character("Orc", 50, 15, [], 1)
const goblin = new Character('Goblin',40,15, [], 1)
const giant = new Character("Giant", 75, 25, [], 1)

// index based - index 0
const enemies = [orc, goblin, giant]
let currentEnemy = null
let inCombat = false

attackBtn.style.display = 'none'
runBtn.style.display = 'none'

// parameters - place holder
function createLog(text){
    const message = document.createElement('p')
    message.textContent = text
    log.append(message)
}

// reusable set of logic - hook it up to a button
function handleMove(){
    // logic
    const randomChance = Math.random() // 0 - 1 (1 excluded)
    // conditional (if/else)
    if(randomChance > .5){
        handleEncounter()
    } else {
        createLog('You continue with no issue')
    }
}

function handleEncounter(){
    const randomIndex = Math.floor(Math.random() * enemies.length) // .5 * 3 = 1.5
    // const currentEnemy = enemies[randomIndex] // scope blocked
    currentEnemy = enemies[randomIndex]
    createLog('You have ran into ' + currentEnemy.name)
    inCombat = true
    attackBtn.style.display = 'inline-block'
    runBtn.style.display = 'inline-block'
    moveBtn.style.display = 'none'
}

function handleButtons(){
    attackBtn.style.display = 'none'
    runBtn.style.display = 'none'
    moveBtn.style.display = 'inline-block'
}

function handleAttack(){

    if(currentEnemy === null){
        createLog('There is no enemy to attack')
        return
    }

    if(player.hp <= 0){
        createLog('You have already been defeated')
        return
    }

    player.attack(currentEnemy)
    if(currentEnemy.hp <= 0){
        currentEnemy = null
        inCombat = false
        handleButtons()
        createLog(`You have defeated the ${currentEnemy.name}`)
        return
    }

    currentEnemy.attack(player)
    if(player.hp <= 0){
        createLog('You have died')
        return
    }
}

// === type and the value
// edge cases - what ifs
function handleHeal(){
    if(player.potionCount === 0){
        createLog("You don't have any potions")
        return
    }

    if(player.hp >= 100){
        createLog("Already at full health.")
        return
    }

    // happy path
        player.hp = player.hp + 25
        player.potionCount = player.potionCount - 1
    //

    if(player.hp > 100){
        player.hp = 100
    }

    createLog(`You have healed for 25 hp, you have ${player.hp} hp`)
}

function handleRun(){
    if(player.hp <= 0){
        createLog('You have already been defeated')
        return
    }
    if(currentEnemy === null){
        createLog('Nothing to run from')
        return
    }
    const chance = Math.floor(Math.random() * 10) + 1 //.99 * 10 = 9.9 | 9 + 1 = 10
    if(chance < 5){
        createLog('You have escaped')
        currentEnemy = null
        handleButtons()
        return
    }
    createLog('You were unable to escape')
    currentEnemy.attack(player)
    if(player.hp <= 0){
        createLog('You have died')
        return
    }
}

moveBtn.addEventListener('click', handleMove)
attackBtn.addEventListener('click', handleAttack)
healBtn.addEventListener('click', handleHeal)
runBtn.addEventListener('click', handleRun)

// creates an html element
// const pTag = document.createElement('p') // <p></p>
// text content = value
// pTag.textContent = "hello" // <p>hello</p>
// add it to the end 
// log.append(pTag)

// DRY - DONT REPEAT YOURSELF
// helper function
//