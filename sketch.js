
let balls = []
let theBall
let explosions = []

let score = 0
let fails = 0
let lastRestart = 0

let gameSpeed = 10
let fallSpeed = 6

let gameOver = false
let pause = false

let timeTilBall = 25

const punishmentSize = 40

let updateMouse = false

function setup(){

	restart()
}


function restart(){

	balls = []
	explosions = []

	score = 0
	fails = 0

	gameSpeed = 25
	lastRestart = 0

	createCanvas(600, 800)
	theBall = new Ball(width/2, height - 200, 20)

	mouseX = width/2
	mouseY = height/2

	gameOver = false
	pause = false

	updateMouse = false
	loop()
}

function draw(){
	background(0)

	if(!gameOver){

		if (!pause){
			theBall.pos = createVector(
				constrain(mouseX, 0, width),
				constrain(mouseY, 100, height)
			)
		}
		theBall.draw()

		balls.forEach(x=>{
			if(!pause)
				x.update(fallSpeed)

			x.draw()

			if (x.countPoint){
				score++
			}

			if(x.dead){
				fails += 1
			}
		})

		if (score%10 == 0 && score > lastRestart && fails > 0){
			fails--
			gameSpeed += 1
			lastRestart = score
		}

		balls = balls.filter(x=> !(x.dead || x.countPoint))

		noStroke()
		// fill('fff')
		rect(0, 0, width, punishmentSize * fails)
		if(punishmentSize * fails >= height){
			gameOver = true
			balls = []
			setTimeout(restart, 2000)
		}

		explosions.forEach(x=>{
			if(!pause)
				x.update()
			x.draw()
		})

		explosions = explosions.filter(x=>x.alive)

		if(!pause)
			timeTilBall--

		if (timeTilBall == 0){
			createNewBall()
			timeTilBall = (gameSpeed | 0)
		}

		stroke(0)
		strokeWeight(4)
		fill(255)
		textSize(40)
		textAlign(CENTER, CENTER)
		text("SCORE\n" + score, (width/2) - 50, 20, 100, 100)

		if (!pause){
			gameSpeed -= 0.005
			// if (gameSpeed%1 == 0)
			// 	timeTilBall++
		}
	}

	for (let i = 0; i < 50; i++){
		push()
		stroke(0, 100 - i*2)
		line(0, punishmentSize * fails + i, width, punishmentSize * fails + i)
		pop()
	}

	if(pause){
		textSize(50)
		strokeWeight(4)
		stroke(0)
		fill(255)
		text("PAUSE", width/2, height/2)
	}

	if (gameOver) {
		background(255)
		textSize(50)
		strokeWeight(4)
		stroke(0)
		fill(255)
		text("GAME OVER", width/2, height/2 - 100)

		textSize(40)
		textAlign(CENTER, CENTER)
		text("SCORE\n" + score, (width/2) - 50, height - 300, 100, 100)
		noLoop()
	}
}

function mousePressed(){
	createExplosion(createVector(mouseX, mouseY), [255, 50, 100], 10)
}

// function mouseReleased(){
// 	updateMouse = false
// }

function keyPressed(){
	if (key == 'P'){
		pause = !pause
	}else if (key == 'R'){
		restart()
	}
}

function createNewBall(){
	const newBall = new Ball(
		random() * (width-50) + 25,
		-50,
		15,
		[random() * 255 | 0, 100, random() * 255 | 0]
	)
	balls.push(newBall)
}

function createExplosion(p, c, r){
	const newExplosion = new Explosion(p, c, r)
	explosions.push(newExplosion)
}
