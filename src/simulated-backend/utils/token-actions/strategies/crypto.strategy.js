import SessionRepository from "../../../repositories/session/session.repository.js"
import TokenActionInterface from "../token-actions.interface.js"


export default class CryptoStrategy extends TokenActionInterface {
    constructor() {
        super()
        this.sessionRepository = new SessionRepository()
    }

    generateToken(adminId) {
        const token = crypto.randomUUID()
        this.sessionRepository.create({adminId: adminId, token, createdAt: Date.now()})
        return token
    }

    verifyToken(token, userId) {
        const session = this.sessionRepository.findByToken(token)
        return session && session.adminId === userId
    }
}
