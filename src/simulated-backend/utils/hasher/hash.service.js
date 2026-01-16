import HasherInterface from './hasher.interface.js';

export default class HashService extends HasherInterface {
    constructor (strategy) {
        super();
        this.strategy = strategy;
    }

   hash (password) {
        return this.strategy.hash(password)
    }
   
    verifyPassword (password, hash) {
        return this.strategy.verifyPassword(password, hash)
    }
}