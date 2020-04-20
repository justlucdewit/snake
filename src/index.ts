import Snake from './snake'
import Food from './food'
const keypress = require("keypress");

const run = () => {
	// setup player object
	let player = new Snake(0, 0);
	let food = new Food();

	// setup key system
	keypress(process.stdin);

	process.stdin.on('keypress', (ch, key) => {
		if (key && key.ctrl && key.name == "c"){
			process.exit(1);
		}

		switch (key.name) {
			case "w":
				player.dx = 0;
				player.dy = -1;
				break;
			case "s":
				player.dx = 0;
				player.dy = 1;
				break;
			case "d":
				player.dx = 1;
				player.dy = 0;
				break;
			case "a":
				player.dx = -1;
				player.dy = 0;
				break;
		}
	});

	process.stdin.setRawMode(true);

	// main game loop
	setInterval(() => {
		player.show();
		player.update();
		food.show();
		player.eat(food);
		// player.debug();
	}, 100);
};

module.exports = run;