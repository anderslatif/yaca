const wWidth = window.innerWidth;
const wHeight = window.innerHeight;

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

let numbersInfected = 0;

/* styles */
const divWrapper = `display: flex; align-items: center; justify-content: center`;
const fontColorWhite = `color: white;`


preLevel2();
function preLevel1() {
    $('body').append(`<div class="text-wrapper level-element" style="${divWrapper}"></div>`);
    $('.text-wrapper').append(`<h2 id="numberOfPeopleText" style="${fontColorWhite}">I live with 6 people</h2>`);
    $('.text-wrapper').append(`<input type="range" id="numberOfPeople" min="0" max="11" />`);
    $('.text-wrapper').append(`<input id="begin" type="submit" value="Begin">`);
    let amountOfPeople = $(event.currentTarget).val(); 
    $('#numberOfPeople').on('change', (event) => {
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
        createLevel1(amountOfPeople);
    });
}

function createLevel1(amountOfPeople) {

}

function preLevel2() {
    $('body').append(`<div class="text-wrapper level-element"></div>`);
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
    
}

