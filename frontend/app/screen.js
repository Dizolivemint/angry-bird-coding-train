const screen = document.getElementById("gameScreen");
const board = document.getElementById("gameBoard");

this.canvas = screen; // game screen
this.ctx = screen.getContext("2d"); // game screen context

this.boardCanvas = board; // game board
this.boardCtx = board.getContext("2d"); // game board context

// set screen size
this.canvas.width = window.innerWidth; // set game screen width
this.canvas.height = this.topbar.active ? window.innerHeight - this.topbar.clientHeight : window.innerHeight; // set game screen height

// set screen
this.screen = {
    top: 0,
    bottom: this.canvas.height,
    left: 0,
    right: this.canvas.width,
    centerX: this.canvas.width / 2,
    centerY: this.canvas.height / 2,
    scale: ((this.canvas.width + this.canvas.height) / 2) * 0.003
};

// set board size
// let columns = parseInt(this.config.settings.columns);
// let rows = parseInt(this.config.settings.rows);

// let cellSize = getCellSize(
//     this.canvas.width,
//     this.canvas.height,
//     rows,
//     columns
// );

// this.boardCanvas.width = cellSize * columns;
// this.boardCanvas.height = cellSize * rows;