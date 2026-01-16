import crypto from 'crypto';
import HasherInterface from '../hasher.interface.js';

export default class CryptoStrategy extends HasherInterface {

    constructor() {
        super();
    }

    hash(password) {
        const salt = this.salt;

        const hash = crypto.scryptSync(password, salt, 64).toString("hex");
        return { salt, hash };
    }

    verifyPassword(password, hash) {
        const newHash = crypto.scryptSync(password, this.salt, 64).toString("hex");
        return newHash === hash;
    }

}
