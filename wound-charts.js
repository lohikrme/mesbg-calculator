// next there will be a few wound charts. reason for this is different needs by different abilities.
// there will be own wound charts for normal situations, rend situations, reroll situations and two handed situations
// anduril sword does not need a separate wound chart because its rules are somewhat simpler


// rend wound chart
function rend_wound_chart() {
    let factor = 1
    if (enemy_strength - 8 >= own_strength) {
        factor = 0
    }
    else if (enemy_strength - 7 == own_strength) {
        factor = 1/36
    }
    else if (enemy_strength - 6 == own_strength) {
        factor = 1/18
    }
    else if (enemy_strength - 5 == own_strength) {
        factor = 1/12
    }
    else if (enemy_strength - 4 == own_strength) {
        factor = 1/6
    }
    else if (enemy_strength - 3 == own_strength) {
        factor = 1/6
    }
    else if (enemy_strength - 2 == own_strength) {
        factor = 1/3
    }
    else if (enemy_strength - 1 == own_strength) {
        factor = 1/3
    }
    else if (enemy_strength - 0 == own_strength) {
        factor = 1/2
    }
    else if (enemy_strength + 1 == own_strength) {
        factor = 1/2
    }
    else if (enemy_strength + 2 == own_strength) {
        factor = 2/3
    }
    else {
        factor = 2/3
    }
    return factor
}

// reroll_all wound chart
// note that these probabilities are calculated with wolfram alpha to know probability per step in the wound chart
// for example if you need 6 and 6 to wound. Normally that is 1/36. But now u can reroll fails.
// so if u roll 12345 or first 6 and then 12345, u can reroll these situations. And after reroll probability is normal 1/36.
// also if u roll 6 and 6 then u dont reroll. So the overall probability to cause wounds for 6 and 6 situation would be: 
// (5/6) * (1/36) + (1/6) * (5/6) * (1/36) + (1/36) = 71/1296. And so on, each condition requires a bit similar calculation of probability.
function reroll_all_wound_chart() {
    let factor = 1
    if (enemy_defence - 8 >= own_strength) {
        factor = 0
    }
    else if (enemy_defence - 7 == own_strength) {
        factor = 71/1296
    }
    else if (enemy_defence - 6 == own_strength) {
        factor = 35/324
    }
    else if (enemy_defence - 5 == own_strength) {
        factor = 23/144
    }
    else if (enemy_defence - 4 == own_strength) {
        factor = 11/36
    }
    else if (enemy_defence - 3 == own_strength) {
        factor = 11/36
    }
    else if (enemy_defence - 2 == own_strength) {
        factor = 5/9
    }
    else if (enemy_defence - 1 == own_strength) {
        factor = 5/9
    }
    else if (enemy_defence - 0 == own_strength) {
        factor = 3/4
    }
    else if (enemy_defence + 1 == own_strength) {
        factor = 3/4
    }
    else if (enemy_defence + 2 == own_strength) {
        factor = 8/9
    }
    else {
        factor = 8/9
    }
    return factor
}





// two-handed wound chart
// note that two handed weapon gives +1 to wound rolls. for example 6 and 5 becomes 5 and 4.
function two_handed_wound_chart() {
    let factor = 1
    if (enemy_defence - 8 >= own_strength) {
        factor = 0
    }
    else if (enemy_defence - 7 == own_strength) {
        factor = 1/9
    }
    else if (enemy_defence - 6 == own_strength) {
        factor = 1/6
    }
    else if (enemy_defence - 5 == own_strength) {
        factor = 2/9
    }
    else if (enemy_defence - 4 == own_strength) {
        factor = 1/3
    }
    else if (enemy_defence - 3 == own_strength) {
        factor = 1/3
    }
    else if (enemy_defence - 2 == own_strength) {
        factor = 1/2
    }
    else if (enemy_defence - 1 == own_strength) {
        factor = 1/2
    }
    else if (enemy_defence - 0 == own_strength) {
        factor = 2/3
    }
    else if (enemy_defence + 1 == own_strength) {
        factor = 2/3
    }
    else if (enemy_defence + 2 == own_strength) {
        factor = 2/3
    }
    else {
        factor = 2/3
    }
    return factor
}

