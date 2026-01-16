import TokenActionInterface from './token-actions.interface.js';
import crypto from 'crypto'

export default class TokenActionService extends TokenActionInterface {
    constructor (strategy) {
        super();
        this.strategy = strategy;
    }

    generateToken (userId) {
        return this.strategy.generateToken(userId)
    }
   
    verifyToken (token, userId) {
        return this.strategy.verifyToken(token, userId)
    }
}