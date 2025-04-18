// initiate variables to store data

let A_dice_amount = 0
let A_fight = 0
let A_might = 0
let A_elven_sword_is_on = false

let B_dice_amount = 0
let B_fight = 0
let B_might = 0
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


// function for opponent A dice amount update
function slider_A_dice_change_click() {
    A_dice_amount = document.getElementById("slider-A-dice").value
    document.getElementById("text-A-dice").innerHTML = `Dice-Amount: ${A_dice_amount}`
    return 
}


// function for opponent A fight value update
function slider_A_fight_change_click() {
    A_fight = document.getElementById("slider-A-fight").value
    document.getElementById("text-A-fight").innerHTML = `Fight-Value: ${A_fight}`
    return
}


// function for opponent B dice amount update
function slider_B_dice_change_click() {
    B_dice_amount = document.getElementById("slider-B-dice").value
    document.getElementById("text-B-dice").innerHTML = `Dice-Amount: ${B_dice_amount}`
    return 
}


// function for opponent B fight value update
function slider_B_fight_change_click() {
    B_fight = document.getElementById("slider-B-fight").value
    document.getElementById("text-B-fight").innerHTML = `Fight-Value: ${B_fight}`
    return
}

// function for opponent A might value update
function button_A_might_click() {
    let might_point_value = parseInt(document.getElementById("button-A-might").innerHTML)
    if (might_point_value < 3) {
        might_point_value += 1
    }
    else {
        might_point_value = 0
    }
    A_might = might_point_value
    document.getElementById("button-A-might").innerHTML = might_point_value
}

// function for opponent B might value update
function button_B_might_click() {
    let might_point_value = parseInt(document.getElementById("button-B-might").innerHTML)
    if (might_point_value < 3) {
        might_point_value += 1
    }
    else {
        might_point_value = 0
    }
    B_might = might_point_value
    document.getElementById("button-B-might").innerHTML = might_point_value
}


// function for updating opponent A elven sword
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


// function for updating opponent B elven sword
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

// factorial() is needed to calculate permutations as js does not have factorial in its library
function factorial(num) {
    if (num === 0 || num === 1)
        return 1;
    for (var i = num - 1; i >= 1; i--) {
        num *= i;
    }
    return num;
}
    

// skilled_vs_weak function finds out how high chance lower fight value opponent has to win
// it uses loops to have more flexibility and control
// we do loops for all different scenarios, from winning with 1 of 2s to winning with all 6s
// see mathematical-background.py for more information
function skilled_vs_weak(skilled_dice_count, skilled_might, weak_dice_count, weak_might) {
    let might_difference = weak_might - skilled_might
    let probability_per_loop = 0
    let weak_wins = 0
    let answer = {}
    // first loop is from 6 to 2, meaning does weak win with 6s, 5s, 4s, 3s, 2s
    // when we add might, it will maybe go till 1s
    for (let winning_value = 6; winning_value >= 2; winning_value--) {
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

            // step 4: dices the skilled side must roll so weak side can win in this round
            // e.g weak rolls 5s, so skilled rolls 1s 2s 3s or 4s aka 4/6
            probability_per_loop *= ((winning_value - 1)/6)**skilled_dice_count

            // step 5: save the probability of this loop to cumulative probability of weak side wins
            weak_wins += probability_per_loop
        }
    }
    answer["skilled_wins"] = 1 - weak_wins
    answer["weak_wins"] = weak_wins
    console.log(answer)
    return answer
}


