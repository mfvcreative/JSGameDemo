


export class CollisionAnimation {
    constructor(game, x, y) {
        this.game = game
        this.sprite = new Image()
        this.sprite.src = './assets/sprites/boom.png'
        this.spriteWidth = 100
        this.spriteHeight = 90
        this. sizeMod = Math.random() + .5
        this.width = this.spriteWidth * this.sizeMod
        this.height = this.spriteHeight * this.sizeMod
        this.x = x - this.width * .5
        this.y = y - this.width * .5
        this.frameX = 0
        this.maxFrame = 4
        this.isAlive = true

        this.fps = 15
        this.frameInterval = 1000/this.fps
        this.frameTimer = 0
    }

    update(deltaTime) {
        this.x -= this.game.speed
        if(this.frameTimer > this.frameInterval) {
            this.frameX++
            this.frameTimer = 0
        } else {
            this.frameTimer += deltaTime
        }
        if(this.frameX > this.maxFrame) {
            this.isAlive = false
        }
    }
    draw(ctx) {
        ctx.drawImage(this.sprite, this.frameX * this.spriteWidth, 0, this.spriteWidth,
            this.spriteHeight, this.x, this.y, this.width, this.height)
    }
}