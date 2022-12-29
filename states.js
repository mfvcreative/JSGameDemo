import { Dust, Fire, Splash } from './particles.js'


const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    ROLLING: 4,
    DIVING: 5,
    HIT: 6
}

class State {
    constructor(state, game) {
        this.state = state
        this.game = game
    }
}

export class Sitting extends State {
    constructor(player, game) {
        super(states.SITTING, game)
        this.player = player
    }
 
    enter() {
        this.player.maxFrames = 4
        this.player.frameY = 5
        
    }

    handleInput(input) {
        if(input.includes('ArrowLeft') || input.includes('ArrowRight')) {
            this.player.setState(states.RUNNING, 1)
        } else if(input.includes('z')) {
            this.player.setState(states.ROLLING, 2)
        }
    }
}

export class Running extends State {
    constructor(player, game) {
        super(states.RUNNING, game)
        this.player = player
    }
 
    enter() {
        this.player.maxFrames = 8
        this.player.frameY = 3
    }

    handleInput(input) {
        this.game.particles.push(new Dust(this.game, this.player.x + this.player.width * .5, this.player.y + this.player.height))
        if(input.includes('ArrowDown')) {
            this.player.setState(states.SITTING, 0)
        } else if(input.includes('ArrowUp')) {
            this.player.setState(states.JUMPING, 1)
        } else if(input.includes('z')) {
            this.player.setState(states.ROLLING, 2)
        }
    }
}

export class Jumping extends State {
    constructor(player, game) {
        super(states.JUMPING, game)
        this.player = player
    }
 
    enter() {
        if(this.player.isGrounded()) this.player.vy -= 20
        this.player.maxFrames = 6
        this.player.frameY = 1
    }

    handleInput(input) {
        if(this.player.vy > this.player.weight) {
            this.player.setState(states.FALLING, 1)
        } else if(input.includes('z')) {
            this.player.setState(states.ROLLING, 2)
        } else if(input.includes('ArrowDown')) {
            this.player.setState(states.DIVING, 0)
        }
    } 
}

export class Falling extends State {
    constructor(player, game) {
        super(states.FALLING, game)
        this.player = player
    }
 
    enter() {
        this.player.maxFrames = 6
        this.player.frameY = 2
    }

    handleInput(input) {
        if(this.player.isGrounded()) {
            this.player.setState(states.RUNNING, 1)
        } else if(input.includes('ArrowDown')) {
            this.player.setState(states.DIVING, 0)
        }
    }
}

export class Rolling extends State {
    constructor(player, game) {
        super(states.ROLLING, game)
        this.player = player
    }
 
    enter() {
        this.player.maxFrames = 6
        this.player.frameY = 6
    }

    handleInput(input) {
        this.game.particles.push(new Fire(this.game, this.player.x + this.player.width * .5, this.player.y + this.player.height * .5))
        if(!input.includes('z') && this.player.isGrounded()) {
            this.player.setState(states.RUNNING, 1)
        } else if(!input.includes('z') && !this.player.isGrounded()) {
            this.player.setState(states.FALLING, 1)
        } else if(input.includes('z') && input.includes('ArrowUp') && this.player.isGrounded()) {
            this.player.vy -= 20
        } else if(input.includes('ArrowDown') && !this.player.isGrounded()) {
            this.player.setState(states.DIVING, 0)
        }
    }
}

export class Diving extends State {
    constructor(player, game) {
        super(states.DIVING, game)
        this.player = player
    }
 
    enter() {
        this.player.maxFrames = 6
        this.player.frameX = 0
        this.player.frameY = 6
        this.game.player.vy = 20
    }

    handleInput(input) {
        this.game.particles.push(new Fire(this.game, this.player.x + this.player.width * .5, this.player.y + this.player.height * .5))
        if(this.player.isGrounded()) {
            this.player.setState(states.RUNNING, 1)
            for(let i = 0; i < 30; i++) {
                this.game.particles.push(new Splash(this.game, this.player.x,
                     this.player.y - 30))
            }
        } else if(input.includes('z') && this.player.isGrounded()) {
            this.player.setState(states.ROLLING, 2)
        }
    }
}

export class Hit extends State {
    constructor(player, game) {
        super(states.HIT, game)
        this.player = player
    }
 
    enter() {
        this.player.maxFrames = 10
        this.player.frameX = 0
        this.player.frameY = 4
    }

    handleInput(input) {
        if(this.player.frameX >= this.player.maxFrames && this.player.isGrounded()) {
            this.player.setState(states.RUNNING, 1)
        } else if(this.player.frameX >= this.player.maxFrames && !this.player.isGrounded()) {
            this.player.setState(states.FALLING, 1)
        }
    }
}