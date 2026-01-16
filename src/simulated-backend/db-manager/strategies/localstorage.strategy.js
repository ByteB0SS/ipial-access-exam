import DBManagerInterface from "../db-manager.interface.js";

export class LocalSotrageStrategy extends DBManagerInterface {
    constructor () {
        super()
        if (!localStorage.getItem('db')) {
            localStorage.setItem("db", '{"courses":[{"id":"1","name":"Construção Civil"},{"id":"2","name":"informática"},{"id":"3","name":"Eletronica e Telecomunicações"},{"id":"4","name":"Eletricidade"}],"admins":[{"id":"f7e8aa73-56ed-4dd3-881c-e7104fea4f95","userName":"admin","password":"4f3cf5128af7afb473ff8c6a666f7c7e19a4586dd8647269a6fcbdae0d168d276f36b686183f2ed32266bf0256ed205a5394d4dd672398c4f23d774aba7fc1e7"}],"session":[],"candidates":[]}')
        }
    }

    write (datas) {
        datas = JSON.stringify(datas)

        try {
            localStorage.setItem('db', datas)
            return true
        }

        catch (error) {
            console.error('Error writing to file:', error);
            return false
        }
    }

    read () {
        let data = localStorage.getItem("db")
        return JSON.parse(data);
    }
}