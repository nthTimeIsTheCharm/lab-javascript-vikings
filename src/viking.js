// Soldier
class Soldier {
    constructor(health, strength) {
        this.health = health;
        this.strength = strength;
    }

    attack(){
        return this.strength;
    }

    receiveDamage (receivedDamage) {
        this.health -= receivedDamage;
    }
}

// Viking
class Viking extends Soldier {
    constructor (name, health, strength) {
        super(health, strength);
        this.name = name;
    }

    receiveDamage(receivedDamage) { 
        this.health -= receivedDamage;
        if (this.health > 0){
            return `${this.name} has received ${receivedDamage} points of damage`;
        } else {
            return `${this.name} has died in act of combat`;
        }
    } 
    
    battleCry() {
        return "Odin Owns You All!";
    }
}

// Saxon
class Saxon extends Soldier {
    receiveDamage (receivedDamage) {
        this.health -= receivedDamage;
        if (this.health > 0){
            return `A Saxon has received ${receivedDamage} points of damage`;
        } else {
            return `A Saxon has died in combat`;
        }
    }
}

// War
class War {
  constructor() {
    this.vikingArmy = [];
    this.saxonArmy = [];
  }

  
  addViking(viking) {
    this.vikingArmy.push(viking);
  }
  addSaxon(saxon) {
    this.saxonArmy.push(saxon);
  }

  //Idea to combine vikingAttack() and saxonAttack()
  attackEnemy(attacker, attackee){

    //Randomly choose a Viking and a Saxon
    const randomVikingIndex = Math.floor(Math.random() * this.vikingArmy.length);
    const chosenViking = this.vikingArmy[randomVikingIndex];
    const randomSaxonIndex = Math.floor(Math.random() * this.saxonArmy.length);
    const chosenSaxon = this.saxonArmy[randomSaxonIndex];
    
    //Determine who attacks and conduct attack
    if (attacker.toLowerCase() === "viking" && attackee.toLowerCase() === "saxon"){
        const attackOutcome = chosenSaxon.receiveDamage(chosenViking.strength);
        if (attackOutcome === "A Saxon has died in combat") {
            this.saxonArmy.splice(randomSaxonIndex, 1);
        }
        return attackOutcome;

    } else if (attacker.toLowerCase === "saxon" && attackee.toLowerCase === "viking"){
        const attackOutcome = chosenViking.receiveDamage(chosenSaxon.strength);
        if (attackOutcome === `${chosenViking.name} has died in act of combat`) {
          this.vikingArmy.splice(randomVikingIndex, 1);
        }
        return attackOutcome;

    }else{
        return "Something has gone wrong with the attack";
    }
  }

  vikingAttack() {
    const randomVikingIndex = Math.floor(Math.random() * (this.vikingArmy.length));
    const chosenViking = this.vikingArmy[randomVikingIndex];
    const randomSaxonIndex = Math.floor(Math.random() * this.saxonArmy.length);
    const chosenSaxon = this.saxonArmy[randomSaxonIndex];

    const attackOutcome = chosenSaxon.receiveDamage(chosenViking.strength);
    if (attackOutcome === "A Saxon has died in combat"){
        this.saxonArmy.splice(randomSaxonIndex, 1);
    }
    return attackOutcome;
  }

  saxonAttack() {
    const randomSaxonIndex = Math.floor(Math.random() * this.saxonArmy.length);
    const chosenSaxon = this.saxonArmy[randomSaxonIndex];

    const randomVikingIndex = Math.floor(Math.random() * this.vikingArmy.length);
    const chosenViking = this.vikingArmy[randomVikingIndex];
    
    const attackOutcome = chosenViking.receiveDamage(chosenSaxon.strength);
    if (attackOutcome === `${chosenViking.name} has died in act of combat`) {
      this.vikingArmy.splice(randomVikingIndex, 1);
    }
    return attackOutcome;
  }

  showStatus() {
    if (this.vikingArmy.length <= 0 && this.saxonArmy.length >= 1) {
      return "Saxons have fought for their lives and survived another day...";
    } else if (this.saxonArmy.length <= 0 && this.vikingArmy.length >= 1) {
      return "Vikings have won the war of the century!";
    } else if (this.vikingArmy.length >= 1 && this.saxonArmy.length >= 1) {
      return "Vikings and Saxons are still in the thick of battle.";
    } else {
      return "Probably everyone is dead..";
    }
  }

}
