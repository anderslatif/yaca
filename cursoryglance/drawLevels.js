// overall idea is that you get x amount of lives (let's say 10) and a timer (let's say 20 seconds)
// you click your way through the building and as you go through the levels
// once the timer hits zero you are back to the ground level but this time you know where to click
// while you play the other replays are playing along as greyed-out cursors
// reach the treasure to complete the heist


function createLevel1() {
    // create the datastructure of what to draw
    // create an array for the click to proceed boundary logic (randomize if necessary here)
    // for instance in level 1 it would be which door to click to proceed to the next level
}

function drawLevel1() {
    // todo create the doors etc. with sprites to give the game personality
    ctx.fillRect(gridWidth * 3, gridHeight, 80, 100);
    ctx.fillRect(gridWidth * 5, gridHeight, 80, 100);
}