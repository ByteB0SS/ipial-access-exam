import DBManagerInterface from './db-manager.interface.js';

export default class DBManagerService extends DBManagerInterface {
    constructor (strategy) {
        super();
        this.strategy = strategy;
    }

    write (datas) {
        return this.strategy.write(datas)
    }

    read () {
        return this.strategy.read()
    }
}