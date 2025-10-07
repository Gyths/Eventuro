import { createEventCategoryRepo } from "../repositories/eventCategory.repo.js";
import { listEventCategoriesRepo } from "../repositories/eventCategory.repo.js";

export async function createtEventCategorySvc(input) {
    const initials = input?.initials?.trim();
    const description = input?.description?.trim();

    if(!initials) throw new Error('Las iniciales son requeridas');
    if(!description) throw new Error('La descripcion es necesaria');

    return createEventCategoryRepo({initials, description});
}

export async function listEventCategoriesSvc() {
    return listEventCategoriesRepo();
}