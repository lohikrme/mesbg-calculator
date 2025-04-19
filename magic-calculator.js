
// initiate variables
let spell_works_minimum = 0
let attacker_dice_amount = 0
let attacker_might = 0
let defender_dice_amount = 0
let defender_might = 0

// make sure website shows instantly suitable
document.getElementById("spell-works-button").innerHTML = 3
document.getElementById("attacker-dice-slider").value = 3
document.getElementById("defender-dice-slider").value = 2

change_attacker_dice()
change_defender_dice()
spell_works_button_click()
calculate()

function spell_works_button_click() {
    let spell_works_value = parseInt(document.getElementById("spell-works-button").innerHTML)
    if (spell_works_value < 6) {
        spell_works_value += 1
    }
    else {
        spell_works_value = 1
    }
    spell_works_minimum = spell_works_value
    document.getElementById("spell-works-button").innerHTML = spell_works_value
}

function change_attacker_dice() {
    let new_attacker_dice_amount = parseInt(document.getElementById("attacker-dice-slider").value)
    attacker_dice_amount = new_attacker_dice_amount
    document.getElementById("attacker-dice-text").innerHTML = `Dice to cast the spell: ${new_attacker_dice_amount}`
}

function change_defender_dice() {
    let new_defender_dice_amount = parseInt(document.getElementById("defender-dice-slider").value)
    defender_dice_amount = new_defender_dice_amount
    document.getElementById("defender-dice-text").innerHTML = `Dice to resist the spell: ${new_defender_dice_amount}`
}

// function for attacker might value update
function attacker_might_click() {
    let might_point_value = parseInt(document.getElementById("button-attacker-might").innerHTML)
    if (might_point_value < 3) {
        might_point_value += 1
    }
    else {
        might_point_value = 0
    }
    attacker_might = might_point_value
    document.getElementById("button-attacker-might").innerHTML = might_point_value
}

// function for defender might value update
function defender_might_click() {
    let might_point_value = parseInt(document.getElementById("button-defender-might").innerHTML)
    if (might_point_value < 3) {
        might_point_value += 1
    }
    else {
        might_point_value = 0
    }
    defender_might = might_point_value
    document.getElementById("button-defender-might").innerHTML = might_point_value
}

// factorial() is needed to be made manually to calculate factorializations
function factorial(num) {
    if (num === 0 || num === 1)
        return 1;
    for (var i = num - 1; i >= 1; i--) {
        num *= i;
    }
    return num;
}

// if enemy tries to resist the spell, use the modified skilled_vs_weak function
// skilled_vs_weak function works, because rules are basically the same as in fight phase for casting spells
// the resister is always considered to have a higher fight value (wins on stalemate)
// only modification needed is that, the dice of caster must be minimum of the score required by the spell
// otherwise just assume attacker/caster as weak and defender/resister as skilled
function skilled_vs_weak(skilled_dice_count, skilled_might, weak_dice_count, weak_might) {
    let probability_per_loop = 0
    let weak_wins = 0
    let answer = {}
    // first loop is from 6 to 1, meaning does weak win with 6s, 5s, 4s, 3s, 2s, 1s
    // notice that 1s means, weak can only win if they have might
    for (let winning_value = 6; winning_value >= 1; winning_value--) {
        // second loop is from 1 to weak_dice_count, e.g from 1 to 3
        // because weak can win with 1x 6s, 2x 6s, 3x 6s, 1x 5s, 2x 5s, 3x 5s... 1x 2s, 2x 2s or 3x 2s
        for (let dice_count_of_winning_value = 1; dice_count_of_winning_value <= weak_dice_count; dice_count_of_winning_value++) {
            // step 1: chance of getting dice_count_of_winning_value of winning_values
            probability_per_loop = (1/6)**dice_count_of_winning_value

            // step 2: other rolls when the weak side wins with the previous winning_values and winning_dice_rolls
            probability_per_loop *= ((winning_value - 1)/6)**(weak_dice_count-dice_count_of_winning_value)

            // step 3: consider all permutations for weak side dice
            probability_per_loop *= (factorial(weak_dice_count) / 
            (factorial(dice_count_of_winning_value)*factorial(weak_dice_count-dice_count_of_winning_value)))

            // step 4: any dices the skilled side can roll so weak side still wins
            // also make sure that winning_value + effective_weak_might >= requirement
            effective_weak_might = Math.min(6-winning_value, weak_might)
            if (winning_value + effective_weak_might < spell_works_minimum) {
                probability_per_loop = 0
                continue
            }
            skilled_losing_dice_value = Math.max(0, winning_value - 1 - skilled_might + effective_weak_might)
            probability_per_loop *= ((skilled_losing_dice_value)/6)**skilled_dice_count
            
            // step 5: save the probability of this loop to cumulative probability of weak side wins
            weak_wins += probability_per_loop
        }
    }
    answer["skilled_wins"] = 1 - weak_wins
    answer["weak_wins"] = weak_wins
    return answer
}

// if enemy wont try to resist the spell, use this function
// e.g caster uses 3 dices and needs 5 to get the spell through
// probability is the same as NOT getting just rolls between 1 and 4
// therefore, probability to get spell through is 1 - (4/6)^3
function enemy_has_no_magic_resistance(attacker_dice_amount, attacker_might) {
    let amount_of_failing_dice = spell_works_minimum - 1 - attacker_might
    let probability_to_fail = (amount_of_failing_dice/6) ** attacker_dice_amount
    return 1 - probability_to_fail
}

// combine no-resist and resist versions under one function
function probability_to_get_magic_through() {
    let attacker_wins = 0
    if (defender_dice_amount == 0) {
        attacker_wins = enemy_has_no_magic_resistance(attacker_dice_amount, attacker_might)
    }
    else {
        answer = skilled_vs_weak(defender_dice_amount, defender_might, attacker_dice_amount, attacker_might)
        attacker_wins = answer["weak_wins"]
    }
    return attacker_wins
}

// every time calculate button is pressed, let user know probability to get the spell through
function calculate() {
    change_attacker_dice()
    change_defender_dice()
    console.log("Spell works on minimum value of: " + spell_works_minimum + ".")
    console.log(`Attacker has ${attacker_dice_amount} dice to cast the spell.`)
    console.log(`Defender has ${defender_dice_amount} dice to resist the spell.`)
    console.log(`Attacker has ${attacker_might} might to improve dice rolls.`)
    console.log(`Defender has ${defender_might} might to improve dice rolls.`)
    answer = probability_to_get_magic_through()
    console.log(`The calculation has been completed! \nThe probability that the spell goes through is... \n${parseFloat(answer * 100).toFixed(2)}%`)
    document.getElementById("answer").innerHTML = `The probability that the spell goes in and works is: ${parseFloat(answer * 100).toFixed(2)}%`
}