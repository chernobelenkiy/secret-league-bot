document.addEventListener("DOMContentLoaded", function () {
  console.log("Fetching assistants...");
  fetch("/assistants")
    .then((response) => response.json())
    .then((data) => populateTable(data))
    .catch((error) => console.error("Error fetching assistants:", error));
});

document
  .getElementById("assistantForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const assistantId = document.getElementById("assistantId").value;
    const botName = document.getElementById("botName").value;
    const description = document.getElementById("description").value;
    const instructions = document.getElementById("instructions").value;
    const name = document.getElementById("name").value;

    if (assistantId) {
      updateAssistant(assistantId, description, name, instructions);
    } else {
      createAssistant(botName, description, name, instructions);
    }
  });

function populateTable(assistants) {
  const tbody = document.getElementById("assistantList");
  tbody.innerHTML = ""; // Clear existing entries
  assistants.forEach((assistant) => {
    const tr = tbody.insertRow();
    console.log(assistant.description);
    tr.innerHTML = `
          <td>${assistant.metadata.botName}</td>
          <td>${assistant.id}</td>
          <td>${assistant.description}</td>
          <td>${assistant.instructions}</td>
          <td>${assistant.model}</td>
          <td>
              <button class="btn btn-primary btn-sm btn-edit">Edit</button>
              <button class="btn btn-danger btn-sm" onclick="deleteAssistant('${assistant.id}')">Delete</button>
              <button class="btn btn-info btn-sm" onclick="createThread('${assistant.id}')">Create Thread</button>
          </td>
      `;
    tr.getElementsByClassName("btn-edit")[0].addEventListener(
      "click",
      function () {
        editAssistant(
          assistant.metadata.botName,
          assistant.id,
          assistant.name,
          assistant.description,
          assistant.instructions
        );
      }
    );
  });
}

function createAssistant(botName, name, description, instructions) {
  fetch("/assistants", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ botName, name, description, instructions }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Assistant created:", data);
      window.location.reload(); // Reload to update the list
    })
    .catch((error) => console.error("Error creating assistant:", error));
}

function updateAssistant(assistantId, name, description, instructions) {
  fetch(`/assistants/${assistantId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description, name, instructions }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Assistant updated:", data);
      window.location.reload(); // Reload to update the list
    })
    .catch((error) => console.error("Error updating assistant:", error));
}

function deleteAssistant(assistantId) {
  fetch(`/assistants/${assistantId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Assistant deleted:", data);
      window.location.reload(); // Reload to update the list
    })
    .catch((error) => console.error("Error deleting assistant:", error));
}

function createThread(assistantId) {
  fetch(`/threads/${assistantId}`, {
    method: "POST",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

function editAssistant(botName, id, name, description, instructions) {
  document.getElementById("assistantId").value = id;
  document.getElementById("botName").value = botName;
  document.getElementById("name").value = name;
  document.getElementById("instructions").value = instructions;
  document.getElementById("description").value = description;
  new bootstrap.Modal(document.getElementById("assistantModal")).show();
}

function newAssistant() {
  new bootstrap.Modal(document.getElementById("assistantModal")).show();
}
