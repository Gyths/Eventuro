import { createEventCategoryRepo } from "../repositories/eventCategory.repo.js";
import { updateEventCategoryRepo } from "../repositories/eventCategory.repo.js";
import { deleteEventCategoryRepo } from "../repositories/eventCategory.repo.js";
import { getEventCategoryByIdRepo } from "../repositories/eventCategory.repo.js";
import { listEventCategoriesRepo } from "../repositories/eventCategory.repo.js";


export async function createtEventCategorySvc(userId, input) {
    const initials = input?.initials?.trim();
    const description = input?.description?.trim();

    if(!initials) throw new Error('Las iniciales son requeridas');
    if(!description) throw new Error('La descripcion es necesaria');

    return createEventCategoryRepo(userId, {initials, description});
}

export async function updateEventCategorySvc(userId, {id, payload}) {
    const eventCategoryId = BigInt(id);
    const data = payload;

    return updateEventCategoryRepo(userId, {eventCategoryId, data});
}

export async function deleteEventCategorySvc(userId, eventCategoryId) {
    return deleteEventCategoryRepo(userId, eventCategoryId);
}

export async function getEventCategoryByIdSvc(eventCategoryId) {
    return getEventCategoryByIdRepo(eventCategoryId);
}

export async function listEventCategoriesSvc() {
    return listEventCategoriesRepo();
}