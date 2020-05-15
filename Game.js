

/**
 * class used to store one game.
 * @param {*} width : grid width
 * @param {*} height : grid height
 * @param {*} mineNumber : number of mine
 */
export function Game(width, height, mineNumber) {
	this.width = width;
	this.height = height;

	this.grid = [];
	this.revealed = [];
	this.flags = [];

	this.generated = false;

	this.mineNumber = mineNumber;
	
	/**
	 * function used to generate the map
	 * @param x0 : x coordinate of the first action made by the player
	 * @param y0 : y coordinate of the first action made by the player
	 */
	this.generate = function(x0, y0) {
		//mine positionning
		for(let i = 0 ; i < mineNumber ; i ++) {
			let x = Math.floor(Math.random() * width);
			let y = Math.floor(Math.random() * height);
			while(this.grid[x][y] != 0 || (x == x0 && y == y0)) {
				x = Math.floor(Math.random() * width);
				y = Math.floor(Math.random() * height);
			}
			this.grid[x][y] = -1;
		}

		//store the number of adjacent mines for each cell in the grid
		for(let x = 0 ; x < width ; x ++)
			for(let y = 0 ; y < height ; y ++) 
				if(this.grid[x][y] == 0){
					let number = 0;

					for(let x1 = -1 ; x1 <= 1 ; x1 ++)
						for(let y1 = -1 ; y1 <= 1 ; y1 ++)
							if(x1 + x >= 0 && x1 + x < width && y1 + y >= 0 && y1 + y < height && this.grid[x + x1][y + y1] == -1)
								number ++;

					this.grid[x][y] = number;
				}
		this.generated = true;
	}
	/**
	 * reveal if a cell contain a mine.
	 * @param x : x coordinate of the cell revealed
	 * @param y : y coordinate of the cell revealed
	 * @return : -1 if the revealed cell contain a mine, 1 if the game is won and 0 if the game continue
	 */
	this.reveal = function(x, y) {
		let list = [[x, y]];

		if(!this.generated)
			this.generate(x, y);

		while(list.length > 0) {
			let [x, y] = list.pop();
			this.revealed[x][y] = 1;
			this.flags[x][y] = 0;
			//if there is none adjacent mine, also reveal the 8 adjacents cells
			if(this.grid[x][y] == 0) {
				if(x != 0) {
					if(y != 0 && this.revealed[x-1][y-1] == 0)
						list.push([x-1, y-1]);
					if(y != this.height-1 && this.revealed[x-1][y+1] == 0)
						list.push([x-1, y+1]);
					if(this.revealed[x-1][y] == 0)
						list.push([x-1, y]);
				}
				if(x != this.width-1) {
					if(y != 0 && this.revealed[x+1][y-1] == 0)
						list.push([x+1, y-1]);
					if(y != this.height-1 && this.revealed[x+1][y+1] == 0)
						list.push([x+1, y+1]);
					if(this.revealed[x+1][y] == 0)
						list.push([x+1, y]);
				}
				if(y != 0 && this.revealed[x][y-1] == 0)
					list.push([x, y-1]);
				if(y != this.height-1 && this.revealed[x][y+1] == 0)
					list.push([x, y+1]);
			} else if(this.grid[x][y] == -1) {
				return -1; // defeat
			}
			if(this.revealed.reduce((a, b) => a.concat(b), []).reduce((a, b) => a + b, 0) == this.width * this.height - mineNumber)
				return 1; // victory
		}
		return 0;

	}

	/**
	 * add a flag to a cell
	 * @param x : x coordinate of the marked cell
	 * @param y : y coordinate of the marked cell
	 */
	this.changeFlag = function(x, y) {
		this.flags[x][y] = 1 - this.flags[x][y];
	}

	//init
	for(let x = 0 ; x < width ; x ++) {
		this.grid[x] = [];
		this.revealed[x] = [];
		this.flags[x] = [];
		for(let y = 0 ; y < height ; y ++) {
			this.grid[x][y] = 0;
			this.revealed[x][y] = 0;
			this.flags[x][y] = 0;
		}
	}

	


	
}