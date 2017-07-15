/* TODO
- Refactor Display
- Refactor Map
- Refactor functions from table coordinates to element
*/

class Wall {
	constructor(direction, orientation) {
		if (direction instanceof Direction && orientation instanceof Orientation) {
			this.direction = direction;
			this.orientation = orientation;
		}
		else {
			throw {"exceptionType" : "unsupportedArguments",
				"arguments" : arguments};
		}
	}
}

class Cell {
}

class Direction {
	constructor(direction) {
		this.direction = direction;
	}
	static get HORIZONTAL() {
		return 0;
	}
	static get VERTICAL() {
		return 1;
	}
	isHorizontal() {
		return this.direction === Direction.HORIZONTAL;
	}
	isVertical() {
		return this.direction === Direction.VERTICAL;
	}
}

class Orientation {
	constructor(leftToRight, rightToLeft, bottomToTop, topToBottom) {
		if (arguments.length == 4) {
			this.leftToRight = !!leftToRight;
			this.rightToLeft = !!rightToLeft;
			this.bottomToTop = !!bottomToTop;
			this.topToBottom = !!topToBottom;
		}
		else if (arguments.length == 1) {
			if (typeof leftToRight == "string" || leftToRight instanceof String) {
				var string = leftToRight;
				this.leftToRight = !!Number(string[0]);
				this.rightToLeft = !!Number(string[1]);
				this.bottomToTop = !!Number(string[2]);
				this.topToBottom = !!Number(string[3]);
			}
			else if (typeof leftToRight == "number" || leftToRight instanceof Number) {
				var no = leftToRight;
				this.leftToRight = !!((no >> 3) % 2);
				this.rightToLeft = !!((no >> 2) % 2);
				this.bottomToTop = !!((no >> 1) % 2);
				this.topToBottom = !!((no >> 0) % 2);
			}
			else {
				throw {"exceptionType" : "unsupportedArguments",
					"arguments" : arguments};
			}
		}
		else {
			throw {"exceptionType" : "unsupportedArguments",
				"arguments" : arguments};
		}
	}
	
	toString() {
		return "" + Number(this.leftToRight) + Number(this.rightToLeft) + Number(this.bottomToTop) + Number(this.topToBottom);
	}
	
	toNumber() {
		return 8 * this.leftToRight + 4 * this.rightToLeft + 2 * this.bottomToTop + this.topToBottom;
	}
}

class Map {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.horizontalWalls = [];
		for (var i = 0; i < height; i++) {
			this.horizontalWalls[i] = [];
			for (var j = 0; j <= height; j++) {
				this.horizontalWalls[i][j] = new Wall(new Direction(Direction.HORIZONTAL), new Orientation("0011"));
			}
		}
		this.cells = [];
	};
	elementFromTableCoordinate(i, j) {
		if (i % 2 == 1 && j % 2 == 1) {
			return this.cells[i / 2][j / 2];
		}
		else if (i % 2 == 0 && j % 2 == 1) {
			return this.horizontalWalls[i >> 1][j >> 1];
		}
		else {
			return null;
		}
	}
}

class Tool {
	init() {
		display.table.attr("data-tool", this.name);
		console.log("Switched to " + this.name + ".");
	}
	get name() {
		return "tool";
	}
}

class EditTool extends Tool {
	get name() {
		return "editTool";
	}
}
class ScrollTool extends Tool {
	get name() {
		return "scrollTool";
	}
}
class PaintTool extends Tool {
	get name() {
		return "paintTool";
	}
}
class EraseTool extends Tool {
	get name() {
		return "eraseTool";
	}
}

class Display {
	constructor(tableSelector) {
		this.table = $(tableSelector);
		var map = new Map(10, 10);
		for (var i = 0; i < map.height; i++) {
			var row = $("<tr></tr>");
			for (var j = 0; j < map.width; j++) {
				var cell = $("<td></td>");
				
				cell.attr("data-i", i);
				cell.attr("data-j", j);
				cell.attr("data-wall", isWall(i, j));
				cell.attr("data-wall-corner", isWallCorner(i, j));
				cell.attr("data-wall-orientation", (isHorizontalWall(i, j) ? (map.elementFromTableCoordinate(i, j).orientation.toString()) : null));
				
				row.append(cell);
			}
			var cell = $("<td></td>");
			
			cell.attr("data-i", i);
			cell.attr("data-j", j);
			cell.attr("data-wall", isWall(i, j));
			cell.attr("data-wall-corner", isWallCorner(i, j));
			cell.attr("data-wall-orientation", (isHorizontalWall(i, j) ? (map.elementFromTableCoordinate(i, j).orientation.toString()) : null));
			
			row.append(cell);
			this.table.append(row);
		}
		var row = $("<tr></tr>");
		for (var j = 0; j < map.width; j++) {
			var cell = $("<td></td>");
			
			cell.attr("data-i", i);
			cell.attr("data-j", j);
			cell.attr("data-wall", isWall(i, j));
			cell.attr("data-wall-corner", isWallCorner(i, j));
			cell.attr("data-wall-orientation", (isHorizontalWall(i, j) ? (map.elementFromTableCoordinate(i, j).orientation.toString()) : null));
			
			row.append(cell);
		}
		var cell = $("<td></td>");
		
		cell.attr("data-i", i);
		cell.attr("data-j", j);
		cell.attr("data-wall", isWall(i, j));
		cell.attr("data-wall-corner", isWallCorner(i, j));
		cell.attr("data-wall-orientation", (isHorizontalWall(i, j) ? (map.elementFromTableCoordinate(i, j).orientation.toString()) : null));
		
		row.append(cell);
		this.table.append(row);
	}
}

function isCell(i, j) {
	return i % 2 == 1 && j % 2 == 1;
}

function isWall(i, j) {
	return !isCell(i, j);
}

function isHorizontalWall(i, j) {
	return i % 2 == 0 && j % 2 == 1;
}

function isVerticalWall(i, j) {
	return i % 2 == 1 && j % 2 == 0;
}

function isWallCorner(i, j) {
	return i % 2 == 0 && j % 2 == 0;
}

function switchTool(tool) {
	tool.init();
}
var display = new Display("table");

var editTool = new EditTool();
var scrollTool = new ScrollTool();
var paintTool = new PaintTool();
var eraseTool = new EraseTool();
switchTool(editTool);

function keyHandler(ev) {
	if (ev.key == "e") {
		switchTool(editTool);
	}
	else if (ev.key == "s") {
		switchTool(scrollTool);
	}
	else if (ev.key == "p") {
		switchTool(paintTool);
	}
	else if (ev.key == "d") {
		switchTool(eraseTool);
	}
}

$(window).keyup(keyHandler);