export default class CandidateService {
    constructor(candidateRepository) {
        this.candidateRepository = candidateRepository;
    }

    validateEmail(email) {
        const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return regexEmail.test(email);
    }

    validateBI(bi) {
        const regexBi = /^\d{8,9}[A-Z]{2}\d{3}$/;
        return regexBi.test(bi);
    }

    validateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        const age = today.getFullYear() - birth.getFullYear();
        return age >= 14; // regra: 14 anos no ano civil
    }

    checkDuplicateEmail(email) {
        const candidates = this.candidateRepository.findAll();
        return candidates.some(c => c.email === email);
    }

    checkDuplicateBI(bi) {
        const candidates = this.candidateRepository.findAll();
        return candidates.some(c => c.biPassport === bi);
    }

    createCandidate(candidateData) {
        if (!this.validateEmail(candidateData.email)) {
            throw new Error('Email inválido');
        }
        if (this.checkDuplicateEmail(candidateData.email)) {
            throw new Error('Já existe um candidato com este email');
        }
        if (!this.validateBI(candidateData.biPassport)) {
            throw new Error('Bilhete de identidade inválido');
        }
        if (this.checkDuplicateBI(candidateData.biPassport)) {
            throw new Error('Já existe um candidato com este Bilhete de identidade');
        }
        if (!this.validateAge(candidateData.birthDate)) {
            throw new Error('Candidato precisa ter no mínimo 14 anos ainda neste ano');
        }

        candidateData.status = "Pendente";
        candidateData.grade1 = 0;
        candidateData.grade2 = 0;
        candidateData.createdAt = new Date().toISOString();

        return this.candidateRepository.create(candidateData);
    }
}
