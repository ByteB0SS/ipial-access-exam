import CandidateRepository from "../../repositories/candidate/candidate.repository.js";

export default class CandidateController {
    constructor () {
        this.candidateRepository = new CandidateRepository();
    }

    findById (candidateId, getCourse = false) {
        try{
            const candidate = this.candidateRepository.findById(candidateId, getCourse);

            if (!candidate) {
                return {
                    success: false,
                    statusCode: 404,
                    message: "Candidato não encontrado"
                }
            }

            return {
                candidate: candidate,
                success: true,
                statusCode: 200,
                message: "Candidato encontrado"
            }
        }
        catch (err) {
            return {
                success: false,
                statusCode: 500,
                message: "Algum erro no servidor"
            }
        }
    }  

    create (candidateData) {
        const candidates = this.candidateRepository.findAll()
        const candidateWithSameEmail = candidates.find((c)=> c.email == candidateData.email)
        console.log(candidates)
        if(candidateWithSameEmail){
            alert('Já existe um candidato com este email, troque')
        }

        candidateData.status = "Pendente";
        candidateData.grade1 = 0
        candidateData.grade2 = 0
        candidateData.createdAt = new Date().toISOString();
        const candidate = this.candidateRepository.create(candidateData)
        return {
            candidate: candidate,
            success: true,
            statusCode: 201,
            message: "Candidato cadastrado com sucesso"
        }
    }
    
    update (candidateId, candidateData) {
        return {
            candidate: this.candidateRepository.update(candidateId, candidateData),
            success: true,
            statusCode: 200,
            message: 'Candidato actualizado com sucesso'
        }
    }

    delete (candidateId) {
        const isCandidateDelected = this.candidateRepository.delete(candidateId);

        if (!isCandidateDelected) {
            return {
                success: false,
                statusCode: 500,
                message: 'Candidato não deletado'
            }
        }

        return {
            success: isCandidateDelected,
            statusCode: 200,
            message: 'Candidato deletado com sucesso'
        }
    }

    findAll () {
        return {
            success: true,
            candidateList: this.candidateRepository.findAll(),
            statusCode: 200,
            message: 'Candidatos encontrados'
        } 
    }

    findCandidateInfosById (candidateId, getCourse = false) {
        return {
            candidate: this.candidateRepository.findCandidateInfosById(candidateId, getCourse),
            success: true,
            statusCode: 200
        }
    }
    
    deleteAll () {
        this.candidateRepository.deleteAll()
        return {
            success: true,
            message: "Deletado com sucesso",
            statusCode: 200
        }
    }
}
