import CandidateController from "../simulated-backend/controller/candidate/candidate.controller.js";

const candidateController = new CandidateController();

const SECRET_KEY = "minha chave"; // chave fictícia

const button = document.getElementById("add-200-candidates");

// ---------- GERADORES ----------

function gerarBI(index) {
    const numerosInicio = String(100000000 + index); // 9 dígitos
    const letras = index % 2 === 0 ? "LA" : "UE";    // alterna LA / UE
    const numerosFim = String(100 + (index % 900)); // 3 dígitos
    return `${numerosInicio}${letras}${numerosFim}`;
}

function gerarEmail(index) {
    return `candidato${index}@teste.com`;
}

function gerarDataNascimento(index) {
    const ano = 2005 + Math.floor(Math.random() * 5); // 2005–2009
    return `${ano}-01-01`;
}

function gerarCourseId() {
    // 4 cursos totalmente aleatórios
    return String(Math.floor(Math.random() * 4) + 1);
}

// ---------- EVENTO ----------

button.addEventListener("click", () => {
    alert("Serão adicionados 200 candidatos");

    const estatisticas = { 1: 0, 2: 0, 3: 0, 4: 0 };

    for (let i = 1; i <= 200; i++) {
        const candidate = {
            fullName: `Candidato Teste ${i}`,
            email: gerarEmail(i),
            birthDate: gerarDataNascimento(i),
            biPassport: gerarBI(i),
            courseId: gerarCourseId(),
            secretKey: SECRET_KEY
        };

        const response = candidateController.create(candidate);

        if (!response.success) {
            console.error(`Erro no candidato ${i}:`, response.message);
        } else {
            estatisticas[candidate.courseId]++;
            console.log(
                `Candidato ${i} criado | Curso ${candidate.courseId}`
            );
        }
    }

    console.table(estatisticas);
    alert("200 candidatos adicionados");
});
