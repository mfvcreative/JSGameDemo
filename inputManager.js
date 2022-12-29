
// make the data structer a map

export class InputManager {
    constructor(game) {
        this.keys = []
        this.game = game
        window.addEventListener('keydown', e => {
            if((e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === 'z')
                 && this.keys.indexOf(e.key) === -1) {

                this.keys.push(e.key)
            } else if(e.key === 'd') this.game.debug = ! this.game.debug
        })

        window.addEventListener('keyup', e => {
            if(e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === 'z') {
                this.keys.splice(this.keys.indexOf(e.key), 1)
            }
        })
    }
}