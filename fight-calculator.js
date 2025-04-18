// This file receives inputs from inputs.js and then calculates
// the probabilities. 

// For more accurate information about mathematics, please check out the mesbg.calculator.py file
// which was the original calculator for this dilemma.


// FETCH WEBSITE VARIABLES AND UPDATE THEIR CORRESPONDING VALUES:
//---------------------------------------------------------------------------------------

// this inputs.js file receives inputs from html and then sends
// the inputs to calculator.js file

// these are variables to be used inside calculator.js file, but elven_sword also affects color of buttons
let A_dice_amount = 0
let A_fight = 0
let A_elven_sword_is_on = false

let B_dice_amount = 0
let B_fight = 0
let B_elven_sword_is_on = false

// this dictionary stores chance A or B wins
let A_and_B = {
    Opponent_A: 0.5,
    Opponent_B: 0.5
}

// initiate values in website
document.getElementById("slider-A-dice").value = 3
document.getElementById("slider-A-fight").value = 3
document.getElementById("slider-B-dice").value = 2
document.getElementById("slider-B-fight").value = 4


// activate the functions instantly so that the website looks proper immediately
slider_A_dice_change_click()
slider_A_fight_change_click()
slider_B_dice_change_click()
slider_B_fight_change_click()


// function for opponent A dice amount
function slider_A_dice_change_click() {
    A_dice_amount = document.getElementById("slider-A-dice").value
    document.getElementById("text-A-dice").innerHTML = `Dice-Amount: ${A_dice_amount}`
    return 
}


// function for opponent A fight value
function slider_A_fight_change_click() {
    A_fight = document.getElementById("slider-A-fight").value
    document.getElementById("text-A-fight").innerHTML = `Fight-Value: ${A_fight}`
    return
}


// function for opponent B dice amount
function slider_B_dice_change_click() {
    B_dice_amount = document.getElementById("slider-B-dice").value
    document.getElementById("text-B-dice").innerHTML = `Dice-Amount: ${B_dice_amount}`
    return 
}


// function for opponent B fight value
function slider_B_fight_change_click() {
    B_fight = document.getElementById("slider-B-fight").value
    document.getElementById("text-B-fight").innerHTML = `Fight-Value: ${B_fight}`
    return
}


// function for clicking opponent A elven sword
function button_A_elven_sword_click() {
    if (A_elven_sword_is_on == true) {
        document.getElementById("button-A-elven-sword").style.backgroundColor = 'white'
        A_elven_sword_is_on = false
    }
    else if (A_elven_sword_is_on == false) {
        document.getElementById("button-A-elven-sword").style.backgroundColor = 'green'
        A_elven_sword_is_on = true
    }
}


// function for clicking opponent B elven sword
function button_B_elven_sword_click() {
    if (B_elven_sword_is_on == true) {
        document.getElementById("button-B-elven-sword").style.backgroundColor = 'white'
        B_elven_sword_is_on = false
    }
    else if (B_elven_sword_is_on == false) {
        document.getElementById("button-B-elven-sword").style.backgroundColor = 'green'
        B_elven_sword_is_on = true
    }
}

// CALCULATE PROBABILITY VALUES
// -----------------------------------------------------------------------------------------------
// please refer to "mathematical-background.py if something is unclear"

// factorial() is needed as js does not have factorial in its library
function factorial(num) {
    if (num === 0 || num === 1)
        return 1;
    for (var i = num - 1; i >= 1; i--) {
        num *= i;
    }
    return num;
}


// skilled_vs_weak() function uses binomial probability to find out 2 probabilities: 
// (skilled_win, weak_win) = (higher fight value opponent wins, lower fight value opponent wins).
// idea is that weak wins happen only via absolutely higher rolls. 
// e.g u cant win as weak by getting 5 if enemy also gets 5, u must get 6
// then, after we know how much weak wins, we know skilled wins all else
// including stalemate rolls such as 6-6 or 5-5, and also if skilled rolls higher
function skilled_vs_weak(skilled_dice, weak_dice) {
    let probability_per_round = 0
    let weak_wins = 0
    let answer = {}
    for (winning_dice_minus1 = 5; winning_dice_minus1 > 0; winning_dice_minus1--) {
        for (round_inside = 1; round_inside < weak_dice + 1; round_inside++) {
            probability_per_round = ((1 / 6) ** round_inside * 
                (winning_dice_minus1 / 6) ** (weak_dice - round_inside)) * 
                ((factorial(weak_dice)) / (factorial(round_inside) * factorial(weak_dice - round_inside))) * 
                (winning_dice_minus1 / 6) ** skilled_dice
            weak_wins += probability_per_round
        }
    }
    answer["skilled_wins"] = 1 - weak_wins
    answer["weak_wins"] = weak_wins
    return answer
}

