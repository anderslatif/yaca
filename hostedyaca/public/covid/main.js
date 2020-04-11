const wWidth = window.innerWidth;
const wHeight = window.innerHeight;
const column = wWidth/12;
const row = wHeight/12;

// module aliases
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Composite = Matter.Composite;
const Composites = Matter.Composites;
const Constraint = Matter.Constraint;
const Events = Matter.Events;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;

// create an engine
let engine;

// create a renderer
let render;

let infectedStats = {
    numbersInfectedAtHome: 0,
    numbersInfectedDuringTransports: 0,
    numbersInfectedAtWork: 0,
    internationalAverageAmountOfPeoplePerHome: 3 
}

let currentLevel;

/* styles */
const divWrapper = `display: flex; align-items: center; justify-content: center; position: absolute;`;
const fontColorWhite = `color: white;`
const titleStyle = `position: absolute; color: white; top: 20px;`;

/* the level flow: uncomment as needed */
// preLevel1();
// createLevel1(2); // change the argument 
// preLevel2();
// createLevel2('public'); // change the modeOfTransport
createLevel3();
// createFinalScreen();

// todo undo
// preLevel1();
function preLevel1() {
    $('body').append(`<div class="wrapper level-element" style="${divWrapper}"></div>`);
    $('.wrapper').append(`<p style="${fontColorWhite}">Play the Covid-19 game!</p>`)
    $('.wrapper').append(`<h2 id="numberOfPeopleText" style="${fontColorWhite}">I live with 6 people</h2>`);
    $('.wrapper').append(`<p style="${fontColorWhite} font-size: 0.7em;">Select below</p>`);
    $('.wrapper').append(`<input type="range" id="numberOfPeople" min="0" max="11" style="margin-bottom: 2em;" />`);
    $('.wrapper').append(`<input id="begin" class="btn" type="submit" value="Begin">`);
    let amountOfPeople = $('#numberOfPeople').val(); 
    $('#numberOfPeople').on('change', (event) => {
        amountOfPeople = $('#numberOfPeople').val();
        if (amountOfPeople == 0) {
            $('#numberOfPeopleText').text("I live alone");
        } else if (amountOfPeople == 1) {
            $('#numberOfPeopleText').text("I live with 1 person");
        } else if (amountOfPeople == 11) {
            $('#numberOfPeopleText').text(`I live with ${amountOfPeople-1} people`);
            $('#numberOfPeopleText').append(`<p style="${fontColorWhite} font-size: 0.5em;">
                                You can't live with more than 10 people because of the restrictions</p>`);
        } else {
            $('#numberOfPeopleText').text(`I live with ${amountOfPeople} people`);
        }
    });
    $('#begin').click((event) => {
        $('.level-element').remove();
        // add one to include oneself in the household
        createLevel1(Number(amountOfPeople) + 1);
    });
}

function createLevel1(amountOfPeople) {
    setUpNewtonsCradle(amountOfPeople || infectedStats.internationalAverageAmountOfPeoplePerHome);
}

function preLevel2() {
    $('body').append(`<div class="wrapper level-element"></div>`);
    $('.wrapper').append(`<h2 id="numberOfPeopleText" style="${fontColorWhite}">How do you commute to work?</h2>`);
    $('.wrapper').append(`<p style="${fontColorWhite}">I care about the environment</p>`);
    $('.wrapper').append(`<input id="public-transport" class="btn" type="submit" value="Public transportation">`);
    $('.wrapper').append(`<p style="${fontColorWhite}">I don't care about the environment</p>`);
    $('.wrapper').append(`<input type="submit" id="car" class="btn" value="By car">`);
    $('#public-transport').click((event) => {
        $('.level-element').remove();
        createLevel2('public');
    });
    $('#car').click((event) => {
        $('.level-element').remove();
        createLevel2('car');
    });
}

function createLevel2(transportationMode) {
    $('body').append(`<div class="wrapper level-element" style="${divWrapper}"></div>`);
    $(".wrapper").append(`<h2 class='level-title level-element' style="${titleStyle}">Commute to work  ⍇ ⍐⍗ ⍈</h2>`);

    if (transportationMode === 'public') {
        $(".wrapper").append(`<p class='level-title level-element' style="${titleStyle} font-size: 0.6em">Avoid the public</p>`);
    }
    
    setUpCommute(transportationMode);
}

function createLevel3() {
    const workTasks = 5;

    setUpSlingshot(workTasks);
}

function createFinalScreen() {
    $('body').append(`<div class="wrapper level-element"></div>`);
    const numberOfPeopleKilled = infectedStats.numbersInfectedAtHome + 0 
                                + infectedStats.numbersInfectedDuringTransports * 2 * infectedStats.internationalAverageAmountOfPeoplePerHome 
                                + infectedStats.numbersInfectedAtWork * infectedStats.internationalAverageAmountOfPeoplePerHome; 
    $('.wrapper').append(`<h2 id="numberOfPeopleText" style="${fontColorWhite}">
                                Congrats! You killed ${numberOfPeopleKilled} amount of people.</h2>`);
    // todo Show the calculation
    $('.wrapper').append(`<p class="small-text" style="${fontColorWhite}">
            This is based on pure guesstimation. Listen to the experts - not this silly game.</p>`);
    $('.wrapper').append(`<input id="again" class="btn" type="submit" value="Do it again">`);
    $('#again').click((event) => {
        $('.level-element').remove();
        preLevel1();
    });
}

function setUpFinishLevel(startNextLevel) {
    $('body').append(`<div class="wrapper-right level-element"></div>`);
    $('.wrapper-right').append(`<input type="button" class="done-btn btn level-element" value="Next Level?" />`);
    $('.done-btn').click(() => {
        $('canvas').remove();
        $('.level-element').remove();
        startNextLevel();
    });
}

