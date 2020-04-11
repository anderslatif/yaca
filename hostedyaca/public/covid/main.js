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
const titleStyle = `position: absolute; color: white; 
                    left: ${wWidth/3}px; top: 20px`;


/* the level flow: uncomment as needed */
// preLevel1();
createLevel1(2);
// preLevel2();
// createLevel2();
// createLevel3();
// createFinalScreen();

// todo undo
// preLevel1();
function preLevel1() {
    $('body').prepend(`<div class="text-wrapper level-element" style="${divWrapper}"></div>`);
    $('.text-wrapper').append(`<h2 id="numberOfPeopleText" style="${fontColorWhite}">I live with 6 people</h2>`);
    $('.text-wrapper').append(`<input type="range" id="numberOfPeople" min="0" max="11" />`);
    $('.text-wrapper').append(`<input id="begin" type="submit" value="Begin">`);
    let amountOfPeople = $('#numberOfPeople').val(); 
    $('#numberOfPeople').on('change', (event) => {
        amountOfPeople = $('#numberOfPeople').val();
        if (amountOfPeople == 0) {
            $('#numberOfPeopleText').text("I live alone");
        } else if (amountOfPeople == 1) {
            $('#numberOfPeopleText').text("I live with 1 person");
        } else if (amountOfPeople == 11) {
            $('#numberOfPeopleText').text(`I live with ${amountOfPeople-1} people`);
            $('#numberOfPeopleText').append(`<p style="${fontColorWhite}">
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
    $('body').prepend(`<div class="text-wrapper level-element"></div>`);
    $('.text-wrapper').append(`<h2 id="numberOfPeopleText" style="${fontColorWhite}">How do you commute to work?</h2>`);
    $('.text-wrapper').append(`<h3 style="${fontColorWhite}">I care about the environment</h3>`);
    $('.text-wrapper').append(`<input id="public-transport" type="submit" value="Public transportation">`);
    $('.text-wrapper').append(`<h3 style="${fontColorWhite}">I don't care about the environment</h3>`);
    $('.text-wrapper').append(`<input id="car" type="submit" value="By car">`);
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
    setUpCommute(transportationMode);
}

function createLevel3() {
    setUpSlingshot();
}

function createFinalScreen() {
    $('body').prepend(`<div class="text-wrapper level-element"></div>`);
    const numberOfPeopleKilled = infectedStats.numbersInfectedAtHome + 0 
                                + infectedStats.numbersInfectedDuringTransports * 2 * infectedStats.internationalAverageAmountOfPeoplePerHome 
                                + infectedStats.numbersInfectedAtWork * infectedStats.internationalAverageAmountOfPeoplePerHome; 
    $('.text-wrapper').append(`<h2 id="numberOfPeopleText" style="${fontColorWhite}">
                                Congrats! You killed ${numberOfPeopleKilled} amount of people.</h2>`);
    // todo Show the calculation
    $('.text-wrapper').append(`<input id="again" type="submit" value="Do it again">`);
    $('#again').click((event) => {
        $('.level-element').remove();
        preLevel1();
    });
}

function setUpFinishLevel(startNext) {
    console.log("once");
    $('body').prepend(`<div class="text-wrapper level-element" style="${divWrapper}"></div>`);
    $('.text-wrapper').append(`<input type="button" class="done-btn level-element" value="Done?" />`);
    $('.done-btn').click(() => {
        $('canvas').remove();
        $('.level-element').remove();
        startNext();
    });
}

