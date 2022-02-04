/**@type {HTMLCanvasElement} */

const canvas = document.getElementById("demo-canvas");
const context = canvas.getContext("2d");
context.lineWidth = 2;

document.addEventListener("mouseup", (event) => {
  if (event.target !== canvas && canvas.drawing) {
    canvas.dispatchEvent(new Event("mouseupoutside", { bubbles: false }));
  }
});
canvas.onmousedown = function (event) {
  this.drawing = true;
  DrawUtils.tip(event.offsetX, event.offsetY, true);
};
canvas.onmousemove = function (event) {
  if (this.drawing) {
    DrawUtils.line(event.offsetX, event.offsetY, true);
  }
};
canvas.onmouseup = function (event) {
  this.drawing = false;
  context.closePath();
};
canvas.addEventListener("mouseupoutside", canvas.onmouseup);

document.getElementById("clear").onclick = function () {
  DrawUtils.clear(true);
};
document.getElementById("undo").onclick = function () {
  DrawUtils.undo();
};

const DrawUtils = {
  actionsHistory: [],
  tip: function (x, y, withRecord) {
    context.beginPath();
    context.arc(x, y, 0.8, 0, 2 * Math.PI);
    context.stroke();
    if (withRecord) {
      this.actionsHistory.push([]);
      this.actionsHistory[this.actionsHistory.length - 1].push({
        x,
        y,
        action: "tip",
      });
    }
  },
  line: function (x, y, withRecord) {
    context.lineTo(x, y);
    context.stroke();
    if (withRecord) {
      this.actionsHistory[this.actionsHistory.length - 1].push({
        x,
        y,
        action: "line",
      });
    }
  },
  clear: function (withRecord) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (withRecord) {
      this.actionsHistory.push([]);
      this.actionsHistory[this.actionsHistory.length - 1].push({
        x: null,
        y: null,
        action: "clear",
      });
    }
    // console.log(this.actionsHistory);
  },
  redraw: function () {
    // console.log(this.actionsHistory);
    // return;
    for (checkPoint of this.actionsHistory) {
      for (actionObj of checkPoint) {
        const { x, y, action } = actionObj;
        // console.log(x, y, action);
        switch (action) {
          case "tip":
            this.tip(x, y);
            break;
          case "line":
            this.line(x, y);
            break;
          case "clear":
            this.clear();
            break;
        }
      }
    }
  },
  undo: function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    this.actionsHistory.pop();
    this.redraw();
  },
};
