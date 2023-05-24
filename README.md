Hello! This is my MESBG Probability Calculator version 1.0.4.

Last updated: 24th/May/2023

All rights reserved. For personal use only.

This calculator includes a web-based GUI, and a main site, a fight calculator,
a courage calculator, a damage calculator and a magic calculator. 

Example how to use this calculator - how to decide whether a war horn would be worth with a dragon?
Dragon has a base courage of 4, so by using calculator one knows that it has 72.22% chance to pass
a courage test without using will points. Warhorn increases to courage to 5, and equals to using 1 will point 
for each courage test, and increases the chance to 83.33%. With war horn and 1 will the chance goes up to 91.67%. From this kind of information one can start to think how likely a dragon is to stay on the battlefield -
it must after all take a courage test each time it receives a wound. Basically the probability that a dragon
with base courage 4 would stay on the battlefield without using any will for 7 wounds is very low:
0.7222^7 = about 5.34%. With warhorn it would be 0.8333^7 =  about 19.4%. So even with war horn it seems like a dragon must use a lot of will points to stay on the battlefield. This is important information. And can also help
deciding whether a dragon needs a tough hide - on defence 9 it will receive wounds less often. But
even with war horn the probability that dragon could use all 9 wounds of its tough hide is only:
0.8333^9 = about 4.5%. So tough hide in general should not be bought for wounds but for defence only.

This was just an example how to use the calculator. About some technical aspects yet.
Fight calculator and magic calculator both use a function called skilled_vs_weak(), because it allows to
run through every different situation when less skilled wins with 6's, 5's, 4's, 3's or 2's.
The details for the mathematical backgrounds can be found on the python file, which I actually made before
any other files here, and which I wanted to store to remind from where the project began. I admit the mathematical
functions may not be most easy to read and understand as an outsider, but I tried my best. 
Outside this skilled_vs_weak() function and equal_vs_equal() function, other mathematics are a lot more down
to earth. But there was still a lot work making sure that for example damage calculator allows only 
specific weapon combinations to be used at one time. I also decided to write down a data for the damage calculator,
because I wanted the wounding system to be clear. Fight calculator uses 2 js-files (fight-inputs and fight-calculator), other calculators use only 1 js file. Styles.css applies to every html file, but 
personalised modifications are done within a specific css-file.

Have fun calculating stuff!

-lohikrme
