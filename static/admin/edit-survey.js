const questionItems = document.getElementsByClassName("question-item");
const form = document.querySelector("form#survey-edit");

const template = document.querySelector("template")

function newQuestionItem(){
  const newNode = template.content.cloneNode(true);
  newNode.querySelector('label').textContent = questionItems.length + 1;
  return newNode;
}

document.querySelector("button#add-question").onclick = function (event) {
  event.preventDefault();
  form.append(newQuestionItem());
};

form.onclick = function(event){
  if (event.target.tagName == 'BUTTON' && event.target.classList.contains('delete-question-item')){
    const elemToRemove = event.target.closest(".question-item");
    elemToRemove.remove();
  }
}

form.onsubmit = function(e){
  e.preventDefault();
}