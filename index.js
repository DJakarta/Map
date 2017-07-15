class Tool {
	init() {
		console.log(this.name);
		display.table.attr("data-tool", this.name);
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
switchTool(editTool);