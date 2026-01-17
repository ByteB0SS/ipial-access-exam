import CandidateController from "../../../../../simulated-backend/controller/candidate/candidate.controller.js"

const candidateController = new CandidateController()
const candidatesResponse = candidateController.findAll()

const approvedCandidates = candidatesResponse.candidateList.filter(candidate => candidate.status === 'Aprovado').length
const rejectedCandidates = candidatesResponse.candidateList.filter(candidate => candidate.status === 'Reprovado').length
const pendingCandidates = candidatesResponse.candidateList.filter(candidate => candidate.status === 'Pendente').length


const ctx = document.getElementById("candidatesStatusChart");

new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["Aprovados", "Reprovados", "Pendentes"],
    datasets: [
      {
        data: [approvedCandidates, rejectedCandidates, pendingCandidates], // valores de exemplo
        backgroundColor: [
          "#22c55e", // verde
          "#ef4444", // vermelho
          "#facc15", // amarelo
        ],
        borderWidth: 0,
      },
    ],
  },
  options: {
    cutout: "65%",
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  },
});
