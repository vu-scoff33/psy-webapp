// const surveyItems = document.getElementsByClassName("survey-item");

document.querySelector("#add-survey").onclick = function (e) {
  fetch("/admin/create-survey", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Untitled Survey",
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
