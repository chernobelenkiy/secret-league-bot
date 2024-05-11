document.addEventListener("DOMContentLoaded", function () {
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
    const prompt = document.getElementById("systemPrompt").value;

    if (assistantId) {
      updateAssistant(assistantId, prompt);
    } else {
      createAssistant(botName, prompt);
    }
  });

function populateTable(assistants) {
  const tbody = document.getElementById("assistantList");
  tbody.innerHTML = ""; // Clear existing entries
  assistants.forEach((assistant) => {
    const tr = tbody.insertRow();
    tr.innerHTML = `
          <td>${assistant.botName}</td>
          <td>${assistant.assistantId}</td>
          <td>
              <button class="btn btn-primary btn-sm" onclick="editAssistant('${assistant.assistantId}', '${assistant.botName}', '${assistant.systemPrompt}')">Edit</button>
              <button class="btn btn-danger btn-sm" onclick="deleteAssistant('${assistant.assistantId}')">Delete</button>
              <button class="btn btn-info btn-sm" onclick="viewThreads('${assistant.assistantId}')">Threads</button>
          </td>
      `;
  });
}

function createAssistant(botName, prompt) {
  fetch("/assistants", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ botName, prompt }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Assistant created:", data);
      window.location.reload(); // Reload to update the list
    })
    .catch((error) => console.error("Error creating assistant:", error));
}

function updateAssistant(assistantId, prompt) {
  fetch(`/assistants/${assistantId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
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

function viewThreads(assistantId) {
  fetch(`/threads/${assistantId}`)
    .then((response) => response.json())
    .then((data) => {
      const threadsList = document.getElementById("threadsList");
      threadsList.innerHTML = data.threads
        .map((thread) => `<p>${thread.content}</p>`)
        .join("");
      new bootstrap.Modal(document.getElementById("threadsModal")).show();
    })
    .catch((error) => console.error("Error fetching threads:", error));
}

function editAssistant(assistantId, botName, systemPrompt) {
  document.getElementById("assistantId").value = assistantId;
  document.getElementById("botName").value = botName;
  document.getElementById("systemPrompt").value = systemPrompt;
  new bootstrap.Modal(document.getElementById("assistantModal")).show();
}
