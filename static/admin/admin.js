const surveyItems = document.getElementsByClassName("survey-item");

document.querySelector("#add-survey").onclick = function (e) {
  const idx = surveyItems.length + 1;
  const surveyName = "Survey " + idx.toString();
  fetch("/admin/create-survey", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: surveyName,
    }),
  }).then((res) => {
    location.reload();
  });
};

document.querySelector(".content-wrapper").onclick = function (event) {
  if (
    event.target.tagName == "BUTTON" &&
    event.target.classList.contains("delete-survey")
  ) {
    const surveyId = event.target.dataset.surveyId;
    fetch("/admin/delete-survey/" + surveyId, {
      method: "DELETE",
    }).then((res) => {
      location.reload();
    });
  }
};
