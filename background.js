


class Layer {
    constructor(game, width, height, speedMod, image) {
        this.game = game
        this.width = width
        this.height = height
        this.speedMod = speedMod
        this.image = image
        this.x = 0
        this.y = 0
    }

    update() {
        if(this.x < -this.width) this.x = 0
        else this.x -= this.game.speed * this.speedMod
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
    }
}


export class Background {
    constructor(game, images) {
        this.game = game
        this.width = 1667
        this.height = 500
        this.layers = []
        for(let i = 0; i < images.length; i++) {
            let mod = i * .16
            this.layers.push(new Layer(this.game, this.width, this.height, i, images[i]))
        };

    }

    update() {
        this.layers.forEach(e => {
            e.update()
        })
    }

    draw(ctx) {
        this.layers.forEach(e => {
            e.draw(ctx)
        })
    }
}