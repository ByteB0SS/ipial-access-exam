// Importa o repositório de candidatos
import CandidateRepository from "./candidate/candidate.repository.js";
import DBManagerService from "../db-manager/db-manager.service.js";
import FSStrategy from "../db-manager/strategies/fs.strategy.js";

// Cria uma instância do repositório
const repository = new CandidateRepository();

// ==================================================
// LISTAR TODOS OS CANDIDATOS INICIAIS
// ==================================================
console.log("📌 [LISTAR INICIAL] Candidatos existentes no banco:");
console.log(repository.findAll());

// ==================================================
// CRIAR 15 NOVOS CANDIDATOS
// ==================================================
console.log("\n📌 [CRIAR] Criando 15 novos candidatos...");

const candidatosNovos = [];

for (let i = 1; i <= 15; i++) {
    const candidato = repository.create({
        fullName: `Candidato ${i}`,
        birthDate: `200${i % 10}-0${(i % 12) + 1}-0${(i % 28) + 1}`, // datas diferentes
        biPassport: `BP${1000 + i}`,
        email: `candidato${i}@exemplo.com`,
        courseId: `uuid-course-${(i % 4) + 1}`, // distribui entre 4 cursos
        status: i % 3 === 0 ? "approved" : i % 3 === 1 ? "pending" : "rejected"
    });

    candidatosNovos.push(candidato);
    console.log(`✅ Criado: ${candidato.fullName} (ID: ${candidato.id})`);
}

// ==================================================
// LISTAR TODOS OS CANDIDATOS APÓS CRIAÇÃO
// ==================================================
console.log("\n📌 [LISTAR] Todos os candidatos após criação:");
console.log(repository.findAll());

// ==================================================
// BUSCAR UM CANDIDATO ESPECÍFICO
// ==================================================
console.log("\n📌 [BUSCAR] Buscando candidato pelo ID (Candidato 5)...");

const candidato5 = repository.findById(candidatosNovos[4].id);
console.log("🔍 Candidato encontrado:");
console.log(candidato5);

// ==================================================
// ATUALIZAR UM CANDIDATO
// ==================================================
console.log("\n📌 [ATUALIZAR] Atualizando Candidato 5...");

const candidato5Atualizado = repository.update(candidatosNovos[4].id, {
    fullName: "Candidato 5 (Atualizado)",
    status: "approved"
});

console.log("✏️ Candidato após atualização:");
console.log(candidato5Atualizado);

// ==================================================
// REMOVER UM CANDIDATO
// ==================================================
console.log("\n📌 [REMOVER] Removendo Candidato 3...");

repository.delete(candidatosNovos[2].id);
console.log("🗑️ Candidato 3 removido com sucesso");

// ==================================================
// LISTAR TODOS OS CANDIDATOS NO FINAL
// ==================================================
console.log("\n📌 [LISTAR FINAL] Todos os candidatos restantes:");
console.log(repository.findAll());

const dbManager = new DBManagerService(new FSStrategy('../db.json'));
console.log("\n📌 [DADOS FINAIS NO DB.JSON]:");
console.log(dbManager.read());