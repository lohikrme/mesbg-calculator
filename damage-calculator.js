
// initiate website values
document.getElementById("own-attacks-slider").value = 3
document.getElementById("own-strength-slider").value = 4
document.getElementById("enemy-defence-slider").value = 6
document.getElementById("enemy-strength-slider").value = 4

// needed global variables
var own_attacks = 5
var own_strength = 5
var enemy_defence = 5
var enemy_strength = 5
var rend_is_on = false
var two_handed_weapon_is_on = false
var reroll_one_is_on = false
var reroll_all_is_on = false
var anduril_is_on = false

// make sure html is instantly refreshed and ready to use
own_attacks_input()
own_strength_input()
enemy_defence_input()
enemy_strength_input()
launch_calculator()

// change own attack amount
function own_attacks_input() {
    own_attacks = parseInt(document.getElementById("own-attacks-slider").value)
    document.getElementById("text-own-attacks").innerHTML = `Own attacks: ${own_attacks}`
}

// change own strength
function own_strength_input() {
    own_strength = parseInt(document.getElementById("own-strength-slider").value)
    document.getElementById("text-own-strength").innerHTML = `Own strength: ${own_strength}`
}

// change enemy defence
function enemy_defence_input() {
    enemy_defence = parseInt(document.getElementById("enemy-defence-slider").value)
    document.getElementById("text-enemy-defence").innerHTML = `Enemy defence: ${enemy_defence}`
}

// change enemy strength
function enemy_strength_input() {
    enemy_strength = document.getElementById("enemy-strength-slider").value
    document.getElementById("text-enemy-strength").innerHTML = `Enemy strength: ${enemy_strength}`
}

// change rend_is_on
function rend_click() {
    if (two_handed_weapon_is_on == false && reroll_one_is_on == false && reroll_all_is_on == false && anduril_is_on == false) {
        if (rend_is_on == true) {
            document.getElementById("rend-button").style.backgroundColor = `white`
            rend_is_on = false
        }
        else if (rend_is_on == false) {
            document.getElementById("rend-button").style.backgroundColor = `green`
            rend_is_on = true
        }
    }
}

// change two_handed_weapon_is_on
function two_handed_weapon_click() {
    if (rend_is_on == false) {
        if (two_handed_weapon_is_on == true) {
            document.getElementById("two-handed-weapon-button").style.backgroundColor = `white`
            two_handed_weapon_is_on = false
        }
        else if (two_handed_weapon_is_on == false) {
            document.getElementById("two-handed-weapon-button").style.backgroundColor = `green`
            two_handed_weapon_is_on = true
        }
    }
}

// change reroll_one_is_on
function reroll_one_click() {
    if (rend_is_on == false && reroll_all_is_on == false) {
        if (reroll_one_is_on == true) {
            document.getElementById("reroll-one-button").style.backgroundColor = `white`
            reroll_one_is_on = false
        }
        else if (reroll_one_is_on == false) {
            document.getElementById("reroll-one-button").style.backgroundColor = `green`
            reroll_one_is_on = true
        }
    }
}

// change reroll_all_is_on
function reroll_all_click() {
    if (rend_is_on == false && reroll_one_is_on == false && anduril_is_on == false) {
        if (reroll_all_is_on == true) {
            document.getElementById("reroll-all-button").style.backgroundColor = `white`
            reroll_all_is_on = false
        }
        else if (reroll_all_is_on == false) {
            document.getElementById("reroll-all-button").style.backgroundColor = `green`
            reroll_all_is_on = true
        }
    }
}

// change anduril_is_on
function anduril_click() {
    if (rend_is_on == false && reroll_all_is_on == false) {
        if (anduril_is_on == true) {
            document.getElementById("anduril-button").style.backgroundColor = `white`
            anduril_is_on = false
        }
        else if (anduril_is_on == false) {
            document.getElementById("anduril-button").style.backgroundColor = `green`
            anduril_is_on = true
        }
    }
}



// choose a correct calculator and then update stats for the calculator
function launch_calculator() {
    if (rend_is_on) {
        rend_calculator()
    }
    else if (reroll_all_is_on && two_handed_weapon_is_on) {
        two_handed_reroll_all_calculator()
    }
    else if (reroll_all_is_on) {
        one_handed_reroll_all_calculator()
    }
    else if (anduril_is_on) {
        anduril_calculator()
    }
    else if (two_handed_weapon_is_on == true && reroll_one_is_on == false) {
        two_handed_calculator()
    }
    else if (two_handed_weapon_is_on == true && reroll_one_is_on == true) {
        two_handed_reroll_one_calculator()
    }
    else if (two_handed_weapon_is_on == false && reroll_one_is_on == true) {
        one_handed_reroll_one_calculator()
    }
    else {
        normal_calculator()
    }


}
// here will be different calculators. please note that most of these calculators use
// the file wound-charts.js as the source for different wound charts!

