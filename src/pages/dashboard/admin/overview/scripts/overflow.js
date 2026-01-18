// overview
import CandidateController from "../../../../../simulated-backend/controller/candidate/candidate.controller.js";
import CourseRepository from "../../../../../simulated-backend/repositories/course/course.repository.js";

// Controllers and Repositories
const candidateController = new CandidateController();
const courseRop = new CourseRepository();

// Data fetching
const candidatesResponse = candidateController.findAll();
const candidateList = candidatesResponse.candidateList;
const courses = courseRop.findAll();

// General statistics
const totalCandidates = candidateList.length;
const approvedCandidates = candidateList.filter((candidate) => candidate.status === "Aprovado").length;
const rejectedCandidates = candidateList.filter((candidate) => candidate.status === "Reprovado").length;
const pendingCandidates = candidateList.filter((candidate) => candidate.status === "Pendente").length;

const overViewSection = document.querySelector(".overview");

const generalStatics = [
  {
    title: "Total Candidatos",
    value: totalCandidates,
    subtitle: "Registos concluidos",
    description: "Todos os candidatos inscritos"
  },
  {
    title: "Aprovados",
    value: approvedCandidates,
    subtitle: "Classificação final",
    description: "Candidatos admitidos"
  },
  {
    title: "Reprovados",
    value: rejectedCandidates,
    subtitle: "Classificação final",
    description: "candidatos rejeitados"
  },
  {
    title: "Pendentes",
    value: pendingCandidates,
    subtitle: "Não classificados",
    description: "Candidatos a espera de classificação"
  },
]

generalStatics.forEach((staticInfo)=> {
  const card = document.createElement("article");
  card.classList.add("overview-card");

  const cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header");
  card.appendChild(cardHeader)

  const cardTitle = document.createElement("span");
  cardTitle.classList.add("card-title");
  cardHeader.appendChild(cardTitle)

  const cardValue = document.createElement("h2")
  cardValue.classList.add("card-value")
  card.appendChild(cardValue)

  const cardSubtitle = document.createElement("p")
  cardSubtitle.classList.add("card-subtitle")
  card.appendChild(cardSubtitle)

  const cardDescription = document.createElement("p")
  cardSubtitle.classList.add("card-description")
  card.appendChild(cardDescription)

  cardTitle.textContent = staticInfo.title
  cardValue.textContent = staticInfo.value
  cardSubtitle.textContent = staticInfo.subtitle
  cardDescription.textContent = staticInfo.description

  overViewSection.appendChild(card)
  
})
// Each course statistics
const courseStats = courses.map((course) => {
  const candidatesInCourse = candidateList.filter((candidate) => candidate.courseId === course.id);
  const totalInCourse = candidatesInCourse.length;
  const approved = candidatesInCourse.filter((candidate) => candidate.status === "Aprovado").length;
  const rejected = candidatesInCourse.filter((candidate) => candidate.status === "Reprovado").length;
  const pending = candidatesInCourse.filter((candidate) => candidate.status === "Pendente").length;
  return {
    courseName: course.name,
    totalCandidates: totalInCourse,
    approved,
    rejected,
    pending,
  };
})

const tableBody = document.getElementById("course-table-body");

courseStats.forEach((stat) => {
  const row = document.createElement("tr");

  const courseNameColumn = document.createElement("td");
  const totalColumn = document.createElement("td");
  const approvedColumn = document.createElement("td");
  const rejectedColumn = document.createElement("td");
  const pendingColumn = document.createElement("td");

  courseNameColumn.textContent = stat.courseName;
  totalColumn.textContent = stat.totalCandidates;
  approvedColumn.textContent = stat.approved;
  rejectedColumn.textContent = stat.rejected;
  pendingColumn.textContent = stat.pending;

  row.appendChild(courseNameColumn);
  row.appendChild(totalColumn);
  row.appendChild(approvedColumn);
  row.appendChild(rejectedColumn);
  row.appendChild(pendingColumn);
  tableBody.appendChild(row);
})
