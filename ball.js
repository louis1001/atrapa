class Ball{
	constructor(x, y, r, c){
		this.pos = createVector(x, y)
		this.r = r
		this.c = c || [255, 255, 255]
		this.countPoint = false
		this.dead = false
	}

	draw(){
		push()
		noStroke()
		fill(...this.c)
		ellipse(this.pos.x, this.pos.y, this.r*2)
		pop()
	}

	update(fS){
		this.pos.y += fS

		if (this != theBall &&
			dist(this.pos.x, this.pos.y, theBall.pos.x, theBall.pos.y) < this.r + theBall.r){
			this.countPoint = true

			createExplosion(this.pos, this.c, this.r)
			return
		}

		if(this.pos.y > height + (this.r / 2)){
			this.dead = true

			createExplosion(this.pos, [255, 10, 10], this.r)
			return
		}
	}
}