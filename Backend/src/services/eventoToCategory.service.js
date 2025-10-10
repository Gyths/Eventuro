import { createManyEventToCategoryRepo } from "../repositories/eventToCategory.repo.js";

export async function createManyEventToCategorySvc(input) {
    const eventId = BigInt(input.eventId);
    const toCategories = input.eventCategoryId.map((cid) => ({
        eventId,
        eventCategoryId: BigInt(cid),
    }));
    return createManyEventToCategoryRepo(toCategories);
}