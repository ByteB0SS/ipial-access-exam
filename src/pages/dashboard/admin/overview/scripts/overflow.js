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

// injecting data into HTML

// general stats


// each course stats
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
