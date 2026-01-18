import CandidateRepository from "../../repositories/candidate/candidate.repository.js";
import CandidateService from "../../services/candidate.service.js";

export default class CandidateController {
    constructor() {
        this.candidateRepository = new CandidateRepository();
        this.candidateService = new CandidateService(this.candidateRepository);
    }

    findById(candidateId, getCourse = false) {
        try {
            const candidate = this.candidateRepository.findById(candidateId, getCourse);

            if (!candidate) {
                return {
                    success: false,
                    statusCode: 404,
                    message: "Candidato não encontrado"
                };
            }

            return {
                candidate,
                success: true,
                statusCode: 200,
                message: "Candidato encontrado"
            };
        } catch (error) {
            return {
                success: false,
                statusCode: 500,
                message: "Erro interno do servidor"
            };
        }
    }

    findAll() {
        try {
            return {
                success: true,
                candidateList: this.candidateRepository.findAll(),
                statusCode: 200,
                message: "Candidatos encontrados"
            };
        } catch (error) {
            return {
                success: false,
                statusCode: 500,
                message: "Erro interno do servidor"
            };
        }
    }

    create(candidateData) {
        try {
            const candidate = this.candidateService.createCandidate(candidateData);

            return {
                candidate,
                success: true,
                statusCode: 201,
                message: "Candidato cadastrado com sucesso"
            };
        } catch (error) {
            return {
                success: false,
                statusCode: 400,
                message: error.message
            };
        }
    }

    update(candidateId, candidateData) {
        try {
            const updatedCandidate = this.candidateRepository.update(candidateId, candidateData);

            if (!updatedCandidate) {
                return {
                    success: false,
                    statusCode: 404,
                    message: "Candidato não encontrado"
                };
            }

            return {
                candidate: updatedCandidate,
                success: true,
                statusCode: 200,
                message: "Candidato actualizado com sucesso"
            };
        } catch (error) {
            return {
                success: false,
                statusCode: 500,
                message: "Erro interno do servidor"
            };
        }
    }

    delete(candidateId) {
        try {
            const deleted = this.candidateRepository.delete(candidateId);

            if (!deleted) {
                return {
                    success: false,
                    statusCode: 404,
                    message: "Candidato não encontrado"
                };
            }

            return {
                success: true,
                statusCode: 200,
                message: "Candidato deletado com sucesso"
            };
        } catch (error) {
            return {
                success: false,
                statusCode: 500,
                message: "Erro interno do servidor"
            };
        }
    }

    deleteAll() {
        try {
            this.candidateRepository.deleteAll();
            return {
                success: true,
                statusCode: 200,
                message: "Todos os candidatos foram deletados com sucesso"
            };
        } catch (error) {
            return {
                success: false,
                statusCode: 500,
                message: "Erro interno do servidor"
            };
        }
    }

    findCandidateInfosById(candidateId, getCourse = false) {
        try {
            const candidate = this.candidateRepository.findCandidateInfosById(candidateId, getCourse);

            if (!candidate) {
                return {
                    success: false,
                    statusCode: 404,
                    message: "Candidato não encontrado"
                };
            }

            return {
                candidate,
                success: true,
                statusCode: 200
            };
        } catch (error) {
            return {
                success: false,
                statusCode: 500,
                message: "Erro interno do servidor"
            };
        }
    }
}
