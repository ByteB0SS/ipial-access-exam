import RepositoryInterface from "../repository.interface.js";

export default class AdminRepository extends RepositoryInterface {
    constructor() {
        super('admins');
    }

    findByName(userName) {
        const admins = this.findAll()
        return admins.find(admin => admin.userName === userName)
    }
}
