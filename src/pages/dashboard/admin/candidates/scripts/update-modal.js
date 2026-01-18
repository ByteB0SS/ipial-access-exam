
import CandidateController from '../../../../../simulated-backend/controller/candidate/candidate.controller.js'
import CourseRepository from '../../../../../simulated-backend/repositories/course/course.repository.js'

const candidateController = new CandidateController()
const courseRepo = new CourseRepository()

let candidateList = []
let editingCurrentCandidateId = null
const tableBody = document.getElementById('candidates-table-body')


// modal elements
const editModal = document.getElementById('edit-modal')
const cancelButton = document.querySelector('.cancel-button')
const saveButton = document.querySelector('.save-button')

const grade1Input = document.getElementById('grade1-input')
const grade2Input = document.getElementById('grade2-input')
const averageInput = document.getElementById('average-input')
const statusInput = document.getElementById('status-input')


// get Candidates
function loadCandidates () {
  const response = candidateController.findAll()

  if (!response.success) {
    alert('Erro ao buscar candidatos')
    return
  }

  candidateList = [...response.candidateList]
  renderCandidatesTable()
}


function renderCandidatesTable () {
  tableBody.innerHTML = ''

  if (candidateList.length === 0) {
    tableBody.textContent = 'Sem candidatos'
    return
  }

  candidateList.forEach(candidate => {
    const course = courseRepo.findById(candidate.courseId)

    const row = document.createElement('tr')
    row.classList.add('candidate-row')
    row.id = candidate.id

    row.appendChild(createCell(candidate.fullName, 'candidate-name'))
    row.appendChild(createCell(course?.name ?? '-', 'candidate-course'))
    row.appendChild(createCell(candidate.email, 'candidate-email'))
    row.appendChild(createCell(candidate.grade1, 'grade-1'))
    row.appendChild(createCell(candidate.grade2, 'grade-2'))
    row.appendChild(createCell(calculateAverage(candidate.grade1, candidate.grade2), 'average'))
    row.appendChild(createStatusCell(candidate.status))
    row.appendChild(createActionCell(candidate.id))

    tableBody.appendChild(row)
  })
}


// cell functions 

function createCell (content, className) {
  const td = document.createElement('td')
  td.textContent = content
  if (className) td.classList.add(className)
  return td
}

function createStatusCell (status) {
  const td = document.createElement('td')
  td.textContent = status

  td.classList.add(
    'status',
    status === 'Aprovado'
      ? 'approved'
      : status === 'Reprovado'
      ? 'failed'
      : 'pending'
  )

  return td
}

function createActionCell (candidateId) {
  const td = document.createElement('td')
  const button = document.createElement('button')

  button.textContent = 'Editar'
  button.classList.add('edit-button')
  button.dataset.candidateId = candidateId

  button.addEventListener('click', openEditModal)

  td.appendChild(button)
  return td
}


// modal
function toggleModal () {
  editModal.classList.toggle('open')
}

function openEditModal (element) {
  editingCurrentCandidateId = element.target.dataset.candidateId
  const candidate = candidateList.find(c => c.id === editingCurrentCandidateId)

  grade1Input.value = candidate.grade1
  grade2Input.value = candidate.grade2
  statusInput.value = candidate.status
  averageInput.value = calculateAverage(candidate.grade1, candidate.grade2)

  toggleModal()
}


// calcs
function calculateAverage (n1, n2) {
  return (Number(n1) + Number(n2)) / 2
}

function updateAverageAndStatus () {
  const avg = calculateAverage(grade1Input.value, grade2Input.value)
  averageInput.value = avg
  statusInput.value = avg >= 10 ? 'Aprovado' : 'Reprovado'
}


function saveChanges () {
  const data = {
    grade1: Number(grade1Input.value),
    grade2: Number(grade2Input.value),
    status: statusInput.value
  }

  candidateController.update(editingCurrentCandidateId, data)
  toggleModal()
  loadCandidates()
}


grade1Input.addEventListener('change', updateAverageAndStatus)
grade2Input.addEventListener('change', updateAverageAndStatus)

cancelButton.addEventListener('click', toggleModal)
saveButton.addEventListener('click', saveChanges)


loadCandidates()