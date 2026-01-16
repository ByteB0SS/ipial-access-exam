import RepositoryInterface from "../repository.interface.js";
import CourseRepository from "../course/course.repository.js";


export default class CandidateRepository extends RepositoryInterface {
    constructor() {
        super("candidates");
        this.courseRepository = new CourseRepository();
    }

    findCandidateInfosById(candidateId, getCourse = false) {
        if (!getCourse) {
            return this.findById(candidateId);
        }
        
        const candidate = this.findById(candidateId);
        const courseId = candidate.courseId 
        const course = this.courseRepository.findById(courseId);
        return {
            ...candidate,
            course: course || null
        };
    }
}
