import CandidateController from '../../../../../simulated-backend/controller/candidate/candidate.controller.js'
import CourseRepository from '../../../../../simulated-backend/repositories/course/course.repository.js'

let editButtons = document.querySelectorAll('.edit-button')
let editingCurrentCandidateId
const editModal = document.getElementById('edit-modal')
const cancelButton = document.querySelector('.cancel-button')
const tableBody = document.getElementById('candidates-table-body')
const candidateController = new CandidateController()
const courseRepo = new CourseRepository()

// edit modal inputs and buttons
const grade1 = document.getElementById('grade1-input')
const grade2 = document.getElementById('grade2-input')
const average = document.getElementById('average-input')
const status = document.getElementById('status-input')
const saveButton = document.querySelector('.save-button')

// get all candidates

const candidateListResponse = candidateController.findAll()

if (!candidateListResponse.success) {
  alert('algum erro ao buscar candidatos')
}

const candidateList = [...candidateListResponse.candidateList]

if(candidateList.length == 0) {
  tableBody.textContent = "Sem candidatos"
}

else {
  let toInner = ""
  candidateList.forEach((candidate)=> {
    const course = courseRepo.findById(candidate.courseId)
    const courseName = course.name

    toInner =toInner + " \n " + `
      <tr class="candidate-row" id="${candidate.id}">
        <td class="candidate-name">${candidate.fullName}</td>
        <td class="candidate-course">${courseName}</td>
        <td class="candidate-email">${candidate.email}</td>
        <td class="grade-1">${candidate.grade1}</td>
        <td class="grade-2">${candidate.grade2}</td>
        <td class="average">${(candidate.grade1 + candidate.grade2)/2}</td>
        <td class="status ${candidate.status == 'Reprovado' ? 'failed' : candidate.status == 'Aprovado' ? "approved": "pending"}">${candidate.status}</td>
        <td class="">
          <button class="edit-button" candidateId="${candidate.id}">
            Editar
          </button>
        </td>
      </tr>
    `
  })

  tableBody.innerHTML = toInner

  editButtons = document.querySelectorAll('.edit-button')
}

function toggleModal () {
  editModal.classList.toggle('open')
}

editButtons.forEach((button)=> {
  button.addEventListener('click', function (e) {
    editingCurrentCandidateId = button.attributes.candidateId.nodeValue
    const candidate = candidateList.find((c) => c.id === editingCurrentCandidateId)
    grade1.value = candidate.grade1
    grade2.value = candidate.grade2
    status.value = candidate.status
    average.value = (grade1.value + grade2.value)/2
    toggleModal()
  })
})

cancelButton.addEventListener('click', function (e) {
  toggleModal()
})

function calculateAverage (n1, n2) {
  n1 = Number(n1)
  n2 = Number(n2)
  average.value = (n1 + n2)/2
  status.value = Number(average.value) >= 10 ? "Aprovado" : "Reprovado"
}

function Savechanges () {
  const datas = {
    grade1: Number(grade1.value),
    grade2: Number(grade2.value),
    status: status.value
  }

  candidateController.update(editingCurrentCandidateId, datas)
}

grade1.addEventListener("change", function (e) {
  calculateAverage(grade1.value, grade2.value)
})

grade2.addEventListener("change", function (e) {
  calculateAverage(grade1.value, grade2.value)
})

saveButton.addEventListener('click', function (e) {
  Savechanges()
})