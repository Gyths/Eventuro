import {
  createEventRepo,
  listEventRepo,
  listAvailableTicketsRepo,
  setEventFeeRepo,
  eventDetails,
  listEventsByOrganizerRepo,
} from "../repositories/event.repo.js";

export async function createEventSvc(input) {
  return await createEventRepo(input);
}

export async function listEventSvc() {
  return listEventRepo();
}

export async function listAvailableTicketsSvc(input) {
  return listAvailableTicketsRepo(input);
}

export async function setEventFeeSvc({ id, percentage }) {
  return setEventFeeRepo({ eventId: id, percentage: percentage });
}

export async function _getEventDetails(id){
  return eventDetails(id);
}

export async function _listEventsByOrganizer(idOrganizer) {
  return listEventsByOrganizerRepo(idOrganizer);
}