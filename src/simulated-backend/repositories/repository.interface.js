import DBManagerService from "../db-manager/db-manager.service.js";
import { LocalSotrageStrategy } from "../db-manager/strategies/localstorage.strategy.js";
// import crypto from "crypto";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

export default class RepositoryInterface {
    constructor(entityName) {
        if (new.target === RepositoryInterface) {
            throw new TypeError("Cannot construct RepositoryInterface instances directly");
        }

        // const dbPath = path.resolve(__dirname, "../db.json");

        this.dbManager = new LocalSotrageStrategy()

        this.entityName = entityName;
    }

    findAll() {
        return this.dbManager.read()[this.entityName];
    }

    findById(id) {
        return this.findAll().find(entity => entity.id === id);
    }

    create(data) {
        data.id = crypto.randomUUID();
        const db = this.dbManager.read();
        db[this.entityName].push(data);
        this.dbManager.write(db);
        return data;
    }

    update(id, data) {
        const db = this.dbManager.read();
        db[this.entityName] = db[this.entityName].map(entity =>
            entity.id === id ? { ...entity, ...data } : entity
        );
        this.dbManager.write(db);
        return this.findById(id);
    }

    delete(id) {
        const db = this.dbManager.read();
        db[this.entityName] = db[this.entityName].filter(entity => entity.id !== id);
        this.dbManager.write(db);
        return true;
    }

    deleteAll(){
        const db = this.dbManager.read();
        db[this.entityName] = []
        this.dbManager.write(db)
    }
}
