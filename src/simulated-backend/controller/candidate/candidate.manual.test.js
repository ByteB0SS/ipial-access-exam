import CandidateController from "./candidate.controller.js";

const candidateController = new CandidateController();

const candidate = await candidateController.findCandidateInfosById("aca8c7bc-dca4-4adb-aae9-a460ee6b5be1", true)
console.log("Candidate with course:");
console.log(candidate);