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
		for (var i = 0; i < 11; i++) {
			var row = $("<tr></tr>");
			for (var j = 0; j < 11; j++) {
				var cell = $("<td></td>");
				
				cell.attr("data-wall", isWall(i, j));
				cell.attr("data-wall-corner", isWallCorner(i, j));
				
				row.append(cell);
			}
			this.table.append(row);
		}
	}
}

function isCell(i, j) {
	return i % 2 == 1 && j % 2 == 1;
}

function isWall(i, j) {
	return !isCell(i, j);
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