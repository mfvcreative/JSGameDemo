import { CollisionAnimation } from './collisionAnimation.js'
import { Sitting, Running, Jumping, Falling, Rolling, Diving, Hit} from './states.js'


export class Player {
    constructor(game, image) {
        this.game = game
        this.spriteWidth = 100
        this.spriteHeight = 91.3
        this.width = this.spriteWidth * .8
        this.height = this.spriteHeight * .8
        this.x = 0
        this.y = this.game.height - this.height
        this.sprite = image
        this.speed = 0
        this.maxSpeed = 5
        this.vy = 0
        this.weight = 1

        this.states = [
            new Sitting(this, this.game),
            new Running(this, this.game),
            new Jumping(this, this.game),
            new Falling(this, this.game),
            new Rolling(this, this.game),
            new Diving(this, this.game),
            new Hit(this, this.game)
        ]
        this.frameX = 0
        this.frameY = 0
        this.currentState = this.states[0]
        this.currentState.enter()

        this.maxFrames = 0
        this.fps = 20
        this.frameInterval = 1000/this.fps
        this.frameTimer = 1
        
    }

    update(input, deltaTime) {
        this.checkCollisions()
        this.currentState.handleInput(input)
        this.x += this.speed
        if(input.includes('ArrowRight')) this.speed = this.maxSpeed
        else if(input.includes('ArrowLeft')) this.speed = -this.maxSpeed
        else this.speed = 0

        this.y += this.vy
        if(!this.isGrounded()) this.vy += this.weight
        else this.vy = 0
        this.#checkBounds()
        
        if(this.frameTimer > this.frameInterval) {
            this.frameTimer = 0
            if(this.frameX < this.maxFrames) this.frameX++
            else this.frameX = 0
        } else {
            
            this.frameTimer += Math.floor(deltaTime)
        }
        
    }

    draw(ctx) {
        if(this.game.debug) {
            ctx.strokeRect(this.x, this.y, this.width, this.height)
        }
        ctx.drawImage(this.sprite, this.frameX *this.spriteWidth, this.frameY * this.spriteHeight,
                     this.spriteWidth, this.spriteHeight,
                      this.x, this.y, this.width, this.height)
    }

    #checkBounds() {
        if(this.x < 0) this.x = 0
        let right = this.game.width - this.width
        if(this.x > right) this.x = right

        if(this.y < 0) this.y = 0
        let down = this.game.height - this.height - this.game.groundHeight
        if(this.y > down) this.y = down
    }

    isGrounded() {
       return this.y >= this.game.height - this.height - this.game.groundHeight
    }

    setState(state, speed) {
        this.currentState = this.states[state]
        this.game.speed = speed * this.game.maxSpeed
        this.currentState.enter()
    }

    checkCollisions() {
        this.game.enemies.forEach(e => {
            if(e.x < this.x + this.width &&
                e.x + e.width > this.x &&
                e.y < this.y + this.height &&
                e.y  + e.height > this.y
                ) {
                    e.isAlive = false
                    this.game.collisionSprites.push(new CollisionAnimation(this.game, e.x  + e.width * .5,
                            e.y + e.height * .5))
                    if(this.currentState === this.states[4] || this.currentState === this.states[5]) {
                        this.game.score++
                    } else {
                        this.setState(6, 0)
                    }
            } else {

            }
        })
    }
}