import { terminal } from "terminal-kit"

class Food{
	x = Math.floor(Math.random()*(process.stdout.columns-3));
	y = Math.floor(Math.random()*(process.stdout.rows-3));

	show(){
		terminal.moveTo(this.x, this.y);
		terminal.red("o");
	}

	respawn(){
		this.x = Math.floor(Math.random()*(process.stdout.columns-3));
		this.y = Math.floor(Math.random()*(process.stdout.rows-3));
	}
}

export default Food;