`use strict`;

const submitBtnElement = document.getElementById("submit-btn");
const topicInput = document.getElementById("topic");
const startTimeInput = document.getElementById("startTime");
const endTimeInput = document.getElementById("endTime");
const dateInput = document.getElementById("date");
const tableElement = document.getElementById("schedule");

const url = "http://localhost:3000/lectures";

LoadExistingEvents();

document.getElementById("submit").addEventListener("click", async function () {
  const topic = topicInput.value;
  const startTime = startTimeInput.value;
  const endTime = endTimeInput.value;
  const date = dateInput.value;

  console.log(topic, startTime, endTime, date);

  if (topic == "" || startTime == "" || endTime == "" || date == "") {
    alert("All fields are required");
    return;
  }

  console.log(
    JSON.stringify({
      topic: topic,
      startTime: startTime,
      endTime: endTime,
      date: date,
    })
  );

  const req = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      topic: topic,
      startTime: startTime,
      endTime: endTime,
      date: date,
    }),
  });
  resp = await req.json();
  console.log(resp);
});

async function LoadExistingEvents() {
  const req = new Request(url);

  const response = await (await fetch(req)).json();

  response.forEach((element) => {
    tableElement.append(CreateEventElement(element));
  });
}

function CreateEventElement(object) {
  const topic = object.topic;
  const startTime = object.startTime;
  const endTime = object.endTime;
  const date = object.date;

  const rowElement = document.createElement("tr");
  const topicData = document.createElement("td");
  const startTimeData = document.createElement("td");
  const endTimeData = document.createElement("td");
  const dateData = document.createElement("td");

  topicData.textContent = topic;
  startTimeData.textContent = startTime;
  endTimeData.textContent = endTime;
  dateData.textContent = date;

  rowElement.append(dateData);
  rowElement.append(startTimeData);
  rowElement.append(endTimeData);
  rowElement.append(topicData);

  return rowElement;
}
