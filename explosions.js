class Explosion{
	constructor(pos, c, sr){
		this.pos = pos
		this.c = c
		this.r = sr

		this.maxProgress = 10

		this.progress = 1
		this.alive = true
	}

	update(){
		this.progress += 0.1
		if(this.progress > this.maxProgress)
			this.alive = false
	}

	draw(){
		push()
		noFill()
		const strokeAlpha = (this.maxProgress - this.progress) / this.maxProgress

		// stroke(...this.c, (strokeAlpha * 255) | 0)
		if(strokeAlpha * 255 < 1){
			this.alive = false
		}

		fill(...this.c, strokeAlpha * 255)
		ellipse(this.pos.x, this.pos.y, this.r * 2 * this.progress)
		pop()
	}
}
