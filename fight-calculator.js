// This file receives inputs from inputs.js and then calculates
// the probabilities. 

// For more accurate information about mathematics, please check out the mesbg.calculator.py file
// which was the original calculator for this dilemma.


// THE PROGRAM BEGINS:
//---------------------------------------------------------------------------------------

// factorial() is needed to be made manually to calcolate factorializations
function factorial(num) {
    if (num === 0 || num === 1)
        return 1;
    for (var i = num - 1; i >= 1; i--) {
        num *= i;
    }
    return num;
}


// skilled_vs_weak() function returns 2 probabilities: (skilled_win, weak_win) = (higher fight value opponent wins, lower fight value opponent wins).
// SEARCH THE PYTHON FILE FOR MORE INFORMATION ABOUT THE MATHEMATICAL FOUNDATION OF THIS FUNCTION!
function skilled_vs_weak(skilled_dice, weak_dice) {
    let probability_per_round = 0
    let weak_wins = 0
    let skilled_wins = 0
    let answer = []
    for (winning_dice_minus1 = 5; winning_dice_minus1 > 0; winning_dice_minus1--) {
        for (round_inside = 1; round_inside < weak_dice + 1; round_inside++) {
            probability_per_round = ((1 / 6) ** round_inside * (winning_dice_minus1 / 6) ** (weak_dice - round_inside)) * ((factorial(weak_dice)) / (factorial(round_inside) * factorial(weak_dice - round_inside))) * (winning_dice_minus1 / 6) ** skilled_dice
            weak_wins += probability_per_round
        }
    }
    skilled_wins = 1 - weak_wins
    answer.push(skilled_wins)
    answer.push(weak_wins)
    return answer
}

// equal_vs_equal() function returns 2 probabilities: left side opponent wins, right side opponent wins.
// SEARCH THE PYTHON FILE FOR MORE INFORMATION ABOUT THE MATHEMATICAL FOUNDATION OF THIS FUNCTION!
function equal_vs_equal(left_dice, left_elven_sword, right_dice, right_elven_sword) {
    let left_opponent_wins = 0
    let right_opponent_wins = 0
    let answer = []

    left_opponent_wins = skilled_vs_weak(right_dice, left_dice)[1]
    right_opponent_wins = skilled_vs_weak(left_dice, right_dice)[1]

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
    answer.push(left_opponent_wins)
    answer.push(right_opponent_wins)
    return answer
}


// this final area does the practical calculation 
// these variables are the ones to return to html file
// and calculate_answer() function gives value to the variables
// elements are also listened because button  "calculate" has 2 effects

// dict for winning % and base values, also a list to save values for later use
var A_and_B = {
    Opponent_A: 0.5,
    Opponent_B: 0.5
}

var winner_list = []


// this function gets an onclick input from html and activates the calculator
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

// this function has 3 separate ifs: A has higher F, B has higher F or both have equal F:
// answer here are stored to variable winner_list
function calculate_answer(A_dice_amount, A_fight, A_elven_sword_is_on, B_dice_amount, B_fight, B_elven_sword_is_on) {
    if (A_fight > B_fight) {
        function case1() {
            lista = skilled_vs_weak(A_dice_amount, B_dice_amount)
            return [lista[0], lista[1]]
        }
        winner_list = case1()

    }
    else if (B_fight > A_fight) {
        function case2() {
            lista = skilled_vs_weak(B_dice_amount, A_dice_amount)
            return [lista[1], lista[0]]
        }
        winner_list = case2()
    }

    else if (A_fight == B_fight) {
        function case3() {
            lista = equal_vs_equal(A_dice_amount, A_elven_sword_is_on, B_dice_amount, B_elven_sword_is_on)
            return [lista[0], lista[1]]
        }
        winner_list = case3()
    }
    A_and_B["Opponent_A"] = winner_list[0]
    A_and_B["Opponent_B"] = winner_list[1]
    print_answer()

}

function print_answer() {
    console.log(`Calculation completed! A wins: ${A_and_B["Opponent_A"]} and B wins: ${A_and_B["Opponent_B"]}`)
    document.getElementById("answer1").innerHTML = `Probability that A wins: ${parseFloat((A_and_B["Opponent_A"] * 100).toFixed(2))}%`
    document.getElementById("answer2").innerHTML = `Probability that B wins: ${parseFloat((A_and_B["Opponent_B"] * 100).toFixed(2))}%`

}




// this function is just to test the calculator functions in case need arise
function tester() {
    console.log(skilled_vs_weak(2, 2))
    console.log(skilled_vs_weak(4, 2))
    console.log(skilled_vs_weak(2, 4))
    console.log(skilled_vs_weak(4, 8))
    console.log(equal_vs_equal(2, false, 2, false))
    console.log(equal_vs_equal(2, false, 4, true))
    console.log(equal_vs_equal(2, true, 4, false))
}
