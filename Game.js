

export function Game(width, height, mineNumber) {
	this.width = width;
	this.height = height;

	this.grid = [];
	this.revealed = [];
	this.flags = [];

	this.generated = false;

	this.mineNumber = mineNumber;
	
	//génère la map
	this.generate = function(x0, y0) {
		//placement des mines
		for(let i = 0 ; i < mineNumber ; i ++) {
			let x = Math.floor(Math.random() * width);
			let y = Math.floor(Math.random() * height);
			while(this.grid[x][y] != 0 || (x == x0 && y == y0)) {
				x = Math.floor(Math.random() * width);
				y = Math.floor(Math.random() * height);
			}
			this.grid[x][y] = -1;
		}

		//calculs nombre mines voisines
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
	//révèle une case de la grille
	this.reveal = function(x, y) {
		let list = [[x, y]];

		if(!this.generated)
			this.generate(x, y);

		while(list.length > 0) {
			let [x, y] = list.pop();
			this.revealed[x][y] = 1;
			this.flags[x][y] = 0;
			//si pas de mine adjacente, révèle également les 8 cases adjacentes
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
				return -1; // défaite
			}
			if(this.revealed.reduce((a, b) => a.concat(b), []).reduce((a, b) => a + b, 0) == this.width * this.height - mineNumber)
				return 1; // victoire
		}
		return 0;

	}

	//marque une mine
	this.changeFlag = function(x, y) {
		this.flags[x][y] = 1 - this.flags[x][y];
	}

	//initialisation des grilles
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