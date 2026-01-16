import RepositoryInterface from "../repository.interface.js";

export default class CourseRepository extends RepositoryInterface {
    constructor() {
        super("courses");
    }
}
