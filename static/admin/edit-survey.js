const questionItems = document.getElementsByClassName("question-item");
const form = document.querySelector("form#survey-edit");

const templates = (function () {
  const temp = {};
  for (let key in questionTypes) {
    temp[key] = document.querySelector(`template#${key}`);
  }
  return temp;
})();

const optionTemplate = document.querySelector("template#mcq-option");

function newQuestionItem(type) {
  const newNode = templates[type].content.cloneNode(true);
  newNode.querySelector("label").textContent = questionItems.length + 1;
  newNode.querySelector("span").textContent = questionTypes[type];
  return newNode;
}

function renumberQuestionItems() {
  for (let i = 0; i < questionItems.length; i++) {
    const node = questionItems[i];
    node.querySelector(".form-label").textContent = i + 1;
  }
}

function addOptionHandler(event) {
  const newNode = optionTemplate.content.cloneNode(true);
  event.target.parentNode.insertBefore(newNode, event.target);
}
function deleteOptionHandler(event) {
  event.currentTarget.parentNode.remove();
}

document.querySelector("#add-question-wrapper").onclick = function (event) {
  if (event.target.classList.contains("add-question")) {
    form.append(newQuestionItem(event.target.id));
  }
};

form.onclick = function (event) {
  if (
    event.target.tagName == "BUTTON" &&
    event.target.classList.contains("delete-question-item")
  ) {
    const elemToRemove = event.target.closest(".question-item");
    elemToRemove.remove();
    renumberQuestionItems();
  }
};

const changedFields = {};

function collectFormData() {
  const data = {};
  data.name = form.querySelector("#surveyName").value;
  data.questions = [];
  const qItemNodes = form.getElementsByClassName("question-item");
  for (let i = 0; i < qItemNodes.length; i++) {
    const itemNode = qItemNodes[i];
    const qItem = {};
    qItem.title = itemNode.querySelector(".question-title").value;
    qItem.questionType = itemNode.dataset.type;
    if (qItem.questionType == "mcq") {
      const optionNodes = itemNode.getElementsByClassName("mcq-option");
      qItem.options = [];
      for (let j = 0; j < optionNodes.length; j++) {
        qItem.options.push(optionNodes[j].value);
      }
    }
    data.questions.push(qItem);
  }
  return data;
}

form.onsubmit = function (e) {
  e.preventDefault();
  const data = collectFormData();
  const surveyId = form.dataset.surveyId;
  fetch("/admin/surveys/" + surveyId, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    location.reload();
  });
};

function publishHandler(event) {
  const toPublish = event.target.id == "publish";
  if (!toPublish){
    console.assert(event.target.id == "unpublish");
  }
  fetch("/admin/surveys/publish/" + form.dataset.surveyId, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      isPublished: toPublish
    })
  }).then((res) => {
    location.reload();
  });
}

//TODO: parameterize all api links
