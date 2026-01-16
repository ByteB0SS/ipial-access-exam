import DBManagerService from "./db-manager.service.js";
import { LocalSotrageStrategy } from "./strategies/localstorage.strategy.js";

const localStorageStrategy = new LocalSotrageStrategy()
const dbManager = new DBManagerService(localStorageStrategy);

const datas = dbManager.read()
console.log(datas)
