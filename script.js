import { Player } from './player.js'
import { InputManager } from './inputManager.js'
import { Background } from './background.js'
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from './enemies.js'
import { UI } from './UI.js'

import { CollisionAnimation } from './collisionAnimation.js'



const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

const WIDTH = canvas.width = 500
const HEIGHT = canvas.height = 500


const playerImage = new Image()
playerImage.src = './assets/sprites/player.png'

//background images
const layer1 = new Image()
const layer2 = new Image()
const layer3 = new Image()
const layer4 = new Image()
const layer5 = new Image()

layer1.src = './assets/sprites/layer-1.png'
layer2.src = './assets/sprites/layer-2.png'
layer3.src = './assets/sprites/layer-3.png'
layer4.src = './assets/sprites/layer-4.png'
layer5.src = './assets/sprites/layer-5.png'

// enemy images
const enemy1 = new Image()
const enemy2 = new Image()
const enemy3 = new Image()

enemy1.src = './assets/sprites/enemy_fly.png'
enemy2.src = './assets/sprites/enemy_plant.png'
enemy3.src = './assets/sprites/enemy_spider_big.png'

// misc




class Game {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.groundHeight = 80
        this.speed = 0
        this.maxSpeed = 2
        this.enemies = []
        this.player = new Player(this, playerImage)
        this.input = new InputManager(this)   
        this.background = new Background(this, [
            layer1, layer2, layer3, layer4, layer5
        ])
        this.particles = []
        this.UI = new UI(this)
        this.enemyInterval = 1000
        this.enemyTimer = 0

        this.debug = false
        this.score = 0
        this.maxParticles = 60
        this.collisionSprites = []

        this.gameTime = 50000
        this.actualTime = 0
        this.gameOver = false
    }

    update(deltaTime) {
        this.actualTime += deltaTime
        if(this.actualTime > this.gameTime) {
            this.gameOver = true
        }
        this.background.update()
        this.player.update(this.input.keys, deltaTime)
        if(this.enemyTimer > this.enemyInterval) {
            this.addEnemy()
            this.enemyTimer = 0
        } else {
            this.enemyTimer += deltaTime
        }
        this.enemies.forEach((e) => {
            if(!e.isAlive) this.enemies.splice(this.enemies.indexOf(e),1)
            e.update(deltaTime)
        })
        this.particles.forEach((e, index) => {
            if(!e.isAlive) {
                this.particles.splice(index, 1)
            }
            e.update()
        })
        if(this.particles.length > this.maxParticles) {
            this.particles = this.particles.splice(50, this.particles.length)
        }
        this.collisionSprites.forEach((e, index) => {
            if(!e.isAlive) {
                this.collisionSprites.splice(index, 1)
            }
            e.update(deltaTime)
        })
    }

    draw(ctx) {
        this.background.draw(ctx)
        this.enemies.forEach(e => {
            e.draw(ctx)
        })
        this.player.draw(ctx)
        this.particles.forEach( e => {
            e.draw(ctx)
        })
        this.collisionSprites.forEach(e => {
            e.draw(ctx)
        })
        this.UI.draw(ctx)
    }

    addEnemy() {
        if(this.speed > 0 && Math.random() < .4) {
            this.enemies.push(new GroundEnemy(this, enemy2))
        } else if(this.speed > 0) {
            this.enemies.push(new ClimbingEnemy(this, enemy3))
        }
        let enemy = new FlyingEnemy(this, enemy1)
        this.enemies.push(enemy)
    }


}

const game = new Game(WIDTH, HEIGHT)
let lasTime = 0

function animate(timestamp) {
    let deltaTime = timestamp - lasTime
    lasTime = timestamp
    ctx.clearRect(0,0,WIDTH,HEIGHT)
    game.update(deltaTime)
    game.draw(ctx)
    if(!game.gameOver) requestAnimationFrame(animate)
}

animate(0)