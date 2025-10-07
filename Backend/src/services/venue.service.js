import { createVenueRepo } from '../repositories/venue.repo.js';

/*
Por ahora declare esta funcion en cada service, estoy buscando una libreria
que nos permita hacer validaciones mas eficientemente
*/
const isNonEmptyString = (v) => typeof v === 'string' && v.trim().length > 0;

export async function createVenueSvc(input) {
    const eventId = input?.eventId;
    if (eventId === undefined || eventId === null) throw new Error('eventId es requerido');
    const city = input?.city?.trim();
    if (!isNonEmptyString(city)) throw new Error('city es requerido');
    const address = input?.address?.trim();
    if (!isNonEmptyString(address)) throw new Error('address es requerido');
    const addressUrl = input?.addressUrl?.trim();
    if (!isNonEmptyString(addressUrl)) throw new Error('addressUrl es requerido');
    const reference = input?.reference?.trim();
    if (!isNonEmptyString(reference)) throw new Error('reference inválido (usa valores del enum)');
    const capacity = input?.capacity;
    if (capacity === undefined || capacity === null) throw new Error('capacity es requerido');

    return createVenueRepo({eventId, city, address, addressUrl, reference, capacity});
}