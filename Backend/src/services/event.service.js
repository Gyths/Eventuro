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
} from "../repositories/event.repo.js";

export async function createEventSvc(userId, input) {
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

export async function listEventDateZonesByEventDateIdSvc(eventId, eventDateId) {
  return listEventDateZonesByEventDateIdRepo(eventId, eventDateId);
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
