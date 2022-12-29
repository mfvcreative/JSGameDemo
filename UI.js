


export class UI {
    constructor(game) {
        this.game = game
        this.fontSize = 30
        this.fontFamily = 'Helvetica'
        this.fontColor = 'black'
    }

    draw(ctx) {
        let time = Math.floor(this.game.gameTime -  this.game.actualTime)
        ctx.font = this.fontSize + 'px ' + this.fontFamily
        ctx.textAlign = 'left'
        ctx.fillStyle = this.fontColor
        ctx.fillText('Score: ' + this.game.score, 20, 50)
        ctx.font = this.fontSize * .6 + 'px ' + this.fontFamily
        ctx.fillText('Time: ' + time, 20, 100)

        if(this.game.gameOver) {
            ctx.textAlign = 'center'
            ctx.font = this.fontSize * 2 + 'px ' + this.fontFamily
            ctx.fillText('Get Gud Kid', this.game.width * .5, this.game.height * .5)
        }
    }
}