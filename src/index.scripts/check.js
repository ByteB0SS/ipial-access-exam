import AuthController from "../simulated-backend/controller/auth/auth.controller.js";

const authController = new AuthController()

const checkButton = document.getElementById('check-button')
const messager = document.querySelector('.messager')

checkButton.addEventListener('click', function(e) {
    e.preventDefault()
    const email = document.getElementById('email').value
    const secretKey = document.getElementById('secret-key-input'). value

    const response = authController.checkCandidate(email, secretKey)

    messager.textContent = response.message

    if (response.success) {
        setTimeout(()=> {
            openResultModal(response.candidate)
        }, 1000)
    }
})


// Logic to open the modal result and inject candidate value
const modal = document.getElementById("result-modal")
const closeModal = document.getElementById("close-modal")

const statusCard = document.getElementById("status-card")
const statusText = document.getElementById("status-text")

function openResultModal(candidate) {
  // Dados básicos
  document.getElementById("candidate-name").textContent = candidate.fullName
  document.getElementById("candidate-email").textContent = candidate.email
  document.getElementById("grade-1").textContent = candidate.grade1
  document.getElementById("grade-2").textContent = candidate.grade2
  document.getElementById("course-name").textContent = candidate.course.name

  const avg = ((candidate.grade1 + candidate.grade2) / 2).toFixed(1)
  document.getElementById("grade-avg").textContent = avg

  document.getElementById("created-at").textContent =
    new Date(candidate.createdAt).toLocaleDateString("pt-PT")

  // Reset status
  statusCard.className = "status-card"

  // Status
  if (candidate.status === "Aprovado") {
    statusText.textContent = "APROVADO 🥳"
    statusCard.classList.add("status-approved")
  } else if (candidate.status === "Reprovado 🥹") {
    statusText.textContent = "REPROVADO"
    statusCard.classList.add("status-rejected")
  } else {
    statusText.textContent = "PENDENTE ⏳"
    statusCard.classList.add("status-pending")
  }

  modal.classList.remove("hidden")
}

// Close
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden")
})

// Fecha ao clicar fora
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden")
})
