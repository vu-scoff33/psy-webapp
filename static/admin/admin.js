const surveyItems = document.getElementsByClassName("survey-item");

document.querySelector("#add-survey").onclick = function (e) {
  const idx = surveyItems.length + 1;
  const surveyName = "Survey " + idx.toString();
  
};
