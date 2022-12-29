


class Enemy {
    constructor() {
        this.frameX = 0
        this.frameY = 0
        this.fps = 20
        this. frameInterval = 1000/this.fps
        this.frameTimer = 0
        this.isAlive = true
    }
    update(deltaTime) {
        this.x -= this.speedX + this.game.speed
        this.y += this.speedY
        if(this.frameTimer > this.frameInterval) {
            this.frameTimer = 0
            if(this.frameX < this.maxFrame) this.frameX++
            else this.frameX = 0
        } else {
            this.frameTimer += deltaTime
        }

        if(this.x + this.width < 0) this.isAlive = false
    }
    draw(ctx) {
        if(this.game.debug) {
            ctx.strokeRect(this.x, this.y, this.width, this.height)
        }
        ctx.drawImage(this.sprite, this.frameX * this.width, 0, this.width,
                this.height, this.x, this.y, this.width, this.height)
    }
}

export class FlyingEnemy extends Enemy {
    constructor(game, image) {
        super()
        this.game = game
        this.width = 60
        this.height = 44
        this.x = this.game.width + this.width
        this.y = Math.random() * this.game.height * .5
        this.speedX = Math.random() * 5 + 2
        this.speedY = 0
        this.maxFrame = 5
        this.sprite = image

        this.angle = 0
        this.va = Math.random() * .1 + .1
    }
    update(deltaTime) {
        super.update(deltaTime)
        this.angle += this.va
        this.y += Math.sin(this.angle)
    }
}

export class GroundEnemy extends Enemy {
    constructor(game, image) {
        super()
        this.game = game
        this.sprite = image
        this.width = 60
        this.height = 87
        this.x = this.game.width
        this.y = this.game.height - this.height - this.game.groundHeight
        this.speedX = 0
        this.speedY = 0
        this.maxFrame = 1
    }

}

export class ClimbingEnemy extends Enemy {
    constructor(game, image) {
        super()
        this.game = game
        this.sprite = image
        this.width = 120
        this.height = 144
        this.x = this.game.width
        this.y = Math.random() * this.game.height * .5
        this.speedX = 0
        this.speedY = Math.random() > 0.5 ? 1 : -1
        this.maxFrame = 5
    }

    update(deltaTime) {
        super.update(deltaTime)
        if(this.y > this.game.height - this.height - this.game.groundHeight) {
            this.speedY *= -1
        }
        if(this.y < -this.game.height) this.isAlive = false
    }

    draw(ctx) {
        super.draw(ctx)
        ctx.beginPath()
        ctx.moveTo(this.x + this.width/2,0)
        ctx.lineTo(this.x + this.width/2, this.y + 50)
        ctx.stroke()
    }

}