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
        factor = 5/6
    }
    else {
        factor = 5/6
    }
    return factor
}



// two_handed_reroll_one_chart is quite complicated but it can be used if someone has 2h-sword 
// and uses feint. for example: normally with 1h sword you would need 6 and 6 to wound, but 
// now u would need only 5 and 5 two wound due to having 2h sword, and also
// you can now reroll either/both dice if u get 1. So if u roll 6 and 1, u can reroll that 1. 
// if  you get 1 and 6, u can reroll that 1.
// so, how to calculate situation where u would normally need 6 and 6 and now u need 5 and 5 
// but you can reroll ones? That calculation would go next:
// (56 and 56 or 1 56 and 56 or 1 56 and 1 56 or 56 and 1 56)
// 1/3 * 1/3 + 1/6 * 1/3 * 1/3 + 1/6 * 1/3 * 1/6 * 1/3 + 1/3 * 1/6 * 1/3 
// other example: need normally 6/5, now 5/4:
// 1/3 * 1/2 + 1/6 * 1/3 * 1/2 + 1/6 * 1/3 * 1/6 * 1/2 + 1/3 * 1/6 * 1/2 
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
        factor = 35/36
    }
    else {
        factor = 35/36
    }
    return factor
}


// two handed reroll all chart
// same idea as two handed weapon reroll ones
// difference just is, all failed dice rolls are considered
// e.g u str4 vs def7... u need 5+ with 2h weapon
// would be calculated
// (56 or 1234 56)
// 1/3 + 2/3 * 1/3
// other example, need wound chart says 6/6, so now u need 5+/5+ with 2h weapon would go next:
// (56 and 56 or 1234 56 and 56 or 1234 56 and 1234 56 or 56 and 1234 56)
// 1/3 * 1/3 + 2/3 * 1/3 * 1/3 + 2/3 * 1/3 * 2/3 * 1/3 + 1/3 * 2/3 * 1/3
// third example, 6/5 would now be 5/4, which would be calculated next:
// 56 and 456 or 1234 56 and 456 or 1234 56 and 123 456 or 56 and 123 456
// 1/3 * 1/2 + 2/3 * 1/3 * 1/2 + 2/3 * 1/3 * 1/2 * 1/2 + 1/3 * 1/2 * 1/2
// fourth example, 6/4 would now be 5/3, which would be calculated next:
// 56 and 3456 or 1234 56 and 3456 or 1234 56 and 12 3456 or 56 and 12 3456
// 1/3 * 2/3 + 2/3 * 1/3 * 2/3 + 2/3 * 1/3 * 1/3 * 2/3 + 1/3 * 1/3 * 2/3
function two_handed_reroll_all_wound_chart() {
    let factor = 1
    if (enemy_defence - 8 >= own_strength) {
        factor = 0
    }
    else if (enemy_defence - 7 == own_strength) {
        factor = 25/81
    }
    else if (enemy_defence - 6 == own_strength) {
        factor = 5/12
    }
    else if (enemy_defence - 5 == own_strength) {
        factor = 40/81
    }
    else if (enemy_defence - 4 == own_strength) {
        factor = 5/9
    }
    else if (enemy_defence - 3 == own_strength) {
        factor = 5/9
    }
    else if (enemy_defence - 2 == own_strength) {
        factor = 3/4
    }
    else if (enemy_defence - 1 == own_strength) {
        factor = 3/4
    }
    else if (enemy_defence - 0 == own_strength) {
        factor = 8/9
    }
    else if (enemy_defence + 1 == own_strength) {
        factor = 8/9
    }
    else if (enemy_defence + 2 == own_strength) {
        factor = 35/36
    }
    else {
        factor = 35/36
    }
    return factor
}


//reroll one wound chart
// for example if u would need normally 6 and 6, now u calculate that scenario next:
// (6 and 6 or 6 and 1 6 or 1 6 and 1 6 or 1 6 and 6)
// = 1/6 * 1/6 + 1/6 * 1/6 * 1/6 + 1/6 * 1/6 * 1/6 * 1/6 + 1/6 * 1/6 * 1/6
// other example is u try to get 6/4
// (6 and 456 or 1 6 and 456 or 1 6 and 1 456 or 6 and 1 456)
// 1/6 * 1/2 + 1/6 * 1/6 * 1/2 + 1/6 * 1/6 * 1/6 * 1/2 + 1/6 * 1/6 * 1/2
// last example is try to get 3
// 3456 or 1 3456
function one_handed_reroll_one_wound_chart() {
    let factor = 1
    if (enemy_defence - 8 >= own_strength) {
        factor = 0
    }
    else if (enemy_defence - 7 == own_strength) {
        factor = 49/1296
    }
    else if (enemy_defence - 6 == own_strength) {
        factor = 49/648
    }
    else if (enemy_defence - 5 == own_strength) {
        factor = 49/432
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



// reroll_all wound chart
// note that these probabilities are calculated with wolfram alpha to know probability per step in the wound chart
// for example if you need 6 and 6 to wound. Normally that is 1/36. But now u can reroll fails.
// so if u roll 12345 or first 6 and then 12345, u can reroll these situations. And after reroll probability is normal 1/36.
// also if u roll 6 and 6 then u dont reroll. So the overall probability to cause wounds for 6 and 6 situation would be: 
// (5/6) * (1/36) + (1/6) * (5/6) * (1/36) + (1/36) = 71/1296. And so on, each condition requires a bit similar calculation of probability.
function one_handed_reroll_all_wound_chart() {
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



// normal wound chart 
// comes last because this is used when all other special scenarios are not used.
// When all special abilities are false then normal calculator is used.
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