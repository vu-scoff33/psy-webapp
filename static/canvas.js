/**@type {HTMLCanvasElement}*/

var globalEventsInitialized = false;

function DrawingCanvas(canvasElem, options = null) {
  let canvas = null;
  let canvasId = null;
  if (typeof canvasElem == "string" || canvasElem instanceof String){
   canvas = document.getElementById(canvasElem);
   canvasId = canvasElem;
  }
  else if (canvasElem instanceof HTMLCanvasElement){
    canvas = canvasElem;
    canvasId = canvas.id;
  }
  console.assert(canvas && canvasId);
  const context = canvas.getContext("2d");

  // const {width, height, lineWidth = 2} = options;
  // canvas.width = width;
  // cavas.height = height;
  // context.lineWidth = lineWidth;

  //register events
  document.addEventListener("mouseup", (event) => {
    // console.log("Event handler got called for ", canvas.id);
    if (event.target !== canvas && canvas.drawing) {
      // console.log(canvas.id);
      canvas.dispatchEvent(new Event("mouseupoutside", { bubbles: false }));
    }
  });
  canvas.onmousedown = function (event) {
    this.drawing = true;
    DrawUtils.tip(event.offsetX, event.offsetY, globalState.color, true);
  };
  canvas.onmousemove = function (event) {
    if (this.drawing) {
      DrawUtils.line(event.offsetX, event.offsetY, globalState.color, true);
    }
  };
  canvas.onmouseup = function (event) {
    this.drawing = false;
    context.closePath();
  };
  canvas.addEventListener("mouseupoutside", canvas.onmouseup);

  //create-buttons actions

  document.getElementById(canvasId + "-clear").onclick = function () {
    DrawUtils.clear(true);
  };
  document.getElementById(canvasId + "-undo").onclick = function () {
    DrawUtils.undo();
  };
  document.getElementById(canvasId + "-redo").onclick = function () {
    DrawUtils.redo();
  };
  // document.getElementById(canvasId + "-save").onclick = function () {
  //   window.location = document.getElementById("canvas").toDataURL("image/png");
  // };

  const globalState = {
    color: "black",
    pen: "stroke",
  };

  const DrawUtils = {
    actionsHistory: [],
    redoState: [],
    tip: function (x, y, color, withRecord) {
      context.strokeStyle = color;
      context.beginPath();
      context.arc(x, y, 0.8, 0, 2 * Math.PI);
      context.stroke();
      if (withRecord) {
        this.actionsHistory.push([]);
        this.actionsHistory[this.actionsHistory.length - 1].push({
          x,
          y,
          action: "tip",
          color: globalState.color,
        });
        this.resetRedoState();
      }
    },
    line: function (x, y, color, withRecord) {
      context.strokeStyle = color;
      context.lineTo(x, y);
      context.stroke();
      if (withRecord) {
        this.actionsHistory[this.actionsHistory.length - 1].push({
          x,
          y,
          action: "line",
          color: globalState.color,
        });
        this.resetRedoState();
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
          color: null,
        });
        this.resetRedoState();
      }
      // console.log(this.actionsHistory);
    },
    redraw: function () {
      for (checkPoint of this.actionsHistory) {
        for (actionObj of checkPoint) {
          const { x, y, action, color } = actionObj;
          // console.log(x, y, action);
          switch (action) {
            case "tip":
              this.tip(x, y, color);
              break;
            case "line":
              this.line(x, y, color);
              break;
            case "clear":
              this.clear();
              break;
          }
        }
      }
    },
    undo: function () {
      if (!this.actionsHistory.length) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      this.redoState.push(this.actionsHistory.pop());
      this.redraw();
    },
    redo: function () {
      if (!this.redoState.length) return;
      this.actionsHistory.push(this.redoState.pop());
      this.redraw();
    },
    resetRedoState: function () {
      this.redoState = [];
    },
  };
}

document.querySelectorAll(".colors-button button").forEach((node) => {
  node.onclick = function (event) {
    globalState.color = node.id;
  };
});
