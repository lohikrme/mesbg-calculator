

// initiate values in website
document.getElementById("courage-slider").value = 4
document.getElementById("will-points-slider").value = 0

// these are the basic variables needed for the calculation
var own_courage_base_value = 4
var ancient_evil_is_on = false
var war_horn_is_on = false
var channelled_terrifying_aura_is_on = false
var own_courage = 4
var will_points = 0

// activate make sure all values are instantly updated to the website at init
change_courage()
change_will_points()
launch_calculator()


// this function receives data from the will-points slider
function change_will_points() {
    will_points = parseInt(document.getElementById("will-points-slider").value)
    document.getElementById("text-will-points-slider").innerHTML = `Will points used: ${will_points}`
}


// this function receives data from the courage-slider
function change_courage() {
    own_courage_base_value = parseInt(document.getElementById("courage-slider").value)
    document.getElementById("text-courage-slider").innerHTML = `Base-Courage: ${parseInt(own_courage_base_value)}`
}

// this function receives data from "ancient evil" button and changes color to green
// note that this function also instantly updates the own_courage_base_value variable and console-logs it
function ancient_evil_button_click() {
    if (ancient_evil_is_on == true) {
        document.getElementById("ancient-evil-button").style.backgroundColor = `white`
        ancient_evil_is_on = false
    }
    else if (ancient_evil_is_on == false) {
        document.getElementById("ancient-evil-button").style.backgroundColor = `green`
        ancient_evil_is_on = true
    }
}

// this function receives data from "war horn" button and changes the button's color to green
// note that this function also instantly updates the own_courage_base_value variable and console-logs it
function war_horn_button_click() {
    if (war_horn_is_on == true) {
        document.getElementById("war-horn-button").style.backgroundColor = `white`
        war_horn_is_on = false
    }
    else if (war_horn_is_on == false) {
        document.getElementById("war-horn-button").style.backgroundColor = `green`
        war_horn_is_on = true
    }
}

// this function receives data from "channelled-terrifying-aura" button and changes the button's color to green
// note that channeled terrifying aura requires an opponent to roll 3 dice and use 2 worst values to pass the test
function channelled_terrifying_aura_button_click() {
    if (channelled_terrifying_aura_is_on == true) {
        document.getElementById("channelled-terrifying-aura-button").style.backgroundColor = `white`
        channelled_terrifying_aura_is_on = false
    }
    else if (channelled_terrifying_aura_is_on == false) {
        document.getElementById("channelled-terrifying-aura-button").style.backgroundColor = `green`
        channelled_terrifying_aura_is_on = true
    }
}

// this function first calculates the real courage by combining all bonuses + the base courage. 
// after that this function launches a suitable calculator depending whether trying to charge against the magical enemy or not
function launch_calculator() {
    // previous functions did update values
    // so now we know int and boolean values and calculate own courage
    var addition_to_base_courage = 0
    addition_to_base_courage += will_points
    if (ancient_evil_is_on) {
        addition_to_base_courage -= 1
    }
    if (war_horn_is_on) {
        addition_to_base_courage += 1
    }
    own_courage = own_courage_base_value + addition_to_base_courage
    console.log(`Own courage base value: ${own_courage_base_value}`)
    console.log(`Own courage: ${own_courage}`)
    console.log(`Ancient Evil is on: ${ancient_evil_is_on}`)
    console.log(`War horn is on: ${war_horn_is_on}`)
    console.log(`Channelled Terrifying Aura is on: ${channelled_terrifying_aura_is_on}`)
    if (channelled_terrifying_aura_is_on == false) {
        normal_calculator()
    }
    else if (channelled_terrifying_aura_is_on == true) {
        channelled_calculator()
    }
}

// this calculator is for situations when one needs to pass a normal courage test, applies to most situations
function normal_calculator() {
    let passes = 0
    for (i = 1; i <= 6; i++) {
        for (j = 1; j <= 6; j++) {
            if (i + j + own_courage >= 10) {
                passes += 1
            }
        }
    }
    answer = passes / 36
    console.log(`The probability to pass the courage test is: ${parseFloat(answer * 100).toFixed(2)}%`)
    document.getElementById("answer").innerHTML = `The probability to pass the courage test is: ${parseFloat(answer * 100).toFixed(2)}%`
}


// this function is used only when charging an enemy with a "channelled_terrifying_aura" on.
// in channelled terrifying aura u roll 3 dices and drop the highest score out
function channelled_calculator() {
    let passes = 0
    var summa = 0
    for (i = 1; i <= 6; i++) {
        for (j = 1; j <= 6; j++) {
            for (k = 1; k <= 6; k++) {
                let lista = [i, j, k]
                lista.sort()
                lista.pop()
                summa = lista[0] + lista[1]
                if (summa + own_courage >= 10) {
                    passes += 1
                }
            }
        }
    }
    answer = passes / 216
    console.log(`The probability to pass the courage test is: ${parseFloat(answer * 100).toFixed(2)}%`)
    document.getElementById("answer").innerHTML = `The probability to pass the courage test is: ${parseFloat(answer * 100).toFixed(2)}%`
}

