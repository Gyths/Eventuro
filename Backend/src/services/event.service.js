import { createEventRepo, listEventRepo } from '../repositories/event.repo.js';

const ACCESS_POLICY = new Set(['E', 'T', 'AO'])

const isNonEmptyString = (v) => typeof v === 'string' && v.trim().length > 0;

export async function createEventSvc(input) {
    const organizerId = input?.organizerId;
    if (organizerId === undefined || organizerId === null) throw new Error('organizerId es requerido');
    const title = input?.title?.trim();
    if (!isNonEmptyString(title)) throw new Error('title es requerido');
    const description = input?.description?.trim();
    if (!isNonEmptyString(description)) throw new Error('description es requerido');
    const inPerson = input?.inPerson;
    if (typeof inPerson !== 'boolean') throw new Error('inPerson debe ser boolean');
    const accessPolicy = input?.accessPolicy?.trim();
    if (!isNonEmptyString(accessPolicy) || !ACCESS_POLICY.has(accessPolicy)) throw new Error('accessPolicy inválido (usa valores del enum)');
    const accessPolicyDescriptionRaw = input?.accessPolicyDescription;
    let accessPolicyDescription;
    if (accessPolicyDescriptionRaw !== undefined) {
        const trimmed = String(accessPolicyDescriptionRaw ?? '').trim();
        accessPolicyDescription = trimmed.length > 0 ? trimmed : null;
    }

    return createEventRepo({organizerId, title, inPerson, description, accessPolicy, accessPolicyDescription});
}

export async function listEventSvc() {
  
  return listEventRepo();
}