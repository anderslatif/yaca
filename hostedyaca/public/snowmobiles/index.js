(function() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const canvasWidth = canvas.width = window.innerWidth;
    const canvasHeight = canvas.height = window.innerHeight;

    document.fonts.load('70px under-the-snow-regular').then(draw); 

    let speed = 2;
    let game = false;

    let score = 0;
    function updateScore(updatedScore) {
        score += updatedScore;
        score = score < 0 ? 0 : score;
        if (game === 'level1' && score >= 10) {
            game = 'level2';
            speed = 4;
        }
        if (score < 10 && game === 'level2') {
            game = 'level1';
            speed = 2;
        }
        // play sound effect
        if (updatedScore > 0 && !isMuted) {
            soundEffect.play("" + getRandomInt(0, 9));
        }
    }

    let sound;
    let soundState;
    let currentCrescendo = 1;
    let niceSound;
    let isMuted = false;

    // sprites
    const spriteSheet = new Image();
    spriteSheet.src = "./assets/sprites/snowmobiles.png";

    // snowmobile
    const snowmobileOne = new Snowmobile(context, canvasWidth, canvasHeight, spriteSheet, 'joepera');
    const snowmobileTwo = new Snowmobile(context, canvasWidth, canvasHeight, spriteSheet, 'jofirestone');

    // obstacles
    let obstacles = [];
    const mound = new Mound(context, canvasWidth, canvasHeight);
    const rock = new Rock(context, canvasWidth, canvasHeight, spriteSheet);
    const meatball = new Meatball(context, canvasWidth, canvasHeight, spriteSheet);
    const barn = new Barn(context, canvasWidth, canvasHeight, spriteSheet);
    // obstacle handler
    const obstacleTypes = { snowmobileOne, snowmobileTwo, mound, rock, barn, meatball };
    const obstacleHandler = new ObstacleHandler(context, canvasWidth, canvasHeight, obstacleTypes, game, updateScore);

    // draw handler
    const volumeIconPlacement = {
        x: canvasWidth-100,
        y: 25,
        w: 40,
        h: 40
    };
    const moveKeysImage = new Image();
    moveKeysImage.src = "./assets/sprites/move_keys.png";
    const images = { spriteSheet, moveKeysImage };
    const obstaclesToDraw = { mound, rock, meatball, barn }
    const drawer = new Drawer(context, canvasWidth, canvasHeight, volumeIconPlacement, images, obstaclesToDraw);

    function draw(time) {

        if (!game) {
            context.clearRect(0, 0, canvasWidth, canvasHeight);
            drawer.drawIntroScreen();
        } else {
            // background
            context.fillStyle = "#EDEDED";
            context.fillRect(0, 0, canvas.width, canvas.height);
        }

        drawer.drawScorePaneWithVolume(score, isMuted);

        snowmobileOne.draw();
        snowmobileOne.updatePosition();

        if (game === 'level2') {
            snowmobileTwo.draw();
            snowmobileTwo.updatePosition();
        }


        // update obstacle positions and filter 
        obstacles = obstacles.filter(obstacle => {
            const updatedObstacle = obstacleHandler.update(obstacle, speed, game, snowmobileOne, snowmobileTwo);
            
            if (updatedObstacle.y < canvasHeight && !updatedObstacle.remove) {
                return updatedObstacle;
            }
        });

        // todo handle score and game level + sound logic

        window.requestAnimationFrame(draw);
    }

    function handleKey(event){
        const key = event.key;  
        const keycode = event.keyCode;

        if (key === "ArrowLeft" && snowmobileOne.direction > -2) {
            snowmobileOne.direction--;
            snowmobileOne.spriteX -= 200;
        } else if (key === "ArrowRight" && snowmobileOne.direction < 2) {
            snowmobileOne.direction++;
            snowmobileOne.spriteX += 200;
        }  else if (key === 'ArrowUp' && canvasHeight - snowmobileOne.snowmobileY < canvasHeight-40) {
            snowmobileOne.snowmobileY -= 10;
        } else if (key === 'ArrowDown' && canvasHeight - snowmobileOne.snowmobileY > 220) {
            snowmobileOne.snowmobileY += 10;                
        }

        if (game === 'level2') {
            if ((key === 'a' || key === 'A') && snowmobileTwo.direction > -2) {
                snowmobileTwo.direction--;
                snowmobileTwo.spriteX -= 200;
            } else if ((key === 'd' || key === 'D') && snowmobileTwo.direction < 2) {
                snowmobileTwo.direction++;
                snowmobileTwo.spriteX += 200;
            } else if ((key === 'w' || key === 'W') && canvasHeight - snowmobileTwo.snowmobileY < canvasHeight-40) {
                snowmobileTwo.snowmobileY -= 10;
            } else if ((key === 'd' || key === 'D') && canvasHeight - snowmobileTwo.snowmobileY > 220) {
                snowmobileTwo.snowmobileY += 10;                
            }
        }

        if (!game && key === "ArrowLeft" || key === "ArrowRight" || key === "ArrowUp" || key === "ArrowDown") {
            startGame();
        }
    }

    canvas.addEventListener('click', checkVolumeClicked, false);

    function checkVolumeClicked(event) {
        var p = getMousePos(event);

        if (p.x >= volumeIconPlacement.x - 40 && p.x <= volumeIconPlacement.x + volumeIconPlacement.w &&
            p.y >= volumeIconPlacement.y - 40 && p.y <= volumeIconPlacement.y + volumeIconPlacement.h) {
                isMuted = !isMuted;
                if (isMuted) {
                    sound.stop();
                } else {
                    sound.play("intro");
                }
        }
    }

    function getMousePos(event) {
        var r = canvas.getBoundingClientRect();
        return {
            x: event.clientX - r.left,
            y: event.clientY - r.top
        };
    }



    function createObstacle() {
        const obstacleChoice = Math.random();
        
        if (obstacleChoice < 0.20) {
            obstacles.push(rock.create());
        } else if (obstacleChoice < 0.35) {
            obstacles.push(barn.create());
        } else if (obstacleChoice < 0.45) {
            obstacles.push(meatball.createMeatball());
        } else {
            obstacles.push(mound.create());
        }
    }

    let testSoundStates = ["crescendo1", "crescendo1", "crescendo1"]
    let testSoundStateCounter = 0;

    let soundEffect;

    function startGame() {
        if (!game) {
            game = 'level1';
            obstacleInterval = setInterval(createObstacle, 800);
            if (!isMuted) {
                soundEffect = new Howl({
                    src: ["./assets/sounds/nice.ogg"],
                    volume: 0.1,
                    sprite: {
                        1: [0000, 800], 
                        2: [1000, 800],
                        3: [2000, 800],
                        4: [3000, 800],
                        5: [4000, 1500],
                        // just to make it more likely that this sound gets used
                        6: [2000, 800],
                        7: [2000, 800],
                        8: [2000, 800],
                        9: [0000, 800], 
                    }
                });
            
                 sound = new Howl({
                    src: ["./assets/sounds/Snowmobiles.ogg"],
                    sprite: {
                        intro: [00020, 11242], 
                        crescendo1: [11242, 11700], // ends: 23000 miliseconds
                        crescendo2: [23000, 11300], // ends: 34225 miliseconds
                        crescendo3: [34225, 11200], // ends: 45566 miliseconds
                        // end: [45566, 50340]
                    }
                });
                sound.play("intro");

                sound.on('end', () => {
                    if (score < 10) {
                        sound.play("intro");
                    } else {
                        sound.play("crescendo" + currentCrescendo);
                        currentCrescendo++;
                        if (currentCrescendo > 2) {
                            currentCrescendo = 1;
                        }
                    }
                   sound.play(soundState);
                   // todo check if over 10, 20 or 30 and play accordingly 
                   // also wrap it all in is muted.. check if neccessary
                });
            }
        } 
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function stopGame() {
        clearInterval(obstacleInterval);
        // sound.stop();
    }

    document.addEventListener('keydown',  handleKey);

})();