// rend calculator comes first because it does not coexist with other abilities
function rend_calculator() {
    let wounds_dealt = 0
    function how_many_wounds() {
        let wounds_dealt2 = 0
        for (i = 0; i < own_attacks; i++) {
            wounds_dealt2 += 1 * rend_wound_chart()
        }
        return wounds_dealt2
    }
    wounds_dealt = how_many_wounds()
    document.getElementById("answer").innerHTML = `Average wounds caused: ${parseFloat(wounds_dealt.toFixed(3))}`
}

// one handed reroll all calculator comes second because also this does not coexist with other abilities
function one_handed_reroll_all_calculator() {
    let wounds_dealt = 0
    function how_many_wounds() {
        let wounds_dealt2 = 0
        for (i = 0; i < own_attacks; i++) {
            wounds_dealt2 += 1 * one_handed_reroll_all_wound_chart()
        }
        return wounds_dealt2
    }
    wounds_dealt = how_many_wounds()
    document.getElementById("answer").innerHTML = `Average wounds caused: ${parseFloat(wounds_dealt.toFixed(3))}`
}


// anduril comes third because it has own rules which do not require the wound charts
function anduril_calculator() {
    // anduril wounds normally on 4+ roll = 3/6
    let factor = 3 / 6
    let wounds_dealt = 0
    // with two-handed mode anduril obviously rolls 3+ roll = 4/6
    if (two_handed_weapon_is_on == true && reroll_one_is_on == false) {
        factor = 4 / 6
    }
    else if (two_handed_weapon_is_on == true && reroll_one_is_on == true) {
        // factor = (1/6) * (4/6) + (4/6)
        factor = 7 / 9
    }
    else if (two_handed_weapon_is_on == false && reroll_one_is_on == true) {
        // factor = (1/6) * (3/6) + (3/6)
        factor = 7 / 12
    }
    for (i = 0; i < own_attacks; i++) {
        wounds_dealt += 1 * factor
    }
    document.getElementById("answer").innerHTML = `Average wounds caused: ${parseFloat(wounds_dealt.toFixed(3))}`

}

// now the more usual calculators begin from the two_handed_calculator
function two_handed_calculator() {
    let wounds_dealt = 0
    function how_many_wounds() {
        let wounds_dealt2 = 0
        for (i = 0; i < own_attacks; i++) {
            wounds_dealt2 += 1 * two_handed_wound_chart()
        }
        return wounds_dealt2
    }
    wounds_dealt = how_many_wounds()
    document.getElementById("answer").innerHTML = `Average wounds caused: ${parseFloat(wounds_dealt.toFixed(3))}`
}

// two handed in situation when can also reroll ones
function two_handed_reroll_one_calculator() {
    let wounds_dealt = 0
    function how_many_wounds() {
        let wounds_dealt2 = 0
        for (i = 0; i < own_attacks; i++) {
            wounds_dealt2 += 1 * two_handed_reroll_one_wound_chart()
        }
        return wounds_dealt2
    }
    wounds_dealt = how_many_wounds()
    document.getElementById("answer").innerHTML = `Average wounds caused: ${parseFloat(wounds_dealt.toFixed(3))}`
}


// two handed in situation when can reroll all failed dice rolls
function two_handed_reroll_all_calculator() {
    let wounds_dealt = 0
    function how_many_wounds() {
        let wounds_dealt2 = 0
        for (i = 0; i < own_attacks; i++) {
            wounds_dealt2 += 1 * two_handed_reroll_all_wound_chart()
        }
        return wounds_dealt2
    }
    wounds_dealt = how_many_wounds()
    document.getElementById("answer").innerHTML = `Average wounds caused: ${parseFloat(wounds_dealt.toFixed(3))}`
}

// this is for situations when reroll one is true but two-handed is false
function one_handed_reroll_one_calculator() {
    let wounds_dealt = 0
    function how_many_wounds() {
        let wounds_dealt2 = 0
        for (i = 0; i < own_attacks; i++) {
            wounds_dealt2 += 1 * one_handed_reroll_one_wound_chart()
        }
        return wounds_dealt2
    }
    wounds_dealt = how_many_wounds()
    document.getElementById("answer").innerHTML = `Average wounds caused: ${parseFloat(wounds_dealt.toFixed(3))}`
}

// when all special abilities are false, then normal_calculator is used
function normal_calculator() {
    let wounds_dealt = 0
    function how_many_wounds() {
        let wounds_dealt2 = 0
        for (i = 0; i < own_attacks; i++) {
            wounds_dealt2 += 1 * normal_wound_chart()
        }
        return wounds_dealt2
    }
    wounds_dealt = how_many_wounds()
    document.getElementById("answer").innerHTML = `Average wounds caused: ${parseFloat(wounds_dealt.toFixed(3))}`
}