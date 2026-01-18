// import TokenActionService from '../../utils/token-actions/token-actions.service.js'
// import CryptoStrategy from '../../utils/token-actions/strategies/crypto.strategy.js'
import AdminRepository from '../../repositories/admin/admin.repository.js'
import CandidateRepository from '../../repositories/candidate/candidate.repository.js'
import CourseRepository from '../../repositories/course/course.repository.js'
// import HashService from '../../utils/hasher/hash.service.js'
// import CryptoHasherStrategy  from '../../utils/hasher/strategies/crypto.strategy.js'

export default class AuthController {
    constructor () {
        // this.tokenService = new TokenActionService(new CryptoStrategy())
        // this.hashService = new HashService(new CryptoHasherStrategy())
        this.adminRepository = new AdminRepository()
        this.candidateRepo = new CandidateRepository()
        this.courseRepo = new CourseRepository()
    }

    login (userName, password) {
        const admin = this.adminRepository.findByName(userName)

        if (!admin) {
            return {
                message: 'Admin não encotrado',
                success: false,
                statusCode: 404
            }
        }
        // const isPasswordValid = this.hashService.verifyPassword(password, admin.password)
        const isPasswordValid = password === admin.password
        if (!isPasswordValid) {
            return {
                message: 'Senha inválida',
                success: false,
                statusCode: 401
            }
        }

        // const token = this.tokenService.generateToken(admin.id)

        return {
            message: 'Login realizado com sucesso',
            success: true,
            statusCode: 200,
            // token: token,
            user: {
                id: admin.id,
                userName: admin.userName
            }
        }
    }

    checkCandidate (email, secretKey) {
        if (!email || !secretKey) {
            return {
                success: false,
                message: "Todos os campos devem ser preenchidos",
                statusCode: 400
            }
        }

        const candidates = this.candidateRepo.findAll()
        const intendedCandidate = candidates.find((candidate)=> candidate.email == email)

        if(!intendedCandidate) {
            return {
                success: false,
                message: "Email errado ou chave Secreta Errda",
                statusCode: 401
            }
        }

        intendedCandidate.course = this.courseRepo.findById(intendedCandidate.courseId)
        const isSecretKeyCorrect = intendedCandidate.secretKey === secretKey

        if (!isSecretKeyCorrect) {
            return {
                success: false,
                message: "Email errado ou chave secreta errada",
                statusCode: 401
            }
        }

        return {
            success: true, 
            message: "Sucesso",
            statusCode: 200,
            candidate: intendedCandidate
        }
    }
}

