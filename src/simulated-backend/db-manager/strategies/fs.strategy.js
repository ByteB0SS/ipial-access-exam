import DBManagerInterface from "../db-manager.interface.js";
import fs from 'node:fs';

export default class FSStrategy extends DBManagerInterface {
    constructor (dbPath) {
        super();
  
        this.dbPath = dbPath;
    }

    write (datas) {
        datas = JSON.stringify(datas, null, 2);
        try {
            fs.writeFileSync(this.dbPath, datas, 'utf-8');
            return true
        }
        catch (error) {
            console.error('Error writing to file:', error);
            return false
        }

    }

    read () {
        let data = fs.readFileSync(this.dbPath, 'utf-8');
        return JSON.parse(data);
    }
}
