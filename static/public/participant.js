document.querySelectorAll('canvas').forEach(elem => {
  DrawingCanvas(elem);
})

document.querySelector('form#survey-fillout').onsubmit = function(event){
  event.preventDefault();
}