let currentRow = null;

function openModal(button) {
  currentRow = button.closest(".candidate-row");

  const grade1 = currentRow.querySelector(".grade-1").innerText;
  const grade2 = currentRow.querySelector(".grade-2").innerText;

  document.getElementById("grade1-input").value = grade1;
  document.getElementById("grade2-input").value = grade2;

  calculateAverage();

  document.getElementById("edit-modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("edit-modal").style.display = "none";
}

function calculateAverage() {
  const grade1 = Number(document.getElementById("grade1-input").value);
  const grade2 = Number(document.getElementById("grade2-input").value);

  const average = ((grade1 + grade2) / 2).toFixed(1);
  document.getElementById("average-input").value = average;

  let status = "Pending";
  if (average >= 10) status = "Approved";
  else status = "Failed";

  document.getElementById("status-input").value = status;
}

document
  .getElementById("grade1-input")
  .addEventListener("input", calculateAverage);

document
  .getElementById("grade2-input")
  .addEventListener("input", calculateAverage);

document.getElementById("edit-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const grade1 = document.getElementById("grade1-input").value;
  const grade2 = document.getElementById("grade2-input").value;
  const average = document.getElementById("average-input").value;
  const status = document.getElementById("status-input").value;

  currentRow.querySelector(".grade-1").innerText = grade1;
  currentRow.querySelector(".grade-2").innerText = grade2;
  currentRow.querySelector(".average").innerText = average;

  const statusCell = currentRow.querySelector(".status");
  statusCell.innerText = status;
  statusCell.className = "status " + status.toLowerCase();

  closeModal();
});
