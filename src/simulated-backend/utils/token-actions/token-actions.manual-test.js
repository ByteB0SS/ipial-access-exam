import crypto from 'crypto'
import TokenActionService from './token-actions.service.js'
import CryptoStrategy from './strategies/crypto.strategy.js'

const tokenAction = new TokenActionService(new CryptoStrategy)
const token = tokenAction.generateToken('user123')
console.log('Generated Token:', token)

const isValid = tokenAction.verifyToken(token, 'user123')
console.log('Is token valid for user123?', isValid)