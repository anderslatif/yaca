class ObstacleHandler {
    constructor(context, canvasWidth, canvasHeight, obstacleTypes, game, updateScore) {
        this.context = context;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        this.snowmobileOne = obstacleTypes.snowmobileOne;
        this.snowmobileTwo = obstacleTypes.snowmobileTwo;
        this.mound = obstacleTypes.mound;
        this.rock = obstacleTypes.rock;
        this.barn = obstacleTypes.barn;
        this.meatball = obstacleTypes.meatball;

        this.game = game;
        this.updateScore = updateScore;
    }

    update(obstacle, speed, game, snowmobileOne, snowmobileTwo) {
        obstacle.y = obstacle.y+speed;
        obstacle.height = obstacle.height;
        obstacle.width = obstacle.width;

        let didCollideWithObstacle;

        if (obstacle.type === 'mound') {
            this.mound.draw(obstacle.x, obstacle.y, obstacle.height, obstacle.width);

            if (!obstacle.didCollideWithObstacle) {
                didCollideWithObstacle = this.collisionWithObstacle(obstacle.x+20, obstacle.y, obstacle.width, obstacle.height, 
                                                                    snowmobileOne, snowmobileTwo, game);
                if (didCollideWithObstacle) {
                    this.updateScore(1);
                }
            }

        } else if (obstacle.type === 'rock') {
            this.rock.draw(obstacle.x, obstacle.y, obstacle.height, obstacle.width, obstacle.spriteX)

            if (!obstacle.didCollideWithObstacle) {
                didCollideWithObstacle = this.collisionWithObstacle(obstacle.x+20, obstacle.y, obstacle.width/3-20, obstacle.height/3+20, 
                                                                    snowmobileOne, snowmobileTwo, game);
                if (didCollideWithObstacle) {
                    this.updateScore(-5);
                }
            }

        } else if (obstacle.type === 'meatball') {
            this.meatball.draw(obstacle.x, obstacle.y, obstacle.height, obstacle.width);

            if (!obstacle.didCollideWithObstacle) {
                didCollideWithObstacle = this.collisionWithObstacle(obstacle.x+20, obstacle.y, obstacle.width/2-10, obstacle.height/2,
                                                                    snowmobileOne, snowmobileTwo, game);
                if (didCollideWithObstacle) {
                    obstacle.remove = true;
                    this.updateScore(2);
                }
            }
        
        } else if (obstacle.type.includes('barn')) {

            this.barn.draw(obstacle.x, obstacle.y, obstacle.height, obstacle.width, obstacle.spriteX);

            if (!obstacle.didCollideWithObstacle) {
                didCollideWithObstacle = this.collisionWithObstacle(obstacle.x+20, obstacle.y, obstacle.width/3, obstacle.height/3-20, 
                    snowmobileOne, snowmobileTwo, game);
                if (didCollideWithObstacle) {
                    this.updateScore(-8);
                }
            }
        }

        // the ternary is because the value will be undefined (unchecked) if it has been set to true on the obstacle before
        obstacle.didCollideWithObstacle = didCollideWithObstacle == undefined ? true : didCollideWithObstacle;

        return obstacle;
    }

    collisionWithObstacle(x, y, width, height, snowmobileOne, snowmobileTwo, game) {
        const snowmobileWidth = this.snowmobileOne.snowmobileWidth;
        const snowmobileHeight = this.snowmobileOne.snowmobileHeight;

        if (x < snowmobileOne.snowmobileX + snowmobileWidth &&
            x + width > snowmobileOne.snowmobileX &&
            y < snowmobileOne.snowmobileY + snowmobileHeight &&
            y + height > snowmobileOne.snowmobileY) {
            return true;
         }
        
        if (game === "level2") {
            const snowmobileTwoWidth = this.snowmobileTwo.snowmobileWidth;
            const snowmobileTwoHeight = this.snowmobileTwo.snowmobileHeight;

            if (x < snowmobileTwo.snowmobileX + snowmobileTwoWidth &&
                x + width > snowmobileTwo.snowmobileX &&
                y < snowmobileTwo.snowmobileY + snowmobileTwoHeight &&
                y + height > snowmobileTwo.snowmobileY) {
                 return true;
             }
        }
         return false;
    }

}
