import { terminal } from 'terminal-kit'
import Food from './food'

class Snake{
	dx = 1;
	dy = 0;
	lastPosX = 0;
	lastPosY = 0;
	tailpieces:Tail[] = [];

	constructor(x:number, y:number){
		this.tailpieces.push(new Tail(x, y));
	}

	show(){
		console.clear();
		this.tailpieces.forEach((piece, index) => {
			terminal.moveTo(piece.x, piece.y);
			if (index !== this.tailpieces.length-1){
				terminal.green("#");
			}else{
				terminal.yellow("@")
			}
		});
	}

	update(){
		this.tailpieces.forEach((piece, index) => {
			// for growing
			if (index === 0){
				this.lastPosY = piece.y;
				this.lastPosX = piece.x;
			}

			// for moving the tail
			if (index !== this.tailpieces.length-1){
				piece.x = this.tailpieces[index+1].x;
				piece.y = this.tailpieces[index+1].y;
			}

			// for moving the head
			else{
				piece.x += this.dx;
				piece.y += this.dy;

				// test if collided with self
				if (this.collided(piece.x, piece.y)){
					console.clear();
					terminal.green(`game over!\nscore: ${this.tailpieces.length-1}`);
					process.exit(1);
				}

				// test if out of bounds
				if (piece.x < 0 || piece.x > process.stdout.columns || piece.y < 0 || piece.y > process.stdout.rows){
					console.clear();
					terminal.green(`game over!\nscore: ${this.tailpieces.length-1}`);
					process.exit(1);
				}
			}
		});
	}

	collided(x:number, y:number){
		for (let piece = 0; piece < this.tailpieces.length-1; piece++){
			let tailpiece = this.tailpieces[piece];
			if (tailpiece.x === x && tailpiece.y === y){
				return true;
			}
		}
		return false;
	}

	eat(apple:Food){
		const head:Tail = this.tailpieces[this.tailpieces.length-1];
		if (head.x === apple.x && head.y === apple.y){
			apple.respawn();
			this.tailpieces.unshift(new Tail(this.lastPosX, this.lastPosY));
			terminal.windowTitle(`snake ${this.tailpieces.length-1} pts`);
		}
	}
}

class Tail{
	constructor(public x:number, public y:number){}

	show(){
		console.clear();
		terminal.moveTo(this.x, this.y);
		terminal.blue("@");
	}
}

export default Snake;