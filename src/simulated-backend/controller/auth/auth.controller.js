// import TokenActionService from '../../utils/token-actions/token-actions.service.js'
// import CryptoStrategy from '../../utils/token-actions/strategies/crypto.strategy.js'
import AdminRepository from '../../repositories/admin/admin.repository.js'
// import HashService from '../../utils/hasher/hash.service.js'
// import CryptoHasherStrategy  from '../../utils/hasher/strategies/crypto.strategy.js'

export default class AuthController {
    constructor () {
        // this.tokenService = new TokenActionService(new CryptoStrategy())
        // this.hashService = new HashService(new CryptoHasherStrategy())
        this.adminRepository = new AdminRepository()
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
        const isPasswordValid = true
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
}