// two_handed_reroll_one_chart is quite complicated but it can be used if someone has 2h-sword and uses feint
// example calculation: normally with 1h sword you would need 6 and 6 to wound, but 
// now u would need only 5 and 5 two wound due to having 2h sword, and also
// you can now reroll either/both dice if u get 1. So if u roll 6 and 1, u can reroll that 1. 
// if  you get 1 and 6, u can reroll that 1.
// so, how to calculate situation where u would normally need 6 and 6 and now u need 5 and 5 
// but you can reroll ones? That calculation would go next:
// ((1/6)*(2/6) + (2/6)) * ((1/6)*(2/6) + (2/6)) = 49/324
function two_handed_reroll_one_wound_chart() {
    
    let factor = 1
    if (enemy_defence - 8 >= own_strength) {
        factor = 0
    }
    else if (enemy_defence - 7 == own_strength) {
        factor = 49/324
    }
    else if (enemy_defence - 6 == own_strength) {
        factor = 49/216
    }
    else if (enemy_defence - 5 == own_strength) {
        factor = 49/162
    }
    else if (enemy_defence - 4 == own_strength) {
        factor = 7/18
    }
    else if (enemy_defence - 3 == own_strength) {
        factor = 7/18
    }
    else if (enemy_defence - 2 == own_strength) {
        factor = 7/12
    }
    else if (enemy_defence - 1 == own_strength) {
        factor = 7/12
    }
    else if (enemy_defence - 0 == own_strength) {
        factor = 7/9
    }
    else if (enemy_defence + 1 == own_strength) {
        factor = 7/9
    }
    else if (enemy_defence + 2 == own_strength) {
        factor = 7/9
    }
    else {
        factor = 7/9
    }
    return factor
}


//reroll one wound chart
// for example if u would need normally 6 and 6, now u calculate that scenario next:
//((1/6)*(1/6)+(1/6))*(1/6)*(1/6)+(1/6)) == 223/1296
function one_handed_reroll_one_wound_chart() {
    let factor = 1
    if (enemy_defence - 8 >= own_strength) {
        factor = 0
    }
    else if (enemy_defence - 7 == own_strength) {
        factor = 223/1296
    }
    else if (enemy_defence - 6 == own_strength) {
        factor = 223/648
    }
    else if (enemy_defence - 5 == own_strength) {
        factor = 223/432
    }
    else if (enemy_defence - 4 == own_strength) {
        factor = 7/36
    }
    else if (enemy_defence - 3 == own_strength) {
        factor = 7/36
    }
    else if (enemy_defence - 2 == own_strength) {
        factor = 7/18
    }
    else if (enemy_defence - 1 == own_strength) {
        factor = 7/18
    }
    else if (enemy_defence - 0 == own_strength) {
        factor = 7/12
    }
    else if (enemy_defence + 1 == own_strength) {
        factor = 7/12
    }
    else if (enemy_defence + 2 == own_strength) {
        factor = 7/9
    }
    else {
        factor = 7/9
    }
    return factor
}


// normal wound chart comes last because this is used when all other special scenarios
// are not used. So when all special abilities are false then normal calculator is used.
function normal_wound_chart() {
    let factor = 1
    if (enemy_defence - 8 >= own_strength) {
        factor = 0
    }
    else if (enemy_defence - 7 == own_strength) {
        factor = 1/36
    }
    else if (enemy_defence - 6 == own_strength) {
        factor = 1/18
    }
    else if (enemy_defence - 5 == own_strength) {
        factor = 1/12
    }
    else if (enemy_defence - 4 == own_strength) {
        factor = 1/6
    }
    else if (enemy_defence - 3 == own_strength) {
        factor = 1/6
    }
    else if (enemy_defence - 2 == own_strength) {
        factor = 1/3
    }
    else if (enemy_defence - 1 == own_strength) {
        factor = 1/3
    }
    else if (enemy_defence - 0 == own_strength) {
        factor = 1/2
    }
    else if (enemy_defence + 1 == own_strength) {
        factor = 1/2
    }
    else if (enemy_defence + 2 == own_strength) {
        factor = 2/3
    }
    else {
        factor = 2/3
    }
    return factor
}