// equal_vs_equal function returns 2 probabilities: A wins and B wins
// idea is that we use the skilled_vs_function first
// to find out how high chance there is to win non-stalemate situations for each side
// after that the remainders will be obviously the stalemates, and we use elven sword factors to see how stalemates go
function equal_vs_equal(A_dice_amount, A_might, A_elven_sword_is_on, B_dice_amount, B_might, B_elven_sword_is_on) {
    let A_opponent_wins = 0
    let B_opponent_wins = 0
    let answer = {}

    A_opponent_wins = skilled_vs_weak(B_dice_amount, B_might, A_dice_amount, A_might)["weak_wins"]
    B_opponent_wins = skilled_vs_weak(A_dice_amount, A_might, B_dice_amount, B_might)["weak_wins"]

    stalemate = 1 - A_opponent_wins - B_opponent_wins

    if (A_elven_sword_is_on == true && B_elven_sword_is_on == false) {
        A_opponent_wins += stalemate * (2 / 3)
        B_opponent_wins += stalemate * (1 / 3)
        stalemate = 0
    }
    else if (A_elven_sword_is_on == false && B_elven_sword_is_on == true) {
        B_opponent_wins += stalemate * (2 / 3)
        A_opponent_wins += stalemate * (1 / 3)
        stalemate = 0
    }
    else if (A_elven_sword_is_on == true && B_elven_sword_is_on == true) {
        B_opponent_wins += stalemate * (1 / 2)
        A_opponent_wins += stalemate * (1 / 2)
        stalemate = 0
    }
    else if (A_elven_sword_is_on == false && B_elven_sword_is_on == false) {
        B_opponent_wins += stalemate * (1 / 2)
        A_opponent_wins += stalemate * (1 / 2)
        stalemate = 0
    }
    answer["A_wins"] = A_opponent_wins
    answer["B_wins"] = B_opponent_wins
    console.log(answer)
    return answer
}


// ACTIVATE THE CALCULATION
function activate_calculation() {
    console.log("Calculation begins...")
    console.log(`Opponent A dice-amount: ${A_dice_amount}`)
    console.log(`Opponent A fight-value: ${A_fight}`)
    console.log(`Opponent A might-points: ${A_might}`)
    console.log(`Opponent A elven sword is: ${A_elven_sword_is_on}`)
    console.log(`Opponent B dice-amount: ${B_dice_amount}`)
    console.log(`Opponent B fight-value: ${B_fight}`)
    console.log(`Opponent B might-points: ${B_might}`)
    console.log(`Opponent B elven sword is: ${B_elven_sword_is_on}`)
    calculate_answer(A_dice_amount, A_fight, A_might, A_elven_sword_is_on, B_dice_amount, B_fight, B_might, B_elven_sword_is_on)
}

// run calculation at init of page, so always has correct value
activate_calculation()

// this function has 3 separate ifs: A has higher Fight, B has higher Fight or both have equal Fight:
function calculate_answer(A_dice_amount, A_fight, A_might, A_elven_sword_is_on, 
    B_dice_amount, B_fight, B_might, B_elven_sword_is_on) {
    if (A_fight > B_fight) {
        answer = skilled_vs_weak(A_dice_amount, A_might, B_dice_amount, B_might)
        A_and_B["Opponent_A"] = answer["skilled_wins"]
        A_and_B["Opponent_B"] = answer["weak_wins"]
    }
    else if (A_fight < B_fight) {
        answer = skilled_vs_weak(B_dice_amount, B_might, A_dice_amount, A_might)
        A_and_B["Opponent_A"] = answer["weak_wins"]
        A_and_B["Opponent_B"] = answer["skilled_wins"]
    }

    else if (A_fight == B_fight) {
        answer = equal_vs_equal(A_dice_amount, A_might, A_elven_sword_is_on, B_dice_amount, B_might, B_elven_sword_is_on)
        A_and_B["Opponent_A"] = answer["A_wins"]
        A_and_B["Opponent_B"] = answer["B_wins"]
    }

    console.log(`Calculation completed! A wins: ${A_and_B["Opponent_A"]} and B wins: ${A_and_B["Opponent_B"]}`)
    document.getElementById("answer1").innerHTML = `Probability that A wins: ${parseFloat((A_and_B["Opponent_A"] * 100).toFixed(2))}%`
    document.getElementById("answer2").innerHTML = `Probability that B wins: ${parseFloat((A_and_B["Opponent_B"] * 100).toFixed(2))}%`

}
