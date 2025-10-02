import { createManyEventSalesPhasesRepo } from '../repositories/eventSalesPhase.repo.js';

const isNonEmptyString = (v) => typeof v === 'string' && v.trim().length > 0;

export async function createManyEventSalesPhasesSvc(input) {
    const list = Array.isArray(input) ? input : Array.isArray(input?.phases) ? input.phases : [input];
    const phases = list.map( p => ({
        eventId: p.eventId,
        name: p.name,
        startAt: p.startAt,
        endAt: p.endAt,
        percentage: Number(p.percentage),
    }));
    return createManyEventSalesPhasesRepo(phases);
}