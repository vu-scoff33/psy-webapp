const questionItems = document.getElementsByClassName("question-item");
const form = document.querySelector("form#survey-edit");

const template = document.querySelector("template")

function addQuestionItem(){
  
}

document.querySelector("button#add-question").onclick = function (event) {
  event.preventDefault();
  form.append(template.content.cloneNode(true));
};

