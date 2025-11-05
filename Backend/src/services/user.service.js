import { findByIdFull } from "../repositories/user.repo.js";

export async function findUserByIdFullSvc(userId) {
    return findByIdFull(userId);
}