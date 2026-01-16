import RepositoryInterface from "../repository.interface.js";

export default class SessionRepository extends RepositoryInterface {
    constructor() {
        super("session");
    }

    findByToken(token) {
        return this.findAll().find(session => session.token === token);
    }
}
