import CandidateController from "../../../../simulated-backend/controller/candidate/candidate.controller.js";

const candidateController = new CandidateController();
const sendButton = document.getElementById("send-button");
const messager = document.getElementById("form-message");

function registeCandidate(event) {
    event.preventDefault();

    const candidate = {
        fullName: document.getElementById("full-name").value,
        email: document.getElementById("email").value,
        birthDate: document.getElementById("birthdate").value,
        biPassport: document.getElementById("bi-or-passaporte").value,
        courseId: document.getElementById("courses-selector").value,
        secretKey: document.getElementById("secret-key").value
    };

    if (
        !candidate.fullName ||
        !candidate.email ||
        !candidate.birthDate ||
        !candidate.biPassport ||
        !candidate.courseId ||
        !candidate.secretKey
    ) {
        messager.classList.remove("success");
        messager.textContent = "Todos os campos devem ser preenchidos";
        return;
    }

    const resp = candidateController.create(candidate);

    if (resp.success) {
        messager.classList.add("success");
        messager.textContent = resp.message;

        setTimeout(() => {
            document.getElementById("index-link").click();
        }, 2000);
    } else {
        messager.classList.remove("success");
        messager.textContent = resp.message;
    }
}

sendButton.addEventListener("click", registeCandidate);