// equal_vs_equal() function returns 2 probabilities: left side wins, right side wins.
// idea is that we use the skilled_vs_function first
// if we take "weak_wins" score for both A and B, then we know all situations
// where A and B win with absolutely higher dice roll, e.g 555 vs 611 6 wins
// then we remove these wins from 1
// imagine A wins 40% and B wins 50% of duels with a higher dice roll
// then the remaining 10% of rolls end up as a stalemate
// so we use the info of possible elven swords to see how that remainder is split 
// base situation it is 50% win for either side, but elven sword makes that 4/6 chance...
function equal_vs_equal(left_dice, left_elven_sword, right_dice, right_elven_sword) {
    let left_opponent_wins = 0
    let right_opponent_wins = 0
    let answer = {}

    left_opponent_wins = skilled_vs_weak(right_dice, left_dice)["weak_wins"]
    right_opponent_wins = skilled_vs_weak(left_dice, right_dice)["weak_wins"]

    stalemate = 1 - left_opponent_wins - right_opponent_wins

    if (left_elven_sword == true && right_elven_sword == false) {
        left_opponent_wins += stalemate * (2 / 3)
        right_opponent_wins += stalemate * (1 / 3)
        stalemate = 0
    }
    else if (left_elven_sword == false && right_elven_sword == true) {
        right_opponent_wins += stalemate * (2 / 3)
        left_opponent_wins += stalemate * (1 / 3)
        stalemate = 0
    }
    else if (left_elven_sword == true && right_elven_sword == true) {
        right_opponent_wins += stalemate * (1 / 2)
        left_opponent_wins += stalemate * (1 / 2)
        stalemate = 0
    }
    else if (left_elven_sword == false && right_elven_sword == false) {
        right_opponent_wins += stalemate * (1 / 2)
        left_opponent_wins += stalemate * (1 / 2)
        stalemate = 0
    }
    answer["left_wins"] = left_opponent_wins
    answer["right_wins"] = right_opponent_wins
    console.log(answer)
    return answer
}


// ACTIVATE THE CALCULATION
function activate_calculation() {
    console.log("Calculation begins...")
    console.log(`Opponent A dice-amount: ${A_dice_amount}`)
    console.log(`Opponent A fight-value: ${A_fight}`)
    console.log(`Opponent A elven sword is: ${A_elven_sword_is_on}`)
    console.log(`Opponent B dice-amount: ${B_dice_amount}`)
    console.log(`Opponent B fight-value: ${B_fight}`)
    console.log(`Opponent B elven sword is: ${B_elven_sword_is_on}`)
    calculate_answer(A_dice_amount, A_fight, A_elven_sword_is_on, B_dice_amount, B_fight, B_elven_sword_is_on)
}

// run calculation at init of page, so always has correct value
activate_calculation()

// this function has 3 separate ifs: A has higher Fight, B has higher Fight or both have equal Fight:
function calculate_answer(A_dice_amount, A_fight, A_elven_sword_is_on, B_dice_amount, B_fight, B_elven_sword_is_on) {
    if (A_fight > B_fight) {
        answer = skilled_vs_weak(A_dice_amount, B_dice_amount)
        A_and_B["Opponent_A"] = answer["skilled_wins"]
        A_and_B["Opponent_B"] = answer["weak_wins"]
    }
    else if (A_fight < B_fight) {
        answer = skilled_vs_weak(B_dice_amount, A_dice_amount)
        A_and_B["Opponent_A"] = answer["weak_wins"]
        A_and_B["Opponent_B"] = answer["skilled_wins"]
    }

    else if (A_fight == B_fight) {
        answer = equal_vs_equal(A_dice_amount, A_elven_sword_is_on, B_dice_amount, B_elven_sword_is_on)
        A_and_B["Opponent_A"] = answer["left_wins"]
        A_and_B["Opponent_B"] = answer["right_wins"]
    }

    console.log(`Calculation completed! A wins: ${A_and_B["Opponent_A"]} and B wins: ${A_and_B["Opponent_B"]}`)
    document.getElementById("answer1").innerHTML = `Probability that A wins: ${parseFloat((A_and_B["Opponent_A"] * 100).toFixed(2))}%`
    document.getElementById("answer2").innerHTML = `Probability that B wins: ${parseFloat((A_and_B["Opponent_B"] * 100).toFixed(2))}%`

}
