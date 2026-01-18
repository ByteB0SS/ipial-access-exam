import CandidateController from "../../../../../simulated-backend/controller/candidate/candidate.controller.js";

const candidateController = new CandidateController();
const candidatesResponse = candidateController.findAll();

const candidateList = candidatesResponse.candidateList;

const approvedCandidates = candidateList.filter(c => c.status === "Aprovado").length;
const rejectedCandidates = candidateList.filter(c => c.status === "Reprovado").length;
const pendingCandidates = candidateList.filter(c => c.status === "Pendente").length;

const ctx = document.getElementById("candidatesStatusChart");

new Chart(ctx, {
    type: "bar",
    data: {
        labels: ["Aprovados", "Reprovados", "Pendentes"],
        datasets: [
            {
                data: [approvedCandidates, rejectedCandidates, pendingCandidates],
                backgroundColor: ["#22c55e", "#ef4444", "#facc15"],
                borderWidth: 0
            }
        ]
    },
    options: {
        cutout: "65%",
        plugins: {
            legend: {
                position: "bottom"
            }
        }
    }
});
