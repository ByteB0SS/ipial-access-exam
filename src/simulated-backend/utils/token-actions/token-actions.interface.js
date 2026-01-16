export default class TokenActionInterface {

    constructor() {
        if (new.target === TokenActionInterface) {
            throw new Error("Cannot construct DBManagerInterface instances directly");
        }
    }

    generateToken(admin) {
        throw new Error("Method 'hash()' must be implemented.");
    }


    verifyToken(token) {
        throw new Error("Method 'verifyPassword()' must be implemented.");
    }

}
