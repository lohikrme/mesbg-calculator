# MESBG Probability Calculator version 1.0.0

# Updated last time: 10/4/2023

# All rights reserved. For personal use only!


# THE MATHEMATICAL BACKGROUND OF THIS CALCULATOR AND INTRODUCTION TO DIFFERENT FUNCTIONS:
#---------------------------------------------------------------------------------------
# In MESBG miniature game winning battles is determined by dice. There are 2 different situations. 
# The more usual situation is when fight value (F) is different on both sides. The other situation is 
# where the fight value (F) is identical on both sides.



# skilled_vs_weak()
#---------------------------------------------------------------------------------------
# For situations where fight value is different on both sides, we have the function called "skilled_vs_weak()",
# which will first calculate the probability that the opponent with weaker F will win, and from that determine
# the probability that the opponent with higher F will win.

# So, how does this mathematics work? Let's take 2 orcs (F3) vs 1 dwarf warrior (F4). 
# The orcs would roll 2 dice and the dwarf would roll 1 dice, but if highest dice is equal. If orcs get higher single
# dice than dwarf, they win. For example 4,5 vs 2, and orcs win. But if dwarf gets equal or higher single dice than
# the orcs then the dwarf win. For example, the orcs get 5,5 and the dwarf gets 5, then the dwarf wins.

# Another example: The Balrog has 4 dice (F10) and fights 8 humans who have overall 8 dice (F3). So, 
# if the Balrog gets 1,1,1,6 and the humans get 6,6,6,6,6,6,6,6, then the Balrog wins due to having 
# a higher fight value. If Balrog gets 5,5,4,5 and Humans get 1,1,1,1,1,1,6,1, then the humans win. And so on.

# To calculate this situation where the Balrog has 4 dice and the humans have 8 dice, we need to run through
# all next variations: Humans win with: 
# 1x6, 2x6, 3x6, 4x6, 5x6, 6x6, 7x6, 8x6.
# 1x5, 2x5, 3x5, 4x5, 5x5, 6x5, 7x5, 8x5.
# 1x4, 2x4, 3x4, 4x4, 5x4, 6x4, 7x4, 8x4.
# 1x3, 2x3, 3x3, 4x3, 5x3, 6x3, 7x3, 8x3.
# 1x2, 2x2, 3x2, 4x2, 5x2, 6x2, 7x2, 8x2.

# All these must be calculated separately. So, here is an example what humans win 3x5 would look like:
# (1/6)^3*(4/6)^5*(8!/(3!5!)*(4/6)^4 = 0.006744
# Note that humans get 3x5 which is (1/6)^3, also they get 5x lower than 5 which is (4/6)^5, and 
# the different permutations for these dice rolls are (8!/(3!*5!)), while Balrog must get 
# under 5 so Balrog must get (4/6)^4. All these must be considered in every 40 rounds of this calculation.



# equal_vs_equal()
#---------------------------------------------------------------------------------------
# We already addressed the probability maths behind this game quite deeply, so for this function
# the guide will be shorter! Please refer back if something is unclear.
# So, in situations where both opponents have an equal fight value, we must calculate three aspects:
# Case A: Left gets higher single dice than right
# Case B: Right gets higher single dice than left
# Case C: Both left and right get similarly high single dice.

# In A, left wins. In B, right wins. In C, the victory is determined by a lottery.
# The lottery works basically next: 123, evil wins, 456, good wins, which means 1/2 chance to win for both.
# But if only another side has an elf sword, then the elf sword's side wins 3456 and the other side wins 12.
# So the chance would be 2/3 for the elf sword's side and 1/2 for the normal sword's side. 
# But in the very rare case that both sides have an elf sword, then it is again 123 evil 456 good = 1/2 chance for both.
# This is why this calculator needs not just the dice amount, but also a boolean about if either side
# has an elf sword.

# So, how to calculate this? Very easy after the first function. This time simply imagine that both enemies are
# "weaker opponent" in their fight value. So use the previous calculator and calculate with it to both directions. 
# And then the amount of probability that stays between these two directions is the stalemate. So after this,
# just make if statements to check out for elven blades in all variations and then
# distribute the stalemate probability as already discussed.



# THE PROGRAM BEGINS:
#---------------------------------------------------------------------------------------

# skilled_vs_weak() function returns 2 probabilities: (skilled_win, weak_win) = (higher fight value opponent wins, lower fight value opponent wins).
def skilled_vs_weak(skilled_dice: int, weak_dice: int) -> tuple:
    import math
    probability_per_round = 0
    weak_wins = 0
    skilled_wins = 0
    for winning_dice_minus1 in range(5,0,-1):
        for round_inside in range(1, weak_dice+1):
            probability_per_round = ((1/6)**round_inside*(winning_dice_minus1/6)**(weak_dice-round_inside))*((math.factorial(weak_dice))/(math.factorial(round_inside)*math.factorial(weak_dice-round_inside)))*(winning_dice_minus1/6)**skilled_dice
            weak_wins += probability_per_round
    skilled_wins = 1-weak_wins
    return skilled_wins, weak_wins



#---------------------------------------------------------------------------------------
# equal_vs_equal() function returns 2 probabilities: left side opponent wins, right side opponent wins.
def equal_vs_equal(left_dice: int, left_elven_sword: bool, right_dice: int, right_elven_sword: bool):
    left_opponent_wins = 0
    right_opponent_wins = 0

    left_opponent_wins = skilled_vs_weak(right_dice, left_dice)[1]
    right_opponent_wins = skilled_vs_weak(left_dice, right_dice)[1]

    stalemate = 1 - left_opponent_wins - right_opponent_wins

    if left_elven_sword == True and right_elven_sword == False:
        left_opponent_wins += stalemate*(2/3)
        right_opponent_wins += stalemate*(1/3)
        stalemate = 0
    elif left_elven_sword == False and right_elven_sword == True:
        right_opponent_wins += stalemate*(2/3)
        left_opponent_wins += stalemate*(1/3)
        stalemate = 0
    elif left_elven_sword == True and right_elven_sword == True:
        right_opponent_wins += stalemate*(1/2)
        left_opponent_wins += stalemate*(1/2)
        stalemate = 0
    elif left_elven_sword == False and right_elven_sword == False:
        right_opponent_wins += stalemate*(1/2)
        left_opponent_wins += stalemate*(1/2)
        stalemate = 0

    return left_opponent_wins, right_opponent_wins


def main():
    print(skilled_vs_weak(2,2))
    print(skilled_vs_weak(4,2))
    print(skilled_vs_weak(2,4))
    print(skilled_vs_weak(4,8))
    print(equal_vs_equal(2, False, 2, False))
    print(equal_vs_equal(2, False, 4, True))
    print(equal_vs_equal(2, True, 4, False))


main()

print(f"5v3 {skilled_vs_weak(6,6)}")
print(f"3v3 {equal_vs_equal(10, True,1, False)}")