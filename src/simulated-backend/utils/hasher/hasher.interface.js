import crypto from 'crypto';

export default class HasherInterface {

    constructor() {
        if (new.target === HasherInterface) {
            throw new Error("Cannot construct DBManagerInterface instances directly");
        }
        this.salt = "default_salt_value";
    }

    hash(password) {
        throw new Error("Method 'hash()' must be implemented.");
    }


    verifyPassword(password, hash) {
        throw new Error("Method 'verifyPassword()' must be implemented.");
    }

}
