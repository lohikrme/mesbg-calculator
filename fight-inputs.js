// this inputs.js file receives inputs from html and then sends
// the inputs to calculator.js file

// activate the functions instantly so that the website looks proper immediately
slider_A_dice_change_click()
slider_A_fight_change_click()
slider_B_dice_change_click()
slider_B_fight_change_click()

// these are variables to be used inside calculator.js file, but elven_sword also affects color of buttons
var A_dice_amount = 6
var A_fight = 6
var A_elven_sword_is_on = false

var B_dice_amount = 6
var B_fight = 6
var B_elven_sword_is_on = false


// function for opponent A dice amount
function slider_A_dice_change_click() {
    function slider_A_dice_change() {
        let value = document.getElementById("slider-A-dice").value
        document.getElementById("text-A-dice").innerHTML = `Dice-Amount: ${value}`
        return parseInt(value)
    }
    A_dice_amount = slider_A_dice_change()
}


// function for opponent A fight value
function slider_A_fight_change_click() {
    function slider_A_fight_change() {
        let value = document.getElementById("slider-A-fight").value
        document.getElementById("text-A-fight").innerHTML = `Fight-Value: ${value}`
        return parseInt(value)
    }
    A_fight = slider_A_fight_change()
}


// function for clicking opponent A elven sword
function button_A_elven_sword_click() {
    function button_A_elven_sword() {
        if (A_elven_sword_is_on == true) {
            document.getElementById("button-A-elven-sword").style.backgroundColor = 'white'
            return false
        }
        else if (A_elven_sword_is_on == false) {
            document.getElementById("button-A-elven-sword").style.backgroundColor = 'green'
            return true
        }
    }
    A_elven_sword_is_on = button_A_elven_sword()
}



// function for clicking opponent B dice amount
function slider_B_dice_change_click() {
    function slider_B_dice_change() {
        let value = document.getElementById("slider-B-dice").value
        document.getElementById("text-B-dice").innerHTML = `Dice-Amount: ${value}`
        return parseInt(value)
    }
    B_dice_amount = slider_B_dice_change()
}


// function for opponent B fight value
function slider_B_fight_change_click() {
    function slider_B_fight_change() {
        let value = document.getElementById("slider-B-fight").value
        document.getElementById("text-B-fight").innerHTML = `Fight-Value: ${value}`
        return parseInt(value)
    }
    B_fight = slider_B_fight_change()
}


// function for opponent B elven sword
function button_B_elven_sword_click() {
    function button_B_elven_sword() {
        if (B_elven_sword_is_on == true) {
            document.getElementById("button-B-elven-sword").style.backgroundColor = 'white'
            return false
        }
        else if (B_elven_sword_is_on == false) {
            document.getElementById("button-B-elven-sword").style.backgroundColor = 'green'
            return true
        }
    }
    B_elven_sword_is_on = button_B_elven_sword()
}


// function to test if inputs work, also button with id="test" is currently marked as a comment
function console_logger() {
    console.log(`A-dice: ${A_dice_amount}`)
    console.log(`A-fight: ${A_fight}`)
    console.log(`A-elven-sword: ${A_elven_sword_is_on}`)
    console.log(`B-dice: ${B_dice_amount}`)
    console.log(`B-fight: ${B_fight}`)
    console.log(`B-elven-sword: ${B_elven_sword_is_on}`)
}


