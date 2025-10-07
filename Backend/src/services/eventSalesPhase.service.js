import { createManyEventSalesPhasesRepo } from '../repositories/eventSalesPhase.repo.js';

const isNonEmptyString = (v) => typeof v === 'string' && v.trim().length > 0;

export async function createManyEventSalesPhasesSvc(input) {
    const eventId = BigInt(input.eventId);
    const phases = input.phases.map( p => ({
        eventId: eventId,
        name: p.name,
        startAt: p.startAt,
        endAt: p.endAt,
        percentage: Number(p.percentage),
    }));
    return createManyEventSalesPhasesRepo(phases);
}