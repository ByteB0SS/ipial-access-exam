export default class DBManagerInterface {
    constructor() {
        if (new.target === DBManagerInterface) {
            throw new Error("Cannot construct DBManagerInterface instances directly");
        }
    }

    write(datas) {
        throw new Error("Method 'write()' must be implemented.");
    }

    read() {
        throw new Error("Method 'read()' must be implemented.");
    }
}
