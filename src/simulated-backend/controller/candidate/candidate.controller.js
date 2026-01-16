import CandidateRepository from "../../repositories/candidate/candidate.repository.js";

export default class CandidateController {
    constructor () {
        this.candidateRepository = new CandidateRepository();
    }

    findById (candidateId, getCourse = false) {
        return this.candidateRepository.findById(candidateId, getCourse);
    }  

    create (candidateData) {
        candidateData.status = "pending";
        candidateData.createdAt = new Date().toISOString();
        return this.candidateRepository.create(candidateData);
    }
    
    update (candidateId, candidateData) {
        return this.candidateRepository.update(candidateId, candidateData);
    }

    delete (candidateId) {
        return this.candidateRepository.delete(candidateId);
    }

    findAll () {
        return this.candidateRepository.findAll();
    }

    findCandidateInfosById (candidateId, getCourse = false) {
        return this.candidateRepository.findCandidateInfosById(candidateId, getCourse);
    }
}
