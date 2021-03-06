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
    numbersInfectedDuringTransport: 0,
    numbersInfectedDuringLunch: 0,
    numbersInfectedAtWork: 0,
    internationalAverageAmountOfPeoplePerHome: 2.4,
    fatalityRate: 3.4
}

let originalTransportationModeChoice = 'public';

/* styles */
const divWrapper = `display: flex; align-items: center; justify-content: center; position: absolute;`;
const fontColorWhite = `color: white;`
const titleStyle = `position: absolute; color: white; top: 20px;`;

/* the level flow: uncomment as needed */
// preLevel1();
// createLevel1(10); // change the argument amountOfPeople
// preLevel2();
// createLevel2('public'); // change the modeOfTransport
// createLevel3();
// createLevel4();
// createLevel5();
// createLevel6('public');
// createFinalScreen();

// todo undo
preLevel1();
function preLevel1() {
    $('body').append(`<div class="wrapper level-element" style="${divWrapper}"></div>`);
    $('.wrapper').append(`<p style="${fontColorWhite}">Play the Covid-19 game!</p>`)
    $('.wrapper').append(`<h2 id="numberOfPeopleText" style="${fontColorWhite}">I live with 6 people</h2>`);
    $('.wrapper').append(`<p style="${fontColorWhite} font-size: 0.7em;">Select below</p>`);
    $('.wrapper').append(`<input type="range" id="numberOfPeople" min="0" max="11" style="margin-bottom: 2em;" />`);
    $('.wrapper').append(`<input type="submit" id="begin" class="btn" style="width: 100vw;" value="Begin">`);
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

    originalTransportationModeChoice = transportationMode;
    
    if (transportationMode === 'public') {
        $(".wrapper").append(`<p class='level-title level-element' style="${titleStyle} font-size: 0.7em;">
                                Avoid the public [squares]</p>`);
    }
    
    const isGoingHome = false;
    setUpCommute(transportationMode, isGoingHome);
}

function createLevel3() {
    const workTasks = 6;
    const isSecondPartOfDay = false;
    setUpSlingshot(workTasks, isSecondPartOfDay);
}

function createLevel4() {
    // todo lunch:
    setUpFinishLevel(createLevel5);
}

function createLevel5() {
    const workTasks = 2;
    const isSecondPartOfDay = true;
    setUpSlingshot(workTasks, isSecondPartOfDay);
}

function createLevel6() {
    const isGoingHome = true;
    $('body').append(`<div class="wrapper level-element" style="${divWrapper}"></div>`);
    $(".wrapper").append(`<h2 class='level-title level-element' style="${titleStyle}">← Get back home</h2>`);

    setUpCommute(originalTransportationModeChoice, isGoingHome);
}

function createFinalScreen() {
    $('body').append(`<div class="wrapper level-element"></div>`);
    const numberOfPeopleInfected = Math.round(infectedStats.numbersInfectedAtHome
                                + infectedStats.numbersInfectedDuringTransport * infectedStats.internationalAverageAmountOfPeoplePerHome 
                                + infectedStats.numbersInfectedAtWork * infectedStats.internationalAverageAmountOfPeoplePerHome); 
    const numberOfPeopleKilled = Math.round(numberOfPeopleInfected * infectedStats.fatalityRate / 100);
                                
    $('.wrapper').append(`<h2 id="numberOfPeopleText" style="${fontColorWhite}">
                                Congrats! You killed ${numberOfPeopleKilled} people.</h2>`);
    $('.wrapper').append(`<p class="text stats">Infected at home</p>`);
    $('.wrapper').append(`<p class="stats number">${infectedStats.numbersInfectedAtHome}</p>`);

    $('.wrapper').append(`<p class="text stats">Infected during transport</p>`);
    const internationalAverageOfPeoplePerHomeLink =`
            <p class="text stats">X international average amount of people per household [${infectedStats.internationalAverageAmountOfPeoplePerHome}] 
            <a href="https://en.wikipedia.org/wiki/List_of_countries_by_number_of_households">1</a></p>`
    $('.wrapper').append(internationalAverageOfPeoplePerHomeLink);
    $('.wrapper').append(`<p class="stats number">
            ${Math.round(infectedStats.numbersInfectedDuringTransport * infectedStats.internationalAverageAmountOfPeoplePerHome)}</p>`);

    $('.wrapper').append(`<p class="text stats">Infected at work</p>`);
    $('.wrapper').append(`<p class="stats number">
            ${Math.round(infectedStats.numbersInfectedAtWork * infectedStats.internationalAverageAmountOfPeoplePerHome)}</p>`);

    $('.wrapper').append(`<hr style="width: 40vw;">`);

    $('.wrapper').append(`<p class="text stats">Total infected</p>`);
    $('.wrapper').append(`<p class="stats number">${numberOfPeopleInfected}</p>`);

    const fatalityRateLink = `<a href="https://www.who.int/dg/speeches/detail/who-director-general-s-opening-remarks-at-the-media-briefing-on-covid-19---3-march-2020">1</a>`;
    $('.wrapper').append(`<p class="text stats">Estimated fatality rate ca. ${infectedStats.fatalityRate}% ${fatalityRateLink}</p>`);


    
    $('.wrapper').append(`<p class="small-text" style="${fontColorWhite}">
            This is based on pure guesstimation. Listen to the experts - not this silly game.</p>`);
    $('.wrapper').append(`<input id="again" class="btn" type="submit" value="Do it again">`);
    $('#again').click((event) => {
        $('.level-element').remove();
        preLevel1();
    });
}

// when a player can continue on to the next level an event handler is created 
// to let them continue at their own descretion
let isShowingDoneButton = false;
function setUpFinishLevel(startNextLevel) {
    if (!isShowingDoneButton) {
        isShowingDoneButton = true;
        $('body').append(`<div class="wrapper-right level-element"></div>`);
        $('.wrapper-right').append(`<input type="button" class="done-btn btn level-element" value="Next?" />`);
        $('.done-btn').click(() => {
            $('canvas').remove();
            $('.level-element').remove();
            isShowingDoneButton = false;
            startNextLevel();
        });
    }
}

