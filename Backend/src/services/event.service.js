import {
  createEventRepo,
  listEventRepo,
  listEventInfoRepo,
  listEventDateByEventIdRepo,
  listEventDateZonesByEventDateIdRepo,
  setEventStatusRepo,
  eventDetails,
  listEventsByOrganizerRepo,
  listEventstoApproveRepo,
  listSalesSummaryByOrganizer,
  getAttendeesByEventAndOrganizer,
} from "../repositories/event.repo.js";

export async function createEventSvc(userId, input) {
  console.log(input);
  return await createEventRepo(userId, input);
}

export async function listEventSvc() {
  return listEventRepo();
}

export async function listEventInfoSvc(eventId) {
  return listEventInfoRepo(eventId);
}

export async function listEventDateByEventIdSvc(eventId) {
  return listEventDateByEventIdRepo(eventId);
}

export async function listEventDateZonesByEventDateIdSvc(
  userId,
  eventId,
  eventDateId
) {
  return listEventDateZonesByEventDateIdRepo(userId, eventId, eventDateId);
}

export async function setEventStatusSvc(userId, { id, status, percentage }) {
  return setEventStatusRepo(userId, { eventId: id, status, percentage });
}

export async function _getEventDetails(id) {
  return eventDetails(id);
}

export async function _listEventsByOrganizer(idOrganizer) {
  return listEventsByOrganizerRepo(idOrganizer);
}

export async function listEventstoApproveSvc({ page = 1, pageSize = 10 }) {
  return listEventstoApproveRepo({ page, pageSize });
}

export async function getSalesSummarySvc(organizerId) {
  return await listSalesSummaryByOrganizer(organizerId);
}

export async function getAttendeesSvc(eventId, organizerId) {
  if (!eventId) throw new Error("eventId requerido.");
  if (!organizerId) throw new Error("organizerId requerido.");

  return await getAttendeesByEventAndOrganizer({
    eventId: BigInt(eventId),
    organizerId: BigInt(organizerId),
  });
}